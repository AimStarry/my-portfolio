import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './route-animations'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  animations: [slideInAnimation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('my-portfolio');
  private router = inject(Router);

  ngOnInit() {
    const loader = document.getElementById('main-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 600);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
      
      const content = document.querySelector('.main-content');
      if (content) {
        content.scrollTo(0, 0);
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.isActivated && outlet.activatedRouteData?.['animation'];
  }
}