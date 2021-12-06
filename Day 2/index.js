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
    var horizontalPosition = 0;
    var depth = 0;

    inputData.forEach(item => {
        var command = item.split(' ');
        switch(command[0])
        {
            case "forward":
                horizontalPosition += Number(command[1]);
                break;
            case "down":
                depth += Number(command[1]);
                break;
            case "up":
                depth -= Number(command[1]);
                break;
        }
        if(depth < 0)
        {
            depth = 0;
        }
    });
    var result = horizontalPosition * depth;
    console.log(`Horizontal Position: ${horizontalPosition}, Depth: ${depth}. Position x Depth: ${result}`);
}

function Part2()
{
    var inputData = GetData();
    var horizontalPosition = 0;
    var depth = 0;
    var aim = 0;

    inputData.forEach(item => {
        var command = item.split(' ');
        switch(command[0])
        {
            case "forward":
                horizontalPosition += Number(command[1]);
                depth += (Number(command[1]) * aim);
                break;
            case "down":
                aim += Number(command[1]);
                break;
            case "up":
                aim -= Number(command[1]);
                break;
        }
    });
    var result = horizontalPosition * depth;
    console.log(`Horizontal Position: ${horizontalPosition}, Depth: ${depth}, Aim: ${aim}. Position x Depth: ${result}`);
}

Part1();
Part2();