import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'helper/validation';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!)
  user: any
  form: FormGroup
  formchangepassword: FormGroup
  fileToUpload: Array<File> = [];
  submitted=false
  constructor(private route:Router,private resequipeservice: ResponsableEquipeService, private authentificationservice: AuthentificationService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({

      username: ['', Validators.required],
      email: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
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
        email: this.user.email


      })
    })
  }
  get f() {
    return this.formchangepassword.controls;
  }

  update() {
    this.authentificationservice.updateadmin(this.userconnect.id, this.form.value).subscribe((res: any) => {
      // this.user = res
      window.location.href = "http://localhost:4200/home/profile"
      console.log("detailrespequipe", res)

    })
  }
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
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


  changepassword(){
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
