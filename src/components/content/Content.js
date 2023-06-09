import React, { useEffect } from 'react'
import { useState, useContext } from 'react'

import Cards from '../cards/Cards'
import Spinner from '../spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'
import { dataContext } from '../context/Context'

import './content.scss'

const Content = () => {
    const [inputValue, setInputValue] = useState('')
    const {data, isLoading, setActivePages, activePages} = useContext(dataContext)

    const renderItems = () => (
        data.filter(el => el.title.toLowerCase().includes(inputValue.toLowerCase()))
            .map(item => {
                const {id, ...itemprops} = item
                return (
                    <Cards
                        data={data}
                        key={id}
                        {...itemprops}
                        id={id}                     
                    />
                )
            })
    )

    const renderPaginations = () => {
        const res = [...Array(4)].map((item, i) => {
            const clazz = i + 1 === activePages ? 'active' : ''
            return (
                <div
                    key={i}
                    onClick={() => setActivePages(i + 1)}
                    className={`page ${clazz}`}>{i + 1}</div>
            )
        })

        return res
    }

    return (
        <div className="content">
            <div className="content_header">
                <h1>All caps</h1>
                <div className='content_search-block'>
                    <img src="/img/search.svg" alt="search" />
                    <input 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)}
                        placeholder='Search...' />
                    <img onClick={() => setInputValue('')} className='close' src="/img/close.svg" alt="close" />
                </div>
            </div>
            <div className="cards">
                {isLoading ? <Skeleton/> : renderItems()}
            </div>    
            <div className="content_pages">
                {renderPaginations()}
                {/* <div className="page active">1</div> */}
            </div>
        </div>
    )
}

export default Content