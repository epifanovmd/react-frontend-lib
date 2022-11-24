export const toDivide = (num: number) => {
  const int = String(Math.trunc(num));

  if (int.length <= 3) {
    return int;
  }
  let space = 0;
  let number = "";

  // eslint-disable-next-line no-plusplus
  for (let i = int.length - 1; i >= 0; i--) {
    if (space == 3) {
      number = ` ${number}`;
      space = 0;
    }
    number = int.charAt(i) + number;
    space += 1;
  }

  return number;
};
