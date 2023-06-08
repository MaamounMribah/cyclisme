import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe.service';
import { MembreEquipeService } from 'src/app/services/membre-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  listequipe:any
  listmembreEquipe:any
  equipeform:FormGroup
  equipeformupdate:FormGroup
  search_name:any
  p: number = 1;
  fileToUpload:Array<File>=[];
  nom:any=[]
  rne:any=[]
  filestate:boolean =true ;
 
showform:boolean =false
  submitted = false;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  constructor(private equipeservice:EquipeService,private formbuilder:FormBuilder,private membreequipeservice:MembreEquipeService) { }

  ngOnInit(): void {
    this.equipeform=this.formbuilder.group({
      rne:['', [Validators.required, ],
       [this.uniqueTypeValidator.bind(this)]],
     
      datecreation:['',Validators.required],
      dateelection:['',Validators.required],
      nom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)],[this.uniqueTypeValidator1.bind(this)]],
     type:['',Validators.required],
    
      description:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress:[ '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/)
      
      ]],
  
     
      // id_user:['',Validators.required],
    })
    
    this.equipeformupdate=this.formbuilder.group({
      
      id:['',Validators.required],
      rne:['',Validators.required],
     // domination:['',Validators.required],
      // datecreation:['',Validators.required],
      dateelection:['',Validators.required],
     nom:['',Validators.required],
     type:['',Validators.required],
      //etat:['',Validators.required],
      description:['',Validators.required],
      email:['',Validators.required],
      adress:['',Validators.required],
     
      // id_user:['',Validators.required],
    })
    












    console.log("bonjour")
    this.GETALLEquipe()
  }
  GETALLEquipe(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listequipe=res.filter((el:any)=>el.type=='equipe')
      console.log("list of equipe",this.listequipe)
      for(let i=0;i<this.listequipe.length;i++){
        this.rne.push(this.listequipe[i].rne);
        this.nom.push(this.listequipe[i].nom);
       }
       console.log("this.rne",this.rne);
       console.log("this.nom",this.nom);
    });
  }
  deleteequipe(id:any){
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
    this.equipeservice.deleteequipe(id).subscribe((res:any)=>{
 console.log(res)
 
 Swal.fire(
   'Deleted!',
   'Your file has been deleted.',
   'success'
 )
      this.GETALLEquipe()
    } , (error: HttpErrorResponse) => { 
  
      Swal.fire( error.error.message, '', 'error')
    });
    
      
  }
})

  }
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    this.filestate=true;
        }

        get f() {
          return this.equipeform.controls;
        }
        saveequipe(){
          if (this.fileToUpload.length==0)
          {
            this.filestate=false
          }
          this.submitted = true;
          this.equipeform.patchValue({
            type:"equipe"
          })
          console.log(this.equipeform.value)
         if (this.equipeform.invalid) {
            return;
          }
      
          
          let formdata=new FormData();
      
      formdata.append("rne",this.equipeform.value.rne);
      formdata.append("dateelection",this.equipeform.value.dateelection);
      formdata.append("datecreation",this.equipeform.value.datecreation);
      formdata.append("nom",this.equipeform.value.nom);
      formdata.append("type",this.equipeform.value.type);
     // formdata.append("domination",this.equipeform.value.domination);
      formdata.append("description",this.equipeform.value.description);
      formdata.append("adress",this.equipeform.value.adress);
      formdata.append("email",this.equipeform.value.email);
      //formdata.append("etat",this.equipeform.value.etat);
    formdata.append("file",this.fileToUpload[0]);
          this.equipeservice.saveequipe(formdata).subscribe((res:any)=>{
            console.log(res)
        Swal.fire("equipe ajouté avec succés!")
        this.filestate=false;
            this.GETALLEquipe()
          
          })

      } 
      onReset(): void {
        this.submitted = false;
        this.equipeform.reset();
      }
      open(equipe:any) {
        console.log(equipe)
        this.equipeformupdate.patchValue({
          id:equipe.id,
          // type:equipe.type,
       
          description:equipe.description,
         rne:equipe.rne,
         nom:equipe.nom,
         adress:equipe.adress,
         email:equipe.email,

         //etat:equipe.etat,
         //domination:equipe.domination,
        //  datecreation:equipe.datecreation,
         dateelection:equipe.dateelection,
      
         
          
          
    
        })
      }
desactiver(id:any){
  this.equipeservice.updateequipefederationdesactiver(id).subscribe((res:any)=>{
    console.log(res)
    this.GETALLEquipe()
 })
}
// isresequipe(){
//   return this.userconnect.roles[0]=="ROLE_RESPEQUIPE" ? true : false;

// }
activer(id:any){
  this.equipeservice.updateequipefederationactiver(id).subscribe((res:any)=>{
    console.log(res)
    this.GETALLEquipe()
 })
}
      updateequipe(){
       
        let formdata=new FormData();
        formdata.append("rne",this.equipeformupdate.value.rne);
        formdata.append("dateelection",this.equipeformupdate.value.dateelection);
        // formdata.append("datecreation",this.equipeformupdate.value.datecreation);
        formdata.append("nom",this.equipeformupdate.value.nom);
        // formdata.append("type",this.equipeformupdate.value.type);
       // formdata.append("domination",this.equipeformupdate.value.domination);
        formdata.append("description",this.equipeformupdate.value.description);
        formdata.append("email",this.equipeformupdate.value.email);
        formdata.append("adress",this.equipeformupdate.value.adress);
       // formdata.append("etat",this.equipeformupdate.value.etat);

       formdata.append("file",this.fileToUpload[0]);
      
           this.equipeservice.updateequipefederation(this.equipeformupdate.value.id,formdata).subscribe((res:any)=>{
            console.log(res)
            this.GETALLEquipe()
         })
           }
           GETALLMembreEquipe(){
            this.membreequipeservice.getallmembreEquipe().subscribe((res:any)=>{
              this.listmembreEquipe=res.filter((el:any)=>el.equipeFederation.type=='equipe')
              console.log("list of membre Equipe",this.listmembreEquipe)
            })
          }
          isresfedera(){
            return this.userconnect.roles[0]=="ROLE_RESPFEDERATION" ? true : false;
          
          }
          uniqueTypeValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
            return new Promise((resolve, reject) => {
              console.log("rne",this.rne)
              const typeValue = control.value;
              const otherTypes = this.rne; // Remplacez par vos valeurs existantes
          
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
              console.log("nom",this.nom)
              const typeValue = control.value;
              const otherTypes = this.nom; // Remplacez par vos valeurs existantes
          
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
