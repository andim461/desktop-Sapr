import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface Props {
  collapsed: boolean;
}

const Trigger = ({ collapsed }: Props) => (collapsed ? <LeftOutlined /> : <RightOutlined />);

export default Trigger;
