import { Link } from 'react-router-dom';
import logoSvg from '../../assets/180illustrator-1.svg';

const Logo = ({ className }) => (
    <Link to="/" className={`logo ${className || ''}`}>
        <object 
            type="image/svg+xml" 
            data={logoSvg} 
            width="100%" 
            height="100%"
            aria-labelledby="180logo"
            style={{ pointerEvents: 'none' }}>
        </object>
    </Link>
);

export default Logo;