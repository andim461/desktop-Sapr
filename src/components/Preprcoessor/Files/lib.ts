import fs from 'fs';

const UPLOAD_DIR = './files/';

export const readFileToJSON = (file: $File) => {
  const path = file.path;
  if (path) {
    const buf = fs.readFileSync(path);
    const data = JSON.parse(buf.toString());
    return data;
  }
};

export const saveFile = (data: $PreStore, fileName: string) => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }
  fs.writeFileSync(`./${UPLOAD_DIR}/${fileName}.sapr`, JSON.stringify(data));
};
