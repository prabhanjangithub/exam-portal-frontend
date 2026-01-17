import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,JsonPipe,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user:any=null;
  constructor(private login:LoginService){}
  ngOnInit(): void {
    this.login.getCurrentUser().subscribe({
      next:(data:any)=>{
        this.user=data;

      },
      error:(err)=>{
        console.error(err)
      }
    });
  }
  

}
