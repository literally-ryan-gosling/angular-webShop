import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({ standalone: true,
  selector: 'app-profile',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule, MatCheckboxModule, MatFormFieldModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] }) 
  
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; 
  isLoggedIn: boolean = false; 
  termsAccepted: boolean = false; 

  constructor(private fb: FormBuilder) {} 
  
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) { const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : { name: { firstname: '', lastname: '' }, email: '', password: '' };
      this.profileForm = this.fb.group({ firstname: [user.name.firstname], lastname: [user.name.lastname],
        email: [{ value: user.email, disabled: true }], password: [user.password] }); } }
        
        updateProfile() {
          if (!this.termsAccepted) {
            alert("You must accept the terms and conditions before saving.");
            return;
          }

          const updatedUser = { name: { firstname: this.profileForm.value.firstname, lastname: this.profileForm.value.lastname },
          email: this.profileForm.value.email, password: this.profileForm.value.password };
          localStorage.setItem('user', JSON.stringify(updatedUser)); alert("Profile updated successfully!");
        }
}