const game = (() => {

    const playButton = document.querySelector('.play');
    const gameText = document.querySelector('.gameText');
    const modalOverlay = document.querySelector('.modal-overlay');
    const settingsModal = document.querySelector('.modal-settings');
    const closeModalButton = document.querySelector('#closeButton');
    const closeModalX = document.querySelector('#closeModalX');
    const squares = document.querySelectorAll('.square');
    const playAIChooser = document.querySelector('#play-AI');
    const aiLevels = document.querySelectorAll('.input-hidden');

    let player1;
    let player2;

    function startGame(p1Name, p2Name, playAI, aiLevel) {
        playButton.classList.add('restart');
        playButton.textContent = 'Restart';

        player1 = Player(p1Name, 'O', false, null);
        player2 = Player(p2Name, 'X', playAI, aiLevel);

        player1.setMyTurn(true);

        gameText.textContent = `${player1.getName()} - Choose your move`;
        gameBoard.reset();
    }

    function processPlayerMove() {
        
        if(gameBoard.isValidMove(this)) {

            let playerInControl = player1.isMyTurn() ? player1 : player2;
            let nextPlayer = player1.isMyTurn() ? player2: player1;

            gameBoard.updateBoard(this.dataset.num, playerInControl.getCounter());

            if(!player2.isAI()) {
                playerInControl.setMyTurn(false);
                nextPlayer.setMyTurn(true);
            }

            if(!gameOver(playerInControl)) {
                gameText.textContent = `${nextPlayer.getName()} - Choose your move`;

                if(player2.isAI()) {
                    processAIMove();
                }
            }
        }
    }

    function processAIMove() {
        gameText.textContent = `${player2.getName()} - Thinking...`;
        gameBoard.stopInput();

        setTimeout(() => {
            gameBoard.startInput();
            
            const square = player2.getMove();
            
            gameBoard.updateBoard(square, player2.getCounter());

            player2.setMyTurn(false);

            if(!gameOver(player2)) {
                gameText.textContent = `${player1.getName()} - Choose your move`;
            }
            
        }, 1000);
    }

    function gameOver(player) {
        const board = gameBoard.getBoardState();
        let winner = gameBoard.boardInEndState(player.getCounter(), board);
        if(winner) {
            gameText.textContent = `${player.getName()} WINS!`;
            gameBoard.drawWinningLine();
            gameBoard.stopInput();
            return true;
         }
         else if(gameBoard.getFreeSquares(board).length === 0) {
             gameText.textContent = `IT'S A DRAW!`;
             gameBoard.stopInput();
             return true;
         }
         return false;
    }

    function setAILevel() {
        aiLevels.forEach(level => level.classList.toggle('input-hidden'));
    }

    document.settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeSettingsModal();
        startGame(this.p1Name.value, this.p2Name.value, this.playAI.checked, this.level.value);
    
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
    squares.forEach(square => square.addEventListener('click', processPlayerMove));
    playAIChooser.addEventListener('click', setAILevel);

    return {

    };

})();