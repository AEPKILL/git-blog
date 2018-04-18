import classnames from '@utils/classnames';
import throttle from '@utils/throttle';

import * as React from 'react';

export interface BubbleEffectProps {
  className?: string;
  canvas?: HTMLCanvasElement;
}

class Circle {
  x = 0;
  y = 0;
  alpha = 0;
  scale = 1;
  velocity = 0;
  color = [255, 255, 255];
  init(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.alpha = 0.1 + Math.random() * 0.3;
    this.scale = 0.1 + Math.random() * 0.3;
    this.velocity = Math.random();
    this.color = [
      // tslint:disable-next-line:no-bitwise
      (155 + Math.random() * 100) >> 0,
      // tslint:disable-next-line:no-bitwise
      (155 + Math.random() * 100) >> 0,
      // tslint:disable-next-line:no-bitwise
      (155 + Math.random() * 100) >> 0
    ];
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.y -= this.velocity;
    this.alpha -= 0.0005;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale * 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(${this.color.join(',')}, ${this.alpha})`;
    ctx.fill();
  }
}

// tslint:disable-next-line:max-classes-per-file
export default class BubbleEffect extends React.Component<
  BubbleEffectProps,
  {}
> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  circles: Circle[] = [];
  ctx!: CanvasRenderingContext2D;
  animationFrameId?: number;
  lastCanvasWidth = 0;
  get canvas() {
    return this.props.canvas || this.canvasRef.current;
  }
  constructor(props: BubbleEffectProps) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.animationLoop = this.animationLoop.bind(this);
    this.initCircles = throttle(this.initCircles.bind(this));
  }
  handleWindowResize() {
    this.initCircles();
  }
  animationLoop() {
    this.canvas!.width = this.canvas!.width;
    for (const c of this.circles) {
      if (c.alpha <= 0) {
        c.init(this.canvas!.width, this.canvas!.height);
      }
      c.draw(this.ctx);
    }
    this.animationFrameId = requestAnimationFrame(this.animationLoop);
  }
  initCircles() {
    const { width, height } = this.canvas!.getBoundingClientRect();
    this.canvas!.width = width;
    this.canvas!.height = height;
    if (this.lastCanvasWidth > width) {
      this.circles = this.circles.filter(c => c.x < width);
    } else {
      for (let x = this.lastCanvasWidth; x < width / 2; x++) {
        const c = new Circle();
        c.init(width, height);
        this.circles.push(c);
      }
    }
    this.lastCanvasWidth = width;
  }
  componentDidMount() {
    this.ctx = this.canvas!.getContext('2d')!;
    this.initCircles();
    this.animationFrameId = requestAnimationFrame(this.animationLoop);
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    cancelAnimationFrame(this.animationFrameId!);
  }
  render() {
    if (this.props.canvas) {
      return null;
    }
    return (
      <canvas
        ref={this.canvasRef}
        className={classnames('bubble-effect', this.props.className)}
      />
    );
  }
}
