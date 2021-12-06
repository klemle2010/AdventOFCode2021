var fs = require('fs');

function GetData(fileName)
{
    try {
        const data = fs.readFileSync(fileName, 'utf8')
        return data.split(/\r?\n/);
      } catch (err) {
        console.error(err)
    }
}

function Part1()
{
    var inputData = GetData('input.txt')[0].split(',');
    var boardData = GetData('boards.txt').filter(x => x != '');
    var boardList = [];
    var counter = 0;
    var dataSet = [];

    boardData.forEach(element => {
        if(counter == 5)
        {
            boardList.push(new BingoBoard(dataSet));
            counter = 0;
            dataSet = [];
        }
        var elementdata = element.split(' ').filter(x => x != '');
        dataSet[counter] = elementdata.map(x => new BingoSpace(x));
        counter++;
    });

    var counter = 0;
    var winFound = false;

    do
    {
        for(var board of boardList){
            board.markBoard(inputData[counter]);
            winFound = board.checkWin();
            if(winFound)
            {
                board.outputResult();
                break;
            }
        };
        counter++;
    }while (!winFound && counter < inputData.length)
}

function Part2()
{
    var inputData = GetData('input.txt')[0].split(',');
    var boardData = GetData('boards.txt').filter(x => x != '');
    var boardList = [];
    var counter = 0;
    var dataSet = [];

    boardData.forEach(element => {
        if(counter == 5)
        {
            boardList.push(new BingoBoard(dataSet));
            counter = 0;
            dataSet = [];
        }
        var elementdata = element.split(' ').filter(x => x != '');
        dataSet[counter] = elementdata.map(x => new BingoSpace(x));
        counter++;
    });

    var counter = 0;
    var winFound = false;
    var lastBoardRemoved;

    do
    {
        var loserList = boardList.filter(x => !x.hasWon);

        loserList.forEach((board, index) => {
            board.markBoard(inputData[counter]);
            winFound = board.checkWin();
            if(winFound)
            {
                lastBoardRemoved = board;
                board.hasWon = true;
            }
        });
        counter++;
    }while (loserList.length > 0 && counter < inputData.length)
    
    lastBoardRemoved.outputResult();
}

class BingoBoard
{
    constructor(boardData)
    {
        this.board = boardData;
        this.lastInput;
        this.hasWon = false;
    }

    markBoard(input)
    {
        this.lastInput = input;

        this.board.forEach((row, x) => {
            row.forEach((col, y) => {
                if(col.value == input)
                {
                    col.marked = true;
                }
            })
        });
    }

    checkRow(x)
    {
        return this.board[x].every(item => item.marked);
    }

    checkCol(y)
    {
        return this.board[0][y].marked && this.board[1][y].marked && this.board[2][y].marked && this.board[3][y].marked && this.board[4][y].marked;
    }

    checkWin()
    {
        var winFound = false;
        var counter = 0;
        while(!winFound && counter < 5)
        {
            winFound = this.checkRow(counter);
            if(!winFound)
            {
                winFound = this.checkCol(counter);
            }
            counter++;
        }
        return winFound;
    }

    outputResult()
    {
        var sum = 0;
        this.board.forEach((row, x) => {
            row.forEach((col, y) => {
                if(!col.marked)
                {
                    sum += col.value;
                }
            })
        });

        console.log(`The Winning Result is ${sum} * ${this.lastInput}: ${sum * this.lastInput}`);
    }
}

class BingoSpace
{
    constructor(value)
    {
        this.value = Number(value);
        this.marked = false;
    }
}

Part1();
Part2();