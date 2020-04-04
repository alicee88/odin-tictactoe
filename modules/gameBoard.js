const gameBoard = (() => { 
    const squares = document.querySelectorAll('.square');
    
    const boardState = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    
    const getBoardState = () => boardState;
    
    const render = () => {
        squares.forEach((square, index) => {
            square.textContent = boardState[index];
        })
    }
    
    return {
        render,
        getBoardState
    };
})();

gameBoard.render();