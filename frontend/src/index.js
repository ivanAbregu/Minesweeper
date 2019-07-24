import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import GlobalState from './context/GlobalState';


function Index(props) {
    return (
        <GlobalState>
            <App/>
        </GlobalState>
    );    
}

ReactDOM.render(<Index />, document.getElementById('root'));
