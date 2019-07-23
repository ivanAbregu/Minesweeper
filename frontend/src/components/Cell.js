import React from 'react';

export default props =>{
    let cell = props.cell;

    function getValue(){
        if (!cell.visible){
            return cell.flag ? "🚩" : null;
        }
        if (cell.value===-1) {
            return "💣";
        }
        if(cell.value === 0 ){
            return null;
        }
        return cell.value;
    }

        let className = "cell" + (cell.visible ? "" : " hidden") + (cell.value===-1 ? " is-mine" : "") + (cell.flag ? " is-flag" : "");


        return (
            <div onClick={props.onClick} className={className} onContextMenu={props.cMenu} >
                {getValue()}
            </div>
        );
}
