import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import { JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginService } from '../../services/login.service';

import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    JsonPipe,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule 
   
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData={
    username: '',
    password: '',
  };
  constructor(
  private snack: MatSnackBar,
  private loginService: LoginService,
  private router: Router
) {}

  formSubmit()
  {
    console.log("login button submited") 
    if(this.loginData.username.trim()==''|| this.loginData.username==null)
    {
      this.snack.open("username is required","",{

        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()==''|| this.loginData.password==null)
    {
      this.snack.open("password is required","",{

        duration:3000,
      });
      return;
    }
    //request to server to generate tocken
   this.loginService.generateToken(this.loginData).subscribe({
  next: (response: any) => {

    // 1️⃣ Save token & role
    this.loginService.loginUser(response);

    // 2️⃣ Navigate immediately
    if (response.role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }

    // 3️⃣ Load user in background (optional)
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.loginService.setUser(user);
      },
      error: () => {
        console.error('Failed to load user');
      }
    });
  },
  error: () => {
    this.snack.open('Invalid username or password', '', { duration: 3000 });
  }
});


}
}