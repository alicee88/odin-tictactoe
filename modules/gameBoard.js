const gameBoard = (() => { 
    // Private
    const squares = document.querySelectorAll('.square');
    const boardState = [];

    squares.forEach(square => {
        boardState.push({square: square, state: ''});
    });
    
    const render = () => {
        boardState.forEach(square => {
            square.square.textContent = square.state;
        })
    };

    // Public
    const getBoardState = () => boardState;

    const reset = () => {
        boardState.forEach(square => {
            square.square.classList.remove('win');
            square.square.classList.add('free');
            square.state = '';
        });
        render();
    }

    const isValidMove = (square) => square.classList.contains('free') ? true : false;

    const updateBoard = (square, counter) => {
        if(square.classList.contains('free')) {
            square.classList.remove('free');
            boardState.forEach((state, index) => {
                if(index === parseInt(square.dataset.num)) {
                    state.state = counter;
                }
            });
            render();
        }
    };

    const markWinningLine = (s1, s2, s3) => {
        s1.square.classList.add('win');
        s2.square.classList.add('win');
        s3.square.classList.add('win');

    };
    
    return {
        reset,
        getBoardState,
        isValidMove,
        updateBoard,
        markWinningLine
    };
})();
