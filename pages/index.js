import styles from '../styles/Home.module.css';
import Page from '../components/Page';
import { i18n, withTranslation } from '../i18n';

const Home = () => {
  return (
    <Page title="Home">
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">GoldMovies</a>
          </h1>

          <p className={styles.description}>
            Don't forget what you watch <code className={styles.code}>and share!</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Save your movies &rarr;</h3>
              <p>Don't forget what you have watched recently.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Share them&rarr;</h3>
              <p>Share the best movies with your friends</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h3>Best movies &rarr;</h3>
              <p>Discover the trends on the platform</p>
            </a>

            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Recently added &rarr;</h3>
              <p>Check out the recent movies added</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </Page>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Home);
