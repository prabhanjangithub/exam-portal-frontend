import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    NgIf
    
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public loginService:LoginService,
    private router: Router 
  ){}

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

}
