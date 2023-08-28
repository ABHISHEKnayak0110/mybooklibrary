const express = require("express");
const router = express.Router();
const {getBook, getBooks, addBooks , updateBook , deleteBook,searchBook} = require("../controllers/bookControllers")

router.route(`/all`).get(getBooks);
router.route(`/search`).get(searchBook);
router.route(`/:id`).get(getBook);
router.route(`/addBook`).post(addBooks);
router.route(`/:id`).put(updateBook);
router.route(`/:id`).delete(deleteBook);


module.exports = router