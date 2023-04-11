import { useState, useContext, useEffect } from 'react' 
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'

import { dataContext } from '../components/context/Context'
import Cards from '../components/cards/Cards'
import Spinner from '../components/spinner/Spinner'
import Driwer from '../components/driwer/Driwer'

import './index.scss'

const Orders = ({cartOpened}) => {
    const [orders, setOrders] = useState([])
    const { favorites } = useContext(dataContext)

    useEffect(() => {
        (async () => {
            const {data}  = await axios.get('https://642b102500dfa3b54756026c.mockapi.io/order')
            setOrders(data)
        })()
    }, [])

    const content = () => {
        return (
            orders.map(item => {
                return (
                   <div className="content">
                        <div className="orderNumber">
                            <h2>Your order №{item.id}</h2>
                            <div className="cards">
                                {item.item.map(el => {
                                    const {id, ...itemprops} = el
                                    return(
                                        <Cards
                                            data={favorites}
                                            key={id}
                                            {...itemprops}
                                            id={id}
                                            dontShowbtn/>
                                    )
                                })}
                            </div>
                        </div>
                   </div>
                )
            })
        )
    }

    return (
        <div className="wrapper">
            <CSSTransition
                in={cartOpened}
                timeout={500}
                classNames="cart"
                unmountOnExit>
                <Driwer/>
            </CSSTransition>
                {content()}
        </div>
    )
}

export default Orders
