const express = require("express");
const { Client } = require("basic-ftp");
const fs = require("fs");
const app = express();
const port = 3003;

app.get("/download", async (req, res) => {
  const client = new Client();
  client.ftp.verbose = true; // Aktifkan mode verbose untuk melihat log detail

  try {
    await client.access({
      host: "milan.id.domainesia.com",
      user: "stikerid",
      password: "I1Mlj0;k71RKv;",
      secure: false, // Gunakan `true` untuk koneksi FTPS (FTP Secure)
    });
    const server_file = "testupload.eunoiaid.com/testUpload/data.txt";
    const local_file = "./download/data.txt"; // File akan disimpan di folder lokal proyek
    await client.download(fs.createWriteStream(local_file), server_file);
    res.send("File successfully downloaded!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to download file.");
  }

  client.close();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
