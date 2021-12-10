var fs = require('fs');

function GetData(fileName, seperator)
{
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return data.split(seperator);
      } catch (err) {
        console.error(err)
    }
}

var openChars = ['(','[','{','<'];
var closeChars = [')',']','}','>'];

function Part1()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var errorChars = [];

    inputData.forEach(x => {
        var row = x.split('');
        var inputSet = [];
        for(index = 0; index < row.length; index++)
        {
            var i = row[index];
            if(openChars.includes(i))
            {
                inputSet.push(i);
            }
            else
            {
                if(openChars.indexOf(inputSet[inputSet.length - 1]) == closeChars.indexOf(i))
                {
                    inputSet.splice([inputSet.length - 1], 1);
                }
                else
                {
                    errorChars.push(i);
                    break;
                }
            }
        }
    });

    var errorSum = errorChars.reduce((a, b) => a + getValue(b, true), 0);
    console.log(`The error sum of the navigation subsystem is: ${errorSum}`);
}

function getValue(b, isPart1)
{
    switch(b)
    {
        case ')':
            return isPart1 ? 3 : 1;
        case ']':
            return isPart1 ? 57 : 2;
        case '}':
            return isPart1 ? 1197 : 3;
        case '>':
           return isPart1 ? 25137 : 4;
    }
}

function Part2()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var rowScores = [];

    inputData.forEach(x => {
        var row = x.split('');
        var inputSet = [];
        var isValid = true;
        for(index = 0; index < row.length; index++)
        {
            var i = row[index];
            if(openChars.includes(i))
            {
                inputSet.push(i);
            }
            else
            {
                if(openChars.indexOf(inputSet[inputSet.length - 1]) == closeChars.indexOf(i))
                {
                    inputSet.splice([inputSet.length - 1], 1);
                }
                else
                {
                    isValid = false;
                    break;
                }
            }
        }
        if(isValid)
        {
            rowScores.push(scoreRow(inputSet.reverse()));
        }
    });

    var middleScore = rowScores.sort((a, b) => a - b)[Math.floor(rowScores.length / 2)];
    console.log(`The middle score is: ${middleScore}`);

}

function scoreRow(inputSet)
{
    var score = 0;
    inputSet.forEach(x => {
        score = (5 * score);
        score += getValue(closeChars[openChars.indexOf(x)], false);
    });
    return score;
}

Part1();
Part2();