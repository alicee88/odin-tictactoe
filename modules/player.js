const Player = (name, counter, aiPlayer, aiLevel) => {

    let myTurn = false;
    
    const getName = () => name;
    
    const isMyTurn = () => myTurn;
    const setMyTurn = () => myTurn = !myTurn;

    const getCounter = () => counter;
    const isAI = () => aiPlayer;

    const getMove = () => {
        let board = gameBoard.getBoardState();
        let testBoard = board.slice();

        switch(aiLevel) {
            case 'Terrible':
               return getRandomMove(board);
            case 'Decent': // Looks one move ahead - makes a move based on whether AI can win or if AI about to lose.
                const availMoves = gameBoard.getFreeSquares(testBoard);
                
                for(let i = 0; i < availMoves.length; i++) {
                    let move = availMoves[i];
                    testBoard = board.slice();
                    testBoard[move] = 'X';
                    if(gameBoard.boardInEndState('X', testBoard)) {
                        return move;
                    }
                    testBoard[move] = 'O'
                    if(gameBoard.boardInEndState('O', testBoard)) {
                        return move;
                    }
                }
               
                return getRandomMove(board);

            case 'Unbeatable': 
                const bestMove = minimax(testBoard, counter);
                return bestMove.index;
            
        }
        
    }

    const getRandomMove = (board) => {
        const availMoves = gameBoard.getFreeSquares(board);
        const random = Math.floor(Math.random() * Math.floor(availMoves.length));
        return availMoves[random];
    }

    const minimax = (board, player) => {
        
        let availMoves = gameBoard.getFreeSquares(board);
        let moves = [];

        // Check for winning move
        if(gameBoard.boardInEndState('X', board)) {
            return {score: 10};
        }
        if(gameBoard.boardInEndState('O', board)) {
            return {score: -10}
        }
        if(availMoves.length === 0) {
            return {score: 0};
        }
 
        // Go through available moves and plays out the moves, allocating a score to each 'X' and 'O' move respectively.
        for(let i = 0; i < availMoves.length; i++) {
            let move = {};

            move.index = availMoves[i];

            board[availMoves[i]] = player;
            
            if(player === 'X') {
                let result = minimax(board, 'O');
                move.score = result.score;
            }
            if(player === 'O') {
                let result = minimax(board, 'X');
                move.score = result.score;

            }
            board[availMoves[i]] = '';

            moves.push(move);
        }

        let bestScore = (player === 'X') ? -100 : 100;
        let bestMove;

        // Find the move with the highest score
        moves.forEach(move => {
            if(player === 'X') {
                if(move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }

            } else {

                if(move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move;
                }
            }
            
        });
        return bestMove;

    }

    return {
        getName,
        isMyTurn,
        setMyTurn,
        getCounter,
        isAI,
        getMove
    };

};

