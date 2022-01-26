import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors:string[];
  // FormBuilder helps us to create formcontrols quite easier.
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, 
        [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit(){
    //console.log(this.registerForm.value);
      this.accountService.register(this.registerForm.value).subscribe((response)=>{
      this.router.navigateByUrl('/shop');
        }, error => {
                      console.log('error occured while registering.');
                      this.errors = error.errors;
                      
                    }
      );
  }

  //async validator to check if email address already exists.
  validateEmailNotTaken() : AsyncValidatorFn{
    return control => {
      // timer from rxjs is going to debounce the request and add some delay
      return timer(500).pipe(
        switchMap(()=>{
          if(!control.value){
            return of(null); // return an observable of null;
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res? {emailExists: true} : null;
            })
          );
        })
      );
    }
  }

}
