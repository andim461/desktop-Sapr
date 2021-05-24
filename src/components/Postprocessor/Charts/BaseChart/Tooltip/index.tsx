import React from 'react';
import { get } from 'lodash';

import Wrapper from './TooltipWrapper';
import { Typography } from 'antd';

interface Props {
  payload?: Array<{ payload: { value: string | number } }>;
  type: 'N' | 'U' | 'S';
}

const CustomTooltip = ({ payload, type }: Props): React.ReactElement => {
  const x = get(payload, '[0].payload.x');
  const y = get(payload, '[0].payload.y');
  return (
    <Wrapper>
      <>
        <Typography>x: &nbsp;{x} </Typography>
        <Typography>
          {type}(x): &nbsp;{(y || 0).toFixed(5)}
        </Typography>{' '}
      </>
    </Wrapper>
  );
};

export default CustomTooltip;
