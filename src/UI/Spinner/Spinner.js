import logoSvg from '../../assets/180illustrator-1.svg';

const Spinner = () => (
    <div className="loader">
        <div className="loader__wrapper">
            <div className="loader__face loader__face--1">
                <div className="loader__circle loader__circle--1"></div>
            </div>
            <div className="loader__face loader__face--2">
                <div className="loader__circle loader__circle--2"></div>
            </div>
            <div className="loader__logo">
                <object 
                    type="image/svg+xml" 
                    data={logoSvg} 
                    width="100%" 
                    height="100%"
                    aria-labelledby="180logo">
                </object>
            </div>
        </div>
        <a href="https://www.linkedin.com/in/nodirbek-ulashev-765a28201" target="_blank" rel="noopener noreferrer" className="loader__appdev tc">
            &copy;180Gradus {new Date().getFullYear()}<br/>
            MiN1One &bull; Dev
        </a>
    </div>
);


export default Spinner;