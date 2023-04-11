import { useState, useContext } from 'react'
import axios from 'axios'

import { dataContext } from '../context/Context'
import './cards.scss'

const Cards = ({title, price, img, id, dontShowbtn}) => {
    const { onClickFavorite, itemCart, favorites, addItemFromCart } = useContext(dataContext)
    const obj = {title, price, img, id, parentId: id}

    return (
        <div className="card">
            <div className="favorite">
                {dontShowbtn ? null : <img 
                    src={favorites && favorites.some(el => +el.id === +id) ? '/img/heart-licked.svg'  : '/img/heart-unlicked.svg'} 
                    alt={favorites && favorites.some(el => +el.id === +id) ? "licked" : "unlicked"}
                    onClick={() => onClickFavorite(obj)} />}        
            </div>
            <div className="card_img">
                <img src={img} alt="card photo" />
            </div>
            <h3 className="card_title">
                {title}
            </h3>
            <div className="card_price">
                <div>
                    <span>PRICE:</span><br/>
                    <b>{price}$</b>
                </div>
                {dontShowbtn ? null : <img 
                    // onClick={() => console.log(obj)}
                    onClick={() => addItemFromCart(obj)}
                    src={itemCart.some(el => +el.parentId === +id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                    alt="plus" />}
            </div>  
        </div>
    )
}

export default Cards