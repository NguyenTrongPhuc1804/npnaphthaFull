const fs = require("fs");
const path = require("path");
const removeImage = async (linkImage) => {
  //   const { id } = req.params;
  //   const product = await Product.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  const regex = /http:\/\/localhost:3000\/api\/v1\/(.*)/;
  const match = linkImage.match(regex);
  const filePath = match && path.join(__dirname, `../../../${match[1]}`);
  filePath &&
    fs.unlink(filePath, (err) => {
      if (err) {
        return console.error("Lỗi khi xóa tập tin:", err);
        // throw new Error(err);
      }
      return console.log("Đã xóa tập tin thành công:", filePath);
    });
};

module.exports = removeImage;
