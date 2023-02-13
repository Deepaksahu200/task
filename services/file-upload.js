const uuid = require("uuid").v4;
const { uploadS3 } = require("./S3-fileUpload");

const uploadFile = async (file, extensions) => {
  const fileExtension = path.extname(file.name);

  if (extensions.includes(fileExtension.toLowerCase())) {
    const fileName = uuid() + fileExtension;
    const fileBuffer = file.data;
    const link = await uploadS3(fileBuffer, fileName);
    return link.Location;
  } else {
    return false;
  }
};

module.exports = { uploadFile };
