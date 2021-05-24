import { observer } from 'mobx-react';
import React from 'react';
import { range } from 'lodash';

import { preStore } from '@stores/PreprocessorStore';
import { postStore } from '@stores/PostprocessorStore';
import BaseChart from '@components/Postprocessor/Charts/BaseChart';

import styles from './Chart.scss';

interface Props {
  type: 'N' | 'U' | 'S';
}

const Chart = ({ type }: Props) => {
  const rodsLength = preStore.rods.map((val) => val.L);
  const solvedData = postStore.solvedData;
  const rodsX: Array<number> = [];
  let sumLen = 0;
  const data: Array<Array<$Point>> = [];
  if (solvedData[type][preStore.rods.length - 1])
    rodsLength.forEach((val, index) => {
      const pointsRange = type === 'U' ? range(0, val + 0.1, 0.1) : range(0, val + 1);
      const points: Array<$Point> = [];
      for (let i of pointsRange) {
        const point = {
          x: i + sumLen,
          y: solvedData[type][index](i),
        };
        points.push(point);
      }
      data.push(points);
      sumLen += val;
      rodsX.push(sumLen);
    });
  if (rodsX.length > 0)
    return (
      <div className={styles.container}>
        <BaseChart data={data} type={type} referenceLines={rodsX} />
      </div>
    );
  else return null;
};

export default observer(Chart);
