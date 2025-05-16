import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'messageTypeFeedback' })
export class MessageTypeFeedbackPipe implements PipeTransform {
  transform(type: string): string {
    switch (type) {
      case 'support':
        return 'Do you have a question? Feel free to ask, we are here to help!';
      case 'feedback':
        return 'Your feedback is very important to us. Share your thoughts!';
      case 'sales':
        return 'Are you interested in one of our products? Contact us!';
      default:
        return 'Write us a message!';
    }
  }
}
