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
      role: 'Backend Developer & Database Designer',
      contributions: [
        'Designed and implemented the relational MySQL database schema with normalized tables',
        'Built the full PHP backend with CRUD operations for books, users, and borrow records',
        'Developed the administrative dashboard with server-side real-time inventory statistics',
        'Implemented user authentication, session management, and role-based access control',
      ],
      tools: ['PHP', 'MySQL', 'HTML', 'CSS'],
      thumbnail: 'assets/project1-main.png',
      screenshots: ['assets/p1-ss1.png', 'assets/p1-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://bibliosage.free.nf',
      githubUrl: 'https://github.com/AimStarry/Bibliosage',
    },
    {
      id: 2,
      name: 'QuickCook',
      category: 'Web Application',
      shortDesc: 'An interactive culinary platform for quick recipe discovery.',
      fullDescription: 'QuickCook is a modern, responsive web application designed to help users find and explore culinary recipes with ease. The project focuses on high-performance UI/UX, featuring a clean aesthetic, intuitive navigation, and a mobile-first design approach.',
      role: 'Frontend Developer',
      contributions: [
        'Designed the full UI/UX from wireframe sketches to pixel-perfect production layout',
        'Built dynamic recipe filtering and keyword search using vanilla JavaScript',
        'Implemented a fully mobile-responsive layout using a mobile-first CSS strategy',
        'Deployed and configured the application on GitHub Pages with a custom workflow',
      ],
      tools: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      thumbnail: 'assets/project2-main.png',
      screenshots: ['assets/p2-ss1.png', 'assets/p2-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://aimstarry.github.io/QuickCook/',
      githubUrl: 'https://github.com/AimStarry/QuickCook',
    },
    {
      id: 3,
      name: 'Shoporia',
      category: 'Full-Stack Web',
      shortDesc: 'An interactive e-commerce platform for quick product discovery.',
      fullDescription: 'Shoporia is a full-stack e-commerce application built with modern web technologies. It features a responsive design, seamless user experience, and robust backend functionality to support online shopping.',
      role: 'UI/UX Designer & Database Designer',
      contributions: [
        'Designed the full UI/UX in Figma and implemented it as a Vue.js component-based frontend',
        'Defined the MongoDB document schema for products, users, orders, and transactions',
        'Crafted the responsive storefront layout, product cards, and checkout page UI',
        'Ensured data integrity through schema validation rules and structured document design',
      ],
      tools: ['HTML', 'CSS', 'Vue.js', 'Node.js', 'MongoDB'],
      thumbnail: 'assets/project3-main.png',
      screenshots: ['assets/p3-ss1.png', 'assets/p3-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://shoporiafrontend.vercel.app',
      githubUrl: 'https://github.com/AimStarry/Shoporia',
    },
    {
      id: 4,
      name: 'Finance Tracker',
      category: 'Full-Stack Web',
      shortDesc: 'An interactive financial management application.',
      fullDescription: 'Finance Tracker is a full-stack web application designed to help users manage their finances effectively. It features a responsive design, seamless user experience, and robust backend functionality to support financial tracking and budget visualization.',
      role: 'Full-Stack Developer',
      contributions: [
        'Designed and built the Angular frontend with dynamic charts and budget visualizations',
        'Developed a Node.js/Express REST API for transaction creation and budget management',
        'Modeled and managed the PostgreSQL relational database schema for financial records',
        'Deployed the full application to Vercel with environment-based configuration',
      ],
      tools: ['PostgreSQL', 'Angular', 'Express', 'Node.js'],
      thumbnail: 'assets/project4-main.png',
      screenshots: ['assets/p4-ss1.png', 'assets/p4-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://finance-tracker-pearl-mu.vercel.app/',
      githubUrl: 'https://github.com/AimStarry/finance-tracker',
    },
    {
      id: 5,
      name: 'Multi-Vendor Inventory System',
      category: 'Full-Stack Web',
      shortDesc: 'A robust inventory management system for multi-vendor environments.',
      fullDescription: 'A robust, enterprise-ready inventory management system built with Python and PostgreSQL. This application provides a comprehensive solution for tracking products, managing vendor relationships, and generating business-critical reports. The full source code is available on GitHub for review and deployment.',
      role: 'Backend Developer',
      contributions: [
        'Designed the full PostgreSQL schema for multi-vendor product and supplier relationships',
        'Built the Python CLI application using the Rich library for a polished terminal UI',
        'Implemented low-stock alerts, vendor filtering, and CSV export functionality',
        'Wrote the complete data access layer using parameterized queries to prevent SQL injection',
      ],
      tools: ['Python', 'PostgreSQL', 'Rich Library', 'CSV Export'],
      thumbnail: 'assets/project5-main.png',
      screenshots: ['assets/p5-ss1.png', 'assets/p5-ss2.png'],
      demoVideoUrl: 'assets/project5-vid.mp4',
      demoUrl: null,
      githubUrl: 'https://github.com/AimStarry/Inventory-System-Python',
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

    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .project-card, .center-title'
    );
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