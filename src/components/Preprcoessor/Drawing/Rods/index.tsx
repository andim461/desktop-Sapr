import React from 'react';
import { Rect } from 'react-konva';
import { CANVAS_HEIGHT } from '..';

interface Props {
  zoomRate: number;
  rods: Array<$Rod>;
}

const Rods = ({ rods, zoomRate }: Props) => {
  let acc = 50;
  return (
    <>
      {rods.map((rod) => {
        const width = (rod.L * 100) / zoomRate;
        const rect = (
          <Rect
            stroke="black"
            x={acc}
            width={width}
            height={rod.A * 100}
            y={CANVAS_HEIGHT / 2 - (rod.A * 100) / 2}
          />
        );
        acc += width;
        return rect;
      })}
    </>
  );
};

export default Rods;
