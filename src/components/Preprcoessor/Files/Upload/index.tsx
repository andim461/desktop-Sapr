import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from 'antd/lib/upload/Dragger';
import { readFileToJSON } from '../lib';
import { preStore } from '@stores/PreprocessorStore';

const { Dragger } = Upload;

interface Props {
  close: () => void;
}

const FileUpload = ({ close }: Props) => {
  const config = {
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: $File) => {
      try {
        const jsonFile = readFileToJSON(file);
        preStore.uploadFile(jsonFile);
        message.success(`Файл ${file.name} успешно загружен`);
        close();
      } catch (err) {
        message.error('Ошибка загрузки файла');
      }
      return false;
    },
  };
  return (
    <Dragger {...(config as DraggerProps)}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Нажмите или перетащите файл в область для загрузки</p>
    </Dragger>
  );
};

export default FileUpload;
