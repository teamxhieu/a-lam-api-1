var express = require("express");
const fs = require("fs");
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(8080);

app.get("/", function (req, res) {
  res.render("index", { title: "Cài đặt Api" });
});
app.post("/edit_api", function (req, res) {
  var status = req.body.status;
  var msg = req.body.msg;
  var link = req.body.link;
  if (status == "") {
    res.send({ status: "error", msg: "Vui lòng chọn trạng thái hoạt đông" });
  } else if (msg == "") {
    res.send({ status: "error", msg: "Vui lòng nhập nội dung thông báo" });
  } else if (link == "") {
    res.send({ status: "error", msg: "Vui lòng nhập link chuyển hướng" });
  } else {
    fs.writeFile("./public/json/api.json", JSON.stringify(req.body), function (
      err
    ) {});
    res.send({ status: "success", msg: "Cập nhật thành công" });
  }
});
app.get("/Noti", function (req, res) {
  fs.readFile("./public/json/api.json", function (err, data) {
    res.json(JSON.parse(data.toString()));
  });
});
