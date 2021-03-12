import { Link } from 'react-router-dom';

const Card = (props) => {

    return (
        <div className="Card">
            <div className="Card__head">
                <figure className="Card__figure">
                    <img className="Card__img" src={props.img} alt={props.title} />
                </figure>
            </div>
            <div className="Card__body">
                <span className="Card__title">{props.title}</span>

            </div>
            <div className="Card__footer">
                <Link to={`/${props.id}`} className="btn btn__primary">
                    
                </Link>
            </div>
        </div>
    );
};

export default Card;