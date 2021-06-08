import { Link } from 'react-router-dom';
import logoSvg from '../../assets/180illustrator-1.svg';
// import sprite from '../../assets/logo-sm-sprite.svg';

const Logo = ({ className }) => (
    <Link to="/" className={`logo ${className || ''}`}>
        {/* <svg className="logo__icon">
            <use xlinkHref={`${sprite}#180illustrator`} />
        </svg> */}
        <img src={logoSvg} alt="logo" width="100%" height="100%" />
        {/* <object 
            type="image/svg+xml" 
            data={logoSvg} 
            width="100%" 
            height="100%"
            aria-labelledby="180logo"
            style={{ pointerEvents: 'none' }}>
        </object> */}
    </Link>
);

export default Logo;