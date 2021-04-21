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
        for (var y = 0; y < this.board.length; y++)
        {
            for (var x = 0; x < this.board.length; x++)
            {
                this.boardString += this.board[y][x] + " "
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
    ReplacePiece(y1, x1, y2, x2)
    {
        this.board[y2][x2] = this.board[y1][x1]
        this.board[y1][x1] = this.blankBoard[y1][x1]
    }
    Occupied(y, x)
    {
        if (this.board[y][x] == '◼️' || this.board[y][x] == '◻️')
            return false;
        return true;
    }
    MakeMove(condition, y1, x1, y2, x2)
    {
        if (condition) {
            this.ReplacePiece(y1, x1, y2, x2)
            return true;
        } return false;
    }
    Move(y1, x1, y2, x2)
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
                    ((x1 == x2) || (y1 == y2)),
                    y1, x1, y2, x2)
            case '♗':
            case '♝':
                return this.MakeMove(
                    (
                        (x2-x1)/(y2-y1) == 1 ||
                        (x2-x1)/(y2-y1) == -1
                    ),
                    y1, x1, y2, x2)
            case '♕':
            case '♛':
                return this.MakeMove(
                    (
                        ((xDif)/(yDif) == 1 || 
                        (xDif)/(yDif) == -1) || 
                        (x1 == x2) || (y1 == y2)),
                    y1, x1, y2, x2)
            case '♚':
            case '♔':
                return this.MakeMove(
                    (2 > xDif > -2 && 2 > yDif > -2),
                    y1, x1, y2, x2)
            case '♘':
            case '♞':
                return this.MakeMove(
                    (
                        (xDif == 2 && yDif == 1) ||
                        (xDif == 1 && yDif == 2) ||
                        (xDif == -2 && yDif == -1) ||
                        (xDif == -1 && yDif == -2)
                    ),
                    y1, x1, y2, x2)
            default:
                return false;
        }
    }
}

const board = new Game();

client.on("ready", () => {
    console.log("E7 -> E5");
    console.log(board.Move(0, 2, 1, 1))
    console.log(board.genBoardString())
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
        return;
    
    if (msg.content.startsWith(".showBoard"))
        msg.channel.send(board.boardString)
});

client.login(process.env.TOKEN);