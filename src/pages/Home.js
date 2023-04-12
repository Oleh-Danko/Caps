import { CSSTransition } from 'react-transition-group'

import Content from '../components/content/Content'
import Driwer from '../components/driwer/Driwer'
import Carousel from '../components/carousel/Carousel'

function Home({cartOpened}) {

    return (
        <div className="wrapper">
        <CSSTransition
            in={cartOpened}
            timeout={500}
            classNames="cart"
            unmountOnExit>
            <Driwer/>
        </CSSTransition>
            <Carousel/>
            <Content  />
        </div>
    )
}

export default Home
