/* 1. Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, etc.

> delayLog();
1  // 1 second later
2  // 2 seconds later
3  // 3 seconds later
4  // etc...
5
6
7
8
9
10

*/

function makeLogger(n) {
  return function() {
    console.log(n);
  }
}

function delayLog() {
  var i;
  for(i = 1; i <= 10; i += 1) {
    var logger = makeLogger(i);
    setTimeout(logger, i * 1000);
  }
}


/* 2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.
*/

setTimeout(function() {   // 1
  console.log('Once');    // 5
}, 1000);

setTimeout(function() {   // 2
  console.log('upon');    // 7
}, 3000);

setTimeout(function() {   // 3
  console.log('a');       // 6
}, 2000);

setTimeout(function() {   // 4
  console.log('time');    // 8
}, 4000);


/* 3. In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?
*/

setTimeout(function() {
  setTimeout(function() {
    q();
  }, 15);

  d();

  setTimeout(function() {
    n();
  }, 5);

  z();
}, 10);

setTimeout(function() {
  s();
}, 20);

setTimeout(function() {
  f();
});

g();

// f, g, d, z, n, s, q


/* 4. Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.
*/

function afterNSeconds(callback, n) {
  setTimeout(callback, n * 1000);
}
