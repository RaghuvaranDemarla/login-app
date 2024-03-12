import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { from } from 'rxjs';
import Validation from '../validators/validation';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  form: FormGroup


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    },
      {
        validators: [Validation.match('password', 'password2')],
      }
    );
  }

  ngOnInit(): void {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSignup() {
    console.log("Form Data    ", this.form);
    if (this.form.valid) {
      console.log(this.form.valid, '    ', this.form.value)
      const { email, password } = this.form.value;
      if (this.authService.signUp({ email, password })) {
        this.form.reset();
        this.router.navigate(['login']);
      }
    }
  }
}
