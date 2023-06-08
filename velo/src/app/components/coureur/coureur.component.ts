import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoureurService } from 'src/app/services/coureur.service';
import { EquipeService } from 'src/app/services/equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coureur',
  templateUrl: './coureur.component.html',
  styleUrls: ['./coureur.component.css']
})
export class CoureurComponent implements OnInit {

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listcoureur: any
  listequipe: any
  coureurform: FormGroup
  coureurformupdate: FormGroup
anneesysteme:any
anneenaissance:any
search_name:any
  p: number = 1;

  fileToUpload: Array<File> = [];
  category:any
  submitted = false;
  numlicence:any=[]
  constructor(private coureurservice: CoureurService, private formbuilder: FormBuilder, private route: Router, private equipeservice: EquipeService) { }

  ngOnInit(): void {
    this.coureurform = this.formbuilder.group({

      numlicence: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
      [this.uniqueTypeValidator.bind(this)]],

      
      nom: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      prenom: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      datenaissance: ['', Validators.required],
      region: ['', Validators.required],
      genre: ['', Validators.required],
      categorycoureur: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(8), Validators.maxLength(8)]],
      description: ['', Validators.required],
      equipenational: ['', Validators.required],
      id_equipefeder: ['', Validators.required]
    })
//update
    this.coureurformupdate = this.formbuilder.group({

      numlicence: ['', Validators.required],
      id: ['', Validators.required],

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      region: ['', Validators.required],
      tel: ['', Validators.required],
      description: ['', Validators.required],
      equipenational: ['', Validators.required],
      id_equipefeder: ['', Validators.required]
    })
    console.log("bonjour")
    this.GETALLCoureur()
    this.GETALLEquipe()
    // this.updatecategorycoureur()
  }
  GETALLCoureur() {
    this.coureurservice.getallcoureur().subscribe((res: any) => {
      this.listcoureur = res
      console.log("list of coureur", this.listcoureur)
      this.updatecategorycoureur()
      for (let i = 0; i < this.listcoureur.length; i++) {
        this.numlicence.push(this.listcoureur[i].numlicence);
       
      }
  
      console.log("this.numlicence", this.numlicence);
      
    })
  }
    //pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
get f() {
  return this.coureurform.controls;
}
  deletecoureur(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coureurservice.deletecoureur(id).subscribe((res: any) => {
          console.log(res)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.GETALLCoureur()
        })

      }
    })


  }
  handleFileInput(files: any) {
    this.fileToUpload = <Array<File>>files.target.files;
    console.log(this.fileToUpload)

  }
  savecoureur() {
  
    
    const moonLanding = new Date(this.coureurform.value.datenaissance);
    console.log(this.coureurform.value)
    console.log("annee", moonLanding.getFullYear())
   
    this.anneenaissance= moonLanding.getFullYear()

    let currentDate = new Date();
    console.log("date systeme", currentDate.getFullYear())
    this.anneesysteme=currentDate.getFullYear()
    let age=Number(this.anneesysteme )- Number(this.anneenaissance)
    console.log("age",age)

    if(age>=9 && age<=10){
      this.coureurform.patchValue({
        "categorycoureur":"ecole"
      })
    }
      else if(age>=11  && age<=12 ){
        this.coureurform.patchValue({
          "categorycoureur":"jeune_minime"
        })
        
      }
      else if(age>=13  && age<=14 ){
        this.coureurform.patchValue({
          "categorycoureur":"minime"
        })
      }
      else if(age>=14  && age<=15 ){
        this.coureurform.patchValue({
          "categorycoureur":"cadet"
        })
      }
      else if(age>=16  && age<=17 ){
        this.coureurform.patchValue({
          "categorycoureur":"junior"
        })
      }
      else if(age>=18  && age<=22 ){
        this.coureurform.patchValue({
          "categorycoureur":"espoir"
        })
      }
      else if(age>=23  && age<=35 ){
        this.coureurform.patchValue({
          "categorycoureur":"sénior"
        })
      }
      else if(age>=36 && age<=45 ){
        this.coureurform.patchValue({
          "categorycoureur":"master1"
        })
      }
      else if(age>=46  && age<=55 ){
        this.coureurform.patchValue({
          "categorycoureur":"master2"
        })
      }
      else {
        this.coureurform.patchValue({
          "categorycoureur":"master3"
        })
        
      }
    console.log("categorie coureur",this.coureurform.value.categorycoureur)
    this.submitted = true;

    if (this.coureurform.invalid) {
      return;
    }
        let formdata=new FormData();
    formdata.append("numlicence",this.coureurform.value.numlicence);
    
    formdata.append("nom",this.coureurform.value.nom);
    formdata.append("prenom",this.coureurform.value.prenom);
    formdata.append("email",this.coureurform.value.email);
    formdata.append("datenaissance",this.coureurform.value.datenaissance);
    formdata.append("region",this.coureurform.value.region);
    formdata.append("genre",this.coureurform.value.genre);
    formdata.append("categorycoureur",this.coureurform.value.categorycoureur);
    formdata.append("tel",this.coureurform.value.tel);
    formdata.append("equipenational",this.coureurform.value.equipenational);
    formdata.append("description",this.coureurform.value.description);
    formdata.append("file",this.fileToUpload[0]);
        this.coureurservice.savecoureur(formdata,this.coureurform.value.id_equipefeder).subscribe((res:any)=>{
          console.log(res)
          Swal.fire("coureur ajouté avec succés!")
          this.GETALLCoureur()
        })

  }
  onReset(): void {
    this.submitted = false;
    this.coureurform.reset();
  }
  
  GETALLEquipe() {
    this.equipeservice.getallEquipe().subscribe((res: any) => {
      this.listequipe = res
        .filter((el: any) => el.type == 'equipe' && el.enabled=="activer")

      console.log("list of equipe", this.listequipe)
    })
  }
  open(coureur: any) {
    console.log(coureur)
    this.coureurformupdate.patchValue({
      numlicence: coureur.numlicence,
      id: coureur.id,
      nom: coureur.nom,
      prenom: coureur.prenom,
      email: coureur.email,
      region: coureur.region,
      tel: coureur.tel,
      equipenational: coureur.equipenational,
      description: coureur.description,
      id_equipefeder: coureur.id_equipefeder



    })
  }
  updatecoureur() {

    let formdata = new FormData();
    formdata.append(" numlicence", this.coureurformupdate.value.numlicence);
    // formdata.append(" cin",this.coureurformupdate.value. cin);
    formdata.append("nom", this.coureurformupdate.value.nom);
    formdata.append("prenom", this.coureurformupdate.value.prenom);
    formdata.append("email", this.coureurformupdate.value.email);
    // formdata.append("datenaissance",this.coureurformupdate.value.datenaissance);
    formdata.append("region", this.coureurformupdate.value.region);
    // formdata.append("genre",this.coureurform.value.genre);
    // formdata.append("categorycoureur",this.coureurformupdate.value.categorycoureur);
    formdata.append("tel", this.coureurformupdate.value.tel);
    formdata.append("equipenational", this.coureurformupdate.value.equipenational);
    formdata.append("description", this.coureurformupdate.value.description);
    formdata.append("file", this.fileToUpload[0]);

    this.coureurservice.updatecoureur(formdata, this.coureurformupdate.value.id, this.coureurformupdate.value.id_equipefeder).subscribe((res: any) => {
      console.log(res)
      this.GETALLCoureur()
    })
  }
  desactiver(id:any){
    this.coureurservice.coureurdesactiver(id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCoureur()
   })
  }
  
  activer(id:any){
    this.coureurservice.coureuractiver(id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCoureur()
   })
  }
  isresequipe(){
    return this.userconnect.roles[0]=="ROLE_RESPEQUIPE" ? true : false;
  
  }
  confirmercoureur(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Confime this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirme it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coureurservice.confirmercoureur(id).subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              'Confirmation!',
              'Your file has been confirmé.',
              'success'
            )
            this.GETALLCoureur();
          },
          (error: any) => {
            console.error("Erreur lors de la confirmation de la coureur :", error);
            // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
          }
        );
       
      }
    })
    
  }
  

updatecategorycoureur(){
  for(let i=0;i<this.listcoureur.length;i++){
  const moonLanding = new Date(this.listcoureur[i].datenaissance);
  // console.log(this.coureurform.value)
  // console.log("annee", moonLanding.getFullYear())
 
  this.anneenaissance= moonLanding.getFullYear()

  let currentDate = new Date();
  // console.log("date systeme", currentDate.getFullYear())
  this.anneesysteme=currentDate.getFullYear()
  let age=Number(this.anneesysteme )- Number(this.anneenaissance)
  console.log("age",age)

  if(age>=9 && age<=10){
    this.category="ecole"
   
  }
    else if(age>=11  && age<=12 ){
    
        this.category="jeune_minime"
     
      
    }
    else if(age>=13  && age<=14 ){
     
      this.category="minime"
    
    }
    else if(age>=14  && age<=15 ){
    
      this.category="cadet"
     
    }
    else if(age>=16  && age<=17 ){
    
        this.category="junior"
     
    }
    else if(age>=18  && age<=22 ){
  
      this.category="espoir"
     
    }
    else if(age>=23  && age<=35 ){
     
      this.category="sénior"
    
    }
    else if(age>=36 && age<=45 ){
    
      this.category="master1"
  
    }
    else if(age>=46  && age<=55 ){
    
      this.category="master2"
    
    }
    else {
      
      this.category="master3"
    
      
    }
  console.log("categorie coureur",this.category)
    this.coureurservice.updatecategorycoureur(this.listcoureur[i].id,this.category).subscribe((res:any)=>{
      console.log(res)
      // this.GETALLCoureur()
   })
  
  }
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
}
