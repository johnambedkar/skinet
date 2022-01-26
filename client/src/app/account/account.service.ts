import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  // private currentUserSource = new BehaviorSubject<IUser>(null);
  private currentUserSource = new ReplaySubject<IUser>(1); // ReplaySubject will not emit an initial value. 
  //the number of values the ReplaySubject should hold. here it hold atleast 1 IUser object. so the authguard will wait till the ReplaySubject will have one value.
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string){

    if(token=== null){
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl+'account', {headers}).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values: any)
  {
    return this.http.post(this.baseUrl+'account/login',values).pipe(
      map((user:IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any){
    return this.http.post(this.baseUrl+'account/register',values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this.http.get(this.baseUrl+'account/emailexists?email='+email);
  }
}
