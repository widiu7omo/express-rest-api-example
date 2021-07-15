const bookResponseMessage = require("../helpers/responseStatus");
let express = require("express");
const {
  createBook,
  readBook,
  readBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

let router = express.Router();

/* GET method
 books listing. */
router.get("/", function (req, res, next) {
  const books = readBook();
  res.status(200).json({ status: "success", data: { books } });
});

/* GET method
 book by id. */
router.get("/:bookId", function (req, res, next) {
  const bookId = req.params.bookId;
  //   if book not found
  const book = readBookById(bookId);
  if (!book) {
    return res
      .status(404)
      .json({ status: "fail", message: bookResponseMessage.failBookNotFound });
  }
  //TODO:get book by id
  res.status(200).json({ status: "success", data: { book } });
});

/*POST method
 create new books */
router.post("/", (req, res, next) => {
  const bodyRequest = req.body;
  if (!bodyRequest.hasOwnProperty("name")) {
    return res.status(400).json({
      status: "fail",
      message: bookResponseMessage.missingNamePropAddBook,
    });
  }
  if (bodyRequest.readPage > bodyRequest.pageCount) {
    return res.status(400).json({
      status: "fail",
      message: bookResponseMessage.errorReadPageCountAddBook,
    });
  }
  try {
    // Save to file
    // emulate fail throw "fail";
    const bookId = createBook(bodyRequest);
    res.status(201).json({
      status: "success",
      message: bookResponseMessage.successAddBook,
      data: { bookId },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: "fail", message: bookResponseMessage.genericErrorBook });
  }
});

/*
PUT method
update existing book by id
 */
router.put("/:bookId", (req, res, next) => {
  const bodyRequest = req.body;
  const bookId = req.params.bookId;
  if (!bodyRequest.hasOwnProperty("name")) {
    return res.status(400).json({
      status: "fail",
      message: bookResponseMessage.missingNamePropUpdateBook,
    });
  }
  if (bodyRequest.readPage > bodyRequest.pageCount) {
    return res.status(400).json({
      status: "fail",
      message: bookResponseMessage.errorReadPageCountUpdateBook,
    });
  }
  if (!updateBook(bodyRequest, bookId)) {
    return res.status(404).json({
      status: "fail",
      message: bookResponseMessage.failUpdateByIdBook,
    });
  }
  res.status(200).json({
    status: "success",
    message: bookResponseMessage.successUpdateBook,
  });
});
/*
DELETE method
delete existing book by id
 */
router.delete("/:bookId", (req, res, next) => {
  const bookId = req.params.bookId;
  if (!deleteBook(bookId)) {
    return res.status(404).json({
      status: "fail",
      message: bookResponseMessage.failDeleteByIdBook,
    });
  }
  res.status(200).json({
    status: "success",
    message: bookResponseMessage.successDeleteBook,
  });
});
module.exports = router;
