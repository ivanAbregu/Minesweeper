import React,{useState} from 'react';
import MyContext from './my-context';
const TOKEN = 'TOKEN';

export default (props) =>{
    const [token,setToken] = useState(localStorage.getItem(TOKEN))
    const updateToken = token =>{
        setToken(token)
        localStorage.setItem(TOKEN,token)
    }
    return(
        <MyContext.Provider
        value={{
            token:token,
            updateToken:updateToken
        }}>
            {props.children}
        </MyContext.Provider>
    )
}