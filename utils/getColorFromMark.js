const getColorFromMark = (mark) => {
  if (mark >= 7) {
    return '#21ba45';
  }
  if (mark > 5) {
    return '#f2711c';
  }
  return '#db2828';
};

export default getColorFromMark;
