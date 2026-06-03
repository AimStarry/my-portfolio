import { Component, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  constructor(private router: Router) {}

  mouseX = -9999;
  mouseY = -9999;

  private animFrameId: number | null = null;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private readonly PARTICLE_COUNT = 70;
  private readonly CONNECTION_DISTANCE = 130;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.applyHoloTilt(event);
  }

  // ── Holographic card 3D tilt ─────────────────────────
  private applyHoloTilt(event: MouseEvent) {
    const card = document.getElementById('holoCard');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (event.clientX - cx) / (rect.width / 2);
    const dy = (event.clientY - cy) / (rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2.5) {
      const rotX = -dy * 10;
      const rotY = dx * 10;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      card.style.boxShadow = `
        ${-dx * 20}px ${-dy * 20}px 60px rgba(0,0,0,0.4),
        0 0 40px rgba(230, 126, 34, 0.2),
        inset 0 1px 0 rgba(255,255,255,0.1)
      `;
    } else {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  }

  ngAfterViewInit() {
    this.initConstellation();
    this.initCountUp();
  }

  ngOnDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  // ── Constellation canvas ─────────────────────────────
  private initConstellation() {
    this.canvas = document.getElementById('constellationCanvas') as HTMLCanvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
    this.animate();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.update(this.canvas.width, this.canvas.height);
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.CONNECTION_DISTANCE) {
          const alpha = (1 - dist / this.CONNECTION_DISTANCE) * 0.25;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(230, 126, 34, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(230, 126, 34, ${p.alpha})`;
      this.ctx.fill();
    }

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }

  // ── Count-up numbers ─────────────────────────────────
  private initCountUp() {
    const els = document.querySelectorAll<HTMLElement>('.qs-num[data-target]');
    els.forEach(el => {
      const target = parseInt(el.dataset['target'] || '0', 10);
      let current = 0;
      const step = () => {
        current++;
        el.textContent = String(current);
        if (current < target) setTimeout(step, 160);
      };
      setTimeout(step, 1200);
    });
  }

  viewMyWork() { this.router.navigate(['/projects']); }
  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Aimee_Pangan_Resume.pdf';
    link.click();
  }
}

// ── Particle class ────────────────────────────────────
class Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; alpha: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
}