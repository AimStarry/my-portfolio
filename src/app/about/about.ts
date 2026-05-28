import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';

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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  // ── CERT SLIDER STATE ────────────────────────────────────
  certActiveIndex = 0;
  certAnimating   = false;
  certTrackX      = 0;

  private certAutoTimer: any;
  private certTouchStartX = 0;
  private readonly CERT_SLIDE_W = 480;
  private readonly CERT_AUTO_MS = 4000;

  certGoTo(index: number): void {
    if (this.certAnimating) return;
    this.certAnimating = true;
    this.certActiveIndex = Math.max(0, Math.min(index, this.certifications.length - 1));
    this.certTrackX = -this.certActiveIndex * this.CERT_SLIDE_W;
    setTimeout(() => { this.certAnimating = false; }, 600);
  }

  certNext(): void {
    if (this.certActiveIndex < this.certifications.length - 1) {
      this.certGoTo(this.certActiveIndex + 1);
    } else {
      this.certGoTo(0);
    }
  }

  certPrev(): void {
    if (this.certActiveIndex > 0) {
      this.certGoTo(this.certActiveIndex - 1);
    } else {
      this.certGoTo(this.certifications.length - 1);
    }
  }

  certStartAuto(): void {
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
    this.certPauseAuto();
  }

  certTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.certTouchStartX;
    if (Math.abs(dx) > 50) {
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

  certifications = [
    {
      title: 'Backend Development and APIs V8',
      issuer: 'freeCodeCamp',
      date: 'September 27, 2025',
      image: 'assets/cert1.png',
      link: 'assets/certificates/fcc-backend-development.pdf',
    },
    {
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco',
      date: 'October 25, 2024',
      image: 'assets/cert2.png',
      link: 'assets/certificates/cisco-js.pdf',
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures V7',
      issuer: 'freeCodeCamp',
      date: 'September 30, 2025',
      image: 'assets/cert3.png',
      link: 'assets/certificates/fcc-legacy-javascript-algorithms-and-data-structures.pdf',
    },
    {
      title: 'Content Marketing',
      issuer: 'HubSpot Academy',
      date: 'August 29, 2025',
      image: 'assets/certificates/Hubspot-Content Marketing Certificate.png',
      link: 'assets/certificates/Hubspot-Content Marketing Certificate.pdf',
    },
    {
      title: 'Digital Advertising',
      issuer: 'HubSpot Academy',
      date: 'September 28, 2025',
      image: 'assets/certificates/Hubspot-Digital Advertising Certificate.png',
      link: 'assets/certificates/Hubspot-Digital Advertising Certificate.pdf',
    },
    {
      title: 'Digital Marketing',
      issuer: 'HubSpot Academy',
      date: 'July 28, 2025',
      image: 'assets/certificates/Hubspot-Digital Marketing Certificate.png',
      link: 'assets/certificates/Hubspot-Digital Marketing Certificate.pdf',
    },
    {
      title: 'SEO 1',
      issuer: 'HubSpot Academy',
      date: 'January 14, 2026',
      image: 'assets/certificates/Hubspot-SEO 1 Certificata.png',
      link: 'assets/certificates/Hubspot-SEO 1 Certificata.pdf',
    },
    {
      title: 'SEO 2',
      issuer: 'HubSpot Academy',
      date: 'January 28, 2026',
      image: 'assets/certificates/Hubspot-SEO 2 Certificate.png',
      link: 'assets/certificates/Hubspot-SEO 2 Certificate.pdf',
    },
    {
      title: 'Design Thinking for Beginners',
      issuer: 'Simplilearn',
      date: 'July 24, 2025',
      image: 'assets/certificates/Simplilearn-Design Thinking for Beginners-1.png',
      link: 'assets/certificates/Simplilearn-Design Thinking for Beginners.pdf',
    },
    {
      title: 'Introduction to Figma Certificate',
      issuer: 'Simplilearn',
      date: 'September 23, 2024',
      image: 'assets/certificates/Simplilearn-Introduction to Figma Certificate-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to Figma Certificate.pdf',
    },
    {
      title: 'Introduction to Graphic Design; Basics of UI/UX Design',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-Introduction to Graphic Design-Basics of UIUX-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to Graphic Design-Basics of UIUX.pdf',
    },
    {
      title: 'Introduction to PHP',
      issuer: 'Simplilearn',
      date: 'February 2, 2025',
      image: 'assets/certificates/Simplilearn-Introduction to PHP-1.png',
      link: 'assets/certificates/Simplilearn-Introduction to PHP.pdf',
    },
    {
      title: 'Website UI/UX Designing using ChatGPT',
      issuer: 'Simplilearn',
      date: 'August 27, 2025',
      image: 'assets/certificates/Simplilearn-Website UIUX Designing using ChatGPT-1.png',
      link: 'assets/certificates/Simplilearn-Website UIUX Designing using ChatGPT.pdf',
    },
  ];

  // ── LIFECYCLE ────────────────────────────────────────────

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
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
        }
      });
    }, observerOptions);

    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .scale-reveal, .center-title'
    );
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }

  ngOnDestroy(): void {
    this.certPauseAuto();
  }
}