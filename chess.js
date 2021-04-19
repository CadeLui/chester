/*
  a chess piece
*/
class piece
{
    #currentPos = [0, 0];
    #moveOffset = [0, 0];
    /*
    Assigns certain private variables
    currentPos (int) - A coordinate of where the piece currently is
    moveOffset (int) - Where the piece can move
    */
    contructor(currentPos, moveOffset)
    {
        this.#currentPos = currentPos;
        this.#moveOffset = moveOffset;
    }

    get currentPos()
    {
        return this.currentPos;
    }

    /*
    Determins if a move is legal based off of a destination
    destination (int) - A coordinate of the desired location for a piece to move to
    return (bool) - True if the move is legal, false if the move is illegal
    */
    legalMove(destination)
    {
        var move = [Math.abs(currentPos[0]-destination[0]),Math.abs(currentPos[1]-destination[1])];
        if (move == this.moveOffset)
            return true;
        else return false;
    }
}

/*
a pawn piece
*/
class Pawn extends piece
{
    constructor(currentPos)
    {
        super(currentPos, [1, 0]);
    }
    
    legalMove(destination)
    {
        var normalMove = super.legalMove(destination);
    }
}

class game
{
    constructor()
    {
        this.board = [
            ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b'],
            ['b', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
            ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b'],
            ['b', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
            ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b'],
            ['b', 'w', 'b', 'w', 'b', 'w', 'b', 'w'],
            ['w', 'b', 'w', 'b', 'w', 'b', 'w', 'b'],
            ['b', 'w', 'b', 'w', 'b', 'w', 'b', 'w']
        ];
    }
}