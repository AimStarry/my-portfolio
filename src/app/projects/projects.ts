import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements AfterViewInit {
  selectedProject: any = null;
  mouseX = 0;
  mouseY = 0;

  projectList = [
    {
      id: 1,
      name: 'Bibliosage',
      category: 'Full-Stack Web',
      shortDesc: 'A database system to manage book inventories.',
      fullDescription: 'Bibliosage is an E-Library Management System designed to handle complex relational data. It features inventory tracking, user lending history, and administrative dashboards built with PHP and MySQL.',
      tools: ['PHP', 'MySQL', 'CSS', 'HTML'],
      thumbnail: 'assets/project3-main.png',
      screenshots: ['assets/p1-ss1.png', 'assets/p1-ss2.png'],
      demoUrl: 'https://bibliosage.free.nf',
      githubUrl: 'https://github.com/AimStarry/Bibliosage'
    },
    {
      id: 2,
      name: 'QuickCook',
      category: 'Web Application',
      shortDesc: 'An interactive culinary platform for quick recipe discovery.',
      fullDescription: 'QuickCook is a modern, responsive web application designed to help users find and explore culinary recipes with ease. The project focuses on high-performance UI/UX, featuring a clean aesthetic, intuitive navigation, and a mobile-first design approach.',
      tools: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      thumbnail: 'assets/project2-main.png',
      screenshots: ['assets/p2-ss1.png', 'assets/p2-ss2.png'], 
      demoUrl: 'https://aimstarry.github.io/QuickCook/',
      githubUrl: 'https://github.com/AimStarry/QuickCook/tree/main'
    },
  ];

  constructor(private el: ElementRef) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = this.el.nativeElement.querySelectorAll('.reveal, .project-card, .center-title');
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }

  selectProject(project: any) {
    this.selectedProject = project;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.initScrollAnimations(), 100);
  }

  closeDetails() {
    this.selectedProject = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.initScrollAnimations(), 100);
  }
}