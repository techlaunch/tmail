export default class Email {
  constructor() {
    this.subject = '';
    this.message = '';
    this.receiver = {
      email: ''
    };
    this.attachments = [];
  }
}