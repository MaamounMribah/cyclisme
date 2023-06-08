import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css']
})
export class SendmailComponent implements OnInit {

  to: string;
  subject: string;
  body: string;
  file : File | null;;
  registerSendMailData = {  } as any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
   
  }

  sendEmail(): void {
    const formData = new FormData();
    formData.append('to', this.registerSendMailData.to);
    formData.append('subject', this.registerSendMailData.subject);
    formData.append('body', this.registerSendMailData.body);
    for (let i = 0; i < this.registerSendMailData.files.length; i++) {
      formData.append('files', this.registerSendMailData.files[i]);
    }
  
    this.http.post('http://localhost:8080/equipe/send', formData)
      .subscribe(() => {
        alert('Email sent successfully!');
        this.resetForm();
      },error => {
        console.error('Error sending email:', error);
      });
  }

  handleFileInput(event: any): void {
    this.registerSendMailData.files = event.target.files;
  }

  resetForm(): void {
    this.to = '';
    this.subject = '';
    this.body = '';
    this.file = null;
  }

}



