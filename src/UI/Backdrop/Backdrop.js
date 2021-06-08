import './Backdrop.scss';

const Backdrop = ({ z, close, className }) => (
    <div 
        className={`backdrop ${className || ''}`} 
        style={{ zIndex: z }} 
        onClick={() => close()} />
);

export default Backdrop;