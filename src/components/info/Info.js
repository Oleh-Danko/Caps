import { useContext } from "react"
import { dataContext } from "../context/Context"

const Info = ({title, descr, image, altInfo, onClickBtn}) => {
    const {} = useContext(dataContext)

    return(
        <div className='empty-cart'>
            <img  src={image} alt={altInfo} />
            <h2>{title}</h2>
            <p>{descr}</p>
            <button onClick={onClickBtn} className='btn btn-close'>Go to back <img src="/img/back.svg" alt="arrow back" /></button>
        </div>
    )
}

export default Info