import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: ApiService, private router: Router,) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
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
    if (this.registerForm.valid) {
      this.http.post('/auth/register', this.registerForm.value).subscribe(
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
