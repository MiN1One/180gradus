
const MonitorScroll = (props) => {
    const style = {
        position: 'fixed', 
        zIndex: 9999,
        top: 0,
        textAlign: 'initial',
        fontSize: 2 + 'rem',
        display: 'block',
        color: '#fff',
    }
    
    return (
        <div style={style}>
            <div>WINDOW {'>'} INNER HEIGHT: {window.innerHeight}, SCROLL TOP: {document.documentElement.scrollTop}, CONTAINER: {props.info.backContainer}, TRANSFORM: {props.info.transform}</div>
            <div>DIV 1 {'>'} TOP: {props.info.topFirst}</div>
            <div>DIV 2 {'>'} TOP: {props.info.topSecond}</div>
            <div>DIV 3 {'>'} TOP: {props.info.topThird}</div>
            <div>DIV 4 {'>'} TOP: {props.info.topFourth}</div>
            <div className="render">RERENDERED!</div>
        </div>
    );
};

export default MonitorScroll;