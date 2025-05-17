import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MessageTypeFeedbackPipe } from '../../shared/pipes/message-type.pipe'; 
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ContactFormComponent, MessageTypeFeedbackPipe]
})
export class ContactComponent {
  loggedInUser = '';
  userEmail = '';
  selectedType = 'support';
  messageDate = new Date();

  constructor(private userService: UserService) {
    const userId = localStorage.getItem('userId') || '';
    if (userId) {
      this.userService.getUserProfileById(userId).subscribe(user => {
        if (user) {
          this.loggedInUser = `${user.name.firstname} ${user.name.lastname}`;
          this.userEmail = user.email;
        }
      });
    }
  }

  onMessageSent(message: string) {
    console.log('Üzenet elküldve:', message);
  }

  onMessageClosed(status: boolean) {
    console.log('Kapcsolatfelvételi ablak bezárva:', status);
  }

  onFormValidated(isValid: boolean) {
    console.log('Az űrlap állapota:', isValid ? 'Érvényes' : 'Érvénytelen');
  }
  onMessageTypeChange(type: string) {
    this.selectedType = type;
  }
}
