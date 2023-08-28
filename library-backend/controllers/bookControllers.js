const asyncHandler = require('express-async-handler');
 const booksModels = require("../models/booksModels");

//@desc Get all books
//@route GET /api/book
//@Acess public
const getBooks =  asyncHandler(async(req, res) => {
    const books = await booksModels.find()
  res.status(200).json({books});
});

//@desc Add a New book
//@route POST /api/book
//@Acess public
const addBooks = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {title ,author,description, genre } = req.body
    console.log(title, author , "hhh")
    if(!title || !author){
        res.status(400)
        throw new Error("All fileds are mandatory")
    }
    /** for checking book with same title and author**/
    const existingBook = await booksModels.findOne({
        title: title,
        author: author,
      });
  
      if (existingBook) {
        return res.status(400).json({ error: 'Book already exists with same title and author name.' });
      }
    const book = await booksModels.create({
        ...req.body,
    })
  res.status(201).json({ message: `Book added successfully !` });
});

//@desc Get a book
//@route GET /api/book
//@Acess public
const getBook = asyncHandler(async (req, res) => {
    const book = await booksModels.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Record not found") 
    }
  res.status(200).json(book);
});

//@desc Update a book
//@route PUT /api/book
//@Acess public
const updateBook = asyncHandler(async(req, res) => {
    const book = await booksModels.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Record not found") 
    }
   
    const updatedData = await booksModels.findByIdAndUpdate(req.params.id , req.body , {new : true})
  res.status(200).json({
    message : "Updated successfully !",
    data : updatedData
  });
});

//@desc delete a book
//@route DELETE /api/book
//@Acess public
const deleteBook =asyncHandler(async (req, res) => {
   const book = await booksModels.findById(req.params.id)
    if(!book){
        res.status(404)
        throw new Error("Record not found") 
    }
  
    const deletedData = await booksModels.findByIdAndDelete(req.params.id)
  res.status(200).json({
    message : "Book deleted successfully !"});
});

//@desc search a book
//@route GET /api/book/search
//@Acess public
const searchBook = asyncHandler(async (req, res) => {
     const {name}  = req.query
     console.log("hey" , name, req.query)
     let book 
     if(name){
     book = await booksModels.find({
        $or: [
          { title: { $regex: name, $options: 'i' } }, 
          {  genre : { $regex: name, $options: 'i' } },
          { author: { $regex: name, $options: 'i' } }, 
        ],
      });
    }else{
        book= await booksModels.find()
    }
  res.status(200).json(book);
});

module.exports = {
    getBooks,
    addBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBook
};
