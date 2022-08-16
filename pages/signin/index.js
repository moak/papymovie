import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Page from 'components/Page';
import Text from 'components/Text';
import PageContainer from 'components/PageContainer';

import useIsMobile from 'hooks/useIsMobile';

const SignIn = (props) => {
  const { providers, toggleTheme, theme } = props;

  const { t } = useTranslation('common');

  const { status } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const providersArray = [
    {
      name: 'Google',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
            fill="#fbbb00"
          />
          <path
            d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
            fill="#518ef8"
          />
          <path
            d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
            fill="#28b446"
          />
          <path
            d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
            fill="#f14336"
          />
        </svg>
      ),
    },
    {
      name: 'Github',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={theme.text}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <Page toggleTheme={toggleTheme} theme={theme} isLoading={status === 'loading'}>
      <>
        <Text textColor={theme.text} isBold fontSize={28} marginBottom={16} marginTop={-4}>
          {t('signin.welcome')}
        </Text>
        <PageContainer background={theme.background}>
          <div
            style={{ border: isMobile ? null : `1px solid ${theme.borderColor}` }}
            className="login-container"
          >
            <div className="login-form">
              <div className="login-form-inner">
                <div className="logo">
                  <svg
                    height="512"
                    viewBox="0 0 192 192"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
                  </svg>
                  <Text textColor={theme.text} isBold fontSize={28} marginTop={-4}>
                    {t('signin.welcome')}
                  </Text>
                </div>
                <Text textColor={theme.text} fontSize={16} marginBottom={16} marginTop={-4}>
                  {t('signin.subtitle')}
                </Text>

                {Object.values(providers).map((provider, index) => (
                  <div
                    style={{ cursor: 'pointer' }}
                    tabIndex={index}
                    role="button"
                    onKeyDown={() =>
                      signIn(provider.id, { callbackUrl: `${router.query.callbackUrl}` })
                    }
                    key={index}
                    onClick={() => {
                      return signIn(provider.id, { callbackUrl: `${router.query.callbackUrl}` });
                    }}
                  >
                    <div className="rounded-button google-login-button">
                      <span className="google-icon">{providersArray[index].svg}</span>
                      <Text cursor="pointer" textColor={theme.text}>
                        {t('signin.button')} {providersArray[index].name}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="onboarding">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide color-1">
                    <div className="slide-image">
                      <img
                        src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/startup-launch.png"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <div className="slide-content">
                      <h2>Slide 1.</h2>
                      <p>Text 1</p>
                    </div>
                  </div>

                  <div className="swiper-slide color-1">
                    <div className="slide-image">
                      <img
                        src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/cloud-storage.png"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <div className="slide-content">
                      <h2>Slide 2.</h2>
                      <p>Text 2</p>
                    </div>
                  </div>

                  <div className="swiper-slide color-1">
                    <div className="slide-image">
                      <img
                        src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/cloud-storage.png"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <div className="slide-content">
                      <h2>Slide 3.</h2>
                      <p>Text 3</p>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div> */}
          </div>
        </PageContainer>
      </>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  const providers = await getProviders();
  return {
    props: { providers, ...(await serverSideTranslations(locale, ['common'])) },
  };
}

export default dynamic(() => Promise.resolve(SignIn), { ssr: false });
