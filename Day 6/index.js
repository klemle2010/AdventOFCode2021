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
    var counter = 0;

    while(counter < 80)
    {
        var fishToAdd = 0;

        for(var i = 0; i < fishData.length; i++)
        {
            if(fishData[i] == 0)
            {
                fishData[i] = 6;
                fishToAdd++;
            }
            else
            {
                fishData[i]--;
            }
        }
        fishData = fishData.concat(new Array(fishToAdd).fill(8));
        counter++;
    }

    console.log(`The number of fish after 80 days is: ${fishData.length}`);
}

function Part2()
{
    var inputData = GetData('input.txt').map(x => Number(x));
    var counter = 0;
    var fishData = new Array(9).fill(0);

    inputData.forEach(x => {
        fishData[x]++;
    });

    while(counter < 256)
    {
        var zeroCount = fishData[0];
        for(var i = 0; i < 8; i++)
        {
            fishData[i] = fishData[i+1];
        }
        fishData[8] = zeroCount;
        fishData[6] += zeroCount;
        counter++;
    }

    var arraySum = fishData.reduce((a,b) => a + b, 0);
    console.log(`The number of fish after 256 days is: ${arraySum}`);
}

Part1();
Part2();