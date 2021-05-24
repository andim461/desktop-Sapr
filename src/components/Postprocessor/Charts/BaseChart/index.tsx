import { flatten, initial } from 'lodash';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';

import CustomTooltip from './Tooltip';

interface Props {
  data: Array<Array<$Point>>;
  type: 'N' | 'U' | 'S';
  referenceLines: Array<number>;
}

const Chart = ({ data, type, referenceLines }: Props) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={flatten(data)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
        <YAxis label={{ value: `Эпюра ${type}(x)`, angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip type={type} />} />
        <Area dataKey="y" stroke="#40a9ff" fill="#69c0ff" />
        {initial(referenceLines).map((x) => (
          <ReferenceLine x={x} stroke={'#333'} strokeDasharray="4 4" />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
