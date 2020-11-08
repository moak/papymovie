import React from 'react';

import Link from 'next/link';

import styles from '../styles/Home.module.css';

import Page from '../components/Page';
import PageContainer from '../components/PageContainer';

import { withTranslation } from '../i18n';

const Home = () => {
  return (
    <Page title="Home">
      <PageContainer>
        <div className={styles.container}>
          <main>
            <h1 className={styles.title}>
              Welcome to <Link href="/">GoldMovies</Link>
            </h1>

            <p className={styles.description}>
              Don't forget what you watch <code className={styles.code}>and get inspired!</code>
            </p>

            <div className={styles.grid}>
              {/* <Link href="/">
                <div className={styles.card}>
                  <h3>Share them&rarr;</h3>
                  <p>Share the best movies with your friends</p>
                </div>
              </Link> */}
              <Link href="/movies">
                <div className={styles.card}>
                  <h3>Movies &rarr;</h3>
                  <p>Discover the trends and best movies of all time. </p>
                </div>
              </Link>
              <Link href="/users">
                <div className={styles.card}>
                  <h3>Users &rarr;</h3>
                  <p>Get inspired by what other people have watched.</p>
                </div>
              </Link>
              {/* <Link href="/">
                <div className={styles.card}>
                  <h3>Recently added &rarr;</h3>
                  <p>Check out the recent movies added</p>
                </div>
              </Link> */}
            </div>
          </main>

          {/* <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
            </a>
          </footer> */}
        </div>
      </PageContainer>
    </Page>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Home);
