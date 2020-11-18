import React from 'react';

import Page from 'components/Page';

const WithoutHeader = () => {
  return (
    <Page
      title="WithoutHeader - PapyMovie"
      description="Check out the recents movies added by the users"
      url="/WithPage"
      withHeader={false}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <center>withoutHeader</center>
    </Page>
  );
};

export default WithoutHeader;
