import React from 'react';
import { Form, InputNumber } from 'antd';
import { preStore } from '@stores/PreprocessorStore';

interface Props {
  children: React.ReactElement;
  editing: boolean;
  dataIndex: string;
  title: string;
  index: number;
  node: $Node;
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  index,
  children,
  node,
  ...restProps
}: Props) => {
  const isInputRowIndexColumn = dataIndex === 'index' && node.index === '';
  return (
    <td {...restProps}>
      {editing && !isInputRowIndexColumn ? (
        <Form.Item
          style={{ marginBottom: 0 }}
          name={dataIndex}
          rules={[
            {
              type: 'number',
              message: 'Введите числовое значение',
              whitespace: false,
            },
            { required: true, message: 'Обязательное поле' },
            {
              validator: (_, value) => {
                if (value > preStore.maxRodIndex + 1 && dataIndex === 'nodeIndex') {
                  return Promise.reject('Такого узла не сущетсвует');
                } else return Promise.resolve();
              },
            },
            {
              validator: (_, value) => {
                if (value <= 0 && dataIndex === 'nodeIndex') {
                  return Promise.reject('Такого узла не сущетсвует');
                } else return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
