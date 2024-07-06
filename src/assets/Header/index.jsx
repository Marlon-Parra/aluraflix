import './style-global.css';
import LogoHeader from '../../../public/img/LogoMain.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <header className='Header-container'>
                <img src={LogoHeader} alt="aluraflix" className='headeralura' />

                <div className='button-container'>
                    <Link to="/" className='button1'>HOME</Link>
                    <Link to="/nuevo-video" className='button2'>NUEVO VIDEO</Link>
                </div>
            </header>
        </div>
    );
}

export default Header;
