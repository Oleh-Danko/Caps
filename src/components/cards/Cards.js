import { useState, useContext } from 'react'
import axios from 'axios'

import { dataContext } from '../context/Context'
import './cards.scss'

const Cards = ({title, price, img, id, parentId, dontShowbtn, isFavorit}) => {
    const { addFaforite, itemCart, favorites, addItemFromCart } = useContext(dataContext)
    const obj = {title, price, img, id, parentId}

    return (
        <div className="card">
            <div className="favorite">
                {dontShowbtn ? null : <img 
                    src={favorites && favorites.some(el => +el.parentId === +id) || isFavorit ? '/img/heart-licked.svg'  : '/img/heart-unlicked.svg'} 
                    alt={favorites && favorites.some(el => +el.id === +id) ? "licked" : "unlicked"}
                    onClick={() => addFaforite(obj)} />}        
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
                    onClick={() => addItemFromCart(obj)}
                    src={itemCart.some(el => +el.parentId === +parentId) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                    alt="plus" />}
            </div>  
        </div>
    )
}

export default Cards