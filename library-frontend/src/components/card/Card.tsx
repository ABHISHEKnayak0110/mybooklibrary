import style from "./Card.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrash,faCheckCircle } from '@fortawesome/free-solid-svg-icons'

interface details{
    title: string,
    author: string,
    genre: string,
    description:string,
    _id ?: string,
  "createdAt" ?: string
  "updatedAt"?: string,
    "__v" ? : number
}
interface cardProps{
    data ?: details
    handleEdit : CallableFunction
    handleDelete : CallableFunction
    handleViewDetail : CallableFunction
}
function Card(props : cardProps) {
  return (
    <div className={style.cardWrapper} >
    
           <div className={style.bookDetail}>
            <span> Book Name : <b>{props.data?.title}</b></span>
            <span>Author Name : <b>{props.data?.author}</b></span>
           </div>
            <div className={style.buttonContainer}>
         <button onClick={ () => {props.handleViewDetail(props.data?.["_id"])}}>View Details</button>
          <FontAwesomeIcon id={`edit`} icon={faPenToSquare} className={style.cursorPointer} onClick={() =>props.handleEdit(props.data)}/> 
          <FontAwesomeIcon id={`delete`} icon={faTrash} className={style.cursorPointer} onClick={() =>props.handleDelete(props.data?.["_id"])}  />
            </div>
       
    </div>
  )
}

export default Card