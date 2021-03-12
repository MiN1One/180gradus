
const Backdrop = (props) => {
    const style = {
        zIndex: props.z,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: 'rgba(255,255,255, 0)'
    }

    return (
        <div style={style} onClick={() => props.close()}></div>
    );
};

export default Backdrop;