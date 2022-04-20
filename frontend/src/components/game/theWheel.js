import * as React from 'react';

class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: Object.keys(props.data.weight).map((num) => parseInt(num) + 1),
      radius: 75, // PIXELS
      rotate: 0, // DEGREES
      easeOut: 0, // SECONDS
      angle: 0, // RADIANS
      top: null, // INDEX
      offset: null, // RADIANS
      net: null, // RADIANS
      result: null, // INDEX
      spinning: false,
      win: props.data.selected + 1,
      callBack: props.data.callback,
    };
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    // generate canvas wheel on load
    this.renderWheel();
  }

  renderWheel() {
    // determine number/size of sectors that need to created
    const numOptions = this.state.list.length;
    const arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize,
    });


    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      const text = this.state.list[i];
      this.renderSector(i + 1, text, angle, arcSize, this.getColor());
      angle += arcSize;
    }
  }

  renderSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    // const canvas = document.getElementById('wheel');
    const canvas = this.canvasRef.current;
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    console.log(ctx);
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = this.state.radius;
    const startAngle = start;
    const endAngle = start + arc;
    const angle = index * arc;
    const baseSize = radius * 3.33;
    const textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = '17px Arial';
    ctx.fillStyle = 'black';
    ctx.stroke();

    ctx.save();
    ctx.translate(
        baseSize + Math.cos(angle - arc / 2) * textRadius,
        baseSize + Math.sin(angle - arc / 2) * textRadius,
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  getColor() {
    // randomly generate rbg values for wheel sectors
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }

  spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    // let randomSpin = Math.floor(Math.random() * 900) + 500;
    const winSlice = this.state.list.indexOf(this.state.win);
    const stopAt = (360/this.state.list.length) * (this.state.list.length-winSlice-1) + Math.floor(Math.random() * ((360/this.state.list.length)-2)+270);
    const randomSpin = stopAt + (360*(Math.floor(Math.random() * 10))+3);
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    });

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      this.getResult(randomSpin);
      this.props.data.callBack(this.state.win - 1);
    }, 2000);
  };

  getResult = (spin) => {
    // set state variable to display result
    this.setState({
      result: this.state.win,
    });
  };

  /* reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    });
  }; */

  render() {
    return (
      <div className="Wheel">
        <span id="selector" style={{position: 'relative', left: 258, top: -395, margin: 'auto', transform: 'translate(-50%,0)', padding: 0, zIndex: 2}}>&#9660;</span>
        <canvas
          id="wheel"
          ref={this.canvasRef}
          width="500"
          height="500"
          style={{
            margin: 'auto',
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              this.state.easeOut
            }s ease-out`,
          }}
        />
        {this.state.spinning ? (
          <button type="button" id="spin" disabled={true} onClick={this.spin} style= {{position: 'relative', left: 53, transform: 'translate(-50%,0)'}}>
          Spin The Wheel
          </button>
        ) : (
          <button type="button" id="spin" onClick={this.spin} style= {{position: 'relative', left: 53, transform: 'translate(-50%,0)'}}>
            Spin The Wheel
          </button>
        )}
        <div className="display">
          <span id="readout">
            Selected Option:  {'  '}
            <span id="result">{this.state.result}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Wheel;

/*
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
*/
