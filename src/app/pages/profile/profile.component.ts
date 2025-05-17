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
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Firestore, updateDoc, doc } from '@angular/fire/firestore';

@Component({ standalone: true,
  selector: 'app-profile',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule, MatCheckboxModule, MatFormFieldModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] }) 
  
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; 
  isLoggedIn: boolean = false; 
  termsAccepted: boolean = false; 
  userId: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private firestore: Firestore) {} 
  
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.userId = localStorage.getItem('userId') || '';
      this.userService.getUserProfileById(this.userId).subscribe(user => {
        console.log('Firestore user:', user);
        if (!user) {
          alert('No user data found in Firestore for this userId!');
        }
        const u = user || { name: { firstname: '', lastname: '' }, email: '' };
        this.profileForm = this.fb.group({
          firstname: [u.name.firstname],
          lastname: [u.name.lastname],
          email: [{ value: u.email, disabled: true }]
        });
      });
    }
  }
  
  async updateProfile() {
    if (!this.termsAccepted) {
      alert("You must accept the terms and conditions before saving.");
      return;
    }
    if (this.userId) {
      const prevUser = await new Promise<User | null>(resolve => {
        this.userService.getUserProfileById(this.userId).subscribe(resolve);
      });
      if (!prevUser) {
        alert("User not found!");
        return;
      }
      const updatedUser: any = {};
      if (this.profileForm.value.firstname !== prevUser.name.firstname) {
        updatedUser['name'] = updatedUser['name'] || { ...prevUser.name };
        updatedUser['name'].firstname = this.profileForm.value.firstname;
      }
      if (this.profileForm.value.lastname !== prevUser.name.lastname) {
        updatedUser['name'] = updatedUser['name'] || { ...prevUser.name };
        updatedUser['name'].lastname = this.profileForm.value.lastname;
      }
      if (Object.keys(updatedUser).length === 0) {
        alert("No changes detected.");
        return;
      }
      await this.userService.updateUserProfile(this.userId, updatedUser);
      alert("Profile updated successfully!");
    }
  }
}