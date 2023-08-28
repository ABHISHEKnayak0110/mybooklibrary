import { useEffect, useState } from "react"
import style from "./AddBook.module.scss"
import axios from "axios"
import { toast } from "react-toastify";


interface book {
    title: string,
    author: string,
    genre: string,
    description:string,
    _id ?: string,
    "createdAt" ?: string
    "updatedAt"?: string,
      "__v" ? : number
}

interface props {
    handleAdd : CallableFunction
    data ?: book
   buttonName ?: string
}
function AddBook(props :props) {
const [bookDetails , setBookDetails] = useState({
    title: "",
    author: "",
    genre: "",
    description: ""
})

/** for filled Data */
useEffect(
    () => {
        if(props.data){
            setBookDetails(props?.data)
        }
    },[props.data]
)

const handleChangeInput =(event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setBookDetails(values => ({...values, [name]: value}))
}
const handleSubmit = (event: any) => {
    event.preventDefault();
    props.handleAdd(bookDetails)

  }

  return (
    <div className={style.addBookwrapper}>
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.container}>
                 <label>Book Name</label>
                 <input
                  type="text"
                  className={style.inputBox}
                  name="title" 
                  value={bookDetails?.title || ""} 
                  onChange={handleChangeInput}
                >
                 </input>
            </div>
            <div className={style.container}>
                 <label>Author</label>
                 <input
                  type="text"
                  className={style.inputBox}
                  name="author" 
                  value={bookDetails?.author || ""} 
                  onChange={handleChangeInput}
                >
                 </input>
            </div>
            <div className={style.container}>
                 <label>Gener</label>
                 <input
                  type="text"
                  className={style.inputBox}
                  name="genre" 
                  value={bookDetails?.genre || ""} 
                  onChange={handleChangeInput}
                >
                 </input>
            </div>
            <div className={style.container}>
                 <label>Description</label>
                 <textarea className={style.inputBox}
                  name="description" 
                  value={bookDetails?.description || ""} 
                  onChange={handleChangeInput}
                 ></textarea>
            </div>
            
            <button type="submit" className={style.addButton}>{
                props.buttonName? props.buttonName : "Add Book"
            }</button>
        </form>
    </div>
  )
}

export default AddBook