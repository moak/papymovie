import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import MediaList from 'components/MediaList';

const Series = (props) => {
  const { theme, toggleTheme } = props;

  const { t } = useTranslation('movie');

  const router = useRouter();

  return (
    <MediaList
      toggleTheme={toggleTheme}
      theme={theme}
      t={t}
      locale={router.locale}
      mediaType="serie"
    />
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'movie'])),
    },
  };
}

export default dynamic(() => Promise.resolve(Series), { ssr: false });
