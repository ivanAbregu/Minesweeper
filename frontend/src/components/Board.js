import React,{useState,useEffect,useContext} from 'react';
import Cell from './Cell';
import Loading from './Loading';
import {URL,getCookie} from "./Const";
import myContext from '../context/my-context';
import { Button } from 'antd';
import 'antd/dist/antd.css'; 

export default props =>{
    const [boardData, setBoardData] = useState(); 
    const context = useContext(myContext)
    useEffect(()=>{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${context.token}`,
            'X-CSRFToken': getCookie('csrftoken'),
        };
        let body = JSON.stringify({row_size:props.height,
                                    column_size:props.width,
                                    mines_size:props.mines});

        fetch(URL, {headers, method: "POST",body})
            .then(res => res.json())
            .then(obj => setBoardData(obj))
            .catch((error) => { // error is a Promise
                console.log("Error",error)
            });
    },[]) 
    function fetchUpdate(obj){
        let game_id = boardData.id
        const url = `${URL}${game_id}/`
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${context.token}`,
            'X-CSRFToken': getCookie('csrftoken'),
        };
        let body = JSON.stringify(obj);
        fetch(url, {headers, method: "PUT",body})
            .then(res => res.json())
            .then(obj => setBoardData(obj))
            .catch((error) => { // error is a Promise
                console.log("Error",error)
            });
    }
    // Handle User Events
    function handleCellClick(cell_id) {
        fetchUpdate({cell_id})
    }
   function _handleContextMenu(e, cell) {
        e.preventDefault();
        fetchUpdate({cell_id:cell.id, flag:!cell.flag})
   }
    function renderBoard(data) {
        let result = []
        for (let row = 0; row < data.row_size; row++) {
            for (let col = 0; col < data.column_size; col++) {
                let item = data.cells.find(cell=> cell.row_id===row && cell.column_id===col)
                result.push (
                    <div key={item.id}>
                        <Cell
                            onClick={() => handleCellClick(item.id)}
                            cMenu={(e) => _handleContextMenu(e, item)}
                            cell={item}
                        />
                        {item.column_id === data.column_size-1 ? <div className="clear" /> : ""}
                    </div>)
        
        
            }
        }
        return result;

    }

    return (
        <div className="App">
            {boardData && 
                <div>
                    {renderBoard(boardData)}
                    <h1>{boardData.status}</h1>
                    <Button onClick={()=>props.restart()}>Restart</Button>
                </div>
            }
            {!boardData && 
                <Loading />
            }
        </div>
    );
    
}