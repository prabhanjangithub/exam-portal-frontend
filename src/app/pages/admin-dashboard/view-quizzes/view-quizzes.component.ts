import { Component, OnInit } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import { JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
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
  CommonModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{

  quizzes=[
    {
      qId:23,
      title:'Basic java quiz',
      descreption:'asfasdf asdfasdf asdfasdf asddfasdf',
      maxMark:50,
      numberOfquestion:20,
      active:'',
      category:{
        title:'programming',
      }
      

    },
     {
      qId:24,
      title:'Basic python quiz',
      descreption:'agsdgadg sdgasd asdfasdg adgadg asdg ',
      maxMark:60,
      numberOfquestion:20,
      active:'',
      category:{
        title:'programming',
      }  

    }
  ]

  constructor(private _quiz:QuizService){}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>
      {
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!!',"error in loading data",'error')
      }

    )
  }



}
