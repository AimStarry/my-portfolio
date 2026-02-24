import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit, OnDestroy {
  @ViewChild('section') section!: ElementRef;
  private ctx?: gsap.Context;

  isSubmitting = false;
  showSuccess = false;
  lastSentName = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

      tl.from('.massive-title', { y: 50, opacity: 0, skewY: 3, delay: 0.2 })
        .from('.main-question', { y: 20, opacity: 0 }, '-=0.7')
        .from('.description-text', { y: 20, opacity: 0 }, '-=0.8')
        .from('.detail-item', { x: -20, opacity: 0, stagger: 0.1 }, '-=0.8')
        
        .to('.action-btn', { 
          autoAlpha: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6,
          display: 'inline-flex'
        }, '-=0.7')
        
        .from('.form-card', { x: 40, opacity: 0, scale: 0.98 }, '-=1.2')
        .from('.send-btn', { scaleX: 0, opacity: 0, transformOrigin: "left" }, '-=0.4');
    }, this.section); 
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.section.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.section.nativeElement.style.setProperty('--mouse-x', `${x}px`);
    this.section.nativeElement.style.setProperty('--mouse-y', `${y}px`);
  }

  onSubmit(form: NgForm) {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      emailjs.send('service_phoehe2', 'template_j0rq1xc', {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        to_name: 'Aimee Li',
      }, 'WX3gjhNivPgB7FKE5')
      .then(() => {
        this.showSuccess = true;
        this.lastSentName = form.value.name;
        form.resetForm();
        this.isSubmitting = false;
      })
      .catch(() => {
        this.isSubmitting = false;
      });
    }
  }

  closeModal() { this.showSuccess = false; }
}