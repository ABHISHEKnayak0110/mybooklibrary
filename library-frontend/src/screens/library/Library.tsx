import { useEffect, useState } from "react"
import Header from "../../components/heading/Header"

import style from "./Library.module.scss"
import axios from "axios"
import AddBook from "../../components/addBookForm/AddBook"

import { toast } from "react-toastify";
import PopUp from "../../components/popUp/PopUp"
import Card from "../../components/card/Card"
import ShowDetails from "../../components/showDetails/ShowDetails"
import ReactPaginate from "react-paginate";
import SearchInputBox from "../../components/searchInputBox/SearchInputBox"
import useDebounce from "../../helper/UseDebounce"

function Library() {
    const [bookList, setBookList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditBook, setShowEditBook] = useState(false)
    const [editDetail, seteditDetail] = useState<any>()
    const [showDetailScreen , setShowDetailScreen] = useState(false)
    const [showDetailData , setShowDetailData] = useState<any>()

    /**get all book List**/
    const getAllBookList = () => {
        axios.get('http://localhost:4001/api/book/all').then(
            res => {
                setBookList(res.data?.books)
            }
        )
    }

    /**Add a book**/
    const handleAddNewBook = (data: object) => {
        axios.post(
            "http://localhost:4001/api/book/addBook",
            { ...data }
        ).then(
            (res: any) => {
                toast.success(res?.data?.message)
                getAllBookList()
                setShowAddForm(false)
            }
        ).catch(
            (err: any) => {
                const errMsg = err?.response.data?.error
                toast.error(errMsg)
            }
        )

    }
    const handleShowAddBook = (data: boolean) => {
        setShowAddForm(data)
    }
/*****************/

    /** Edit Book functions**/
    const handleEditBookApi = (data: any) => {
        let body = {
            title: data.title,
            author: data.author,
            genre: data.genre,
            description: data.description
        }
        axios.put(
            `http://localhost:4001/api/book/${data["_id"]}`,
            { ...body }
        ).then(
            (res: any) => {
                toast.success(res?.data?.message)
                getAllBookList()
                setShowEditBook(false)
            }
        ).catch(
            (err: any) => {
                const errMsg = err?.response.data?.error
                toast.error(errMsg)
            }
        )

    }
   
    const handleEditBook = (data: object) => {
        seteditDetail(data)
        setShowEditBook(true)
    }
    const handleEditClose = () => {
        setShowEditBook(false)
    }
/*****************/
    /**Delete Api call **/
    const handleDelete = (id: string) => {
        axios.delete(
            `http://localhost:4001/api/book/${id}`,
        ).then(
            (res: any) => {
                toast.success(res?.data?.message)
                getAllBookList()
            }
        ).catch(
            (err: any) => {
                const errMsg = err?.response.data?.error
                toast.error(errMsg)
            }
        )
    }

    /**Show Detail Function**/
    const handleShowDetail =(id :string) => {
        axios.get(
            `http://localhost:4001/api/book/${id}`,
        ).then(
            (res: any) => {
                setShowDetailData(res.data)
                setShowDetailScreen(true)
            }
        ).catch(
            (err: any) => {
                const errMsg = err?.response.data?.error
                toast.error(errMsg)
            }
        )
    }
    const handleCloseDetailScreen =() => {
        setShowDetailScreen(false)
    }

const handleSearch = (e :any) => {
   const name = e?.target.value
   axios.get(
    `http://localhost:4001/api/book/search`,
    {
        params :{
            name : name
        }
    }
).then(
    (res: any) => {
        setBookList(res.data)
    }
).catch(
    (err: any) => {
        const errMsg = err?.response.data?.error
        toast.error(errMsg)
    }
)
}
const debouncedHandleSearchPhoneNo = useDebounce(handleSearch, 500);

  /** UseEffect */
    // for getting all List First Time 
    useEffect(
        () => {
            getAllBookList()
        }, []
    )

 return (
        <div className={style.libraryWrapper}>
            <Header />
            <div className={style.textAdd}>Do you want to add New Book <button onClick={() => handleShowAddBook(true)}>Add Book</button></div>
              <div className={style.seachBox}><SearchInputBox placeholder="Search book by title, author, or genre" onChange={debouncedHandleSearchPhoneNo}/></div>
            <div className={style.containerScreen} >
                <div className={style.listText}>
                    <h3>List of books</h3>
                </div>
                <div className={style.listViewContainer} >
                  
                    { bookList?.length ?
                        bookList?.map((e: any) => {
                            return <div className={style.cardContainer}>
                                <Card data={e} handleEdit={handleEditBook} handleDelete={handleDelete} handleViewDetail={handleShowDetail} />
                            </div>
                        })
                        : 
                        <h3 className={style.noData}>No Books Available</h3>
                    }


                </div>
            </div>

            {
                showAddForm && <PopUp>
                    <div className={style.popUpAddForm}>
                        <div className={style.crossIcon} onClick={() => handleShowAddBook(false)}><span>X</span></div>
                        <div className={style.titleName}>Add New Book</div>
                        <AddBook handleAdd={handleAddNewBook} />
                    </div>
                </PopUp>
            }
            {
                showEditBook && <PopUp>
                    <div className={style.popUpAddForm}>
                        <div className={style.crossIcon} onClick={() => handleEditClose()}><span>X</span></div>
                        <div className={style.titleName}>Edit Book Details</div>
                        <AddBook handleAdd={handleEditBookApi} data={editDetail} buttonName={"Save Book Details"} />
                    </div>
                </PopUp>
            }
            {
                showDetailScreen &&<PopUp>
                    <div className={style.popUpDetails}>
                      <div className={style.crossIcon} onClick={() =>handleCloseDetailScreen()}><span>X</span></div>
                    <ShowDetails data ={showDetailData}/>
                    </div>
                </PopUp> 
            }
        </div>
    )
}

export default Library