const { Benchmark } = require("./Outil.js");

let n = 40
console.log("n = " + n);

const benchmark = new Benchmark(6);

// ---------- Fonction Contains Duplicate ---------- \\
function containsDuplicate(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
            return true;
        }
        }
    }
    return false;
}

// ---------- Fonction Find Common Elements ---------- \\
function findCommonElements(array1, array2) {
    let commonElements = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
            commonElements.push(array1[i]);
        }
        }
    }
    return commonElements;
}

// ---------- Fonction Fibonacci ---------- \\
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

benchmark.addTest(fibonacci, [n]);


benchmark.run(); 