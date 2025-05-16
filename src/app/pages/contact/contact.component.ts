import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MessageTypeFeedbackPipe } from '../../shared/pipes/message-type.pipe'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ContactFormComponent, MessageTypeFeedbackPipe]
})
export class ContactComponent {
  loggedInUser = 'Teszt';
  userEmail = 'teszt@gmail.com';
  selectedType = 'support';
  messageDate = new Date();

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
