import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../auth-service.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthData } from '../authData.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup(
    {
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    },
    {
      validators: this.match('password', 'confirmPassword'),
    }
);

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthServiceService,
  ) {}

  ngOnInit(): void {}

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  onSignUp() {
    const userSignUpData:AuthData = {
      userName: this.signUpForm.controls.userName.value,
      password: this.signUpForm.controls.password.value,
    };

    this.authService.createUser(userSignUpData).subscribe((res) => {
      if (res) {
        this.openSnackBar('user added successfully');
        console.log(res);
      } else this.openSnackBar('Oops Something Went Wrong');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
