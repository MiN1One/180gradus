
import React, { Component } from 'react';

import './Dropslide.scss';
import sprite from '../../assets/icons/sprite.svg';
import Backdrop from '../../UI/Backdrop/Backdrop';

const tagUse = (svg) => {
    return `<use xlink:href="${sprite}#${svg}"></use>`
};

class Dropslide extends Component {

    render() {
        let drop;
        if (this.props.show) drop = 
        (
            [
                <Backdrop z={97} close={this.props.close} />,
                <div className={this.props.class ? this.props.class : 'dropslide'}>
                    <div className="container container--h">
                        <div className="dropslide__wrapper">
                            {this.props.children}
                            <button className="btn btn__small dropslide__btn" onClick={() => this.props.close()}>
                                <svg className="dropslide__icon" dangerouslySetInnerHTML={{__html: tagUse('clear')}}/>
                            </button>
                        </div>
                    </div>
                </div>
            ]
        );

        return (
            <React.Fragment>
                {drop}
            </React.Fragment>
        )
    }
}

export default Dropslide;

/* 
<Dropslide class={dropClass.join(' ')} close={this.onClose} show={this.state.showDrop}>
    <div className="dropslide__imagebox">

    </div>
    <div className="dropslide__group">
        <div className="dropslide__cat dropslide__cat--top">
            <h5 className="dropslide__heading dropslide__heading--primary heading heading__4">{this.state.showDrop}</h5>
            <a className="btn btn__primary btn__primary--noanim" href={'#' + this.state.showDrop}>{this.state.showDrop}</a>
        </div>
        <div className="dropslide__cat">
            {dropItems}
        </div>
    </div>
</Dropslide>
*/