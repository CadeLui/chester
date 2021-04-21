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

class Game
{
    genBoardString()
    {
        this.boardString = "```\n"
        for (var y = 0; y < this.board.length+1; y++)
        {
            for (var x = 0; x < this.board.length+1; x++)
            {
                if (x == 0) 
                {
                    this.boardString += `${y}` + " "
                    continue;
                }
                if (y == 0) 
                {
                    this.boardString += `${x}` + " "
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
    }
    Occupied(y=0, x=0)
    {
        if (this.board[y][x] == '◼️' || this.board[y][x] == '◻️')
            return false;
        return true;
    }
    MakeMove(condition=true, y1=0, x1=0, y2=0, x2=0)
    {
        if (condition) {
            this.ReplacePiece(y1, x1, y2, x2)
            return true;
        } return false;
    }
    Move(y1=0, x1=0, y2=0, x2=0)
    {
        var xDif = x2-x1;
        var yDif = y2-y1;
        if (y1 == y2 && x1 == x2) return false;
        //if (this.Occupied(y2, x2)) return false;
        switch (this.board[y1][x1])
        {
            case '♜':
            case '♖':
                return this.MakeMove(
                    (
                        (x1 == x2) ||
                        (y1 == y2)
                    ),
                    y1, x1, y2, x2)
            case '♗':
            case '♝':
                return this.MakeMove(
                    (
                        ((x2-x1)/(y2-y1) == 1) ||
                        ((x2-x1)/(y2-y1) == -1)
                    ),
                    y1, x1, y2, x2)
            case '♕':
            case '♛':
                return this.MakeMove(
                    (
                        (
                            ((xDif)/(yDif) == 1) || 
                            ((xDif)/(yDif) == -1)
                        ) || 
                        (x1 == x2) ||
                        (y1 == y2)
                    ),
                    y1, x1, y2, x2)
            case '♚':
            case '♔':
                return this.MakeMove(
                    (
                        (2 > xDif > -2) && 
                        (2 > yDif > -2)
                    ),
                    y1, x1, y2, x2)
            case '♘':
            case '♞':
                return this.MakeMove(
                    (
                        (xDif*xDif) + (yDif * yDif) == 5
                    ),
                    y1, x1, y2, x2)
            case '♙':
                return this.MakeMove(
                    (
                        (
                            // Capture move
                            (this.Occupied(y2, x2)) &&
                            (2 > xDif > -2) &&
                            (yDif == -1)
                        ) ||
                        (
                            // Regular moves
                            (xDif == 0) &&
                            (
                                // Double push move
                                (y1 == 6) &&
                                (yDif == -2)
                            ) ||
                            (
                                // Standard move
                                (y1 != 6) &&
                                (yDif == -1)
                            )
                        )
                    ),
                    y1, x1, y2, x2)
            case '♟':
                return this.MakeMove(
                    (
                        (
                            // Capture move
                            (this.Occupied(y2, x2)) &&
                            (2 > xDif > -2) &&
                            (yDif == 1)
                        ) ||
                        (
                            // Regular moves
                            (xDif == 0) &&
                            (
                                // Double push move
                                (y1 == 1) &&
                                (yDif == 2)
                            ) ||
                            (
                                // Standard move
                                (y1 != 1) &&
                                (yDif == 1)
                            )
                        )
                    ),
                    y1, x1, y2, x2)
            default:
                return false;
        }
    }
}

function grabParameters(string = "", command = "")
{
    var parameters = []
    string = string.substring(command.length+1)
    for (var i=0; i<string.length; i++)
    {
        if (string[i] != " ")
        {
            for (var i2=i; i2<string.length; i2++)
            {
                if (string[i2] == " ")
                    break;
                parameters[parameters.length] += string[i2]
            }
        }
    }
    for (var i=0; i<parameters.length; i++)
    {
        parameters[i] = parameters[i].substring("undefined".length)
    }
    console.log(parameters)
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
        msg.channel.send(board.genBoardString())
    if (msg.content.startsWith(".move"))
    {
        var parameters = grabParameters(msg.content, ".move")
        board.Move(parseInt(parameters[1]), parseInt(parameters[0]), parseInt(parameters[3]), parseInt(parameters[2]))
        msg.channel.send(board.genBoardString())
    }
});

client.login(process.env.TOKEN);