var fs = require('fs');

function GetData(fileName)
{
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return data.split(',');
      } catch (err) {
        console.error(err)
    }
}

function Part1()
{
    var inputData = GetData('input.txt');
    var fishData = inputData.map(x => Number(x));
    var median = findMedian(fishData);
    var fuelConsumed = 0;

    fishData.forEach(x => {
        fuelConsumed += Math.abs(x - median);
    });

    console.log(fuelConsumed);
}

function Part2()
{
    var inputData = GetData('input.txt');
    var fishData = inputData.map(x => Number(x));
    var average = Math.round(fishData.reduce((a, b) => a + b) / fishData.length);
    var fuelConsumed = 0;

    fishData.forEach(x => {
        var distance = Math.abs(x - average);
        var fuel = (distance * (distance + 1)) / 2;
        fuelConsumed += fuel;
    });

    console.log(fuelConsumed);    
}

function findMedian(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

Part1();
Part2();