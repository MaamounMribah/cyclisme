import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponsableFederationService } from 'src/app/services/responsable-federation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responsable-federation',
  templateUrl: './responsable-federation.component.html',
  styleUrls: ['./responsable-federation.component.css']
})
export class ResponsableFederationComponent implements OnInit {
  listresponsablefederation:any
  respfederform:FormGroup
  mmefform:FormGroup
  fileToUpload:Array<File>=[];
  p: number = 1;
search_name:any
submitted = false;
numlicence:any=[]
cin:any=[]
username:any=[]
  constructor(private responsablefederationservice :ResponsableFederationService,private formbuilder:FormBuilder,private route :Router) { }


  ngOnInit(): void {
    this.respfederform=this.formbuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
     
        ],
        [this.uniqueTypeValidatorusername.bind(this)]
      ],
      numlicence: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/),
        ],
        [this.uniqueTypeValidatornumlicence.bind(this)]
      ],
   
      password: ['', Validators.required],

      cin: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/)
        ],
        [this.uniqueTypeValidatorcin.bind(this)]
      ],
      nom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)
        
        ]
      ],
      prenom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)
        
        ]
      ],
      email: ['', [Validators.required, Validators.email]],

      adress: ['', Validators.required],

      tel: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/)
        
        ]
      ],
      
      role: ['', Validators.required],
      
  })



    console.log("bonjour")
    this.GETALLResponsablefederation()
  
  }
  GETALLResponsablefederation(){
    this.responsablefederationservice.getallresponsableFederation().subscribe((res:any)=>{
      this.listresponsablefederation=res
      .filter((el:any)=>el.roles[0].name=='ROLE_RESPFEDERATION')
      console.log("list ofresponsable federation",this.listresponsablefederation)
      for (let i = 0; i < this.listresponsablefederation.length; i++) {
        this.cin.push(this.listresponsablefederation[i].cin);
        this.username.push(this.listresponsablefederation[i].username);
        this.numlicence.push(this.listresponsablefederation[i].numlicence);
     
      }
  
      console.log("this.numlicence", this.numlicence);
      console.log("this.cin", this.cin);
      console.log("this.username", this.username);
    })
  }
  deleteResponsablefederation(id:any){
    this.responsablefederationservice.deleterespfedera(id).subscribe((res:any)=>{
      console.log(res)
      this. GETALLResponsablefederation()
    })

  }
  Saveresfederation(){
    this.submitted = true;
    this.respfederform.patchValue({
      role:["ROLE_RESPFEDERATION"]
    })
    console.log(this.respfederform.value)

    if (this.respfederform.invalid) {
      return;
    }
   
    let formdata=new FormData();
formdata.append("numlicence",this.respfederform.value.numlicence);
formdata.append("cin",this.respfederform.value.cin);
formdata.append("nom",this.respfederform.value.nom);
formdata.append("prenom",this.respfederform.value.prenom);
formdata.append("email",this.respfederform.value.email);
formdata.append("adress",this.respfederform.value.adress);
formdata.append("tel",this.respfederform.value.tel);
// formdata.append("etat",this.respfederform.value.etat);
formdata.append("username",this.respfederform.value.username);
formdata.append("password",this.respfederform.value.password);
formdata.append("role",this.respfederform.value.role);


formdata.append("file",this.fileToUpload[0]);
this.responsablefederationservice.saverfedera(formdata).subscribe((res:any)=>{
  console.log(res)
  Swal.fire("responsable féderation ajouté avec succés!")
 this.GETALLResponsablefederation()
},   (error: HttpErrorResponse) => { 
  
  Swal.fire( error.error.message, '', 'error')
});

}
onReset(): void {
  this.submitted = false;
  this.respfederform.reset();
}
//pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
get f() {
  return this.respfederform.controls;
}
handleFileInput(files:any){
  this.fileToUpload=<Array<File>>files.target.files;
  console.log(this.fileToUpload)
  
      }


      desactiver(id:any){
        this.responsablefederationservice.updaterefederdesactiver(id).subscribe((res:any)=>{
          console.log(res)
          this.GETALLResponsablefederation()
       })
      }
      
      activer(id:any){
        this.responsablefederationservice.updaterefederactiver(id).subscribe((res:any)=>{
          console.log(res)
          this.GETALLResponsablefederation()
       })
      }



  
      
      uniqueTypeValidatornumlicence(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
          console.log("numlicence", this.numlicence);
          const typeValue = control.value;
          const otherTypes = this.numlicence; // Remplacez par vos valeurs existantes
      
          // Effectuer une requête asynchrone pour vérifier si le type est unique
          // Remplacez cette partie par votre logique de vérification unique
      
          if (otherTypes.includes(typeValue)) {
            resolve({ uniqueType: true });
          } else {
            resolve(null);
          }
        });
      }
     
      uniqueTypeValidatorcin(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
          console.log("cin", this.cin);
          const typeValue = control.value;
          const otherTypes = this.cin; // Remplacez par vos valeurs existantes
      
          // Effectuer une requête asynchrone pour vérifier si le type est unique
          // Remplacez cette partie par votre logique de vérification unique
      
          if (otherTypes.includes(typeValue)) {
            resolve({ uniqueType: true });
          } else {
            resolve(null);
          }
        });
      }
      uniqueTypeValidatorusername(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
          console.log("username", this.username);
          const typeValue = control.value;
          const otherTypes = this.username; // Remplacez par vos valeurs existantes
      
          // Effectuer une requête asynchrone pour vérifier si le type est unique
          // Remplacez cette partie par votre logique de vérification unique
      
          if (otherTypes.includes(typeValue)) {
            resolve({ uniqueType: true });
          } else {
            resolve(null);
          }
        });
      }
}
