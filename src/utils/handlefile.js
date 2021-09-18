const path = require('path');
const Multer = require('koa-multer');

const { AVATARPATH, FILEPATH } = require('../contants/filePath');

const AvatarStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATARPATH);
  },
  //文件名根据时间来生成
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const FilesStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILEPATH);
  },
  //文件名根据时间来生成
  filename: (req, file, cb) => {
    console.log(999);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = {
  AvatarStorage,
  FilesStorage,
};
