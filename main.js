//Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

//What is the resulting list that will be sorted after 3 recursive calls to mergesort?
// [1, 21, 26, 45]

//What is the resulting list that will be sorted after 16 recursive calls to mergesort?
//Array is completely sorted. [1, 2, 9, 16, 21, 26, 27, 28, 29, 34, 39, 40, 43, 45, 46, 49]

//What are the first 2 lists to be merged?
//[1, 21] and [26, 45]

//Which two lists would be merged on the 7th merge?
//[1, 21, 26, 45] and [2, 9, 28, 29]

//Suppose you are debugging a qSort implementation that is supposed to sort an array in ascending order. 
//After the first partition step has been completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. 
//Which of the following statements is correct about the partition step? Explain your answer.
//The pivot could have been either 14 or 17. Both of those have unsorted numbers that are sorted in relation to them on their right 
//and their left. 

//Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning 
//according to the quicksort algorithm.
//3, 9, 10, 12, 14, 13, 15, 16, 17, 19
//10, 3, 9, 12, 13, 14, 15, 16, 17, 19

function createArray (){
    let str = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
    let newArray = str.split(' ');
    let resultArray =[];
    for(let i=0; i< newArray.length; i++){
      resultArray.push(Number(newArray[i]))
    }
    return resultArray;
  }

let testArray = createArray();

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j){
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
function insertionSort(array) {
    let length = array.length;
    
    for(let i = 1; i < length; i++) {
      let temp = array[i];
      for(let j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j+1] = array[j];
      }
      array[j+1] = temp;
    }
    
    return array;
}
  
function bucketSort(array, bucketSize) {
    if (array.length === 0) {
      return array;
    }
  
    let i,
        minValue = array[0],
        maxValue = array[0],
        bucketSize = bucketSize || 5;
    
    array.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })
  
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);
    
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }
    
    array.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });
  
    array.length = 0;
    
    allBuckets.forEach(function(bucket) {
        insertionSort(bucket);
        bucket.forEach(function (element) {
            array.push(element)
        });
    });
  
    return array;
}
  
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
   return array;
}

let arr = [2, 11, 37, 42];
arr = shuffle(arr);
console.log(arr);

function SortBooks(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
  
    left = SortBooks(left);
    right = SortBooks(right);
    return merge(left, right, arr);
  }
  
  const books = [
    'The Great Gatsby',
    'Catch-22',
    'The Grapes of Wrath',
    'The Catcher in the Rye',
    'Beloved',
    'To Kill a Mockingbird',
    'Ulysses',
    'The Sound and the Fury',
    'Nineteen Eighty-Four',
    'Animal Farm',
    'Pride and Prejudice',
    'A Wrinkle in Time',
    'Don Quixote',
    'The Wind in the Willows',
    'Things Fall Apart',
    'Lolita',
    'One Hundred Years of Solitude',
    'Invisible Man',
    'Gone with the Wind',
    'Jane Eyre'
  ];
  
  console.log(SortBooks(books));