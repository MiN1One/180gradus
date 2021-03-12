import { Link } from 'react-router-dom';
import logoSvg from '../../assets/180illustrator-1.svg';

const Logo = () => (
    <Link to="/">
        <object 
            type="image/svg+xml" 
            data={logoSvg} 
            width="100%" 
            height="100%"
            aria-labelledby="180logo">
        </object>
    </Link>
);

export default Logo;