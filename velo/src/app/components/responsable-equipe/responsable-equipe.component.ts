import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe.service';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responsable-equipe',
  templateUrl: './responsable-equipe.component.html',
  styleUrls: ['./responsable-equipe.component.css']
})
export class ResponsableEquipeComponent implements OnInit {
  listresponsableequipe: any
  respequiform: FormGroup
  mmefform: FormGroup
  search_name: any
  p: number = 1;
  fileToUpload: Array<File> = [];
  listequipe:any
  submitted = false;
  numlicence:any=[]
  cin:any=[]
  username:any=[]
  constructor(private responsableequipeservice: ResponsableEquipeService,private equipeservice:EquipeService, private formbuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    //ajout
    this.respequiform = this.formbuilder.group({

      numlicence: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/),
        ],
        [this.uniqueTypeValidator.bind(this)]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
        [this.uniqueTypeValidator2.bind(this)]
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
        [this.uniqueTypeValidator1.bind(this)]
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
      id_equipefeder: ['', Validators.required],


    })
    //tab3a update
    this.mmefform = this.formbuilder.group({
      id: ['', Validators.required],
      numlicence: ['', Validators.required],
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      // datenaissance:['',Validators.required],
      adress: ['', Validators.required],
     
      // etat: ['', Validators.required],

      tel: ['', Validators.required],
      username: ['', Validators.required],

    })
    console.log("bonjour")
    this.GETALLResponsableequipe()
  }
  GETALLResponsableequipe() {
    this.responsableequipeservice.getallresponsableEquipe().subscribe((res: any) => {
      this.listresponsableequipe = res
      .filter((el: any) => el.roles[0].name == 'ROLE_RESPEQUIPE')
      console.log("list ofresponsable equipe", this.listresponsableequipe)
    this.GETALLEquipe()
    for (let i = 0; i < this.listresponsableequipe.length; i++) {
      this.numlicence.push(this.listresponsableequipe[i].numlicence);
      this.cin.push(this.listresponsableequipe[i].cin);
      this.username.push(this.listresponsableequipe[i].username);
    }

    console.log("this.numlicence", this.numlicence);
    console.log("this.cin", this.cin);
    console.log("this.username", this.username);

    })
  }
  deleteResponsableequipe(id: any) {
    this.responsableequipeservice.deleterespequipe(id).subscribe((res: any) => {
      console.log(res)
      this.GETALLResponsableequipe()
    })

  }
  Saveresequipe() {
    this.submitted = true;
    console.log(this.respequiform.value)
    this.respequiform.patchValue({
      role: ["ROLE_RESPEQUIPE"]
    })
    if (this.respequiform.invalid) {
      return;
    }
   
    let formdata = new FormData();
    formdata.append("numlicence", this.respequiform.value.numlicence);
    formdata.append("cin", this.respequiform.value.cin);
    formdata.append("nom", this.respequiform.value.nom);
    formdata.append("prenom", this.respequiform.value.prenom);
    formdata.append("email", this.respequiform.value.email);
    formdata.append("adress", this.respequiform.value.adress);
    formdata.append("tel", this.respequiform.value.tel);
    // formdata.append("etat", this.respequiform.value.etat);
    formdata.append("username", this.respequiform.value.username);
    formdata.append("password", this.respequiform.value.password);
    formdata.append("role", this.respequiform.value.role);


    formdata.append("file", this.fileToUpload[0]);
    this.responsableequipeservice.saverequipe(formdata,this.respequiform.value.id_equipefeder).subscribe((res: any) => {
      console.log(res)
      Swal.fire("responsable equipe ajouté avec succés")
      this.GETALLResponsableequipe()
    },  (error: HttpErrorResponse) => { 
  
      Swal.fire( error.error.message, '', 'error')
    });

  }
  onReset(): void {
    this.submitted = false;
    this.respequiform.reset();
  }
  handleFileInput(files: any) {
    this.fileToUpload = <Array<File>>files.target.files;
    console.log(this.fileToUpload)

  }
  GETALLEquipe() {
    this.equipeservice.getallEquipe().subscribe((res: any) => {
      this.listequipe = res.filter((el: any) => el.type == 'equipe');
  
      console.log("Liste des équipes :", this.listequipe);
  
      this.listequipe = this.listequipe.filter((equipe: any) => {
        for (let i = 0; i < this.listresponsableequipe.length; i++) {
          if (equipe.id === this.listresponsableequipe[i].equipeFederation.id) {
            return false; // Équipe affectée à un responsable d'équipe, filtrée
          }
        }
        return true; // Équipe non affectée à un responsable d'équipe, conservée
      });
  
      console.log("Liste des équipes non affectées :", this.listequipe);
    });
  }
  
  // GETALLEquipe(){
   
  //     this.equipeservice.getallEquipe().subscribe((res:any)=>{
  //       this.listequipe=res
  //       .filter((el:any)=>el.type=='equipe') 
  //       console.log("list of equipe",this.listequipe)
  //     })
  //     for(let i=0;i<this.listresponsableequipe.length;i++){
  //       this.listequipe=this.listequipe.filter((el:any)=>el.id!==this.listresponsableequipe[i].equipeFederation.id)
  //   }
  
  // }
  //pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
  get f() {
    return this.respequiform.controls;
  }

  open(mmq: any) {
    console.log(mmq)
    this.mmefform.patchValue({

      id: mmq.id,

      email: mmq.email,
      adress: mmq.adress,
      tel: mmq.tel,
      numlicence: mmq.numlicence,
      username: mmq.username,
      
      etat: mmq.etat,
      cin: mmq.cin,
      nom: mmq.nom,
      prenom: mmq.prenom,



    })
  }

  updatresequipe() {

    let formdata = new FormData();
    formdata.append("numlicence", this.mmefform.value.numlicence);
    formdata.append("cin", this.mmefform.value.cin);
    formdata.append("nom", this.mmefform.value.nom);
    formdata.append("prenom", this.mmefform.value.prenom);
    formdata.append("email", this.mmefform.value.email);
    formdata.append("adress", this.mmefform.value.adress);
    formdata.append("tel", this.mmefform.value.tel);
    // formdata.append("etat", this.mmefform.value.etat);
    formdata.append("username", this.mmefform.value.username);
   
    formdata.append("file", this.fileToUpload[0]);

    this.responsableequipeservice.updateresponsableequipe(formdata, this.mmefform.value.id).subscribe((res: any) => {
      console.log(res)
      this.GETALLResponsableequipe()
    })
  }



  desactiver(id: any) {
    this.responsableequipeservice.updateresequipedesactiver(id).subscribe((res: any) => {
      console.log(res)
      this.GETALLResponsableequipe()
    })
  }

  activer(id: any) {
    this.responsableequipeservice.updateresequipeactiver(id).subscribe((res: any) => {
      console.log(res)
      this.GETALLResponsableequipe()
    })
  }
  uniqueTypeValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
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
  uniqueTypeValidator1(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
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
  uniqueTypeValidator2(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
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
