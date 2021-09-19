const path = require('path');

const Multer = require('koa-multer');
const Jimp = require('jimp');

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
const uploadFile = Multer({
  storage,
});

//上传文件最大为9
const FileHandle = uploadFile.array('file', 9);
//生成不同的尺寸的图片
const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  try {
    for (let file of files) {
      const dest = path.join(file.destination, file.filename);
      //重写不同尺寸的图片大小
      Jimp.read(file.path).then((image) => {
        image
          .resize(1280, Jimp.AUTO)
          .write(`${dest.slice(0, 26) + '-large' + dest.slice(26)}`);
        image
          .resize(640, Jimp.AUTO)
          .write(`${dest.slice(0, 26) + '-middle' + dest.slice(26)}`);
        image
          .resize(320, Jimp.AUTO)
          .write(`${dest.slice(0, 26) + '-small' + dest.slice(26)}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
  await next();
};
module.exports = {
  FileHandle,
  pictureResize,
};
