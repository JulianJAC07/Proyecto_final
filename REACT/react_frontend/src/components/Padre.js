  
import React, { useState } from 'react'
import Welcome from './Saludo'

const Padre = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    return (
        <div>
            <Welcome time={time} setTime={setTime}/>
        </div>
    )
}

export default Padre