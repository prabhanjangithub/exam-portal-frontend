import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //current user
 public getCurrentUser() {
  return this.http.get(
    `${baseUrl}/user/current-user`,
    {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    }
  );
}

  //generate token
  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/auth/login`,loginData);
  }

  //login user : set user in localstorage
 public loginUser(data:any)
{
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  this.setUser(data.user)
  return true;
}


  //islogin : user is logged in or not
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }
    else
    {
      return true;
    }


  }

  //logout: remove token from local storage 
  public logout()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    return true;

  }

  //get token
  public getToken()
  {
    return localStorage.getItem('token');

  }

  //set user detail
  public setUser(user:any)
  {
      localStorage.setItem("user",JSON.stringify(user));
  }

  //get user
  // public getUser()
  // {
  //   let userStr=localStorage.getItem("user");
  //   if(userStr!=null)
  //   {
  //     return JSON.parse(userStr);
  //   }
  //   else
  //   {
  //     this.logout();
  //     return null;
  //   }
  // }

  public getUser(){
    const userStr=localStorage.getItem('user');
    if (userStr && userStr !=='undefined'){
      return JSON.parse(userStr);
    }
    return null;
  }

  //get user role
  public getUserRole()
{
  return localStorage.getItem("role");
}



}
