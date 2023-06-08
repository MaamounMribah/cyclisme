import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup
  submitted = false;
  constructor(private authentificationservice:AuthentificationService,private route :Router,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      
      username:['',Validators.required],
 password: ['', Validators.required],
  })
  }
  get f(){
    return this.form.controls;
  }
  signin(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authentificationservice.signin(this.form.value).subscribe((res:any)=>{
  console.log(res)
  if (res.enabled==true){
    localStorage.setItem("userconnect",JSON.stringify(res))
    localStorage.setItem("token",res.accessToken)
    localStorage.setItem("refreshToken",res.refreshToken)
    localStorage.setItem("state","0")
    this.route.navigateByUrl('/home')
  
  }
  
    },
  
  err=>{
  Swal.fire ({
    icon:'error',
            title:'user not found ',
            text:'email invalid',
            footer:'password invalid'
  })
  
  console.log(err)
  }
  
    )
  }

}
