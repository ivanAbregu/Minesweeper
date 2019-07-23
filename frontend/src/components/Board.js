import React,{useState,useEffect} from 'react';
import Cell from './Cell';
import Loading from './Loading';
import {URL,TOKEN} from "./Const"

export default props =>{
    const [boardData, setBoardData] = useState(); 

    useEffect(()=>{
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${TOKEN}`
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

    // Handle User Events
    function handleCellClick(cell_id) {
        let game_id = boardData.id
        const url = `${URL}${game_id}/`
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${TOKEN}`
        };
        let body = JSON.stringify({cell_id});
        fetch(url, {headers, method: "PUT",body})
            .then(res => res.json())
            .then(obj => setBoardData(obj))
            .catch((error) => { // error is a Promise
                console.log("Error",error)
            });
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
                            cell={item}
                        />
                        {item.column_id === data.column_size-1 ? <div className="clear" /> : ""}
                    </div>)
        
        
            }
        }
        return result;

    }

    return (
        <div className="board">
            <div className="game-info">
                <h1 className="info">{boardData && boardData.status? boardData.status : ""}</h1>
            </div>
            {boardData && 
                renderBoard(boardData)
            }
            {!boardData && 
                <Loading />
            }
        </div>
    );
    
}