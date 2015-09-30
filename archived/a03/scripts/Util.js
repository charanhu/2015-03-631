function range(stop, start = 0, step = 1) {
  var i = start,
    theRange = [];
  for (; i < stop; i += step) {
    theRange[i] = i;
  }
  return theRange;
}

function shuffle(array) {
  var counter = array.length,
    temp, index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
