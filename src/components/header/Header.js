import { Link } from 'react-router-dom'
import './header.scss'
import { useSum } from '../../hooks/useSum'

const Header = ({setCartOpened}) => {
    const {totalPrice} = useSum()

    return (
        <header className='header'>
            <div className="header_left">
                <Link to={'/'}>
                    <div className="header_left-img">
                        <img src="/img/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="header_info">
                    <h2>Store caps</h2>
                    <p>Online store of the best caps</p>
                </div>
            </div>
            <ul className='header_right'>
                <li>
                    <img src="/img/cart.svg" alt="cart" onClick={() => setCartOpened(true)}/>
                    <span>{totalPrice.toFixed(2)} $</span>
                </li>
                <Link to={'/favorites'}>
                    <li><img src="/img/hearts.svg" alt="hearts" /></li>
                </Link>
                <Link to={'/orders'}>
                    <li><img src="/img/user.svg" alt="user" /></li>  
                </Link> 
            </ul>
        </header>
    )
}

export default Header