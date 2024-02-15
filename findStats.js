const fs = require('fs');

function findStats(numbers) {
  const sorted = quickSort(numbers);

  const obj = {
    max: sorted[sorted.length - 1],
    min: sorted[0],
    median: sorted.length % 2 !== 0 ? sorted[(sorted.length - 1) / 2] : findMedianInSortedEvenArr(sorted),
    arithmeticMean: Number.MIN_SAFE_INTEGER,
    maxIncreasingSequence: 1,
    maxDecreasingSequence: 1,
  };

  let sum = 0;

  let increasingSequence = 1;
  let decreasingSequence = 1;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];

    if (numbers[i] > numbers[i - 1]) {
      increasingSequence++;
      if (increasingSequence > obj.maxIncreasingSequence) {
        obj.maxIncreasingSequence = increasingSequence;
      }
    } else {
      increasingSequence = 1;
    }

    if (numbers[i] < numbers[i - 1]) {
      decreasingSequence++;
      if (decreasingSequence > obj.maxDecreasingSequence) {
        obj.maxDecreasingSequence = decreasingSequence;
      }
    } else {
      decreasingSequence = 1;
    }
  }

  obj.arithmeticMean = sum / numbers.length;

  function quickSort(arr) {
    if (arr.length < 2) return arr;

    let pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (pivot > arr[i]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
  };

  function findMedianInSortedEvenArr(arr) {
    const middle = Math.floor(arr.length / 2);

    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return obj;
}

fs.readFile('numbers.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const numbers = data.trim().split(/\s+/).map(Number);

  const { max, min, median, arithmeticMean, maxIncreasingSequence, maxDecreasingSequence } = findStats(numbers);

  console.log(`Max:${max}`);
  console.log(`Min: ${min}`);
  console.log(`Median: ${median}`);
  console.log(`Arithmetic Mean: ${arithmeticMean}`);
  console.log(`Longest Increasing Sequence: ${maxIncreasingSequence}`);
  console.log(`Longest Decreasing Sequence: ${maxDecreasingSequence}`);
});