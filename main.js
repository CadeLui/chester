/*
A chess bot for the chat program Discord
written by Cade Luinenburg
Discord.js written by Amish Shah and Max Beatty
dotenv written by Scott Motte
*/

const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();
dotenv.config();

const BLACK_PIECES = ['♞', '♝', '♛', '♚', '♟', '♜']
const WHITE_PIECES = ['♘', '♗', '♕', '♔', '♙', '♖']

class Game
{
    // Takes the board array and turns it into a string to reply to a message with
    // return (string) - A string representing the current board
    genBoardString()
    {
        this.boardString = "```\n"
        for (var y = 0; y < this.board.length+1; y++)
        {
            for (var x = 0; x < this.board.length+1; x++)
            {
                if (x == 0 && y == 0)
                {
                    this.boardString += "  "
                    continue;
                }
                if (x == 0) 
                {
                    this.boardString += `${y-1}` + " "
                    continue;
                }
                if (y == 0) 
                {
                    this.boardString += `${x-1}` + " "
                    continue;
                }
                this.boardString += this.board[y-1][x-1] + " "
            }
            this.boardString += "\n"
        }
        this.boardString += "```"
        return this.boardString
    }
    constructor()
    {
        this.board = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️'],
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♔', '♕', '♗', '♘', '♖']
        ];
        this.blankBoard = [
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️'],
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️'],
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️'],
            ['◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️'],
            ['◼️', '◻️', '◼️', '◻️', '◼️', '◻️', '◼️', '◻️']
        ]
        this.genBoardString()
    }
    ReplacePiece(y1=0, x1=0, y2=0, x2=0)
    {
        this.board[y2][x2] = this.board[y1][x1]
        this.board[y1][x1] = this.blankBoard[y1][x1]
        this.genBoardString()
    }
    Occupied(y=0, x=0)
    {
        if (this.board[y][x] == '◼️' || this.board[y][x] == '◻️')
            return [false, this.board[y][x]];
        return [true, this.board[y][x]];
    }
    MakeMove(condition=true, y1=0, x1=0, y2=0, x2=0)
    {
        if (condition) {
            this.ReplacePiece(y1, x1, y2, x2)
            return true;
        } return false;
    }
<<<<<<< HEAD
    // Check if a rook's destination goes over another piece
    // y1 (int) - Rook's starting y coordinate
    // x1 (int) - Rook's starting x coordinate
    // y2 (int) - Rook's destination y coordinate
    // x2 (int) - Rook's destination x coordinate
    // return (bool) - True if destination jumps over piece
    RookJumpCheck(y1=0, x1=0, y2=0, x2=0)
    {
        var returnFlag = false;
        // If movement is in the positive direction
        if (y1 < y2 || x1 < x2)
        {
            // Check possible moves towards east
            for (var i = x1+1; i < x2-1; i++){
                if (this.Occupied(y1, i)[0]){
                    console.log(this.Occupied(y1, i)[1] + `1 ${i} ${y1}`)
                    returnFlag = true;
                    break;}}
            // Check possible moves towards south
            for (var i = y1+1; i < y2-1; i++){
                if (this.Occupied(i, x1)[0]){
                    console.log(this.Occupied(i, x1)[1] + `2 ${x1} ${i}`)
                    returnFlag = true;
                    break;}}
        } else {
            // Check possible moves towards west
            for (var i = x2-1; i < x1+1; i--){
                if (this.Occupied(y1, i)[0]) {
                    console.log(this.Occupied(y1, i)[1] + `3 ${i} ${y1}`)
                    returnFlag = true; 
                    break;}}
            // Check possible moves towards north
            for (var i = y2-1; i < y1+1; i--){
                if (this.Occupied(i, x1)[0]){
                    console.log(this.Occupied(i, x1)[1] + `4 ${x1} ${i}`)
                    returnFlag = true; 
                    break;}}
        }
        console.log(returnFlag);
        return returnFlag;
    }
    // Check if a Bishop's destination goes over another piece
    // y1 (int) - Bishop's starting y coordinate
    // x1 (int) - Bishop's starting x coordinate
    // y2 (int) - Bishop's destination y coordinate
    // x2 (int) - Bishop's destination x coordinate
    // return (bool) - True if destination jumps over piece
=======
    RookJumpCheck(y1=0, x1=0, y2=0, x2=0)
    {
        var xDif = x2-x1;
        var yDif = y2-y1;

        if (y1 < y2 || x1 < x2)
        {
            for (var i = x1; i < x2-1; i++){
                if (this.Occupied(y1, i)[0])
                    return true;
                console.log(this.Occupied(y1, i)[0])}
            for (var i = y1; i < y2-1; i++){
                if (this.Occupied(i, x1)[0])
                    return true;
                console.log(this.Occupied(i, x1)[0])}
        } else {
            for (var i = x2; i < x1-1; i--){
                if (this.Occupied(y1, i)[0]) 
                    return true;
                console.log(this.Occupied(y1, i)[0])}
            for (var i = y2; i < y1-1; i--){
                if (this.Occupied(i, x1)[0])
                    return true;
                console.log(this.Occupied(i, x1)[0])}
        }
        return false;
    }
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
    BishopJumpCheck(y1=0, x1=0, y2=0, x2=0)
    {
        var slope = (x2-x1)/(y2-y1);
        var returnFlag = false
        if (slope == 1)
        {
            if (x2>x1)
            {
<<<<<<< HEAD
                // Checking south-eastern movement
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
                for (var i=1; x1+i<x2; i++)
                    if (this.Occupied(y1+i, x1+i)[0])
                    {
                        console.log(this.Occupied(y1+i, x1+i)[1] + `1 ${x1+i} ${y1+i}`)
                        returnFlag = true;
                    }
            }
<<<<<<< HEAD
            // Checking north-western movement
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
            else
            {
                for (var i=1; x2+i<x1; i++)
                    if (this.Occupied(y1-i, x1-i)[0])
                    {
                        console.log(this.Occupied(y1-i, x1-i)[1] + `2 ${x1-i} ${y1-i}`)
                        returnFlag = true;
                    }
            }
        } else {
<<<<<<< HEAD
            // Checking north-eastern movement
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
            if (x2>x1)
            {
                for (var i=1; x1+i<x2; i++)
                    if (this.Occupied(y1+i, x1-i)[0])
                    {
                        console.log(this.Occupied(y1+i, x1-i)[1] + `3 ${x1+i} ${y1-i}`)
                        returnFlag = true;
                    }
            }
<<<<<<< HEAD
            // Checking south-western movement
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
            else
            {
                for (var i=1; x2+i<x1; i++)
                    if (this.Occupied(y1-i, x1+i)[0])
                    {
                        console.log(this.Occupied(y1-i, x1+i)[1] + `4 ${x1-i} ${y1+i}`)
                        returnFlag = true;
                    }
            }
        }
        console.log(returnFlag)
        return returnFlag;
    }
<<<<<<< HEAD
    // Check if a piece can go to a destination and move it there
    // y1 (int) - Piece's starting y coordinate
    // x1 (int) - Piece's starting x coordinate
    // y2 (int) - Piece's destination y coordinate
    // x2 (int) - Piece's destination x coordinate
    // return (bool) - True if destination is viable
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
    Move(y1=0, x1=0, y2=0, x2=0)
    {
        var xDif = x2-x1;
        var yDif = y2-y1;
        if (y1 == y2 && x1 == x2) return false;
        switch (this.board[y1][x1])
        {
            case '♜':
            case '♖':
<<<<<<< HEAD
                // A rook's movement is on an axis, so one of the destination positions should be the same as starting
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
                if (!((x1 == x2) || (y1 == y2)))
                    return false;
                // Check if theres anything between location and destination
                if (this.RookJumpCheck(y1, x1, y2, x2))
                    return false;
                return this.MakeMove(
                    (
                        // Check to see if move is on an axis
                        (x1 == x2) || (y1 == y2)
                    ),
                    y1, x1, y2, x2)
            case '♗':
            case '♝':
<<<<<<< HEAD
                // 1 is a perfect diagonal slope, so a Bishop's movement slope should be either 1 or -1
=======
>>>>>>> 8630e80d782434d1aa093893d8c3b5ef2353ea65
                var slope = (x2-x1)/(y2-y1);
                if (!((slope == 1) || (slope == -1)))
                    return false;
                if (this.BishopJumpCheck(y1, x1, y2, x2))
                    return false;
                return this.MakeMove(
                    (
                        // Checking to see if move is diagonal via slope
                        (slope == 1) ||
                        (slope == -1)
                    ),
                    y1, x1, y2, x2)
            case '♕':
            case '♛':
                var slope = (x2-x1)/(y2-y1);
                if ((x1 == x2) || (y1 == y2))
                {
                    if (this.RookJumpCheck(y1, x1, y2, x2))
                        return false;
                    return this.MakeMove(
                        (
                            // Check to see if move is on an axis
                            (x1 == x2) || (y1 == y2)
                        ),
                        y1, x1, y2, x2)
                }
                if (slope == 1 || slope == -1)
                {
                    if (this.RookJumpCheck(y1, x1, y2, x2))
                        return false;
                    return this.MakeMove(
                        (
                            // Checking to see if move is diagonal via slope
                            (slope == 1) ||
                            (slope == -1)
                        ),
                        y1, x1, y2, x2)
                }
                return false;
            case '♚':
            case '♔':
                return this.MakeMove(
                    (
                        // Checking to see if move is more than one unit away
                        (2 > xDif > -2) && 
                        (2 > yDif > -2)
                    ),
                    y1, x1, y2, x2)
            case '♘':
            case '♞':
                return this.MakeMove(
                    // Checking if the hypotenuse of the move comes out to sqrt(5)
                    ((xDif*xDif) + (yDif * yDif) == 5),
                    y1, x1, y2, x2)
            case '♙':
                // If doing double push, cancel if first square is occupied.
                if (yDif == -2 && this.Occupied(y2+1, x2)[0]) return false;
                // Capture move
                // Check if the move makes you go more than one unit diagonal, 
                // if the move is one unit forward and either one unit left or right.
                if (this.Occupied(y2, x2)[0])
                    return this.MakeMove(
                        (2 > xDif > -2 && yDif == -1 && xDif != 0),
                        y1, x1, y2, x2)
                else
                    return this.MakeMove(
                        // Regular moves
                        (
                            // If on the same X axis
                            xDif == 0 && 
                            (
                                // Double push move
                                // Check if current position is the starting line
                                // Check if the move is exactly two units ahead
                                (y1 == 6 && yDif == -2) ||
                                // Standard move
                                // Check if the move is only one unit forward
                                (yDif == -1)
                            )
                        ),
                        y1, x1, y2, x2);
            case '♟':
                // If doing double push, cancel if first square is occupied.
                if (yDif == 2 && this.Occupied(y2-1, x2)[0]) return false;
                // Capture move
                // Check if the move makes you go more than one unit diagonal, 
                // if the move is one unit forward and either one unit left or right.
                if (this.Occupied(y2, x2)[0])
                    return this.MakeMove(
                        (2 > xDif > -2 && yDif == 1 && xDif != 0),
                        y1, x1, y2, x2)
                else
                    return this.MakeMove(
                        // Regular moves
                        (
                            // If on the same X axis
                            xDif == 0 && 
                            (
                                // Double push move
                                // Check if current position is the starting line
                                // Check if the move is exactly two units ahead
                                (y1 == 1 && yDif == 2) ||
                                // Standard move
                                // Check if the move is only one unit forward
                                (yDif == 1)
                            )
                        ),
                        y1, x1, y2, x2);
            default:
                return false;
        }
    }
}

// Takes a string, strips the command from it, and returns an array of parameters seperated by spaces
// string (string) - The user's full input
// command (string) - The command the user input
// return (array(string)) - An array of all the separate parameters.
function grabParameters(string = "", command = "")
{
    var parameters = []
    var parameter = ""
    string = string.substring(command.length+1)
    for (var i=0; i<string.length; i++)
    {
        if (string[i] == " ")
        {
            parameters.push(parameter);
            parameter = "";
        }
        else
            parameter += string[i];
    }
    parameters.push(parameter)
    return parameters
}

const board = new Game();

client.on("ready", () => {
    console.log("E7 -> E5");
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
        return;
    console.log(msg.content)
    
    if (msg.content.startsWith(".showBoard"))
        msg.channel.send(board.boardString)
    if (msg.content.startsWith(".move"))
    {
        var parameters = grabParameters(msg.content, ".move")
        if (board.Move(parseInt(parameters[1]), parseInt(parameters[0]), parseInt(parameters[3]), parseInt(parameters[2])))
            msg.channel.send(board.boardString)
        else msg.channel.send("Failed move.")
    }
});

client.login(process.env.TOKEN);