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
    { name: 'SQL / MongoDB / Databases', percent: 90 },
    { name: 'UI/UX Design', percent: 85 },
    { name: 'JS / HTML / CSS / Python', percent: 88 },
    { name: 'Git / GitHub', percent: 80 }
  ];

  testimonials = [
    {
      name: 'Dr. Maria Santos',
      role: 'IT Professor',
      initials: 'MS',
      content: 'Aimee consistently demonstrates a logical approach to database architecture. Her ability to translate complex data into clean interfaces is impressive.'
    },
    {
      name: 'Mark Rivera',
      role: 'Project Lead',
      initials: 'MR',
      content: 'Working with Aimee was a breeze. She has a keen eye for detail and never settles for "good enough" when it comes to user experience.'
    }
  ];

  certifications = [
    { 
      title: 'FreeCodeCamp: Backend Development and APIs V8', 
      date: 'September 27, 2025', 
      image: 'assets/cert1.png', 
      link: 'assets/certificates/fcc-backend-development.pdf' 
    },
    { 
      title: 'Cisco: JavaScript Essentials 1', 
      date: 'October 25, 2024', 
      image: 'assets/cert2.png', 
      link: 'assets/certificates/cisco-js.pdf' 
    },
    { 
      title: 'FreeCodeCamp: Legacy JavaScript Algorithms and Data Structures V7', 
      date: 'September 30, 2025', 
      image: 'assets/cert3.png', 
      link: 'assets/certificates/fcc-legacy-javascript-algorithms-and-data-structures.pdf' 
    }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
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

    const revealElements = this.el.nativeElement.querySelectorAll('.reveal, .scale-reveal, .center-title');
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }
}