// 1. Write a function named startCounting that logs a number to the console every second, starting with 1. Each number should be one greater than the previous number.

function startCounting() {
  var count = 1;
  return setInterval(function() {
    console.log(count);
    count += 1;
  }, 1000);
}



// 2. Extend the code from the previous problem with a stopCounting function that stops the logger when called.

function stopCounting(counter) {
  clearInterval(counter);
}

stopCounting(counter);