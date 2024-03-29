const fs = require("fs");
const path = require("path");
const removeImage = async (linkImage) => {
  //   const { id } = req.params;
  //   const product = await Product.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  const regex = /http:\/\/localhost:3000\/(.*)/;
  const match = linkImage.match(regex);
  console.log(match, "match");
  const filePath = path.join(__dirname, `../../../${match[1]}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Lỗi khi xóa tập tin:", err);
      throw new Error(err);
    }
    return console.log("Đã xóa tập tin thành công:", filePath);
  });
};

module.exports = removeImage;
