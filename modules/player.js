const Player = (name, counter, aiPlayer) => {

    let myTurn = false;
    
    const getName = () => name;
    
    const isMyTurn = () => myTurn;
    const setMyTurn = () => myTurn = !myTurn;

    const getCounter = () => counter;
    const isAI = () => aiPlayer;

    const getMove = () => {
        const board = gameBoard.getBoardState();
        for(let i = 0; i < board.length; i++) {
            if(board[i].square.classList.contains('free')) {
                return board[i].square;
            }
        }
    };

    return {
        getName,
        isMyTurn,
        setMyTurn,
        getCounter,
        isAI,
        getMove
    };

};

