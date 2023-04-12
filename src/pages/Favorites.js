// import { useState, useContext } from 'react' 
// import { CSSTransition } from 'react-transition-group'

// import { dataContext } from '../components/Context'
// import Cards from '../components/cards/Cards'
// import Spinner from '../components/spinner/Spinner'
// import Driwer from '../components/driwer/Driwer'

// const Favorites = ({cartOpened}) => {
//     const [inputValue, setInputValue] = useState('')
//     const { isLoading, addItemFromCart, favorites } = useContext(dataContext)

//     const elements = favorites.filter(el => el.title.toLowerCase().includes(inputValue.toLowerCase()))
//             .map(item => {
//                 const {id, ...itemprops} = item
//                 return (
//                     <Cards
//                         data={favorites}
//                         key={id}
//                         {...itemprops}
//                         addItemFromCart={addItemFromCart}
//                         id={id}
//                         favorited={true}
//                     />
//                 )
//             })

//     const content = (
//         <div className="content">
//             <div className="content_header">
//                 <h1>Favorites</h1>
//                 <div className='content_search-block'>
//                     <img src="/img/search.svg" alt="search" />
//                     <input 
//                         value={inputValue} 
//                         onChange={e => setInputValue(e.target.value)}
//                         placeholder='Search...' />
//                     <img onClick={() => setInputValue('')} className='close' src="/img/close.svg" alt="close" />
//                 </div>
//             </div>
//             <div className="cards">
//                 {isLoading? <Spinner/> : null}
//                 {elements}
//             </div>    
//         </div>
//     )

//     return (
//         <div className="wrapper">
//         <CSSTransition
//             in={cartOpened}
//             timeout={500}
//             classNames="cart"
//             unmountOnExit>
//             <Driwer/>
//         </CSSTransition>
//             {content}
//         </div>
//     )
// }

// export default Favorites


import { useState, useContext } from 'react' 
import { CSSTransition } from 'react-transition-group'

import { dataContext } from '../components/context/Context'
import Cards from '../components/cards/Cards'
import Spinner from '../components/spinner/Spinner'
import Driwer from '../components/driwer/Driwer'

const Favorites = ({cartOpened}) => {
    const { favorites } = useContext(dataContext)

    const content = 
        <div className="content">
            <div className="content_header">
                <h1>Favorites</h1>
            </div>
            <div className="cards">
            {favorites.map(item => {
                const {id, ...itemprops} = item
                return (
                    <Cards
                        key={id}
                        {...itemprops}
                        id={id}
                        isFavorit='true'
                    />
                )
            })}
            </div>  
        </div>

    return (
        <div className="wrapper">
            <CSSTransition
                in={cartOpened}
                timeout={500}
                classNames="cart"
                unmountOnExit>
                <Driwer/>
            </CSSTransition>
                {content}
        </div>
    )
}

export default Favorites
