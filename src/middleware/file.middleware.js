const Multer = require('koa-multer');

const path = require('path');

const { FILEPATH } = require('../contants/filePath');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILEPATH);
  },
  //文件名根据时间来生成
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
console.log(storage.filename);
const uploadFile = Multer({
  storage,
});

//上传文件最大为9
const FileHandle = uploadFile.array('file', 9);

const fileResize = async (ctx, next) => {
  await next();
};
module.exports = {
  FileHandle,
};
