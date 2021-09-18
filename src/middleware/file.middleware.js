const Multer = require('koa-multer');
const path = require('path');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/avatar');
  },
  //文件名根据时间来生成
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAvatar = Multer({
  storage,
});
//处理上传的图片
const AvatarHndle = uploadAvatar.single('avatar');
module.exports = {
  AvatarHndle,
};
