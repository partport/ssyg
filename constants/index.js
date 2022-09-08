export const SONG_TYPE = {
  NORMAL: 'NORMAL',
  LIMITED: 'LIMITED',
  EVENT: 'EVENT',
};

export const CARD_GRADE = {
  R: 'R',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
  NONE: '-',
};

export const THEME_POINT = {
  [CARD_GRADE.R]: 40,
  [CARD_GRADE.S]: 25,
  [CARD_GRADE.A]: 15,
  [CARD_GRADE.B]: 8,
  [CARD_GRADE.C]: 3,
  [CARD_GRADE.NONE]: 0,
};
