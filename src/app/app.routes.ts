import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: Home, 
        data: { animation: 'HomePage' } 
    },
    { 
        path: 'about', 
        component: About, 
        data: { animation: 'AboutPage' } 
    },
    { 
        path: 'projects', 
        component: Projects, 
        data: { animation: 'ProjectsPage' } 
    },
    { 
        path: 'contact', 
        component: Contact, 
        data: { animation: 'ContactPage' } 
    }
];