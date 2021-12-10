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

var patternData = 
[
    { num: 0, seq: ["a", "b", "c", "e", "f", "g"]},
    { num: 1, seq: ["c", "f"]},
    { num: 2, seq: ["a", "c", "d", "e", "g"]},
    { num: 3, seq: ["a", "c", "d", "f", "g"]},
    { num: 4, seq: ["b", "c", "d", "f"]},
    { num: 5, seq: ["a", "b", "d", "f", "g"]},
    { num: 6, seq: ["a", "b", "d", "e", "f", "g"]},
    { num: 7, seq: ["a", "c", "f"]},
    { num: 8, seq: ["a", "b", "c", "d", "e", "f", "g"]},
    { num: 9, seq: ["a", "b", "c", "d", "f", "g"]},
];

function Part1()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var digitCount = new Array(10).fill(0);
    var sequenceList = [];
    inputData.forEach(i => sequenceList.push(new Sequence(i)));

    sequenceList.forEach(x => {
        x.output.forEach(seqItem => {
            var pattern = patternData.filter(p => p.seq.length == seqItem.length);
            if(pattern.length == 1)
            {
                digitCount[pattern[0].num]++;
            }
        });
    });

    var digitSum = digitCount.reduce((a,b) => a + b, 0);
    console.log(`The number of unique pattern length outputs found is: ${digitSum}`);
}

function Part2()
{
    var inputData = GetData('input.txt', /\r?\n/);
    var sequenceList = [];
    inputData.forEach(i => sequenceList.push(new Sequence(i)));
    var totalCounter = 0;

    sequenceList.forEach(x => {
        var counter = 0;
        while(x.matchedPatterns.length < x.input.length)
        {
            var seqItem = x.input[counter];
            if(!x.matchedPatterns.find(x => x.seq == seqItem))
            {
                var pattern = patternData.filter(p => p.seq.length == seqItem.length);

                if(pattern.length == 1)
                {
                    x.matchedPatterns.push({num: pattern[0].num, seq: seqItem});
                }
                else
                {
                    var matchedNum = findPatternMatch(x.matchedPatterns, seqItem);
                    if(matchedNum >= 0)
                    {
                        x.matchedPatterns.push({ num: matchedNum, seq: seqItem});
                    }
                }
            }
            counter = (counter + 1) % x.input.length;
        }

        var result = '';
        x.output.forEach(o => {
            var match = x.matchedPatterns.find(p => p.seq.split('').sort().join() == o.split('').sort().join());
            result += match.num;
        })

        totalCounter += Number(result);
    });

    console.log(`The total of all of the output values is: ${totalCounter}`);
}

function findPatternMatch(matchedPatterns, seqItem)
{
    var matchedDigits = Object.keys(matchedPatterns);
    var unMatchedItems = patternData.filter(x => !matchedDigits.includes(x.num) && x.seq.length == seqItem.length);
    var index = 0;

    while(index < matchedPatterns.length)
    {
        pattern1 = matchedPatterns[index].seq.split('');
        pattern2 = seqItem.split('');
        pattern4 = patternData[matchedPatterns[index].num].seq;

        for(var i = 0; i < unMatchedItems.length; i++)
        {
            pattern3 = unMatchedItems[i].seq;

            if(getMatchingItemCount(pattern1, pattern2) != getMatchingItemCount(pattern3, pattern4))
            {
                unMatchedItems.splice(i, 1);
                break;
            }
        }
        index++;
    }

    return unMatchedItems.length == 1 ? unMatchedItems[0].num : -1;
}

function getMatchingItemCount(pattern1, pattern2)
{
    return pattern1.filter(element => pattern2.includes(element)).length;
}

class Sequence
{
    constructor(sequenceData)
    {
        var data = sequenceData.split(' | ');
        this.input = data[0].split(' ');
        this.output = data[1].split(' ');
        this.matchedPatterns = [];
    }
}

Part1();
Part2();