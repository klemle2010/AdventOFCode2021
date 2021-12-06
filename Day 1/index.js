var fs = require('fs');

function GetData()
{
    try {
        const data = fs.readFileSync('input.txt', 'utf8')
        return data.split(/\r?\n/);
      } catch (err) {
        console.error(err)
      }
}

function Part1()
{
    var inputData = GetData().map(x => Number(x));
    var prevInput = null;
    var increaseCounter = 0;

    inputData.forEach(item => {
        if(prevInput !== null && item > prevInput)
        {
            increaseCounter++;
        }
        prevInput = item;
    });
    console.log(`The number of increases in the file of length: ${inputData.length} was: ${increaseCounter}`);
}

function Part2()
{
    var inputData = GetData().map(x => Number(x));
    var increaseCounter = 0;
    var windowSize = 3;

    for(var i = windowSize; i < inputData.length; i++)
    {
        if(inputData[i] > inputData[i - windowSize])
        {
            increaseCounter++;
        }
    }
    console.log(`With a window size of ${windowSize}, the number of sliding window increases in the file of length: ${inputData.length} was: ${increaseCounter}`);
}

Part1();
Part2();