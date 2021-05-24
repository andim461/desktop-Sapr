import { range } from 'lodash';

export const calulateRodWidth = (rod: $Rod, zoomRate: number) => {
  return (rod.L * 100) / zoomRate;
};

export const mapNodes = (rods: Array<$Rod>, zoomRate: number, supportWidth = 50) => {
  let acc = supportWidth;
  if (!rods.length) return [];
  const nodes = range(1, rods.length + 1).map((index) => {
    acc = acc + calulateRodWidth(rods[index - 1], zoomRate);
    const node = { index: index + 1, offset: acc };
    return node;
  });
  return [{ index: 1, offset: 50 }, ...nodes];
};
