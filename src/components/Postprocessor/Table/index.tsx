import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { isNumber } from 'lodash';
import { Button, Card, InputNumber, Select, Slider, Table, Typography } from 'antd';

import { postStore } from '@stores/PostprocessorStore';
import { preStore } from '@stores/PreprocessorStore';
import styles from './Table.scss';

const { Option } = Select;
const { Text } = Typography;

const PointValuesTable = () => {
  const solution = postStore.solvedData;
  const rodsIndex = preStore.rods.map((val) => val.index);
  const [rod, setRod] = useState<number>(1);
  const [data, setData] = useState<Array<$TableData>>([]);
  const len = preStore.rods[rod - 1].L;
  const [step, setStep] = useState<number>(len / 3);

  function handleChange(value: number) {
    setRod(value);
  }

  const execute = () => {
    const Nx = solution?.N[rod - 1];
    const Ux = solution?.U[rod - 1];
    const Sx = solution?.S[rod - 1];
    if (Nx && Ux && Sx) {
      const dataTemp: Array<$TableData> = [];

      for (let i = 0; i <= len; i += step) {
        i = Number(i.toFixed(10));
        const Si = Sx(i);
        const isRed = preStore.rods[rod - 1].S < Si || -preStore.rods[rod - 1].S > Si;
        dataTemp.push({ x: i, Nx: Nx(i), Ux: Ux(i), Sx: Si, isRed });
      }
      setData(dataTemp);
    }
  };
  const onChange = (value?: number | string) => {
    if (!isNumber(value)) {
      return;
    }
    setStep(value);
  };

  const columns = [
    {
      title: 'X',
      dataIndex: 'x',
    },
    {
      title: 'N(x)',
      dataIndex: 'Nx',
    },
    {
      title: 'U(x)',
      dataIndex: 'Ux',
    },
    {
      title: 'S(x)',
      dataIndex: 'Sx',
      render: (value: string, { isRed }: $TableData) => (
        <tr className={isRed ? styles.red : ''}>{value}</tr>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card title="Вычислить значения по шагу">
        <div className={styles.selectors}>
          <div>
            <Text strong>Cтержень &nbsp;</Text>
            <Select defaultValue={1} style={{ width: 70 }} onChange={handleChange}>
              {rodsIndex.map((index) => (
                <Option key={index} value={index}>
                  {index}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.step}>
            <Text strong>Шаг &nbsp;</Text>
            <Slider
              className={styles.slider}
              min={0.001}
              defaultValue={0.2}
              max={len}
              onChange={onChange}
              value={typeof step === 'number' ? step : 0}
              step={0.01}
            />
            <InputNumber
              min={0.001}
              max={len}
              style={{ margin: '0 16px' }}
              step={0.01}
              value={step}
              onChange={onChange}
            />
          </div>
        </div>
        <Button type="primary" onClick={execute} className={styles.button}>
          Вычислить
        </Button>
        <Table dataSource={data} columns={columns} locale={{ emptyText: 'Нет данных' }} />
      </Card>
    </div>
  );
};

export default observer(PointValuesTable);
