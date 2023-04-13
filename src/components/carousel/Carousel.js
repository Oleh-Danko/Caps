
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import './carousel.scss'
import { useCallback, useEffect, useState } from "react";

const Carousel = () => {    
    const [offset, setOffset] = useState(0)
    const dataSlider = [
        'img/carousel/slider1.jpg',
        'img/carousel/slider2.jpg',
        'img/carousel/slider3.jpg',
        'img/carousel/slider4.jpg',
        'img/carousel/slider4.jpeg',
        'img/carousel/slider5.jpg',
    ]
    
    const handleSlide = useCallback((slide) => {
        const width = 960
        const slidersLength = (-(dataSlider.length - 1 ) * width)

        if (slide === 'left') {
            offset <= slidersLength ? setOffset(0) : setOffset(prev => prev - width)  
        } else {
            offset >= 0 ? setOffset(slidersLength) : setOffset(prev => prev + width)
        }
    }, [offset])

    useEffect(() => {
        const interval = setInterval(() => {
            handleSlide('left')
        }, 4000)
        return () => clearInterval(interval)
    }, [handleSlide])

    return (
        <div className="carousel-container">
            <div onClick={() => handleSlide('left')} className="left">
                <AiOutlineLeft/>
            </div>
            <div className="window">
                <div 
                    className="all-pages-conatainer"
                    style={{
                        transform: `translateX(${offset}px)`
                    }} >
                        {dataSlider.map((item, i) => {
                            return (
                                <div 
                                    key={i}
                                    style={{ background: `url(${item}) no-repeat 50%/cover` }}
                                    className={`item`}/>
                            )
                        })}
                </div>
            </div>
            <div onClick={() => handleSlide('right')} className="right">
                <AiOutlineRight/>
            </div>
        </div>
        
    )
}

export default Carousel