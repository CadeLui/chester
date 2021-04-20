/*
A chess bot for the chat program Discord
written by Cade Luinenburg
Libraries written by Amish Shah and Max Beatty
*/

const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();
dotenv.config();

/*
  a chess piece
*/
class piece
{
    /*
    Assigns certain private variables
    currentPos (int) - A coordinate of where the piece currently is
    */
    contructor(currentPos)
    {
        this.currentPos = currentPos;
        this.startPos = currentPos;
    }

    /*
    Determins if a move is legal based off of a destination
    destination (int) - A coordinate of the desired location for a piece to move to
    return (bool) - True if the move is legal, false if the move is illegal
    */
    legalMove(destination)
    {
        return false;
    }
}

/*
a pawn piece
*/
class Pawn extends piece
{
    constructor(currentPos)
    {
        super(currentPos);
        console.log(currentPos)
    }
    
    legalMove(destination)
    {
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

const pawn = new Pawn([0,0]);

client.on("ready", () => {
    console.log("E7 -> E5");
});

client.on("message", msg => {
    if (!msg.content.startsWith("."))
        return;
    
    if (msg.content.startsWith(".showBoard"))
    {
        msg.reply(pawn.legalMove([1,0]))
    }
});

client.login(process.env.TOKEN);