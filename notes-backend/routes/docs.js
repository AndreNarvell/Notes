const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

/* GET home page. */
router.get("/", (req, res) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log(err);
    }

    let sql = `SELECT * FROM notes`;

    req.app.locals.con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.json(result);
    });
  });
});

router.get("/view/:docId", (req, res) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log(err);
    }

    let docId = req.params.docId;

    let sql = `SELECT * FROM notes WHERE docId ="${docId}"`;

    req.app.locals.con.query(sql, (err, result) => {
      res.json(result[0]);
    });
  });
});

// router.get("/user/:userId", (req, res) => {
//   req.app.locals.con.connect((err) => {
//     if (err) {
//       console.log(err);
//     }

//     let userId = req.params.userId;

//     let sql = `SELECT * FROM notes WHERE userId ="${userId}"`;

//     req.app.locals.con.query(sql, (err, result) => {
//       for (user in result) {
//         if (userId == result[user].userId) {
//           res.json(result);
//         }
//       }
//     });
//   });
// });

router.get("/:userId", function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql =
      "SELECT * FROM notes WHERE userId IN ('" + req.params.userId + "')";

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      res.json(result);
    });
  });
});

router.post("/new", (req) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log(err);
    }
    let sql = `INSERT INTO notes (userId, title, context) VALUES ("${req.body.userId}", "${req.body.title}", "${req.body.context}")`;

    req.app.locals.con.query(sql, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

module.exports = router;
