import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  login = { email: '', senha: '' };
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.login.email, [
        Validators.email,
        Validators.nullValidator,
        Validators.required,
      ]),
      password: new FormControl(this.login.senha, [
        Validators.nullValidator,
        Validators.required,
      ]),
    });
  }

  realizarLogin() {
    const login = this.loginForm.value;
    console.log('Login %v', login);
    this.loginService.realizarLogin(login.email!, login.password!).subscribe({
      next: (login) => {
        if (!login.length) {
          alert('Usuário não encontrado');
          return;
        }
        console.log(login)
      },
      error: (err) => console.log(err),
    });
  }
}
