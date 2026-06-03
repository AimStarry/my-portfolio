import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {

  mouseX = 0;
  mouseY = 0;

  // For smooth spotlight interpolation
  private targetX = 0;
  private targetY = 0;
  private rafId: any;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  }

  private animateSpotlight(): void {
    this.mouseX += (this.targetX - this.mouseX) * 0.08;
    this.mouseY += (this.targetY - this.mouseY) * 0.08;
    this.rafId = requestAnimationFrame(() => this.animateSpotlight());
  }

  // ── CERT SLIDER STATE ────────────────────────────────────
  certActiveIndex = 0;
  certAnimating   = false;
  certTrackX      = 0;
  certDragActive  = false;

  private certAutoTimer: any;
  private certTouchStartX = 0;
  private certDragStartX  = 0;
  private certDragCurrentX = 0;
  private readonly CERT_SLIDE_W = 480;
  private readonly CERT_AUTO_MS = 5000;

  get certDragOffset(): number {
    return this.certDragActive ? this.certDragCurrentX - this.certDragStartX : 0;
  }

  get certTrackTransform(): string {
    const base = -this.certActiveIndex * this.CERT_SLIDE_W;
    return `translateX(${base + this.certDragOffset}px)`;
  }

  certGoTo(index: number): void {
    if (this.certAnimating) return;
    this.certAnimating = true;
    this.certActiveIndex = Math.max(0, Math.min(index, this.certifications.length - 1));
    this.certTrackX = -this.certActiveIndex * this.CERT_SLIDE_W;
    setTimeout(() => { this.certAnimating = false; }, 650);
  }

  certNext(): void {
    const next = this.certActiveIndex < this.certifications.length - 1
      ? this.certActiveIndex + 1
      : 0;
    this.certGoTo(next);
  }

  certPrev(): void {
    const prev = this.certActiveIndex > 0
      ? this.certActiveIndex - 1
      : this.certifications.length - 1;
    this.certGoTo(prev);
  }

  certStartAuto(): void {
    this.certPauseAuto();
    this.certAutoTimer = setInterval(() => this.certNext(), this.CERT_AUTO_MS);
  }

  certPauseAuto(): void {
    clearInterval(this.certAutoTimer);
  }

  certResumeAuto(): void {
    this.certStartAuto();
  }

  certTouchStart(e: TouchEvent): void {
    this.certTouchStartX = e.changedTouches[0].clientX;
    this.certDragStartX  = e.changedTouches[0].clientX;
    this.certDragCurrentX = e.changedTouches[0].clientX;
    this.certDragActive  = true;
    this.certPauseAuto();
  }

  certTouchMove(e: TouchEvent): void {
    if (!this.certDragActive) return;
    this.certDragCurrentX = e.changedTouches[0].clientX;
  }

  certTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.certTouchStartX;
    this.certDragActive = false;
    if (Math.abs(dx) > 50) {
      dx < 0 ? this.certNext() : this.certPrev();
    }
    this.certResumeAuto();
  }

  // Mouse drag for desktop
  certMouseDown(e: MouseEvent): void {
    this.certDragStartX   = e.clientX;
    this.certDragCurrentX = e.clientX;
    this.certDragActive   = true;
    this.certPauseAuto();
  }

  @HostListener('mousemove', ['$event'])
  onDocMouseMove(e: MouseEvent): void {
    if (this.certDragActive) {
      this.certDragCurrentX = e.clientX;
    }
  }

  @HostListener('mouseup', ['$event'])
  onDocMouseUp(e: MouseEvent): void {
    if (!this.certDragActive) return;
    const dx = e.clientX - this.certDragStartX;
    this.certDragActive = false;
    if (Math.abs(dx) > 60) {
      dx < 0 ? this.certNext() : this.certPrev();
    }
    this.certResumeAuto();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.certNext();
    if (e.key === 'ArrowLeft')  this.certPrev();
  }

  // ── DATA ─────────────────────────────────────────────────

  techSkills = [
    { name: 'SQL / MySQL / PostgreSQL',  percent: 90, icon: 'fas fa-database'    },
    { name: 'MongoDB / NoSQL',           percent: 85, icon: 'fas fa-leaf'         },
    { name: 'HTML / CSS / JavaScript',   percent: 88, icon: 'fas fa-code'         },
    { name: 'PHP / Node.js / Python',    percent: 80, icon: 'fas fa-server'       },
    { name: 'Angular / Vue.js',          percent: 78, icon: 'fas fa-layer-group'  },
    { name: 'UI/UX Design (Figma)',      percent: 82, icon: 'fas fa-pen-ruler'    },
    { name: 'Git / GitHub',              percent: 80, icon: 'fab fa-github'       },
  ];

  softSkills = [
    'Problem-Solving', 'Analytical Thinking', 'Time Management',
    'Communication', 'Adaptability', 'Critical Thinking',
    'Team Collaboration', 'Attention to Detail',
  ];

  devTools = [
    'Visual Studio Code', 'Figma', 'Postman',
    'GitHub', 'Angular CLI', 'Canva',
  ];

  careerGoals = [
    {
      horizon: 'Immediate',
      icon: 'fas fa-briefcase',
      title: 'OJT in Database Development / Frontend Development',
      description: 'Gain hands-on industry experience working on real databases, data pipelines, and backend systems to bridge academic knowledge with professional practice.',
    },
    {
      horizon: 'Short-Term',
      icon: 'fas fa-rocket',
      title: 'Junior Database Developer or Frontend Developer',
      description: 'After graduation, join a company where I can grow expertise in building intuitive, performant user interfaces while staying grounded in clean data architecture.',
    },
    {
      horizon: 'Long-Term',
      icon: 'fas fa-bullseye',
      title: 'Data Architect & Full-Stack Specialist',
      description: 'Grow into a role that bridges data engineering and full-stack development — designing systems that are both technically robust and genuinely user-centered.',
    },
  ];

  testimonials = [
    {
      name: 'Marc Canlas',
      role: 'Team Member, Holy Angel University',
      initials: 'MC',
      content: 'Aimee consistently demonstrates a logical approach to database architecture. Her ability to translate complex data into clean, intuitive interfaces is impressive for a 3rd-year student.',
    },
    {
      name: 'Samantha Gonzales',
      role: 'Project Leader, Holy Angel University',
      initials: 'SG',
      content: 'Working with Aimee was a breeze. She has a keen eye for detail and never settles for "good enough" when it comes to user experience and code quality.',
    },
  ];

  // Ordered: Technical/industry-recognized first, then specialized, then marketing
  certifications = [
    // Tier 1 — High industry recognition
    {
      title: 'Google Analytics Certification',
      issuer: 'Skillshop by Google',
      date: 'August 27, 2025',
      image: 'assets/certificates/Skillshop-Google Analytics Certification.png',
      link: 'assets/certificates/Skillshop-Google Analytics Certification.pdf',
      tier: 1,
      badge: 'Industry Standard',
    },
    {
      title: 'Cloud Foundations Training',
      issuer: 'AWS Academy',
      date: 'August 27, 2025',
      image: 'assets/certificates/AWS-Cloud Foundations Training Certificate-1.png',
      link: 'assets/certificates/AWS Cloud Foundations Training Certificate.pdf',
      tier: 1,
      badge: 'Cloud',
    },
    {
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco',
      date: 'October 25, 2024',
      image: 'assets/cert2.png',
      link: 'assets/certificates/cisco-js.pdf',
      tier: 1,
      badge: 'Networking Leader',
    },
    // Tier 2 — freeCodeCamp (portfolio-relevant)
    {
      title: 'Backend Development and APIs V8',
      issuer: 'freeCodeCamp',
      date: 'September 27, 2025',
      image: 'assets/cert1.png',
      link: 'assets/certificates/fcc-backend-development.pdf',
      tier: 2,
      badge: 'Full-Stack',
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures V7',
      issuer: 'freeCodeCamp',
      date: 'September 30, 2025',
      image: 'assets/cert3.png',
      link: 'assets/certificates/fcc-legacy-javascript-algorithms-and-data-structures.pdf',
      tier: 2,
      badge: 'Algorithms',
    },
    // Tier 3 — Simplilearn technical
    {
      title: 'SQL Optimization for Beginners',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-SQL Optimization for Beginners-1.png',
      link: 'assets/certificates/Simplilearn-SQL Optimization for Beginners.pdf',
      tier: 3,
      badge: 'Database',
    },
    {
      title: 'Fundamentals of Database: What is SQL?',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-Fundamentals of Database-What is SQL-1.png',
      link: 'assets/certificates/Simplilearn-Fundamentals of Database-What is SQL.pdf',
      tier: 3,
      badge: 'Database',
    },
    {
      title: 'Introduction to Figma Certificate',
      issuer: 'Simplilearn',
      date: 'September 23, 2024',
      image: 'assets/certificates/Simplilearn-Introduction to Figma Certificate-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to Figma Certificate.pdf',
      tier: 3,
      badge: 'Design',
    },
    {
      title: 'Introduction to Graphic Design; Basics of UI/UX Design',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-Introduction to Graphic Design-Basics of UIUX-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to Graphic Design-Basics of UIUX.pdf',
      tier: 3,
      badge: 'UI/UX',
    },
    {
      title: 'Website UI/UX Designing using ChatGPT',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-Website UIUX Designing using ChatGPT-1.png',
      link: 'assets/certificates/Simplilearn-Website UIUX Designing using ChatGPT.pdf',
      tier: 3,
      badge: 'UI/UX',
    },
    {
      title: 'Design Thinking for Beginners',
      issuer: 'Simplilearn',
      date: 'July 24, 2025',
      image: 'assets/certificates/Simplilearn-Design Thinking for Beginners-1.png',
      link: 'assets/certificates/Simplilearn-Design Thinking for Beginners.pdf',
      tier: 3,
      badge: 'Design',
    },
    {
      title: 'Introduction to PHP',
      issuer: 'Simplilearn',
      date: 'February 2, 2025',
      image: 'assets/certificates/Simplilearn-Introduction to PHP-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to PHP.pdf',
      tier: 3,
      badge: 'Backend',
    },
    // Tier 4 — HubSpot marketing
    {
      title: 'SEO 1',
      issuer: 'HubSpot Academy',
      date: 'January 14, 2026',
      image: 'assets/certificates/Hubspot-SEO 1 Certificata.png',
      link: 'assets/certificates/Hubspot-SEO 1 Certificata.pdf',
      tier: 4,
      badge: 'SEO',
    },
    {
      title: 'SEO 2',
      issuer: 'HubSpot Academy',
      date: 'January 28, 2026',
      image: 'assets/certificates/Hubspot-SEO 2 Certificate.png',
      link: 'assets/certificates/Hubspot-SEO 2 Certificate.pdf',
      tier: 4,
      badge: 'SEO',
    },
    {
      title: 'Digital Marketing',
      issuer: 'HubSpot Academy',
      date: 'July 28, 2025',
      image: 'assets/certificates/Hubspot-Digital Marketing Certificate.png',
      link: 'assets/certificates/Hubspot-Digital Marketing Certificate.pdf',
      tier: 4,
      badge: 'Marketing',
    },
    {
      title: 'Content Marketing',
      issuer: 'HubSpot Academy',
      date: 'August 29, 2025',
      image: 'assets/certificates/Hubspot-Content Marketing Certificate.png',
      link: 'assets/certificates/Hubspot-Content Marketing Certificate.pdf',
      tier: 4,
      badge: 'Marketing',
    },
    {
      title: 'Digital Advertising',
      issuer: 'HubSpot Academy',
      date: 'September 28, 2025',
      image: 'assets/certificates/Hubspot-Digital Advertising Certificate.png',
      link: 'assets/certificates/Hubspot-Digital Advertising Certificate.pdf',
      tier: 4,
      badge: 'Marketing',
    },
  ];

  // Stat counters for animated numbers
  stats = [
    { label: 'Projects Completed', value: 5, suffix: '+', current: 0 },
    { label: 'Certifications', value: 10, suffix: '+', current: 0 },
    { label: 'Technologies', value: 7, suffix: '+', current: 0 },
    { label: 'GWA', value: 1.5, suffix: '', current: 0, isDecimal: true },
  ];

  // ── LIFECYCLE ────────────────────────────────────────────

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.animateSpotlight();

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          if (entry.target.classList.contains('skills-box')) {
            const bars = entry.target.querySelectorAll('.progress-fill');
            bars.forEach((bar: Element) => {
              const htmlBar = bar as HTMLElement;
              const width = htmlBar.getAttribute('data-width');
              if (width) htmlBar.style.width = width + '%';
            });
          }

          if (entry.target.classList.contains('cert-section')) {
            this.certStartAuto();
          }

          if (entry.target.classList.contains('stats-row')) {
            this.animateCounters();
          }
        }
      });
    }, observerOptions);

    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .scale-reveal, .center-title'
    );
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }

  private animateCounters(): void {
    this.stats.forEach((stat) => {
      const duration = 1800;
      const steps = 60;
      const increment = stat.value / steps;
      let count = 0;
      const timer = setInterval(() => {
        count += increment;
        if (count >= stat.value) {
          stat.current = stat.value;
          clearInterval(timer);
        } else {
          stat.current = stat.isDecimal ? Math.round(count * 10) / 10 : Math.floor(count);
        }
        this.cdr.markForCheck();
      }, duration / steps);
    });
  }

  ngOnDestroy(): void {
    this.certPauseAuto();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}