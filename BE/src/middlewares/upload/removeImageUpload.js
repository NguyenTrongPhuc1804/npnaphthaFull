const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../../../public");

const removeImage = async (linkImage) => {
  if (!linkImage || typeof linkImage !== "string") return;
  // Khớp mọi domain (localhost hoặc domain production): .../api/v1/public/...
  // Chuẩn hoá dấu \ (Windows) thành /
  const normalized = linkImage.replace(/\\/g, "/");
  const regex = /\/api\/v1\/(public\/.*)$/;
  const match = normalized.match(regex);
  // Hoặc đường dẫn tương đối dạng public/image/a.jpg
  const relative = match ? match[1] : normalized.replace(/^\/+/, "");
  if (!relative.startsWith("public/")) return;

  const filePath = path.join(__dirname, "../../../", relative);
  // chặn xoá file ngoài thư mục public
  if (!filePath.startsWith(publicDir + path.sep)) return;

  fs.unlink(filePath, (err) => {
    if (err) {
      return console.error("Lỗi khi xóa tập tin:", err);
    }
    return console.log("Đã xóa tập tin thành công:", filePath);
  });
};

module.exports = removeImage;
