import './Tooltip.scss';

const Tooltip = (props) => {

    return (
        <div className={`Tooltip ${props.arrow && ''}`}>
            {props.children}
        </div>
    )
};

export default Tooltip;