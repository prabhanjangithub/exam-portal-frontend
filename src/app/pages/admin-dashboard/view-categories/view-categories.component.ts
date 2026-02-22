import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [MatCardModule,MatListModule,CommonModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  
  categories = [
    {
      cid: 23,
      title: 'Programming',
      description: 'This is testing categories'
    }
  ];
  

  constructor(private _category:CategoryService){}
  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      //css
      this.categories=data;
      console.log(this.categories);
    },
  (error)=>{
    console.log(error);
    Swal.fire("Error !!!","Error in loading data",'error');
  }
  )
  }
  

  deleteCategory(cid: any) {

  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this category!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {

    if (result.isConfirmed) {

      this._category.deleteCategory(cid).subscribe(

        (data: any) => {

          // remove deleted category from list
          this.categories = this.categories.filter(
            (category: any) => category.cid != cid
          );

          Swal.fire('Deleted!', 'Category deleted successfully', 'success');
        },

        (error) => {
          console.log(error);
          Swal.fire('Error!', 'Something went wrong', 'error');
        }

      );

    }

  });

}


}
