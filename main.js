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

/*
handles moving a chess piece
*/
class MoveHandler
{
    constructor()
    {
    }
    move()
    {}
    capture()
    {}
}

class Game
{
    genBoardString()
    {
        this.boardString = "```"
        for (var y = 0; y < this.board.length; y++)
        {
            for (var x = 0; x < this.board.length; x++)
            {
                this.boardString += this.board[y][x] + " "
            }
            this.boardString += "\n"
        }
        this.boardString += "```"

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
        this.genBoardString()
    }
}

const board = new Game();
const moveManager = new MoveHandler();

client.on("ready", () => {
    console.log("E7 -> E5");
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
        return;
    
    if (msg.content.startsWith(".showBoard"))
        msg.channel.send(board.boardString)
});

client.login(process.env.TOKEN);