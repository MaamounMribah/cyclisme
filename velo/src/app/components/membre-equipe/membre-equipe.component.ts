import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe.service';
import { MembreEquipeService } from 'src/app/services/membre-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membre-equipe',
  templateUrl: './membre-equipe.component.html',
  styleUrls: ['./membre-equipe.component.css']
})
export class MembreEquipeComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listmembreEquipe:any
  listequipe:any
  membequipeform:FormGroup
  mmeqform:FormGroup

  search_name:any
  p: number = 1;
  fileToUpload:Array<File>=[];
  submitted = false;
  numlicence:any=[]
  cin:any=[]
  constructor(private membreequipeservice :MembreEquipeService,private formbuilder:FormBuilder,private route :Router,private equipeservice:EquipeService) { }

  ngOnInit(): void {
    // tab3a ajout
    this.membequipeform=this.formbuilder.group({
      numlicence: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
      [this.uniqueTypeValidator.bind(this)]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
      ,   [this.uniqueTypeValidator1.bind(this)]],
      nom: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      prenom: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      datenaissance: ['', Validators.required],
      region: ['', Validators.required],
      fonction: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(8), Validators.maxLength(8)]],
      id_equipefeder: ['', Validators.required]
      
  })
  //tab3a update
  this.mmeqform=this.formbuilder.group({
    id:['',Validators.required],
    //numlicence:['',Validators.required],
   // cin:['',Validators.required],
    //nom:['',Validators.required],
    //prenom:['',Validators.required],
    email:['',Validators.required],
   // datenaissance:['',Validators.required],
    region:['',Validators.required],
   fonction:['',Validators.required],
    
    tel:['',Validators.required],
    id_equipefeder:['',Validators.required]
    
})
    console.log("bonjour")
    this.GETALLMembreEquipe()
    this.GETALLEquipe()
  }
  //pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
  get f() {
    return this.membequipeform.controls;
  }
  GETALLMembreEquipe(){
    this.membreequipeservice.getallmembreEquipe().subscribe((res:any)=>{
      this.listmembreEquipe=res.filter((el:any)=>el.equipeFederation.type=='equipe')
      console.log("list of membre Equipe",this.listmembreEquipe)
      for (let i = 0; i < this.listmembreEquipe.length; i++) {
        this.numlicence.push(this.listmembreEquipe[i].numlicence);
        this.cin.push(this.listmembreEquipe[i].cin);
      }
  
      console.log("this.numlicence", this.numlicence);
      console.log("this.cin", this.cin);
    })
  }
  deleteMembreEquipe(id:any){
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
    this.membreequipeservice.deletemembreEquipe(id).subscribe((res:any)=>{
      console.log(res)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this.GETALLMembreEquipe()
    })
      
  }
})
  }



  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }
        savememequip(){
          this.submitted = true;
console.log(this.membequipeform.value)
          if (this.membequipeform.invalid) {
            return;
          }
          let formdata=new FormData();
      formdata.append("numlicence",this.membequipeform.value.numlicence);
      formdata.append("cin",this.membequipeform.value.cin);
      formdata.append("nom",this.membequipeform.value.nom);
      formdata.append("prenom",this.membequipeform.value.prenom);
      formdata.append("email",this.membequipeform.value.email);
      formdata.append("datenaissance",this.membequipeform.value.datenaissance);
      formdata.append("region",this.membequipeform.value.region);
      formdata.append("tel",this.membequipeform.value.tel);
      formdata.append("fonction",this.membequipeform.value.fonction);
      formdata.append("file",this.fileToUpload[0]);
      this.membreequipeservice.savemequipe(formdata,this.membequipeform.value.id_equipefeder).subscribe((res:any)=>{
        console.log(res)
        Swal.fire("membre ajouté")
        this.GETALLMembreEquipe()
      
      }) 
  }
  onReset(): void {
    this.submitted = false;
    this.membequipeform.reset();
  }
 
  GETALLEquipe(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listequipe=res
      .filter((el:any)=>el.type=='equipe')
        
      console.log("list of equipe",this.listequipe)
    })
  }
  open(mmq:any) {
    console.log(mmq)
    this.mmeqform.patchValue({
      
      id:mmq.id,
     
     email:mmq.email,
     region:mmq.region,
     tel:mmq.tel,
     fonction:mmq.fonction,
    id_equipefeder:mmq.id_equipefeder
      
      
  
    })
  }

  updatemmequipe(){
   
    let formdata=new FormData();
   // formdata.append("numlicence",this.membequipeform.value.numlicence);
   // formdata.append("cin",this.membequipeform.value.cin);
   // formdata.append("nom",this.membequipeform.value.nom);
   // formdata.append("prenom",this.membequipeform.value.prenom);
    formdata.append("email",this.mmeqform.value.email);
   // formdata.append("datenaissance",this.membequipeform.value.datenaissance);
    formdata.append("region",this.mmeqform.value.region);
    formdata.append("tel",this.mmeqform.value.tel);
    formdata.append("fonction",this.mmeqform.value.fonction);
   formdata.append("file",this.fileToUpload[0]);
  
       this.membreequipeservice.updatemmeq(formdata,this.mmeqform.value.id,this.mmeqform.value.id_equipefeder).subscribe((res:any)=>{
        console.log(res)
        this. GETALLMembreEquipe()
     })
       }
       isresequipe(){
        return this.userconnect.roles[0]=="ROLE_RESPEQUIPE" ? true : false;
      
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
      confirmermember(id: any) {
        if (confirm("Est vraiment peu confirmer cette member ?")) {
          this.membreequipeservice.confirmermember(id).subscribe(
            (res: any) => {
              console.log(res);
              Swal.fire("Coureur confirmée");
              this.GETALLMembreEquipe();
            },
            (error: any) => {
              console.error("Erreur lors de la confirmation de la member :", error);
              // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
            }
          );
        }
      }
      
}
