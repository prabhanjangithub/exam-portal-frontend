import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from "./componunts/navbar/navbar.component";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet, MatButtonModule, NavbarComponent,MatInputModule,MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private loginServices: LoginService){}
  ngOnInit(): void {
    if(this.loginServices.isLoggedIn()){
      this.loginServices.getCurrentUser().subscribe({
        next:(user)=>{
          this.loginServices.setUser(user);
        },
        error:()=> {
          //token expired/ invalid
          this.loginServices.logout();
          location.href='/login';
        }
      });
    }
  }
}
