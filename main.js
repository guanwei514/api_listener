const http = require("http");
const fs = require("fs");

//Read Setting File
let setting_file = fs.readFileSync("setting.json");
let setting_data = JSON.parse(setting_file);
const IP = setting_data.ip;
const PORT = setting_data.port;

//Response
const SendResponse = (returnData, statusCode, response) => {
  response.writeHead(statusCode, { "Content-Type": "text/plain" });
  response.end(returnData);
};
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  let date_ob = new Date();
  let body = "";
  console.log("----");
  console.log(`Time: ${date_ob}`);
  console.log(`URL: ${url}`);
  console.log(`Method: ${method}`);

  if (method == "POST" || method == "PUT") {
    req.on("data", function (data) {
      body += data;
      console.log("Data: ");
      console.log(body);
    });
  }

  console.log("----");
  SendResponse("ok", 200, res);
});

server.listen(PORT, IP, () => {
  console.log(`listening on http://${IP}:${PORT}`);
});
