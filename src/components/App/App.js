import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from 'react'

import Home from '../../pages/Home'
import Favorites from '../../pages/Favorites'
import Orders from "../../pages/Orders";
import Header from "../header/Header";
import { dataContext } from "../context/Context";

import './app.scss'

function App() {
    const [data, setData] = useState([])
    const [favorites, setFavorites] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)
    const [cartOpened, setCartOpened] = useState(false)
    const [itemCart, setItemCart] = useState([])
    const [activePages, setActivePages] = useState(1)
    const {Provider} = dataContext
    const page = 4
    const limit = 8

    useEffect(() => {
        // axios.get('https://640f4968cde47f68db46c131.mockapi.io/Caps')  
        // .then(res => setData(res.data))
        // .finally(setIsLoading(false))

        // axios.get('https://640f4968cde47f68db46c131.mockapi.io/Cart')
        //     .then(res => setItemCart(res.data))

        // axios.get('https://642b102500dfa3b54756026c.mockapi.io/favorites')
        //     .then(res => setFavorites(res.data))
        (async () => {
            try {
                const [cartResponse, favoritesResponse, dataResponse] = await Promise.all([
                    axios.get('https://640f4968cde47f68db46c131.mockapi.io/Cart'), 
                    axios.get('https://642b102500dfa3b54756026c.mockapi.io/favorites'), 
                    axios.get(`https://640f4968cde47f68db46c131.mockapi.io/Caps?page=${activePages}&limit=${limit}`)
                ])

                setIsLoading(false)

                setItemCart(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setData(dataResponse.data)
            } catch(err) {
                console.error(err)
            }
        })()
    }, [])

    useEffect(() => {
        axios.get(`https://640f4968cde47f68db46c131.mockapi.io/Caps?page=${activePages}&limit=${limit}`)
        .then(res => setData(res.data))
    }, [activePages])

    const addItemFromCart = async (obj) => {
        try {
            const url = 'https://640f4968cde47f68db46c131.mockapi.io/Cart'
        
            if (itemCart.find(el => +el.parentId === +obj.id)) {
                removeItemFromCart(obj) 
            } else {
                setItemCart(prev => [...prev, obj]) 
                const {data} = await  axios.post(url, obj)  
                setItemCart(prev => prev.map(el => {
                    if (el.id === obj.id) return {...el, id: data.id}
                    return el
                })) 
            }
        } catch(err) {console.error(err)}
    }

    const removeItemFromCart = (obj) => {   
        const finditem = itemCart.find(el => +el.parentId === +obj.parentId)

        setItemCart(prev => prev.filter(el => +el.parentId !== +obj.parentId))
        axios.delete(`https://640f4968cde47f68db46c131.mockapi.io/Cart/${+finditem.id}`)
    }

    const addFaforite = async (obj) => {
        try {
            const url = 'https://642b102500dfa3b54756026c.mockapi.io/favorites'

            if (favorites.find(el => +el.parentId === +obj.parentId)) {
                console.log(obj)
                console.log(favorites)
                removeFavorites(obj, url) 
            } else {
                console.log(obj)
                console.log(favorites)

                setFavorites(prev => [...prev, obj]) 
                const {data} = await  axios.post(url, obj)  
                setFavorites(prev => prev.map(el => {
                    if (el.id === obj.id) return {...el, id: data.id}
                    return el
                })) 
            }
        } catch(err) {console.error(err)}
    }

    const removeFavorites = (obj, url) => { 
        // console.log(obj)
        // console.log(favorites)

        const findFavorite = favorites.find(el => +el.parentId === +obj.parentId)

        setFavorites(prev => prev.filter(el => +el.parentId !== +obj.parentId))
        axios.delete(`${url}/${+findFavorite.id}`)
    }

    // const onClickFavorite = (obj) => {
        
    //     if (favorites.find(item => item.id === obj.id)) {
    //         axios.delete(`https://642b102500dfa3b54756026c.mockapi.io/favorites/${obj.id}`)
    //         setFavorites(prev => prev.filter(item => item.id !== obj.id))      
    //     } else {
    //         axios.post(`https://642b102500dfa3b54756026c.mockapi.io/favorites`, obj)
    //         setFavorites(prev => [...prev, obj])    
    //     }
    // }
    
    return (
        <Provider value={{
                data, 
                isLoading, 
                addItemFromCart, 
                setCartOpened,
                itemCart, 
                setItemCart,
                removeItemFromCart, 
                favorites,
                setFavorites,
                addFaforite,
                setActivePages,
                activePages,
                }}>
            <Router>
                <div className="wrapper">
                    <Header setCartOpened={setCartOpened}/>

                    <Routes>
                        <Route path='/' element={<Home cartOpened={cartOpened}/>}/>  
                        <Route path='/favorites' element={<Favorites cartOpened={cartOpened}/>}/>  
                        <Route path='/orders' element={<Orders cartOpened={cartOpened}/>}/>  
                    </Routes>
                </div>
            </Router>
        </Provider>
    )
}

export default App
