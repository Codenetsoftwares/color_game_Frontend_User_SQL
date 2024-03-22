import './home.css'
import { dSlider, DHitGames } from '../../utils/dummyData'
import { useState } from 'react'

const Home = () => {
    const [sliderData, setSliderData] = useState(dSlider)

    function component1() {
        return <div className='_1-card'></div>
    }

    function component2() {
        return <div className='_2-card'></div>
    }

    function component3() {
        return <div className='_2-card'></div>
    }

    return <>
        {component1()}
        {component2()}
        {component3()}
    </>
}

export default Home