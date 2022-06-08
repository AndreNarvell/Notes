const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let sql = `SELECT * FROM users`;

  req.app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.json(result);
    console.log(result);
  });
});

router.post("/", function (req, res) {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT userId FROM users WHERE userName = "${req.body.userName}" AND userPass = "${req.body.userPass}"`;

    req.app.locals.con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send(result);
    });
  });
});

module.exports = router;
