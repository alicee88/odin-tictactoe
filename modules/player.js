const Player = (name, counter) => {

    let myTurn = false;
    
    const getName = () => name;
    
    const isMyTurn = () => myTurn;
    const setMyTurn = () => myTurn = !myTurn;

    const getCounter = () => counter;

    return {
        getName,
        isMyTurn,
        setMyTurn,
        getCounter
    };

};

