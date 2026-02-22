import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-catagories',
  standalone: true,
  imports: [MatFormFieldModule,MatCardModule,MatInputModule,MatButtonModule,FormsModule,CommonModule],
  templateUrl: './add-catagories.component.html',
  styleUrl: './add-catagories.component.css'
})
export class AddCatagoriesComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  constructor(private _category:CategoryService,private _snack:MatSnackBar){}
  category={
    title:'',
    description:'',
    
  }
  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open("Title required !!",'',{
        duration:3000,

      });
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!","Category added successfully","success")
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!","Something went wrong","error")
      }
    )
  }
}
