import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './index.css';

class App extends React.Component {

    /*
    Beginner: 10 mines, 8x8 board
    Intermediate: 20 mines, 12x12 board
    Expert: 40 mines, 16x16 board
    */
    state = {
        height: 8,
        width: 8,
        mines: 10,
    };

    handleGameStart = () => {
        let difficulty = document.querySelector("#level_select");
        if (difficulty.value === "beginner") {
            this.setState({
                height: 8,
                width: 8,
                mines: 10,
            });
        }
        if (difficulty.value === "intermediate") {
            this.setState({
                height: 12,
                width: 12,
                mines: 20,
            });
        }
        if (difficulty.value === "expert") {
            this.setState({
                height: 16,
                width: 16,
                mines: 40,
            });
        }
    }

    render() {
        const { height, width, mines } = this.state;
        return (
            <div className="game">
                <Board height={16} width={16} mines={40} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
