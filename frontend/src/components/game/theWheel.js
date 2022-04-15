import * as React from 'react';
import {useEffect} from 'react';
import Winwheel from 'winwheeljs';
// import './wheelStyle.scss';
// const anime = require('animejs');
const Wheel = () => {
  let options = [1, 1, 2, 3, 4, 4];
  options = noAdj(options);
  const slices = [];
  const win = 3;
  const winSlice = options.indexOf(win);
  const stopAt = ((360/options.length) * (1-winSlice) + Math.floor(Math.random() * ((360/options.length)-2)));
  for (const option of options) {
    let color;
    let text;
    if (option === 1) {
      color = 'red';
      text = 'A';
    } else if (option === 2) {
      color = 'blue';
      text = 'B';
    } else if (option === 3) {
      color = 'green';
      text = 'C';
    } else if (option === 4) {
      color = 'yellow';
      text = 'D';
    } else if (option === 5) {
      color = 'coral';
      text = 'E';
    } else if (option === 6) {
      color = 'cornsilk';
      text = 'F';
    } else if (option === 7) {
      color = 'deepPink';
      text = 'G';
    } else if (option === 8) {
      color = 'orange';
      text = 'H';
    } else if (option === 9) {
      color = 'plum';
      text = 'I';
    } else {
      color = 'aquamarine';
      text = 'J';
    }
    slices.push({'fillStyle': color, 'text': text});
  }
  useEffect(() => {
    window.winwheel = new Winwheel({
      canvasId: 'myCanvas',
      numSegments: options.length,
      segments: slices,
      animation: {
        type: 'spinToStop',
        duration: 5,
        spins: 8,
        stopAngle: stopAt,
      },
    });
  }, []);
  return (
    <>
      <canvas id='myCanvas' width='880' height='300' ></canvas>
    </>
  );
};
export default Wheel;


function noAdj(arr) {
  const map = new Map();
  const visited = new Map();
  const size = arr.length;
  for (let i = 0; i < size; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i])+1);
    } else {
      map.set(arr[i], 1);
    }
  }
  const queue = [];
  for (let i = 0; i < size; i++) {
    const val = arr[i];
    if (map.get(val) > 0 && visited[val] != 1) {
      queue.push([map.get(val), val]);
    }
    visited[val] = 1;
  }
  queue.sort();
  const result = Array(size).fill(0);
  let prev = [-1, -1];
  let l = 0;
  while (queue.length != 0) {
    const k = queue[queue.length-1];
    queue.pop();
    result[l] = k[1];
    if (prev[0] > 0) {
      queue.push(prev);
    }
    queue.sort();
    k[0]--;
    prev = k;
    l++;
  }
  for (const it of result) {
    if (it == 0) {
      return (arr);
    }
  }
  return (result);
}
