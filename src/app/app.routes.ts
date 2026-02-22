import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin-dashboard/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin-dashboard/view-categories/view-categories.component';
import { AddCatagoriesComponent } from './pages/admin-dashboard/add-catagories/add-catagories.component';
import { ViewQuizzesComponent } from './pages/admin-dashboard/view-quizzes/view-quizzes.component';




export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },  

  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },

   {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],

    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCatagoriesComponent

      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      }
     
    ],
  },


  {
    path: 'user',
    component:UserDashboardComponent,
    canActivate:[AuthGuard]
  }
 
];
