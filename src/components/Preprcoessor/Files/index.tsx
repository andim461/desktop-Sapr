import React, { useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import styles from './Files.scss';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';
import FileUpload from './Upload';
import Download from './Download';

const Files = () => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <>
      <Space className={styles.files}>
        <Button type="primary" onClick={show} icon={<UploadOutlined />}>
          Загрузить
        </Button>
        <Download />
      </Space>
      <Drawer
        title="Загрузить файл"
        placement={'top'}
        closable={false}
        onClose={close}
        visible={visible}
        key={'top'}
      >
        <FileUpload close={close} />
      </Drawer>
    </>
  );
};

export default Files;
