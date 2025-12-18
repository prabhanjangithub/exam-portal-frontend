import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    JsonPipe,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule
   
    ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class SignupComponent {

  constructor(private userServices:UserService,
    private snack:MatSnackBar
  ){

  }

public user={
  username:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  phone:''
};

formSubmit() {
 if(this.user.username == '' || this.user.username==null){
      this.snack.open('username is required !!!','',{
        duration:3000,
        
        });
      return;
    }
this.userServices.addUser(this.user).subscribe(
  (data:any)=>{
    //success
    console.log(data);
   
    //alert('success');
    Swal.fire('successfully done!!','user id '+data.id,'success')
  },
  (error)=>{
    //error
    console.log(error)
    this.snack.open('something went wrong!!!!!','',{
      duration:3000,
    });
  }
)
}
 
}
