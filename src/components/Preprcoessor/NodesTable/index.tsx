import React, { useState, useCallback, useRef } from 'react';
import { Table as BaseTable, Typography, Form, Popconfirm, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, StopOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { preStore } from '@stores/PreprocessorStore';
import Cell from './Cell';
import { sortBy } from 'lodash';
import styles from './Table.scss';

const RNDContext = createDndContext(HTML5Backend);

const Table = () => {
  const isEditing = (record: $Node) => record.index === editingKey;
  const [form] = Form.useForm();
  const save = async (node: $Node) => {
    const formData = (await form.validateFields()) as $Node;
    const newNode = { ...formData, index: node.index || uuidv4() };
    preStore.addNode(newNode);
    setEditingKey('');
    form.setFieldsValue({ nodeIndex: '', index: '', n: '' });
  };
  const onDelete = (node: $Node) => {
    preStore.deleteNode(node.index);
  };
  const columns = [
    {
      width: 100,
      className: styles.header,
      fixed: 'left' as 'left',
      title: 'Номер узла',
      dataIndex: 'nodeIndex',
      editable: true,
    },
    {
      editable: true,
      width: 100,
      title: 'Нагрузка (Н)',
      dataIndex: 'n',
    },

    {
      title: 'Действия',
      editable: false,
      fixed: 'right' as 'right',
      width: 270,
      dataIndex: '',
      render: (_: unknown, node: $Node) => {
        const editable = isEditing(node);
        return editable || node.index === '' ? (
          <span className={styles.btnContainer}>
            <Button
              type="primary"
              icon={<PlusSquareOutlined />}
              onClick={() => save(node)}
              style={{ width: 156 }}
            >
              {node.index === '' ? 'Добавить' : 'Сохранить'}
            </Button>
            {node.index !== '' && (
              <Popconfirm title="Точно отменить?" onConfirm={cancel}>
                <Button danger icon={<StopOutlined />}>
                  Отмена
                </Button>
              </Popconfirm>
            )}
          </span>
        ) : (
          <span className={styles.btnContainer}>
            <Button icon={<EditOutlined />} onClick={() => edit(node)}>
              Редактировать
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(node)}>
              Удалить
            </Button>
          </span>
        );
      },
    },
  ];

  const [editingKey, setEditingKey] = useState<string | number>('');
  const edit = (record: $Node) => {
    setEditingKey(record.index);
    form.setFieldsValue(record);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const manager = useRef(RNDContext);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (node: $Node) => ({
        node,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(node),
      }),
    };
  });

  const mergeData = [...sortBy(preStore.nodes, 'nodeIndex'), { nodeIndex: '', index: '', n: '' }];
  return (
    <div className={styles.tableContainer}>
      <Form form={form} component={false}>
        <DndProvider manager={manager.current.dragDropManager!}>
          <BaseTable
            className={styles.table}
            scroll={{ x: 350 }}
            title={() => <Typography.Title level={4}>Нагрузки в узлах</Typography.Title>}
            columns={mergedColumns}
            dataSource={mergeData as Array<$Node>}
            pagination={false}
            components={{
              body: {
                cell: Cell,
              },
            }}
            bordered
          />
        </DndProvider>
      </Form>
    </div>
  );
};
export default observer(Table);
