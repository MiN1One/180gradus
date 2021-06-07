import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import css from 'dom-css';

class ShadowScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            scrollTop: 0,
            scrollHeight: 0,
            clientHeight: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.scrollbarsRef = React.createRef();
        this.topRef = React.createRef();
        this.bottomRef = React.createRef();
    }

    handleUpdate(values) {
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        css(this.topRef.current, { opacity: shadowTopOpacity });
        css(this.bottomRef.current, { opacity: shadowBottomOpacity });
    }

    render() {
        const { style, ...props } = this.props;
        const containerStyle = {
            ...style,
            position: 'relative'
        };

        const shadowTopStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)'
        };

        const shadowBottomStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)'
        };

        return (
            <div style={containerStyle}>
                <Scrollbars
                    ref={this.scrollbarsRef}
                    onUpdate={this.handleUpdate}
                    {...props}/>
                <div
                    ref={this.topRef}
                    style={shadowTopStyle}/>
                <div
                    ref={this.bottomRef}
                    style={shadowBottomStyle}/>
            </div>
        );
    }
}

export default ShadowScrollbars;