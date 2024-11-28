import { Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CollectionsComponent } from './collections/collections.component';
import { AppproductComponent } from './appproduct/appproduct.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'collections', component: CollectionsComponent },
    { path: 'appproduct', component: AppproductComponent },
    { path: '**', component: PageNotFoundComponent }, 
];



