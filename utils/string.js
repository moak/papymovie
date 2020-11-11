export const truncate = (input, maxLength) =>
  input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
