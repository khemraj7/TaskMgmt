import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: ApiService, private router: Router,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('Users'))) {
      this.router.navigate(['/tasks'])
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post('/auth/login', this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem('Users', JSON.stringify(response['user']))
          localStorage.setItem('token', JSON.stringify(response['token']))
          this.router.navigate(['/tasks'])
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
