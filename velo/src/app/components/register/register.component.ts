import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'helper/validation';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup
  fileToUpload:Array<File>=[];
  submitted = false;

  constructor(private authentifactionservice:AuthentificationService,private route :Router,private formbuilder:FormBuilder) { }

  ngOnInit(): void {

    this.form=this.formbuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      role:['',Validators.required],
      
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
  )};
  get f() {
    return this.form.controls;
  }
    
  
 
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }

  signup(){
   
   
    this.submitted = true;
    this.form.patchValue({
      role:["admin"]
    
    })
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
 
    let formdata = new FormData();
    formdata.append("nom", this.form.value.nom);
    formdata.append("prenom", this.form.value.prenom);
    formdata.append("email", this.form.value.email);
    formdata.append("username", this.form.value.username);
    formdata.append("password", this.form.value.password);
    formdata.append("role", this.form.value.role);

    console.log(formdata)
    formdata.append("file", this.fileToUpload[0]);
    this.authentifactionservice.signup(formdata).subscribe((res:any)=>{
     console.log(res)
     this.route.navigateByUrl("/")
    }
   ) }
   onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
