import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../service/auth-google.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { RegisterService } from './register.service';

function notOnlySpaces(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value !== null && control.value.trim().length === 0) {
    return { notOnlySpaces: true };
  }
  return null;
}

function noNumbers(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const containsNumbers = /\d/.test(control.value);
  return containsNumbers ? { containsNumbers: true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private authGoogleService: AuthGoogleService,
    private registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          notOnlySpaces,
          noNumbers,
        ],
      ],
      email: ['', [Validators.required, Validators.email, notOnlySpaces]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), notOnlySpaces],
      ],
    });
  }

  signUpWithGoogle() {
    this.authGoogleService.login();
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const registrationData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.registerService.registerUser(registrationData).subscribe(
      (response: any) => {
        console.log(response);
        alert('Đăng ký thành công');
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Email đã tồn tại');
        console.error('Lỗi khi gọi API đăng ký:', error);
      }
    );
  }
}
