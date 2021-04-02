import { Component } from "react";

const asyncComponent = (imp) => {
    console.log(imp);
    return class extends Component {
        state = { cmp: null }

        componentDidMount() {
            imp()
                .then(comp => this.setState({ cmp: comp.default }))
                .catch(er => console.error(er));
        }

        render() {
            console.log(this.state.cmp);
            const C = this.state.cmp && this.state.cmp;
            return C && <C {...this.props} />;
        }
    }
};

export default asyncComponent;