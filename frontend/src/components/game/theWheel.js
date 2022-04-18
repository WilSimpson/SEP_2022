import * as React from 'react';
import {useEffect} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//import {TweenMax} from 'gsap';
// import './wheelStyle.scss';
// const anime = require('animejs');
/*const Wheel = () => {
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
  const onClick = (event) => {
    event.preventDefault();
    window.winwheel.startAnimation();
  };
  drawTriangle;
  return (
    <>
      <canvas id='myCanvas' width='880' height='300' ></canvas>
      <button onClick={onClick}>Spin the Wheel</button>
    </>
  );
}; */
class Wheel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: Object.keys(props.data.weight).map(num => parseInt(num) + 1),
      // list: ["$100", "$500", "$9,999", "$1", "$60", "$1,000", "$4.44"],
      // list: ["$100","$500","$9,999","$1","$60"],
      radius: 75, // PIXELS
      rotate: 0, // DEGREES
      easeOut: 0, // SECONDS
      angle: 0, // RADIANS
      top: null, // INDEX
      offset: null, // RADIANS
      net: null, // RADIANS
      result: null, // INDEX
      spinning: false,
      win: parseInt(props.data.selected) + 1,
      // callBack: props.data.callback
    };
  } 
  
  //win = "2";
  //winSlice = this.state.list.indexOf(this.win);
  //stopAt = (360/this.state.list.length) * (this.state.list.length-this.winSlice-1) + Math.floor(Math.random() * ((360/this.state.list.length)-2));
  componentDidMount() {
    // generate canvas wheel on load
    this.renderWheel();
  }

  renderWheel() {
    // determine number/size of sectors that need to created
    let numOptions = this.state.list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize
    });

    // get index of starting position of selector
    // this.topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = this.state.list[i];
      this.renderSector(i + 1, text, angle, arcSize, this.getColor());
      angle += arcSize;
    }
  }

  /*topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff
    });
  }; */

  renderSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = this.state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  getColor() {
    // randomly generate rbg values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }

  spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    // let randomSpin = Math.floor(Math.random() * 900) + 500;
    let winSlice = this.state.list.indexOf(this.state.win);
    let stopAt = (360/this.state.list.length) * (this.state.list.length-winSlice-1) + Math.floor(Math.random() * ((360/this.state.list.length)-2)+270)
    let randomSpin = stopAt + (360*(Math.floor(Math.random() * 10))+3);
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true
    });

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      this.getResult(randomSpin);
    }, 2000);
  };

  getResult = spin => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    result = this.state.win

    // set state variable to display result
    this.setState({
      net: netRotation,
      result: this.state.win
    });
  };

  reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    });
  };

  render() {
    return (
      <div className="App">
        <span id="selector" style={{position: 'absolute', left:'50%', top:90, margin: 'auto', transform: 'translate(-50%,0)', padding: 0}}>&#9660;</span>
        <canvas
          id="wheel"
          width="500"
          height="500"
          style={{
            margin: 'auto',
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              this.state.easeOut
            }s ease-out`
          }}
        />
        {this.state.spinning ? (
          <button type="button" id="spin" disabled={true} onClick={this.spin} style= {{position: 'absolute', left: '50%', transform: 'translate(-50%,0)'}}>
          Spin The Wheel
          </button>
        ) : (
          <button type="button" id="spin" onClick={this.spin} style= {{position: 'absolute', left: '50%', transform: 'translate(-50%,0)'}}>
            Spin The Wheel
          </button>
        )}
        <div className="display">
          <span id="readout">
            Selected Option:  {"  "}
            <span id="result">{this.state.result}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Wheel


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
