import React from 'react'

// class Welcome extends React.Component {
//     render () {
//         return <h1>Hello world</h1>
//     }
// }

// const Welcome = (props) => {
//     return <h1>Hello {props.name}</h1>
// }

// const Welcome = (props) => {
//     // Destructuring
//     const { name } = props
//     return <h1>Hello {name}</h1>
// }

const Welcome = ({time, setTime}) => {
    setTimeout(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000);

    return <h1>La hora es {time}</h1>
}

export default Welcome;