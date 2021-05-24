import React from 'react';
import { isEmpty } from 'lodash';
import { Form, Input, Button, Typography, Card } from 'antd';
import styles from './PointValues.scss';
import { preStore } from '@stores/PreprocessorStore';
import { observer } from 'mobx-react';
import { postStore } from '@stores/PostprocessorStore';

const { Text } = Typography;

const PointValues = () => {
  const [Nx, setNx] = React.useState<String[]>([]);
  const [Sx, setSx] = React.useState<String[]>([]);
  const [Ux, setUx] = React.useState<String[]>([]);
  const len = preStore.rods.reduce((prev, curr) => prev + curr.L, 0);
  const execute = (x: string) => {
    let summ = preStore.rods[0].L;
    let rodNum = 0;
    for (let i = 1; summ < Number(x); i++) {
      summ += preStore.rods[i].L;
      rodNum++;
    }
    const num = Number(
      (Number(x) - preStore.rods.slice(0, rodNum).reduce((prev, curr) => prev + curr.L, 0)).toFixed(
        3
      )
    );

    if (Number(x) !== len && Number(x) === summ) {
      const N1 = postStore.solvedData.N[rodNum];
      const N2 = postStore.solvedData.N[rodNum + 1];
      const U1 = postStore.solvedData.U[rodNum];
      const S1 = postStore.solvedData.S[rodNum];
      const S2 = postStore.solvedData.S[rodNum + 1];
      setNx([N1(num).toString(), N2(0).toString()]);
      setUx([U1(num).toString()]);
      setSx([S1(num).toString(), S2(0).toString()]);
    } else {
      const N1 = postStore.solvedData.N[rodNum];
      const U1 = postStore.solvedData.U[rodNum];
      const S1 = postStore.solvedData.S[rodNum];
      setNx([N1(num).toString()]);
      setUx([U1(num).toString()]);
      setSx([S1(num).toString()]);
    }
  };
  const onFinish = (data: { x: string }) => {
    execute(data.x);
  };
  return (
    <div className={styles.container}>
      <Card title="Получить значение в точке">
        <Form className={styles.form} initialValues={{ remember: true }} onFinish={onFinish}>
          <div className={styles.inputContainer}>
            <Text strong> Значение X &nbsp;</Text>
            <Form.Item
              className={styles.input}
              name="x"
              rules={[
                { required: true, message: 'Введите числовое значение' },

                {
                  validator: (_, value) => {
                    if (value <= 0) {
                      return Promise.reject('Введите значение больше нуля');
                    } else return Promise.resolve();
                  },
                },
                {
                  validator: (_, value) => {
                    if (isNaN(+value) && !isEmpty(value)) {
                      return Promise.reject('Введите числовое значение');
                    } else return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Вычислить
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.results}>
          <Text strong> N(x) = {Nx.map((val) => val + '; ')}</Text>
          <Text strong> S(x) = {Sx.map((val) => val + '; ')}</Text>
          <Text strong> U(x) = {Ux.map((val) => val + '; ')}</Text>
        </div>
      </Card>
    </div>
  );
};

export default observer(PointValues);
