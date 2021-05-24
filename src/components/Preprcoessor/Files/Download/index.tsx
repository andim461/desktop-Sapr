import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

import { preStore } from '@stores/PreprocessorStore';
import { saveFile } from '../lib';

const Download = () => {
  const [visible, setVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const show = () => setVisible(true);
  const close = () => setVisible(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleDownload = () => {
    try {
      const data = preStore.getData();
      saveFile(data, fileName);
      message.success(`Файл ${fileName} успешно сохранен`);
    } catch (e) {
      message.error('Ошибка при сохранении файла');
    } finally {
      close();
    }
  };

  return (
    <>
      <Button type="primary" onClick={show} icon={<DownloadOutlined />}>
        Скачать
      </Button>
      <Modal
        title="Скачать файл"
        visible={visible}
        onCancel={close}
        footer={[
          <Button key="back" onClick={close}>
            Отменить
          </Button>,
          <Button key="submit" type="primary" onClick={handleDownload}>
            Скачать
          </Button>,
        ]}
      >
        <p>Введите имя файла</p>
        <Input prefix={<FileTextOutlined />} onChange={onChange} />
      </Modal>
    </>
  );
};

export default Download;
