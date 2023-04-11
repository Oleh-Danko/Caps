import { useContext, useState } from 'react'
import axios from 'axios'

import { dataContext } from '../context/Context'
import Info from '../info/Info'
import { useSum } from '../../hooks/useSum'

import './driwer.scss'

const Driwer = () => {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const {setCartOpened, itemCart, setItemCart, removeItemFromCart} = useContext(dataContext)
    const {totalPrice} = useSum()
    // const url = 'https://640f4968cde47f68db46c131.mockapi.io/Cart'

    const onClickOrder = async () => {
       try {
            setIsloading(true)
            const {data} = await axios.post(`https://642b102500dfa3b54756026c.mockapi.io/order`, {item: itemCart})

            for (let  i = 1; i < itemCart.length + 1; i++) {
                console.log(i)
                axios.delete(`https://640f4968cde47f68db46c131.mockapi.io/Cart/${i}`)
            }

            setOrderNumber(data.id)
            setIsOrderComplete(true)
            setItemCart([])
        } catch(err) {
            console.log(err)
        }
        setIsloading(false)
    }
    
    const onCloseCart = (e) => {
        switch (e.target) {
            case document.querySelector('.cart-item_remove'):
                setCartOpened(false)
                break
            case document.querySelector('.overlay'):
                setCartOpened(false)
                break
            case document.querySelector('.btn-close'):
                setCartOpened(false)
                break
        }
    }

    return (
        <div className='overlay' onClick={onCloseCart}>
            <div className="driwer">
                <h2>Cart <img onClick={onCloseCart} className='cart-item_remove' src="img/btn-delete.svg" alt="remove btn" /></h2>
                {itemCart.length ? 
                    <div className="cart-items">
                        {itemCart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item_img">
                                    <img src={item.img} />
                                </div>
                                <div className="cart-item_descr">
                                    <p>{item.title}</p>
                                    <b>{item.price} $</b>
                                </div>
                                {/* <img onClick={() => console.log(item)} className='cart-item_remove' src="img/btn-delete.svg" alt="remove btn" /> */}
                                <img onClick={() => removeItemFromCart(item)} className='cart-item_remove' src="img/btn-delete.svg" alt="remove btn" />
                            </div>
                        ))}
                    </div> : 
                    <Info 
                        descr={isOrderComplete ? `Your order has been placed. Order number #${orderNumber}` : 'Add at least one cap to checkout'}
                        title={isOrderComplete ? 'The order is placed!' : 'Empty cart'}
                        image={isOrderComplete ? '/img/order-complete.svg': '/img/empty-cart.svg'}
                        altInfo={isOrderComplete ? "order complete" : "empty cart"}
                        onClickBtn={onCloseCart} />
                }
        
                {itemCart.length ? 
                    <div className="cart-block">
                        <div>
                            Order amount:<span/>{totalPrice.toFixed(2)} $
                        </div>
                        <button disabled={isLoading} onClick={onClickOrder} className='btn'>Place an order <img src="/img/arrow.svg" alt="arrow" /></button>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default Driwer