import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {

  mouseX = 0;
  mouseY = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  techSkills = [
    { name: 'SQL / MySQL / PostgreSQL',    percent: 90, icon: 'fas fa-database' },
    { name: 'MongoDB / NoSQL',              percent: 85, icon: 'fas fa-leaf' },
    { name: 'HTML / CSS / JavaScript',      percent: 88, icon: 'fas fa-code' },
    { name: 'PHP / Node.js / Python',       percent: 80, icon: 'fas fa-server' },
    { name: 'Angular / Vue.js',             percent: 78, icon: 'fas fa-layer-group' },
    { name: 'UI/UX Design (Figma)',         percent: 82, icon: 'fas fa-pen-ruler' },
    { name: 'Git / GitHub',                 percent: 80, icon: 'fab fa-github' },
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
      title: 'OJT in Database / Data Engineering',
      description: 'Gain hands-on industry experience working on real databases, data pipelines, and backend systems to bridge academic knowledge with professional practice.',
    },
    {
      horizon: 'Short-Term',
      icon: 'fas fa-rocket',
      title: 'Junior Data Engineer or Frontend Developer',
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
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
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
            bars.forEach((bar: any) => {
              const width = bar.getAttribute('data-width');
              bar.style.width = width + '%';
            });
          }
        }
      });
    }, observerOptions);

    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .scale-reveal, .center-title'
    );
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }
}