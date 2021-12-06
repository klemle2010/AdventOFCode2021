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
    var inputData = GetData('input.txt');
    var pointData = {};

    inputData.forEach(item => {
        lineData = item.split(' -> ');
        var [x1, y1] = lineData[0].split(',');
        var [x2, y2] = lineData[1].split(',');

        if(x1 == x2)
        {
            for(var i = Math.min(y1, y2); i <= Math.max(y1, y2); i++)
            {
                var point = `${x1},${i}`;
                pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;
            }
        }
        else if(y1 == y2)
        {
            for(var i = Math.min(x1, x2); i <= Math.max(x1, x2); i++)
            {
                var point = `${i},${y1}`;
                pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;
            }
        }
    });

    var overLappingPoints = Object.entries(pointData).filter(x => x[1] > 1);
    console.log(`Number of overlapping points: ${overLappingPoints.length}`);
}

function Part2()
{
    var inputData = GetData('input.txt');
    var pointData = {};

    inputData.forEach(item => {
        lineData = item.split(' -> ');
        var [x1, y1] = lineData[0].split(',').map(x => Number(x));
        var [x2, y2] = lineData[1].split(',').map(x => Number(x));;

        if(x1 == x2)
        {
            for(var i = Math.min(y1, y2); i <= Math.max(y1, y2); i++)
            {
                var point = `${x1},${i}`;
                pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;
            }
        }
        else if(y1 == y2)
        {
            for(var i = Math.min(x1, x2); i <= Math.max(x1, x2); i++)
            {
                var point = `${i},${y1}`;
                pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;
            }
        }
        else
        {
            var xDiff = (x1 > x2) ? -1 : 1;
            var yDiff = (y1 > y2) ? -1 : 1;

            while(x1 != x2)
            {
                var point = `${x1},${y1}`;
                pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;

                x1 += xDiff;
                y1 += yDiff;
            }

            var point = `${x1},${y1}`;
            pointData[point] = pointData[point] != null ? pointData[point] + 1 : 1;
        }
    });

    var overLappingPoints = Object.entries(pointData).filter(x => x[1] > 1);
    console.log(`Number of overlapping points: ${overLappingPoints.length}`);
}

Part1();
Part2();