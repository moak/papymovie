const getHourMinutesFromMinutes = (data) => {
  let minutes = data % 60;

  let hours = (data - minutes) / 60;

  return hours + 'h' + minutes;
};

export default getHourMinutesFromMinutes;
