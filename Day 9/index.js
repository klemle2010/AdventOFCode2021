const { count } = require('console');
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

function Part1()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var rowLength = inputData[0].length;
    var splitData = [];
    var lowPoints = [];

    inputData.forEach(x => {
        splitData = splitData.concat(x.split(''));
    });
    
    splitData.forEach((element, index) => {
        if(isLowPoint(rowLength, splitData, index))
        {
            lowPoints.push(element);
        }
    });

    var riskLevel = lowPoints.reduce((a,b) => a + Number(b) + 1, 0);
    console.log(`The number of low points on the height map is: ${lowPoints.length}. The risk level is: ${riskLevel}`);
}

function isLowPoint(rowLength, splitData, index)
{
    var adjPoints = [];
    if(splitData[index - 1] != undefined && (index % rowLength != 0))
    {
        adjPoints.push(splitData[index - 1]);
    }
    if(splitData[index + 1] != undefined && (index % rowLength != rowLength - 1))
    {
        adjPoints.push(splitData[index + 1]);
    }
    if(splitData[index + rowLength] != undefined)
    {
        adjPoints.push(splitData[index + rowLength]);
    }
    if(splitData[index - rowLength] != undefined)
    {
        adjPoints.push(splitData[index - rowLength]);
    }

    return adjPoints.filter(item => item <= splitData[index]).length == 0;
}

function Part2()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var rowLength = inputData[0].length;
    var splitData = [];
    var lowPoints = [];

    inputData.forEach(x => {
        splitData = splitData.concat(x.split(''));
    });
    
    splitData.forEach((element, index) => {
        if(isLowPoint(rowLength, splitData, index))
        {
            lowPoints.push(index);
        }
    });

    var basinList = [];

    lowPoints.forEach(element => {
        var basinIndexes = [];
        findBasinSize(rowLength, splitData, element, basinIndexes);
        basinList.push(basinIndexes);
    });

    var sortedBasinList = basinList.sort((a, b) => b.length - a.length);
    var finalAnswer = (sortedBasinList[0].length + 1) * (sortedBasinList[1].length + 1) * (sortedBasinList[2].length + 1);

    console.log(`Final Answer is: ${finalAnswer}`);
}

function findBasinSize(rowLength, splitData, index, basinIndexes)
{
    var indexToCheck = index - 1;
    if(splitData[indexToCheck] != undefined && (index % rowLength != 0) && (splitData[indexToCheck] > splitData[index] && splitData[indexToCheck] != 9))
    {
        if(!basinIndexes.includes(indexToCheck))
        {
            basinIndexes.push(indexToCheck);
        }
        findBasinSize(rowLength, splitData, indexToCheck, basinIndexes);
    }
    indexToCheck = index + 1;
    if(splitData[indexToCheck] != undefined && (index % rowLength != rowLength - 1) && (splitData[indexToCheck] > splitData[index] && splitData[indexToCheck] != 9))
    {
        if(!basinIndexes.includes(indexToCheck))
        {
            basinIndexes.push(indexToCheck);
        }
        findBasinSize(rowLength, splitData, indexToCheck, basinIndexes);
    }
    indexToCheck = index + rowLength;
    if(splitData[index + rowLength] != undefined && (splitData[indexToCheck] > splitData[index] && splitData[indexToCheck] != 9))
    {
        if(!basinIndexes.includes(indexToCheck))
        {
            basinIndexes.push(indexToCheck);
        }
        findBasinSize(rowLength, splitData, indexToCheck, basinIndexes);
    }
    indexToCheck = index - rowLength;
    if(splitData[index - rowLength] != undefined && (splitData[indexToCheck] > splitData[index] && splitData[indexToCheck] != 9))
    {
        if(!basinIndexes.includes(indexToCheck))
        {
            basinIndexes.push(indexToCheck);
        }
        findBasinSize(rowLength, splitData, indexToCheck, basinIndexes);
    }
}

Part1();
Part2();