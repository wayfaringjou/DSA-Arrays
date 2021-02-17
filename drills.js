const Array = require('./homebrewedArray')

function main() {
  Array.SIZE_RATIO = 3;
  let arr = new Array();

  arr.push(3);

  console.log(arr.get(0));
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  console.log(arr);

  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr);
  for (let i = arr.length; i > 0; i--) {
    arr.pop();
  }
  console.log(arr);
  arr.push("tauhida")
  console.log(arr.get(0));

}

main();