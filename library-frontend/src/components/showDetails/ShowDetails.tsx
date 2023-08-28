import style from "./ShowDetails.module.scss"

interface props{
    data :any
}
function ShowDetails(props : props) {

    const deleteUnnecessaryDetail =() => {
    delete props.data["_id"]
    delete props.data["updatedAt"]
    delete props.data["createdAt"]
    delete props.data["__v"]
    }
    deleteUnnecessaryDetail()
  return (
    <div className={style.showdetailWrapper}>
         <div className={style.titleName}>Book Details</div>
        {
            Object.keys(props.data)?.map((e :string) => {
            return  <div className={style.detailContainer}>
            <span>{e} : </span>
            <p> {props.data[e]}</p>
            </div>
            })
        }
      
    </div>
  )
}

export default ShowDetails