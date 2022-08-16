import _ from 'lodash';

import dbConnect from 'utils/dbConnect';
import slugify from 'utils/slugify';

import Quizz from 'models/Quizz';
import QuizzCategory from 'models/QuizzCategory';

const getDifficuly = (difficulty) => {
  if (difficulty === 'débutant') {
    return 1;
  } else if (difficulty === 'confirmé') {
    return 2;
  } else {
    return 3;
  }
};
export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const totals = { created: 0, existing: 0 };

        const query =
          'https://www.kiwime.com/oqdb/files/1092754877/OpenQuizzDB_092/openquizzdb_92.json';

        const data = await fetch(query).then((res) => res.json());

        const provider = data['fournisseur'];
        const writter = data['rédacteur'];
        const quizzs = data['quizz'];
        const category = data['catégorie-nom-slogan'];

        const formattedCategory = {};
        for (const lang in category) {
          formattedCategory[lang] = {
            category: category[lang]['catégorie'],
            name: category[lang]['nom'],
            slogan: category[lang]['slogan'],
          };
        }
        const final = [];

        ['débutant', 'confirmé', 'expert'].forEach((difficulty) => {
          const en = _.get(quizzs, `en.${difficulty}`, []);
          const fr = _.get(quizzs, `fr.${difficulty}`, []);
          const es = _.get(quizzs, `es.${difficulty}`, []);
          const it = _.get(quizzs, `it.${difficulty}`, []);
          const nl = _.get(quizzs, `nl.${difficulty}`, []);
          const de = _.get(quizzs, `de.${difficulty}`, []);

          Array.from(new Array(fr.length)).map((item, index) => {
            return final.push({
              key: slugify(fr[index]['question']),
              difficulty: getDifficuly(difficulty),
              provider,
              writter,
              quizz: {
                fr: {
                  question: fr[index] ? fr[index]['question'] : null,
                  choices: fr[index] ? fr[index]['propositions'] : null,
                  answer: fr[index] ? fr[index]['réponse'] : null,
                  anecdote: fr[index] ? fr[index]['anecdote'] : null,
                },
                en: {
                  question: en[index] ? en[index]['question'] : null,
                  choices: en[index] ? en[index]['propositions'] : null,
                  answer: en[index] ? en[index]['réponse'] : null,
                  anecdote: en[index] ? en[index]['anecdote'] : null,
                },
                es: {
                  question: es[index] ? es[index]['question'] : null,
                  choices: es[index] ? es[index]['propositions'] : null,
                  answer: es[index] ? es[index]['réponse'] : null,
                  anecdote: es[index] ? es[index]['anecdote'] : null,
                },
                it: {
                  question: it[index] ? it[index]['question'] : null,
                  choices: it[index] ? it[index]['propositions'] : null,
                  answer: it[index] ? it[index]['réponse'] : null,
                  anecdote: it[index] ? it[index]['anecdote'] : null,
                },
                nl: {
                  question: nl[index] ? nl[index]['question'] : null,
                  choices: nl[index] ? nl[index]['propositions'] : null,
                  answer: nl[index] ? nl[index]['réponse'] : null,
                  anecdote: nl[index] ? nl[index]['anecdote'] : null,
                },
                de: {
                  question: de[index] ? de[index]['question'] : null,
                  choices: de[index] ? de[index]['propositions'] : null,
                  answer: de[index] ? de[index]['réponse'] : null,
                  anecdote: de[index] ? de[index]['anecdote'] : null,
                },
              },
              category: formattedCategory,
            });
          });
        });

        let finalCategory = null;

        for (const quizz of final) {
          const quizzDB = await Quizz.findOne({ key: quizz.key });

          if (!quizzDB) {
            if (!finalCategory) {
              const categoryKey = slugify(quizz['category']['en']['category']);

              const categoryDB = await QuizzCategory.findOne({ key: categoryKey });

              if (!categoryDB) {
                const newCategory = new QuizzCategory({
                  key: categoryKey,
                  lang: formattedCategory,
                });
                const createdCategory = await newCategory.save();
                finalCategory = createdCategory;
              } else {
                finalCategory = categoryDB;
              }
            }

            const newQuizz = new Quizz({
              key: quizz.key,
              provider: quizz.provider,
              writter: quizz.writter,
              difficulty: quizz.difficulty,
              category: finalCategory,
              quizz: quizz.quizz,
              choices: quizz.choices,
            });
            totals.created = totals.created + 1;
            await newQuizz.save();
          } else {
            totals.existing = totals.existing + 1;
          }
        }
        return res.status(200).json({ totals });
      } catch (error) {
        console.log('error', error);

        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
