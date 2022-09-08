import { THEME_POINT } from 'constants';

export const convertGradeToPoint = (cards) => {
  return cards.map((card) => {
    return THEME_POINT[card.toUpperCase().slice(0, 1)];
  });
};

export const convertGradeLvToPoint = (cards) => {
  return cards.map((card) => {
    const lv = card.slice(1, cards.length);
    return parseInt(lv) || 0;
  });
};

export const themePointCalculate = (cards) => {
  return Math.min(...convertGradeToPoint(cards));
};

export const currentThemePoint = (theme) => {
  return theme
    .map(({ card }) => themePointCalculate(card))
    .reduce((prev, curr) => prev + curr, 0);
};

export const totalThemePoint = (quantity) => {
  return quantity * THEME_POINT.R;
};

export const findIndexMaxLvThemeInGroup = (theme) => {
  const gradeList = theme.map(
    ({ card, length }) =>
      themePointCalculate(card) +
      convertGradeLvToPoint(card).reduce((a, b) => a + b, 0) / length
  );
  const posOfMax = [...gradeList.keys()].filter((i) => gradeList[i] === max);
  return { theme: theme[posOfMax[0]], point: max };
};
