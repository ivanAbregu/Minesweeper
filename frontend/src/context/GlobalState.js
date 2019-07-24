import React,{useState} from 'react';
import MyContext from './my-context';

export default (props) =>{
    const [token,setToken] = useState('')
    const updateToken = token =>{
        setToken(token)
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