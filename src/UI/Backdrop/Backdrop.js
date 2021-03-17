import './Backdrop.scss';

const Backdrop = ({ z, close }) => (
    <div className="Backdrop" style={{ zIndex: z }} onClick={() => close()}></div>
);

export default Backdrop;