import React from 'react';
import Er from '../containers/Error/Error';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.props.onError(error);
    }

    render() {
        if (this.state.hasError)
            return <Er er={this.state.error} clean={() => this.props.onError(null)} />

        return this.props.children; 
    }
}

export default ErrorBoundary;