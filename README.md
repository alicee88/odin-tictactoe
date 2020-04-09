# Tic Tac Toe

An Odin project to practice HTML/CSS/JS skills.

Features include:
* 2-player or play against an AI
* Difficulty levels for the AI:
  * Terrible - AI picks a random move
  * Decent - AI looks one move ahead and will make a move depending on whether it can win or is about to lose
  * Unbeatable - Uses the [minimax](https://en.wikipedia.org/wiki/Minimax) algorithm to play through all the future moves 
  and assess the best one.
  
Implementing the minimax algorithm was definitely the biggest challenge for this project. It was a good opportunity to practice recursive functions,
although it made debugging pretty tough as the nested calls got complicated quickly. Reducing the board to a known near-end-state and 
working from there helped cut down the complexity. 

It was also good to get some experience of factory functions and modules, and appreciating the difference (factory functions for
when you need multiples of a thing (e.g. players), modules for when you need one (e.g. gameboard). Being able to specify private and 
public interfaces is good - many of my previous projects polluted the global namespace pretty heavily.

I used:
* https://www.transparenttextures.com/ for the background
* https://fontawesome.com/ for the close button on the settings dialog.

You can try it [here](https://alicee88.github.io/odin-tictactoe/).
