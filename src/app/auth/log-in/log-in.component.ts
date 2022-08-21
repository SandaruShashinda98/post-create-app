import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthData } from '../authData.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  userName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}

  onLogIn() {
    const userLogInData: AuthData = {
      userName: this.userName.value,
      password: this.password.value,
    };
    this.authService.login(userLogInData);
    if(this.authService.loginResponse){
      console.log(this.authService.loginResponse);
      this.openSnackBar("successfully log In");
    }else{
      this.openSnackBar("log In failed");
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
