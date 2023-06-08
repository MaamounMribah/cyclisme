import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form:FormGroup
  resetlink = this.activeroute.snapshot.params["resetlink"]
  constructor(private route:Router,private activeroute: ActivatedRoute,private formbuilder:FormBuilder,private authentificationservice:AuthentificationService) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      
      newPassword:['',Validators.required],
  })
  }
  reset(){
    this.authentificationservice.restpassword(this.resetlink,this.form.value.newPassword).subscribe((res:any)=>{
  console.log(res)

 this.route.navigateByUrl("/")
    })
  }

}
