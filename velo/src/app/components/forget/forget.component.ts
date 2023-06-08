import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  form:FormGroup

  constructor(private formbuilder:FormBuilder,private authentificationservice:AuthentificationService) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      
      email:['',Validators.required],
  })
  }
  forget(){
    this.authentificationservice.forgetpassword(this.form.value.email).subscribe((res:any)=>{
  console.log(res)
  Swal.fire("Vérifier votre email")
    })
  }
}
