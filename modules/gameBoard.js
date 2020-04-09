const gameBoard = (() => { 
    // Private
    const squares = document.querySelectorAll('.square');
    const currentBoard = [];
    let winningSquares = [];

    squares.forEach(square => {
        currentBoard.push('');
    });
    
    const render = () => {
        squares.forEach((square, index) => {
            square.textContent = currentBoard[index];
        });
    };

    // Public
    const getBoardState = () => currentBoard;

    const getFreeSquares = (board) => {
        const freeSquares = [];
        for(let i = 0; i < board.length; i++) {
            if(board[i] === '') {
                freeSquares.push(i);
            }
        }
        return freeSquares;
    };

    const reset = () => {
        
        currentBoard.length = 0;

        squares.forEach(square => {
            square.classList.remove('win');
            square.classList.add('free');
            currentBoard.push('');
        })
        render();
        winningSquares.length = 0;
    };

    const stopInput = () => {
        squares.forEach(square => square.classList.remove('free'));
    };

    const startInput = () => {
        squares.forEach((square, index) => {
            if(currentBoard[index] === '') {
                square.classList.add('free');
            }
        })
    };

    const isValidMove = (square) => square.classList.contains('free') ? true : false;

    const updateBoard = (square, counter) => {
        currentBoard[square] = counter;
        squares.forEach(square => {
            if(square.dataset.num === square) {
                square.classList.remove('free');
            }
        });
        render();
    };

    const boardInEndState = (player, board) => {
        let gotWin = false;
        if(board[0]) {
            if(board[0] === board[1] && board[0] === board[2]) { // top horizontal win
                winningSquares = [0, 1, 2];
                gotWin = true;
            }
            if(board[0] === board[3] && board[0] === board[6]) { // left vertical win
                winningSquares = [0, 3, 6];
                gotWin = true;
            }
            if(board[0] === board[4] && board[0] === board[8]) { // diagonal win
                winningSquares = [0, 4, 8];
                gotWin = true;
            }
            if(gotWin && player === board[0]) {
                return true;
            }
        }
        if(board[1]) {
            gotWin = false;
            if(board[1] === board[4] && board[1] === board[7]) { // middle vertical win
                winningSquares = [1, 4, 7];
                gotWin = true;
            }
            if(gotWin && player === board[1]) {
                return true;
            }
        }
        if(board[2]) {
            gotWin = false;
            if(board[2] === board[5] && board[2] === board[8]) { // right vertical win
                winningSquares = [2, 5, 8];
                gotWin = true;
            }
            if(board[2] === board[4] && board[2] === board[6]) { // diagonal win
                winningSquares = [2, 4, 6];
                gotWin = true;
            }
            if(gotWin && player === board[2]) {
                return true;
            }
        }
        if(board[3]) {
            gotWin = false;
            if(board[3] === board[4] && board[3] === board[5]) { // middle horizontal win
                winningSquares = [3, 4, 5];
                gotWin = true;
            }
            if(gotWin && player === board[3]) {
                return true;
            }
        }
        if(board[6]) {
            gotWin = false;
            if(board[6] === board[7] && board[6] === board[8]) { // bottom horizontal win
                winningSquares = [6, 7, 8];
                gotWin = true;
            }
            if(gotWin && player === board[6]) {
                return true;
            }
        }
        
        return false; // Game not over yet
    };

    
    const drawWinningLine = () => {
        squares.forEach(square => {
            winningSquares.forEach(win => {
                if(parseInt(square.dataset.num) === win) {
                    square.classList.add('win');
                }
            });
        });
        render();
    };
    
    return {
        reset,
        getBoardState,
        isValidMove,
        updateBoard,
        getFreeSquares,
        boardInEndState,
        stopInput,
        drawWinningLine,
        startInput
    };
})();
