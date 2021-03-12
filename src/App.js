import React, { Component } from 'react';

// import samsTText from './4Frop6.jpg';
// import samsT from './black-backs20.png';
import noback from './noback-s20-dgrey.png';
import grey from './template_s20_1920x1080.png';
import blue from './template_s20_1920x1080-blue.png';
import yello from './template_s20_1920x1080-yellow.png';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        
        this.state = {
            backContainer: window.innerHeight * 6,
            transform: 0,
            topFirst: 0,
            topSecond: 0,
            topThird: 0
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
      
            const scrollTop = document.documentElement.scrollTop;
            const inHeight = window.innerHeight;

            // ########################################
            //                1st BLOCK
            // ########################################

            if (scrollTop <= inHeight) {
                // 657 < ...

                // Increase the height
                this.setState({ topFirst: scrollTop });
            }
            
            // If passed 1
            if (scrollTop > inHeight) {
                
                // ########################################
                //                2nd BLOCK
                // ########################################

                // Scroll from 1 to 2
                if (scrollTop < (inHeight * 2)) {
                    this.setState({ transform: scrollTop - inHeight });
                }

                if (scrollTop >= (inHeight * 2)) {
                    // 1300 < ...

                    // Stop at 2
                    this.setState({ transform: inHeight });
                    
                    // Increase the height
                    if (scrollTop <= inHeight * 3) {
                        this.setState({ topSecond: scrollTop - (inHeight * 2)});
                    }
                }

                // ########################################
                //                3rd BLOCK
                // ######################################## 

                if (scrollTop >= (inHeight * 3)) {
                    // 1900 < ...
                    
                    // Scroll from 2 to 3
                    this.setState({ transform: scrollTop - (inHeight * 2) });
                    
                    if (scrollTop >= (inHeight * 4)) {
                        // Stop at 3
                        this.setState({ transform: inHeight * 2 });
                        
                        // Increase the height
                        this.setState({ topThird: scrollTop - (inHeight * 4) });
                    }
                }
            }

            // ########################################
            //            Fix transform delay
            // ######################################## 
            if (scrollTop === 0 && this.state.transform > 0) {
                this.setState({
                    transform: 0,
                    topFirst: 0,
                    topSecond: 0,
                    topThird: 0
                });
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="heightContainer" style={{height: this.state.backContainer}}></div>

                <div className="info">
                    <div>
                    WINDOW {'>'} INNER HEIGHT: {window.innerHeight}, SCROLL TOP: {document.documentElement.scrollTop}, CONTAINER: {this.state.backContainer}, TRANSFORM: {this.state.transform}
                    </div>
                    <div>
                    DIV 1 {'>'} TOP: {this.state.topFirst}
                    </div>
                    <div>
                    DIV 2 {'>'} TOP: {this.state.topSecond}
                    </div>
                    <div>
                    DIV 3 {'>'} TOP: {this.state.topThird}
                    </div>
                    <div className="render">RERENDERED!</div>
                </div>

                <div className="contentBox" style={{top: -this.state.transform + 'px'}}>
                    <section className="Section">
                        <div className="Section__jumbotron">
                            <h1>Recreate your phone</h1>
                            <button className="btn btn__main">Get started</button>
                        </div>
                        <div className="Section__showcase">
                            <div className="Section__show">
                                <img className="Section__img" src={noback}/>
                                
                            </div>
                            <div className="Section__show Section__show--top Section__show--grey" >
                                Dark Carbon
                                <img className="Section__img" src={grey} style={{height: this.state.topFirst + 'px'}}/>
                            </div>
                        </div>
                    </section>
                    <section className="Section">
                        <div className="Section__jumbotron">
                            <h1>HEHE Boay meme</h1>
                        </div>
                        <div className="Section__showcase">
                            <div className="Section__show">
                                
                            </div>
                            <div className="Section__show Section__show--top Section__show--blue" style={{height: this.state.topSecond + 'px'}}>
                                Blue Carbon 2
                            </div>
                        </div>
                    </section>
                    <section className="Section">
                        <div className="Section__jumbotron">
                            <h1>HEHE Boay meme</h1>
                        </div>
                        <div className="Section__showcase">
                            <div className="Section__show">
                                
                            </div>
                            <div className="Section__show Section__show--top Section__show--yellow" style={{height: this.state.topThird + 'px'}}>
                                Yellow Carbon 3
                            </div>
                        </div>
                    </section>
                    {/* <section className="Blue">
                        Back 2
                        <div className="top top-2" style={{height: this.state.topSecond + 'px'}}>Top 2</div>
                    </section>
                    <section className="Yellow">
                        Back 3
                        <div className="top top-3" style={{height: this.state.topThird + 'px'}}>Top 3</div>
                    </section> */}
                </div>
            </div>
        );
    }
}

export default App;