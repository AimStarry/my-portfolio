import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';

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
  activeFilter = 'All';
  lightboxImg: string | null = null;

  @ViewChild('particleCanvas') particleCanvasRef!: ElementRef<HTMLCanvasElement>;

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
      fullDescription: 'A robust, enterprise-ready inventory management system built with Python and PostgreSQL. This application provides a comprehensive solution for tracking products, managing vendor relationships, and generating business-critical reports.',
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
    {
      id: 6,
      name: 'AningKabalen',
      category: 'Full-Stack Web',
      shortDesc: 'A real-time digital marketplace connecting local farmers directly with HORECA buyers.',
      fullDescription: 'AningKabalen is a full-stack, real-time digital marketplace designed to eliminate predatory middlemen and connect local farmers in Pampanga directly with HORECA (Hotel, Restaurant, Catering) buyers. Built on a reactive Angular frontend and a robust Node.js/Express backend, the platform combines a Live Freshness Feed and a Digital Handshake system to ensure fair pricing and strengthen localized food security.',
      role: 'Systems Analyst & Database Designer',
      contributions: [
        'Spearheaded the initial system proposal and feature roadmap, defining the marketplace mechanics and structural business requirements.',
        'Designed and implemented the core database layer to handle secure, real-time product inventories and vendor transactions.',
        'Contributed directly to frontend development, utilizing Angular to translate wireframes into interactive, user-facing client application layouts.'
      ],
      tools: ['Node.js', 'Express.js', 'Angular', 'MongoDB'],
      thumbnail: 'assets/p6-main.png',
      screenshots: ['assets/p6-ss1.png', 'assets/p6-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://aningkabalen.site/',
      githubUrl: 'https://github.com/AimStarry/AningKabalen',
    },
    {
      id: 7,
      name: 'Bossrich Photography',
      category: 'Web Design & SEO',
      shortDesc: 'A highly optimized responsive showcase website for a professional photography studio.',
      fullDescription: 'Bossrich Photography is a static responsive website engineered to maximize search engine visibility and user engagement for a local photography studio. Built with WordPress, the platform focuses heavily on on-page SEO architecture, visual hierarchy, and localized content marketing strategies.',
      role: 'UI/UX Designer & SEO Specialist',
      contributions: [
        'Spearheaded the UI/UX design layout, focusing on visual hierarchy, cross-device responsiveness, and a friction-free user portfolio experience.',
        'Conducted comprehensive keyword research and implemented strategic keyword stuffing, meta titles, alt text, and meta descriptions across core pages.',
        'Authored optimized blog content architectures designed to capture localized organic search intent and improve domain authority.',
        'Configured technical on-page SEO settings, sitemaps, and indexing properties to enhance visibility under search engine analytics frameworks.'
      ],
      tools: ['WordPress', 'SEO Tools', 'Google Analytics'],
      thumbnail: 'assets/project7-main.png',
      screenshots: ['assets/p7-ss1.png', 'assets/p7-ss2.png'],
      demoVideoUrl: null,
      demoUrl: 'https://bossrichphoto.pro',
      githubUrl: null,
    },
  ];

  get categories(): string[] {
    return [...new Set(this.projectList.map(p => p.category))];
  }

  get filteredProjects() {
    if (this.activeFilter === 'All') return this.projectList;
    return this.projectList.filter(p => p.category === this.activeFilter);
  }

  constructor(private el: ElementRef) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  onCardMouseMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    const inner = card.querySelector('.card-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
      inner.style.transition = 'transform 0.05s ease';
    }
    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    }
  }

  onCardMouseLeave(card: HTMLElement) {
    const inner = card.querySelector('.card-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = '';
      inner.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    }
    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) shine.style.background = 'none';
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
    this.initParticles();
  }

  initParticles() {
    const canvas = this.particleCanvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 126, 34, ${p.alpha})`;
        ctx.fill();
      });
      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230, 126, 34, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.08 });

    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .project-card, .center-title'
    );
    revealElements.forEach((el: HTMLElement) => observer.observe(el));
  }

  setFilter(cat: string) {
    this.activeFilter = cat;
    setTimeout(() => this.initScrollAnimations(), 50);
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

  openLightbox(img: string) {
    this.lightboxImg = img;
  }

  closeLightbox() {
    this.lightboxImg = null;
  }
}