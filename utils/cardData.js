const cardInfo = [];

let inc = 0;

for (let i = 0, j = 0; i < 20; i++, j++) {
  if (j >= 4) {
    j = 0;
  }
  if (i === 0) {
    cardInfo.push([inc]);
  } else if (j === 0) {
    cardInfo.push([++inc]);
  } else if (j === 1) {
    let ll = [];
    for (let l = 0; l < 4; l++) {
      ll.push(++inc);
    }
    cardInfo.push(ll);
  } else if (j === 2) {
    let ll = [];
    for (let l = 0; l < 10; l++) {
      ll.push(++inc);
    }
    cardInfo.push(ll);
  } else if (j === 3) {
    let ll = [];
    for (let l = 0; l < 25; l++) {
      ll.push(++inc);
    }
    cardInfo.push(ll);
  }
}

export default cardInfo;
