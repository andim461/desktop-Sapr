import { flatten, range } from 'lodash';
import React from 'react';
import { Arrow } from 'react-konva';
import { CANVAS_HEIGHT } from '..';

interface Props {
  rods: Array<$Rod>;
  zoomRate: number;
}

const Arrows = ({ rods, zoomRate }: Props) => {
  let arrowAcc = 50;
  return (
    <>
      {flatten(
        rods.map((rod) => {
          const arrowWidth = 20;
          const rodWidth = (rod.L * 100) / zoomRate;
          const arrowsCount = Math.floor(rodWidth / arrowWidth);
          if (!rod.q) {
            arrowAcc += rodWidth;
            return;
          }

          const arrows = range(arrowsCount).map((i) => {
            const arrow = (
              <Arrow
                key={`${rod.index}:${i}`}
                strokeWidth={2}
                stroke="red"
                fill="red"
                points={[
                  rod.q > 0 ? arrowAcc + i * arrowWidth : (i + 1) * arrowWidth + arrowAcc - 5,
                  CANVAS_HEIGHT / 2,
                  rod.q > 0 ? (i + 1) * arrowWidth + arrowAcc - 5 : arrowAcc + i * arrowWidth,
                  CANVAS_HEIGHT / 2,
                ]}
              />
            );

            return arrow;
          });
          arrowAcc += rodWidth;
          return arrows;
        })
      )}
    </>
  );
};

export default Arrows;
