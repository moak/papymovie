import React from 'react';
import Link from 'next/link';
import useIsMobile from 'hooks/useIsMobile';

const Brand = (props) => {
  const { isConnected, theme } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }
  return (
    <Link href={isConnected ? '/movies' : '/'} passHref>
      <svg width="140" height="50" viewBox="0 -5 187 77" style={{ cursor: 'pointer' }}>
        <defs id="SvgjsDefs4950"></defs>
        <g
          id="SvgjsG4951"
          featurekey="symbolFeature-0"
          transform="matrix(0.7186096237138837,0,0,0.7186096237138837,-7.1860962371388375,-4.913421237224502)"
          fill={theme.text}
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill={theme.text}
            d="M16.309,50.072c-0.578,0-1.309,0.144-1.309,0.722v36.112c0,0.578,0.73,1.166,1.309,1.166H68v-38H16.309z   M65,80.708c0,2.962-2.401,5.364-5.364,5.364H23.364c-2.963,0-5.364-2.402-5.364-5.364V57.437c0-2.962,2.401-5.364,5.364-5.364  h36.271c2.963,0,5.364,2.402,5.364,5.364V80.708z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill={theme.text}
            d="M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M83.561,50.072  H70v38h13.561c0.578,0,1.439-0.588,1.439-1.166V50.794C85,50.216,84.139,50.072,83.561,50.072z M77.345,52.32  c2.842,0,5.146,2.304,5.146,5.146s-2.304,5.146-5.146,5.146c-2.844,0-5.147-2.304-5.147-5.146S74.501,52.32,77.345,52.32z   M73.704,67.042c2.011-2.01,5.27-2.01,7.278,0c2.01,2.01,2.01,5.268,0,7.277c-2.009,2.01-5.268,2.01-7.278,0  C71.694,72.31,71.694,69.052,73.704,67.042z M79,86.072h-7v-1h7V86.072z M81.836,86.817c-0.771,0-1.395-0.624-1.395-1.395  c0-0.772,0.624-1.396,1.395-1.396s1.396,0.624,1.396,1.396C83.232,86.193,82.606,86.817,81.836,86.817z M78,53.072h-1v8h1V53.072z   M77,53.072v8h1v-8H77z M77,53.072v8h1v-8H77z M75.124,73.829l-0.925-0.925l5.458-5.458l0.926,0.925L75.124,73.829z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill={theme.text}
            d="M85.981,45.072h-4.042c-0.54-3-2.943-4.729-6.306-5.892L88.427,4.368c0.436,0.094,0.81-0.038,0.892-0.263  c0.1-0.272-0.26-0.679-0.803-0.878c-0.543-0.198-1.063-0.152-1.162,0.118c-0.068,0.186,0.078,0.417,0.352,0.611L74.886,38.732  c-1.651-0.485-3.503-0.758-5.456-0.758c-2.396,0-4.637,0.408-6.546,1.117L43.965,0.744c0.26-0.234,0.384-0.5,0.289-0.679  c-0.135-0.257-0.66-0.245-1.172,0.024c-0.51,0.27-0.816,0.696-0.682,0.951c0.11,0.208,0.476,0.239,0.884,0.101l18.868,38.456  c-2.795,1.207-4.752,2.476-5.232,5.476h-42.9c-1.951,0-4.02,1.154-4.02,3.105v43.439c0,1.951,2.068,3.456,4.02,3.456h2.589  c0.237,0,0.455,0.167,0.57,0.374l2.579,4.599c0.012,0.02,0.032,0.027,0.057,0.027h57.727c0.206,0,0.401-0.074,0.524-0.238  l3.313-4.473c0.123-0.165,0.318-0.289,0.525-0.289h4.077c1.95,0,4.019-1.505,4.019-3.456V48.178  C90,46.227,87.932,45.072,85.981,45.072z M87,89.109c0,1.084-0.879,1.963-1.962,1.963H14.962c-1.083,0-1.962-0.879-1.962-1.963  V49.035c0-1.084,0.879-1.963,1.962-1.963h70.076c1.083,0,1.962,0.879,1.962,1.963V89.109z"
          ></path>
        </g>
        <g
          id="SvgjsG4952"
          featurekey="nameFeature-0"
          transform="matrix(0.8962293882569554,0,0,0.8962293882569554,75.20775393967357,0.38023067560704504)"
          fill={theme.text}
        >
          <path d="M7.08 35.64 c0.04 1.24 0.04 2.48 0.08 3.72 c0 0.56 0.04 0.64 0.6 0.64 l3.6 0 c0.76 0 0.6 -1.28 0.56 -1.96 l0.12 -22.4 c0 -0.6 0.2 -0.8 1 -0.8 l3.52 0 c0.84 0 0.64 -1.44 0.64 -2.44 c0 -0.88 0.32 -2.4 -0.64 -2.4 c-0.68 0 -7.2 0 -9.88 0.04 c-1.32 0 -2.4 -0.04 -3.72 -0.04 c-1 0 -0.96 0.8 -0.96 2.56 c0 1.12 -0.04 2.24 0.92 2.24 c0.56 0 2.84 0 3.48 0.04 c0.4 0 0.68 0.12 0.76 0.56 c0 0.12 0.04 0.24 0.04 0.36 c0 2.88 -0.2 16.28 -0.12 19.88 z M36.208 28.16 c0 1.8 -0.04 5.36 -0.08 5.36 l0 5.44 c0 0.24 -0.04 0.64 0.08 0.88 c0.12 0.28 0.48 0.2 0.72 0.16 c1.16 -0.12 2.32 0.04 3.48 0 c1.28 -0.04 0.88 -2 0.84 -2.8 c-0.16 -1.76 0.04 -15.16 0.04 -19.96 c0 -2.16 -0.08 -6.6 -0.2 -6.8 c-0.2 -0.36 -0.72 -0.44 -1.12 -0.48 c-0.88 -0.16 -1.32 0.08 -2.64 0.08 s-1.4 0.4 -1.4 1.8 l0 1.2 c-0.04 0.96 0.12 7.68 0.12 8.76 c0 0.52 -0.04 0.56 -0.56 0.56 c-1.32 -0.04 -3.16 0.12 -4.52 0 c-1.96 -0.16 -1.52 0 -1.64 -1.8 l0 -0.24 c0 -2.56 0.32 -9.2 0.2 -9.6 c-0.2 -0.6 -0.44 -0.72 -0.96 -0.68 c-1.2 0.08 -2.44 -0.12 -3.64 -0.04 c-0.4 0.04 -0.52 0.16 -0.64 0.56 c-0.04 0.2 -0.08 0.4 -0.08 0.6 c0 1.24 0.08 2.92 0.12 4.16 l-0.12 23.72 c0 1.04 0.92 0.92 2.96 0.92 c1.88 0 2.36 0.44 2.36 -1.8 c0 -1.8 -0.12 -4.08 -0.08 -5.88 c0.04 -1.4 0 -2.76 0 -4.16 c0.04 -0.52 0.16 -0.68 0.64 -0.68 c1.76 -0.04 3.68 0 5.44 0 c0.56 0 0.68 0.08 0.68 0.72 z M53.816 29.68 c-0.12 -4.56 -0.08 -9.4 -0.04 -13.92 c0 -1.4 -0.08 -2.92 -0.08 -4.32 c0 -1.52 -0.6 -1.44 -1.4 -1.48 c-1.16 -0.04 -1.68 -0.04 -2.84 -0.04 c-0.76 -0.04 -1.08 0.16 -1.08 0.92 c0 3.92 -0.12 15 -0.08 16.6 s0.2 8.88 0.12 10.48 c-0.04 0.56 0 1.12 0.04 1.68 c0.04 0.2 0.16 0.4 0.48 0.4 c1.32 -0.08 2.56 -0.08 3.88 -0.12 c0.48 -0.04 0.88 -0.16 1.08 -0.68 c0.04 -0.28 -0.08 -7.6 -0.08 -9.52 z M77.904 10.920000000000002 c0.12 0.56 0.04 27.2 0.04 27.88 c0 1.2 -0.44 1.16 -1.24 1.16 c-1.2 0 -2.88 0.2 -3.24 -0.2 c-0.32 -0.28 -6.24 -14.56 -7.08 -16.36 c-0.08 -0.16 -0.28 -0.56 -0.44 -0.48 c-0.2 0.08 -0.12 0.36 -0.12 0.52 c-0.04 1.4 0.2 13.48 0.2 15.4 c0 0.96 -0.04 1.12 -0.84 1.12 l-2 0 c-0.52 0 -1.16 -0.04 -1.68 0.04 c-0.4 0 -0.6 -0.12 -0.64 -0.52 l0 -3.16 c0.08 -3.36 0 -23.28 0 -24.76 c0 -1.28 0.36 -1.52 1.64 -1.52 c0.88 -0.04 1.76 -0.04 2.64 -0.04 c0.28 0 0.44 0.04 0.6 0.4 c1.08 2.52 5.68 14.08 6.4 15.48 c0.12 0.28 0.56 1.4 0.8 1.52 l0.04 0 c0.16 -0.16 0.12 -0.96 0.12 -1.2 c0 -0.6 -0.32 -14.64 -0.32 -14.92 c0 -0.4 -0.12 -0.76 0.08 -1.04 c0.12 -0.16 0.64 -0.2 0.84 -0.24 c1.12 -0.08 2.44 0.04 3.56 0 c0.56 0 0.52 0.4 0.64 0.92 z M102.872 33.28 c0.04 1.92 0 3.88 -0.12 5.8 c0 0.16 -0.12 0.32 -0.24 0.4 c-0.16 0.12 -0.36 0.2 -0.56 0.2 c-2.48 0.4 -5.48 0.6 -7.88 -0.2 c-5.4 -1.84 -9.08 -7.88 -9.08 -14.8 c0 -7.48 5.36 -14.76 13.16 -15.04 c1.04 -0.04 4.6 -0.2 4.48 1.56 c-0.08 1.28 0.04 2.32 0 3.64 c0 0.24 -0.16 0.4 -0.4 0.36 c-2.28 -0.28 -4.88 -1 -7.08 0.04 c-1.84 0.88 -3.12 2.76 -3.84 4.6 c-1.28 3.04 -1 6.56 -0.12 9.68 c0.68 2.48 2.16 5.4 5.12 5.48 c0.16 0.04 1.68 0.12 1.68 -0.04 l-0.12 -5.12 c-0.04 -0.24 -0.04 -0.48 -0.08 -0.72 s-0.2 -0.32 -0.44 -0.36 c-0.64 0 -0.64 -0.04 -1.28 -0.04 c-1.48 0 -1.16 -1 -1.2 -1.32 c-0.04 -0.6 0 -1.16 -0.04 -1.76 c-0.04 -0.56 0.12 -1 0.68 -1.08 l0.48 0 c2.08 -0.12 4.2 0.04 6.4 0.04 c0.32 0 0.48 0.4 0.48 0.76 c0.04 0.4 0.04 0.68 0.04 1.08 c0.12 1.96 -0.12 3.96 -0.08 5.92 c0.04 0.32 0.04 0.6 0.04 0.92 z M118.08 9.8 c-0.76 0.04 -1.52 0.16 -2.28 0.4 c-1.64 0.56 -3.12 1.68 -4.12 3.12 c-0.88 1.32 -1.24 2.88 -1.36 4.44 c-0.08 1.2 0.04 2.44 0.6 3.52 c0.6 1.16 1.64 2.16 2.52 3.12 c0.8 0.84 1.6 1.68 2.48 2.44 c0.8 0.76 1.72 1.36 2.52 2.16 c1.16 1.16 1.6 3.8 0.76 5.24 c-1 1.6 -3.36 1.84 -4.92 1.32 c-0.8 -0.28 -1.52 -0.88 -2.2 -1.36 c-0.4 -0.28 -0.88 -0.4 -1.16 0.08 c-0.16 0.24 -0.24 0.52 -0.32 0.76 c-0.28 1 -0.64 1.92 -0.68 3 c-0.04 1.24 2.32 1.6 3.2 1.8 c3.92 0.92 8.64 0.2 10.68 -3.68 c0.4 -0.8 0.68 -1.64 0.84 -2.52 c0.04 -0.32 0.08 -0.6 0.08 -0.92 c0.16 -2.56 -0.88 -4.72 -2.44 -6.64 c-1.68 -2.08 -3.8 -3.52 -5.76 -5.32 c-1.2 -1.12 -1.64 -2.88 -1.28 -4.48 c0.36 -1.72 2.32 -2.16 3.8 -1.72 c0.44 0.12 0.8 0.32 1.2 0.56 c0.24 0.12 0.48 0.28 0.8 0.28 c0.56 0.04 0.64 -0.4 0.76 -0.84 c0.28 -1 0.76 -1.8 0.96 -2.76 c0.2 -1.08 -0.68 -1.28 -1.56 -1.56 c-1.04 -0.28 -2.04 -0.48 -3.12 -0.44 z"></path>
        </g>
        <g
          id="SvgjsG4953"
          featurekey="nameFeature-1"
          transform="matrix(0.5405942084933979,0,0,0.5405942084933979,75.92613781783051,40.73744600027056)"
          fill={theme.text}
        >
          <path d="M9.24 27.759999999999998 l0.04 11.68 c0 0.44 0.4 0.6 0.72 0.6 l3.68 0 c0.68 0 0.68 -0.6 0.68 -0.88 c0 -3.76 0 -7.8 0.16 -11.6 c0 -0.64 0.08 -1.24 0.4 -1.84 c0.36 -0.6 5.68 -12.48 6.28 -14.44 c0.08 -0.28 0.24 -0.76 -0.04 -1 c-0.48 -0.44 -2.4 -0.24 -3.56 -0.24 c-0.72 0 -1.16 0.28 -1.48 1 c-1.36 3.16 -2.76 6.28 -4.16 9.44 c-0.12 0.28 -0.28 0.28 -0.48 0 c-0.44 -0.72 -3.28 -7.76 -3.72 -9.32 c-0.08 -0.2 -0.12 -0.4 -0.24 -0.56 c-0.56 -0.64 -1.48 -0.56 -2.24 -0.56 c-1 0 -1.72 0.04 -2.68 0.04 c-0.64 0 -0.68 0.6 -0.56 1.12 c0.04 0.2 0.16 0.4 0.24 0.56 c1.52 2.88 5.8 12.4 6.56 14.2 c0.4 0.84 0.36 0.88 0.4 1.8 z M49.367999999999995 17.36 c0.84 2.48 1.04 5.16 1.04 7.8 c0 2.2 -0.4 4.32 -0.96 6.44 c-0.72 2.52 -1.92 4.8 -4.08 6.28 c-1.6 1.16 -3.28 1.92 -5.24 2.12 c-0.28 0 -0.52 0.04 -0.8 0.04 c-0.24 0 -0.48 -0.04 -0.76 -0.04 c-1.96 -0.2 -3.64 -0.96 -5.28 -2.12 c-2.12 -1.48 -3.36 -3.76 -4.04 -6.28 c-0.6 -2.12 -0.96 -4.24 -0.96 -6.44 c0 -2.64 0.2 -5.32 1.04 -7.8 c1.48 -4.28 5.56 -7.32 10 -7.4 c4.44 0.08 8.52 3.12 10.04 7.4 z M45.488 28.08 c0.4 -2.44 0.24 -4.92 -0.24 -7.36 c-0.48 -2.2 -1.44 -4.36 -3.28 -5.68 c-0.32 -0.24 -0.68 -0.44 -1.04 -0.56 c-0.52 -0.24 -1.08 -0.32 -1.6 -0.32 s-1.04 0.08 -1.56 0.32 c-0.4 0.12 -0.72 0.32 -1.04 0.56 c-1.88 1.32 -2.84 3.48 -3.28 5.68 c-0.48 2.44 -0.64 4.92 -0.24 7.36 c0.4 2.2 1.2 5.16 3.28 6.28 c0.88 0.48 1.84 0.8 2.84 0.84 c1 -0.04 2 -0.36 2.88 -0.84 c2.08 -1.12 2.88 -4.08 3.28 -6.28 z M57.376000000000005 16.56 c0 4.04 0.04 8.12 0.12 12.12 c0.04 2.44 0 5.2 1.16 7.44 c1.48 2.88 4.76 4.16 7.92 3.96 c2.16 -0.16 4.16 -0.72 5.72 -2.32 c2.64 -2.84 2.12 -7.28 2.16 -10.92 c0.08 -5.24 0.2 -10.12 0.2 -15.4 c0 -0.88 -0.28 -1.36 -1.16 -1.4 c-1.08 -0.04 -2.16 0 -3.24 0.08 c-0.44 0 -0.8 0.4 -0.8 0.88 c0.04 3.84 0.12 7.72 0.08 11.6 c-0.04 3.32 0.4 7 -0.84 10.16 c-0.48 1.16 -1.56 2.04 -2.84 2.04 c-3.2 -0.08 -3.08 -3.88 -3.2 -6.12 c-0.24 -4.88 0.12 -9.88 0.24 -14.76 c0 -0.92 0 -1.84 0.04 -2.76 c0.04 -0.48 0.12 -1.08 -0.52 -1.12 l-0.72 0 c-1 0.08 -2 -0.04 -3 0 c-0.96 0.08 -1.28 0.36 -1.28 1.32 c0 1.72 -0.04 3.48 -0.04 5.2 z M83.26400000000001 9.96 c-0.04 0 -0.36 -0.04 -0.68 -0.04 c-0.56 0 -0.84 0.2 -0.92 0.72 c-0.04 0.28 -0.04 0.6 0.04 0.84 c0.32 1.24 6.52 26.88 6.84 28 c0.12 0.48 0.16 0.48 0.64 0.48 l3.24 0 l0.24 0 c0.52 0 0.56 -0.72 0.68 -1.4 c0.8 -4.12 1.8 -8.2 2.76 -12.16 c0.04 -0.24 0.12 -0.48 0.2 -0.68 c0.04 -0.08 0.12 -0.12 0.16 -0.12 c0.08 0 0.16 0.04 0.2 0.12 c0.2 0.48 2.6 11.84 3.08 13.8 c0.08 0.24 0.2 0.44 0.52 0.44 l3.2 0 c0.6 0 1 -0.32 1.12 -0.92 c0.52 -2.64 1.2 -5.6 1.84 -8.2 c0.8 -3.2 1.64 -6.36 2.48 -9.56 c0.64 -2.56 1.32 -5.36 2.12 -7.88 c0.28 -0.84 1.32 -3.36 -0.44 -3.36 c-0.88 0 -1.64 -0.08 -2.52 -0.04 c-0.28 0 -0.56 0 -0.84 0.04 c-0.44 0 -0.76 0.24 -0.92 0.64 c-0.12 0.4 -0.32 0.84 -0.44 1.24 c-0.6 2.56 -1.16 5.48 -1.88 8 c-0.52 1.88 -1.08 3.72 -1.52 5.6 c0 0.04 -0.16 0.64 -0.32 0.64 c-0.28 0 -0.36 -0.44 -0.44 -0.84 c-0.04 -0.16 -2.04 -11.64 -2.32 -13.88 c-0.08 -0.88 -0.36 -1.4 -1.28 -1.44 l-0.48 0 c-1.04 0.08 -1.6 -0.04 -2.64 0.04 c-0.84 0.04 -0.96 0.12 -1.16 0.88 c-0.04 0.16 -0.04 0.36 -0.08 0.56 c-0.32 1.76 -2.4 13.12 -2.68 14.48 c0 0.08 -0.04 0.24 -0.16 0.24 c-0.16 0 -0.2 -0.2 -0.24 -0.28 c-0.04 -0.16 -3.52 -14.84 -3.64 -15.2 c-0.16 -0.48 -0.52 -0.76 -1.08 -0.76 c-0.88 0.04 -1.56 0 -2.68 0 z M122.232 39.68 c0.12 0.04 0.48 0.04 0.84 0.04 c0.8 0 1.04 -2.88 1.12 -3.48 c0.04 -0.48 0.16 -0.52 0.56 -0.6 c2 -0.24 3 -0.08 5 -0.04 c0.44 0 0.68 0.2 0.8 0.56 l0.28 0.92 c0.24 0.68 0.44 1.52 0.68 2.2 c0.16 0.48 0.2 0.44 0.68 0.44 c0.64 0 2.96 0 3.64 -0.04 c0.92 0 0.28 -1.88 0.16 -2.2 c-0.36 -1.12 -0.44 -2.28 -0.8 -3.4 c-0.16 -0.48 -4.72 -22.12 -4.92 -23.32 c-0.28 -0.72 -0.04 -0.76 -0.68 -0.76 c-1.36 0 -2.8 0.08 -4.2 0 c-0.56 0 -0.52 0.16 -0.6 0.76 c-0.08 0.56 -1.52 6.92 -2.08 9.56 c-0.72 3.32 -1.36 6.52 -2.16 9.8 c-0.28 1.16 -2.2 9.52 -1.96 9.56 c0.12 0.08 0.32 0.04 0.48 0.04 c1 0 1.92 0 3.16 -0.04 z M127.47200000000001 30.6 l-0.84 0 c-1.12 0 -1.16 0 -0.88 -1.16 c0.2 -0.88 1.28 -5.64 1.52 -6.8 c0.04 -0.08 0.12 -0.16 0.16 -0.16 c0.08 0 0.16 0.08 0.2 0.12 c0.16 0.48 0.32 1.68 0.48 2.16 c0.36 1.52 0.6 2.8 0.96 4.44 c0.36 1.44 0.2 1.44 -0.52 1.44 c-0.36 0 -0.72 -0.04 -1.08 -0.04 z M148.36 35.64 c0.04 1.24 0.04 2.48 0.08 3.72 c0 0.56 0.04 0.64 0.6 0.64 l3.6 0 c0.76 0 0.6 -1.28 0.56 -1.96 l0.12 -22.4 c0 -0.6 0.2 -0.8 1 -0.8 l3.52 0 c0.84 0 0.64 -1.44 0.64 -2.44 c0 -0.88 0.32 -2.4 -0.64 -2.4 c-0.68 0 -7.2 0 -9.88 0.04 c-1.32 0 -2.4 -0.04 -3.72 -0.04 c-1 0 -0.96 0.8 -0.96 2.56 c0 1.12 -0.04 2.24 0.92 2.24 c0.56 0 2.84 0 3.48 0.04 c0.4 0 0.68 0.12 0.76 0.56 c0 0.12 0.04 0.24 0.04 0.36 c0 2.88 -0.2 16.28 -0.12 19.88 z M181.288 14.719999999999999 c0.04 -1.32 0 -2.4 0 -3.68 c0 -1.48 -2.68 -1.32 -3.64 -1.28 c-4.28 0.28 -8.36 3 -10.32 6.72 c-0.56 1.08 -0.96 2.2 -1.24 3.36 c-0.68 2.72 -0.72 5.6 -0.4 8.36 c0.28 2.6 0.96 5.2 2.56 7.28 c2.76 3.64 7.84 4.92 12.2 4.24 c0.2 -0.04 0.4 -0.08 0.56 -0.2 c0.12 -0.08 0.24 -0.24 0.24 -0.4 l0.12 -2.28 c0.04 -0.72 0 -0.68 0 -1.4 c0 -0.96 -2 -0.24 -3.24 -0.24 c-1.2 0 -2.48 -0.04 -3.56 -0.6 c-1.92 -1.08 -3 -3.24 -3.6 -5.28 c-0.68 -2.2 -0.84 -4.56 -0.44 -6.8 c0.48 -2.92 1.88 -6.28 4.96 -7.28 c1.76 -0.6 3.64 -0.4 5.4 -0.2 c0.24 0.04 0.4 -0.12 0.4 -0.32 z M200.336 28.16 c0 1.8 -0.04 5.36 -0.08 5.36 l0 5.44 c0 0.24 -0.04 0.64 0.08 0.88 c0.12 0.28 0.48 0.2 0.72 0.16 c1.16 -0.12 2.32 0.04 3.48 0 c1.28 -0.04 0.88 -2 0.84 -2.8 c-0.16 -1.76 0.04 -15.16 0.04 -19.96 c0 -2.16 -0.08 -6.6 -0.2 -6.8 c-0.2 -0.36 -0.72 -0.44 -1.12 -0.48 c-0.88 -0.16 -1.32 0.08 -2.64 0.08 s-1.4 0.4 -1.4 1.8 l0 1.2 c-0.04 0.96 0.12 7.68 0.12 8.76 c0 0.52 -0.04 0.56 -0.56 0.56 c-1.32 -0.04 -3.16 0.12 -4.52 0 c-1.96 -0.16 -1.52 0 -1.64 -1.8 l0 -0.24 c0 -2.56 0.32 -9.2 0.2 -9.6 c-0.2 -0.6 -0.44 -0.72 -0.96 -0.68 c-1.2 0.08 -2.44 -0.12 -3.64 -0.04 c-0.4 0.04 -0.52 0.16 -0.64 0.56 c-0.04 0.2 -0.08 0.4 -0.08 0.6 c0 1.24 0.08 2.92 0.12 4.16 l-0.12 23.72 c0 1.04 0.92 0.92 2.96 0.92 c1.88 0 2.36 0.44 2.36 -1.8 c0 -1.8 -0.12 -4.08 -0.08 -5.88 c0.04 -1.4 0 -2.76 0 -4.16 c0.04 -0.52 0.16 -0.68 0.64 -0.68 c1.76 -0.04 3.68 0 5.44 0 c0.56 0 0.68 0.08 0.68 0.72 z"></path>
        </g>
      </svg>
    </Link>
  );
};

export default Brand;
