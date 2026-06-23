import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MaterialModule, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('samplingCanvas') samplingCanvas?: ElementRef<HTMLCanvasElement>;

  links = [
    { link: '/#about', text: 'About' },
    { link: '/#timeline', text: 'Timeline' },
    { link: '/#projects', text: 'Projects' },
  ];

  reducedMotion = false;
  running = true;

  private readonly points: Array<{ x: number; y: number; age: number }> = [];
  private readonly maxPoints = 20;
  private readonly domainMin = -3;
  private readonly domainMax = 3;
  private slopePhase = 0;

  private animationFrameId?: number;
  private stepMs = 170;
  private lastStep = 0;
  private motionQuery?: MediaQueryList;
  private motionListener?: (event: MediaQueryListEvent) => void;
  private readonly handleResize = () => {
    this.resizeCanvas();
    this.drawSimulation();
  };

  constructor() { }

  ngAfterViewInit(): void {
    this.initializeSimulation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.handleResize);
    if (this.motionQuery && this.motionListener) {
      this.motionQuery.removeEventListener('change', this.motionListener);
    }
  }

  private initializeSimulation(): void {
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = this.motionQuery.matches;

    this.motionListener = (event: MediaQueryListEvent) => {
      this.reducedMotion = event.matches;
      if (this.reducedMotion) {
        this.running = false;
        if (this.animationFrameId !== undefined) {
          cancelAnimationFrame(this.animationFrameId);
        }
      }
      this.drawSimulation();
    };

    this.motionQuery.addEventListener('change', this.motionListener);
    window.addEventListener('resize', this.handleResize);

    this.resizeCanvas();
    this.seedInitialPoints(this.maxPoints);
    this.drawSimulation();

    if (!this.reducedMotion) {
      this.animationFrameId = requestAnimationFrame(this.animationLoop);
    }
  }

  private seedInitialPoints(count: number): void {
    for (let index = 0; index < count; index++) {
      this.stepRegression();
    }
  }

  private animationLoop = (timestamp: number): void => {
    if (!this.running || this.reducedMotion) {
      return;
    }

    if (timestamp - this.lastStep >= this.stepMs) {
      this.stepRegression();
      this.lastStep = timestamp;
    }

    this.drawSimulation();

    this.animationFrameId = requestAnimationFrame(this.animationLoop);
  };

  private stepRegression(): void {
    this.slopePhase += 0.08;
    const targetSlope = Math.sin(this.slopePhase);
    const x = this.domainMin + Math.random() * (this.domainMax - this.domainMin);
    const noise = this.sampleStandardNormal() * 0.9;
    const yRaw = targetSlope * x + noise;
    const y = Math.min(this.domainMax, Math.max(this.domainMin, yRaw));

    for (const point of this.points) {
      point.age += 1;
    }

    this.points.push({ x, y, age: 0 });
    while (this.points.length > this.maxPoints) {
      this.points.shift();
    }

  }

  private sampleStandardNormal(): number {
    const u1 = Math.max(Number.MIN_VALUE, Math.random());
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  private resizeCanvas(): void {
    const canvas = this.samplingCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(140, Math.floor(canvas.clientWidth));
    const height = Math.max(44, Math.floor(canvas.clientHeight));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private drawSimulation(): void {
    const canvas = this.samplingCanvas?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, width, height);

    this.drawRegression(ctx, width, height);
  }

  private drawRegression(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const left = 6;
    const right = width - 6;
    const top = 12;
    const bottom = height - 6;
    const plotWidth = Math.max(1, right - left);
    const plotHeight = Math.max(1, bottom - top);

    const xToPx = (x: number) => left + ((x - this.domainMin) / (this.domainMax - this.domainMin)) * plotWidth;
    const yToPx = (y: number) => bottom - ((y - this.domainMin) / (this.domainMax - this.domainMin)) * plotHeight;

    ctx.strokeStyle = 'rgba(113, 113, 122, 0.16)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(left, yToPx(0));
    ctx.lineTo(right, yToPx(0));
    ctx.moveTo(xToPx(0), top);
    ctx.lineTo(xToPx(0), bottom);
    ctx.stroke();

    const fit = this.computeLeastSquares();
    const yLeft = fit.slope * this.domainMin + fit.intercept;
    const yRight = fit.slope * this.domainMax + fit.intercept;

    ctx.strokeStyle = 'rgba(114, 5, 150, 0.72)';
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.moveTo(xToPx(this.domainMin), yToPx(yLeft));
    ctx.lineTo(xToPx(this.domainMax), yToPx(yRight));
    ctx.stroke();

    for (const point of this.points) {
      const alpha = Math.max(0.18, 0.82 - point.age * 0.04);
      ctx.fillStyle = `rgba(114, 5, 150, ${alpha})`;
      ctx.beginPath();
      ctx.arc(xToPx(point.x), yToPx(point.y), 1.8, 0, 2 * Math.PI);
      ctx.fill();
    }

  }

  private computeLeastSquares(): { slope: number; intercept: number } {
    const n = this.points.length;
    if (n < 2) {
      return { slope: 0, intercept: 0 };
    }

    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumXY = 0;

    for (const point of this.points) {
      sumX += point.x;
      sumY += point.y;
      sumXX += point.x * point.x;
      sumXY += point.x * point.y;
    }

    const denominator = n * sumXX - sumX * sumX;
    if (Math.abs(denominator) < 1e-8) {
      return { slope: 0, intercept: sumY / n };
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  }

}
