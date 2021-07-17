export const makeHHMM = (
  hour?: number | string,
  minute?: number | string,
): string => {
  return `${parseInt(`${hour}`) < 10 ? '0' : ''}${hour}:${
    parseInt(`${minute}`) < 10 ? '0' : ''
  }${minute}`;
};

export const getWeekday = (date: Date) => {
  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  return weekdays[date.getDay()];
};

export const getKoreanHHMM = (time: string) => {
  return `${time.split(':')[0]}시간 ${time.split(':')[1]}분`;
};

export const getKoreanDate = (time: string) => {
  const parsedDate = new Date(time);
  return `${parsedDate.getFullYear()}년 ${
    parsedDate.getMonth() + 1
  }월 ${parsedDate.getDate()}일 (${getWeekday(parsedDate)})`;
};

export const parseTimetoInt = (time: string) => {
  let result = parseInt(time.split(':')[0]);
  result += parseInt(time.split(':')[1]) / 60;
  return result;
};
