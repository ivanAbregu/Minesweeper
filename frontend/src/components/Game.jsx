import React,{useState,useEffect} from 'react';
export default props =>{
    const [game,setGame] = useState([]);
    useEffect(()=>{
        const URL = 'http://0.0.0.0:8000/api/game/'
        let token = ""
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        };
        fetch(URL, {headers, method: "GET"})
            .then(res => res.json())
            .then(obj => setGame(obj))
            .catch((error) => { // error is a Promise
                console.log("Error",error)
            });
    },[]) 
    return(
        <ul>
            {game.map( item => <li>{item.id}- {item.status}</li>)}
           asas 
        </ul>
    )
}