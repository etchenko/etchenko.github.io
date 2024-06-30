import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent},
  /*{
    path: 'product/:id', component: ProductComponent,
    children: [
      {path: '', redirectTo:'updates', pathMatch:'full'},
      { path: 'offers', component: ProductOfferComponent },
      { path: 'updates', component: ProductUpdatesComponent }
    ]
  },
  { path: 'about', component: AboutComponent, 
    children: [
      {path: 'rating', outlet:'rate', component:RatingComponent},
      {path: 'feedback', outlet:'feed', component:FeedbackComponent}
    ]
  },
  { path: 'contact', component: ContactComponent },*/
  { path: '**', component: HomeComponent }
];
