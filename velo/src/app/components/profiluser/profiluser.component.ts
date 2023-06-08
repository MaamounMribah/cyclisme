import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'helper/validation';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!)
  user: any
  form: FormGroup
  formchangepassword: FormGroup
  fileToUpload: Array<File> = [];
  submitted=false
  constructor( private route:Router,private resequipeservice: ResponsableEquipeService, private authentificationservice: AuthentificationService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({

      username: ['', Validators.required],
      email: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numlicence: ['', Validators.required],
     
      password: ['', Validators.required],

      cin: ['', Validators.required],
     
     

      adress: ['', Validators.required],

      tel: ['', Validators.required],
      etat: ['', Validators.required],
      // role:['',Validators.required],
    })
    this.formchangepassword = this.formbuilder.group({

      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')]
    }
      
    )

    this.getone()

  }
 
  // get one lel user lkol
  getone() {
    this.resequipeservice.getoneresequipe(this.userconnect.id).subscribe((res: any) => {
      this.user = res
      console.log("detailrespequipe", this.user)
      this.form.patchValue({
        username: this.user.username,
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email,
        
        adress: this.user.adress,
        tel: this.user.tel,
        numlicence: this.user.numlicence,
       
       
        etat: this.user.etat,
        cin: this.user.cin,
        


      })
    })
  }

  update1() {
    this.authentificationservice.updateuser(this.userconnect.id, this.form.value).subscribe((res: any) => {
      // this.user = res
      window.location.href = "http://localhost:4200/home/profileuser"
      console.log("detailrespequipe", res)

    })
  }


  handleFileInput(files: any) {
    this.fileToUpload = <Array<File>>files.target.files;
    console.log(this.fileToUpload)
    this.updateimage()

  }

  updateimage() {
    let formdata = new FormData();
    formdata.append("file", this.fileToUpload[0]);
    this.authentificationservice.updateimage(this.userconnect.id,formdata).subscribe((res: any) => {
      console.log("detailrespequipe", res)
      window.location.href = "http://localhost:4200/home/profile"

    })
  }
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
  }

  get f() {
    return this.formchangepassword.controls;
  }

  changepassword1(){
    this.submitted = true;
    if (this.formchangepassword.invalid) {
      return;
    }
    this.authentificationservice.changepassword(this.formchangepassword.value).subscribe((res: any) => {
      console.log("changepassword", res)
     Swal.fire("votre mot de passe est changé")
  
    })
  }


}
