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
    var inputData = GetData();
    var bitFrequency = new Array(inputData[0].length).fill(0);
    var gammaRate = "";
    var epsilonRate = "";

    inputData.forEach(item => {
        for(var i = 0; i < item.length; i++)
        {
            if(item[i] == "1")
            {
                ++bitFrequency[i];
            }
        }
    });

    bitFrequency.forEach(x => {
        gammaRate += (x > (inputData.length / 2)) ? "1" : "0";
        epsilonRate += (x > (inputData.length / 2)) ? "0" : "1";
    })

    var powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
    
    console.log(`The Gamme Rate is: ${gammaRate}. The Epsilon Rate is: ${epsilonRate}. The power rate is: ${powerConsumption}!`);

}

function Part2()
{
    var o2Data = GetData();
    var co2Data = [...o2Data];
    var index = 0;
    var arrayLength = o2Data[0].length;

    while(o2Data.length > 1 && index < arrayLength)
    {
        var commonBitForIndex = findBitAtLocation(index, true, o2Data);
        o2Data = o2Data.filter(x => x[index] == commonBitForIndex);
        ++index;
    }

    index = 0;

    while(co2Data.length > 1  && index < arrayLength)
    {
        var commonBitForIndex = findBitAtLocation(index, false, co2Data);
        co2Data = co2Data.filter(x => x[index] == commonBitForIndex);
        ++index;
    }

    var lifeSupportRating = parseInt(o2Data[0], 2) * parseInt(co2Data[0], 2);
    
    console.log(`The Oxygen Rating is: ${o2Data[0]}. The CO2 Rating is: ${co2Data[0]}. The Life Support Rating is: ${lifeSupportRating}!`);
}

function findBitAtLocation(index, mostCommon, dataSet)
{
    var retVal1 = mostCommon ? "1" : "0";
    var retVal2 = mostCommon ? "0" : "1";
    var frequencyCount = 0;
    dataSet.forEach(item => {
        if(item[index] == "1")
        {
            ++frequencyCount;
        }
    });
    return (frequencyCount >= dataSet.length / 2) ? retVal1 : retVal2;
}

Part1();
Part2();