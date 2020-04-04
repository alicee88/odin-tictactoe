const game = (() => {

    const playButton = document.querySelector('.play');
    const gameText = document.querySelector('.gameText');
    const modalOverlay = document.querySelector('.modal-overlay');
    const settingsModal = document.querySelector('.modal-settings');
    const closeModalButton = document.querySelector('#closeButton');
    const closeModalX = document.querySelector('#closeModalX');
    const squares = document.querySelectorAll('.square');

    let player1;
    let player2;

    function startGame(p1Name, p2Name, playAI) {
        playButton.classList.add('restart');
        playButton.textContent = 'Restart';

        player1 = Player(p1Name, 'O');
        player2 = Player(p2Name, 'X');

        player1.setMyTurn(true);

        gameText.textContent = `${player1.getName()} - Choose your move`;
        gameBoard.reset();
    }

    function processMove() {
        if(gameBoard.isValidMove(this)) {

            let playerInControl = player1.isMyTurn() ? player1 : player2;
            let nextPlayer = player1.isMyTurn() ? player2: player1;

            gameBoard.updateBoard(this, playerInControl.getCounter());

            playerInControl.setMyTurn(false);
            nextPlayer.setMyTurn(true);

            let winner = gameOver();
            if(winner) {
                if (winner === player1.getCounter()) {
                    gameText.textContent = `${player1.getName()} WINS!`;
                }
                else if (winner === player2.getCounter()) {
                    gameText.textContent = `${player2.getName()} WINS!`;
                }
                else {
                    gameText.textContent = 'IT\'S A DRAW!';
                }
                stopPlayerInput();
            } else {
                gameText.textContent = `${nextPlayer.getName()} - Choose your move`;
            }
        }
    }

    function gameOver() {
        const board = gameBoard.getBoardState();
        if(board[0].state) {
            if(board[0].state === board[1].state && board[0].state === board[2].state) { // top horizontal win
                gameBoard.markWinningLine(board[0], board[1], board[2]);
                return board[0].state;
            }
            if(board[0].state === board[3].state && board[0].state === board[6].state) { // left vertical win
                gameBoard.markWinningLine(board[0], board[3], board[6]);    
                return board[0].state;
            }
            if(board[0].state === board[4].state && board[0].state === board[8].state) { // diagonal win
                gameBoard.markWinningLine(board[0], board[4], board[8]);    
                return board[0].state;
            }
        }
        if(board[1].state) {
            if(board[1].state === board[4].state && board[1].state === board[7].state) { // middle vertical win
                gameBoard.markWinningLine(board[1], board[4], board[7]);    
                return board[1].state;
            }
        }
        if(board[2].state) {
            if(board[2].state === board[5].state && board[2].state === board[8].state) { // right vertical win
                gameBoard.markWinningLine(board[2], board[5], board[8]);    
                return board[2].state;
            }
            if(board[2].state === board[4].state && board[2].state === board[6].state) { // diagonal win
                gameBoard.markWinningLine(board[2], board[4], board[6]);    
                return board[2].state;
            }
        }
        if(board[3].state) {
            if(board[3].state === board[4].state && board[3].state === board[5].state) { // middle horizontal win
                gameBoard.markWinningLine(board[3], board[4], board[5]);    
                return board[3].state;
            }
        }
        if(board[6].state) {
            if(board[6].state === board[7].state && board[6].state === board[8].state) { // bottom horizontal win
                gameBoard.markWinningLine(board[6], board[7], board[8]);    
                return board[6].state;
            }
        }
        
        // Draw if no free space on the board
        let draw = true;
        for(let i = 0; i < board.length; i++) {
            if(!board[i].state) {
                draw = false;
                break;
            }
        }
        if(draw)
            return 'draw';
        return null;
    }

    function stopPlayerInput() {
        const board = gameBoard.getBoardState();
        board.forEach(square => square.square.classList.remove('free'));
    }

    document.settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeSettingsModal();
        startGame(this.p1Name.value, this.p2Name.value, this.playAI.value);
    
    });

    function showSettingsModal() {
        settingsModal.classList.remove('closed');
        modalOverlay.classList.remove('closed');
    }

    function closeSettingsModal() {
        settingsModal.classList.add('closed');
        modalOverlay.classList.add('closed');
    }

    closeModalButton.addEventListener('click', closeSettingsModal);
    closeModalX.addEventListener('click', closeSettingsModal);
    modalOverlay.addEventListener('click', closeSettingsModal);
    playButton.addEventListener('click', showSettingsModal);
    squares.forEach(square => square.addEventListener('click', processMove));

    
    return {

    };

})();