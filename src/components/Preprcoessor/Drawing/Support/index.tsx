import { range } from 'lodash';
import React from 'react';
import { Line } from 'react-konva';
import { CANVAS_HEIGHT } from '..';
import { mapNodes } from '../lib';

interface Props {
  rods: Array<$Rod>;
  support: 'right' | 'left' | 'both';
  zoomRate: number;
}

const getSupport = (supportHeight: number, offset: number, reverse = false) => {
  const support = range(supportHeight / 10).map((i) => {
    return (
      <Line
        points={[
          reverse ? offset + 20 : offset - 20,
          i * 10 + CANVAS_HEIGHT / 2 - supportHeight / 2,
          offset,
          i * 10 + 10 + CANVAS_HEIGHT / 2 - supportHeight / 2,
        ]}
        stroke={'black'}
        s
      />
    );
  });
  return support;
};

const Support = ({ rods, support, zoomRate }: Props) => {
  if (!rods.length) return null;
  const nodesMap = mapNodes(rods, zoomRate);
  const leftSupportHeight = rods[0].A * 100;
  const rightSupportHeight = rods[rods.length - 1].A * 100;
  const leftSupport = getSupport(leftSupportHeight, 50);
  const rightSupport = getSupport(rightSupportHeight, nodesMap[nodesMap.length - 1].offset, true);
  const supports = {
    right: rightSupport,
    left: leftSupport,
    both: [leftSupport, rightSupport],
  };
  return <>{supports[support]}</>;
};

export default Support;
