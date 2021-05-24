import React, { useState, useCallback, useRef } from 'react';
import { Table as BaseTable, Typography, Form, Popconfirm, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, StopOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { preStore } from '@stores/PreprocessorStore';
import DragableBodyRow from './TableRow';
import Header from './Header';
import Cell from './Cell';
import styles from './Table.scss';
import { sortBy } from 'lodash';

const RNDContext = createDndContext(HTML5Backend);

const Table = () => {
  const isEditing = (record: $Rod) => record.index === editingKey;
  const [form] = Form.useForm();
  const save = async (rod: $Rod) => {
    const formData = (await form.validateFields()) as $Rod;
    const newRod = { ...formData, index: rod.index || preStore.rods.length + 1 };
    preStore.addRod(newRod);
    setEditingKey(0);
    form.setFieldsValue({ index: 0, L: '', A: '', E: '', S: '', q: '' });
  };
  const onDelete = (rod: $Rod) => {
    preStore.deleteRod(rod);
  };
  const columns = [
    {
      width: 100,
      className: styles.header,
      fixed: 'left' as 'left',
      title: 'Номер стержня',
      dataIndex: 'index',
      render: (val: number) => <>{val !== 0 && val}</>,
    },
    {
      editable: true,
      width: 100,
      title: 'Длина (м)',
      dataIndex: 'L',
    },
    {
      editable: true,
      width: 100,
      title: 'Площадь сечения (см^2)',
      dataIndex: 'A',
    },
    {
      editable: true,
      width: 100,
      title: 'Модуль упругости (Па)',
      dataIndex: 'E',
    },
    {
      editable: true,
      width: 100,
      title: 'Допускаемое напряжение (МПа)',
      dataIndex: 'S',
    },
    {
      editable: true,
      width: 100,
      title: 'Распределенные нагрузки (Н/м)',
      dataIndex: 'q',
    },

    {
      title: 'Действия',
      editable: false,
      fixed: 'right' as 'right',
      width: 220,
      dataIndex: '',
      render: (_: unknown, rod: $Rod) => {
        const editable = isEditing(rod);
        return editable || rod.index === 0 ? (
          <span className={styles.btnContainer}>
            <Button
              type="primary"
              icon={<PlusSquareOutlined />}
              onClick={() => save(rod)}
              style={{ width: 156 }}
            >
              {rod.index === 0 ? 'Добавить' : 'Сохранить'}
            </Button>
            {rod.index !== 0 && (
              <Popconfirm title="Точно отменить?" onConfirm={cancel}>
                <Button danger icon={<StopOutlined />}>
                  Отмена
                </Button>
              </Popconfirm>
            )}
          </span>
        ) : (
          <span className={styles.btnContainer}>
            <Button icon={<EditOutlined />} onClick={() => edit(rod)}>
              Редактировать
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(rod)}>
              Удалить
            </Button>
          </span>
        );
      },
    },
  ];

  const moveRow = useCallback((dragIndex, hoverIndex) => {
    setEditingKey(0);
    preStore.swapRods(dragIndex + 1, hoverIndex + 1);
  }, []);

  const [editingKey, setEditingKey] = useState<string | number>(0);
  const edit = (record: $Rod) => {
    setEditingKey(record.index);
    form.setFieldsValue(record);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const manager = useRef(RNDContext);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (rod: $Rod) => ({
        rod,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(rod),
      }),
    };
  });

  const mergeData = [
    ...sortBy(preStore.rods, 'index'),
    { index: 0, L: '', A: '', E: '', S: '', q: '' },
  ];
  return (
    <div className={styles.tableContainer}>
      <Form form={form} component={false}>
        <DndProvider manager={manager.current.dragDropManager!}>
          <BaseTable
            className={styles.table}
            scroll={{ x: 1150 }}
            title={() => <Header />}
            columns={mergedColumns}
            dataSource={mergeData as Array<$Rod>}
            pagination={false}
            components={{
              body: {
                cell: Cell,
                row: DragableBodyRow,
              },
            }}
            onRow={(_, index) =>
              (({
                index,
                moveRow,
              } as unknown) as any)
            }
            bordered
          />
        </DndProvider>
      </Form>
    </div>
  );
};
export default observer(Table);
