import React from 'react';

import { useTranslation } from 'next-i18next';

import Page from 'components/Page';

const Naked = () => {
  const { t } = useTranslation('common');

  return (
    <Page title={t('list.metas.title')} description={t('list.metas.description')} url="/users">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>{t('header.disconnect')}</div>
      <br />
      <br />
      <br />
      <br />
      <center>Naked</center>
    </Page>
  );
};

export default Naked;
