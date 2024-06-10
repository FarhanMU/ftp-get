const PromiseFtp = require("promise-ftp");
const fs = require("fs");

const ftp = new PromiseFtp();
const config = {
  host: "ftp.jevidrive.com",
  user: "ftpuser",
  password: "1sampai8",
};

ftp
  .connect(config)
  .then(() => {
    return ftp.get("/srv/files/ftp/diagnostics/data.txt"); // Pastikan path ini benar
  })
  .then((stream) => {
    return new Promise((resolve, reject) => {
      stream.once("close", resolve);
      stream.once("error", reject);
      stream.pipe(fs.createWriteStream("data.txt"));
    });
  })
  .then(() => {
    console.log("File downloaded successfully!");
    return ftp.end();
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
