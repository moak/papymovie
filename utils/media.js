import { css } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
  phone_small: 374,
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  // const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export default media;
