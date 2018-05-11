import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  
  feedbackEnabled = false;
  error = null;
  processing = false;
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitSignupForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role 
      }
      this.authService.signup(user)
        .then((result) => {
          this.router.navigate(['/'])
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
