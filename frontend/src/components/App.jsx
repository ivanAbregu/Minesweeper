import React,{useContext} from 'react';
import Board from './Board';
import Login from './Login';
import myContext from '../context/my-context';

export default function App(props) {
    const context = useContext(myContext)
    return (
    <div className="App">
        {!context.token && <Login />}
        {context.token && <Board height={6} width={6} mines={2} />}
    </div>
    );    
}