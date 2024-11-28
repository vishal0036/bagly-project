import { Component, inject} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CollectionsComponent } from './collections/collections.component';
import { AppproductComponent } from './appproduct/appproduct.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, HomeComponent, FooterComponent, RouterModule, PageNotFoundComponent, RouterLink, ContactusComponent, CollectionsComponent, AppproductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bagly';
}
