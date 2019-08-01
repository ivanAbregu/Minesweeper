import React,{useContext,useState} from 'react';
import Board from './Board';
import Login from './Login';
import SignUp from './SignUp';
import myContext from '../context/my-context';

export default function App(props) {
    const context = useContext(myContext)
    const [show,setShow] = useState(true)
    function restart () {
        setShow(false)
        setTimeout(function(){ setShow(true); }, 100);
    }
    return (
    <div className="App">
        {!context.token && <Login />}
        {context.token && 
         show &&
         <Board 
            height={10} 
            width={10} 
            mines={15}
            restart={restart} />}
    </div>
    );    
}