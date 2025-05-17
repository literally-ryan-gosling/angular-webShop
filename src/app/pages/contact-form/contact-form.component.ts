import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ContactFormService } from '../../shared/services/contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule] 
})
export class ContactFormComponent {
  @Input() userName!: string;
  @Input() userEmail!: string;
  @Input() messageType!: string;

  @Output() messageSent = new EventEmitter<string>();
  @Output() messageClosed = new EventEmitter<boolean>();
  @Output() formValidated = new EventEmitter<boolean>();
  @Output() messageTypeChange = new EventEmitter<string>();

  contactForm = new FormGroup({
  message: new FormControl('', [Validators.required, Validators.minLength(5)]),
  messageType: new FormControl('support', [Validators.required]),
});

  constructor(private contactFormService: ContactFormService) {}

  async sendMessage() {
    if (this.contactForm.valid) {
      await this.contactFormService.sendContactMessage({
        name: this.userName,
        email: this.userEmail,
        messageType: this.contactForm.value.messageType!,
        message: this.contactForm.value.message!
      });
      this.messageSent.emit(`Sender: ${this.userName}, Message: ${this.contactForm.value.message}`);
      this.formValidated.emit(true);
      alert('Your message has been sent!');
      this.contactForm.reset({ messageType: 'support', message: '' });
    } else {
      this.formValidated.emit(false);
    }
  }

  closeForm() {
    this.messageClosed.emit(true);
  }
}
