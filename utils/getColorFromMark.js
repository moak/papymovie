const getColorFromMark = (mark) => {
  if (mark >= 7) {
    return 'green';
  }
  if (mark > 5) {
    return 'orange';
  }
  return 'red';
};

export default getColorFromMark;
