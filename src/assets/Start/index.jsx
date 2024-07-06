import React from 'react';
import './style-global.css';
import Player from '../../../public/img/player.png';

const Start = () => {
    return (
<>

<div className='imagen'>
    <div className='texto-container'>
    <h1 className='front-container'>FRONT END</h1>
    <span className='Span'>Challenge React</span>
   <p className='parrafo'>Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.</p>
   </div>



<img src={Player} alt="player" className='Player-image' />



   </div>
    </>
    )


}


export default Start