import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe.service';
import { MembreFederationService } from 'src/app/services/membre-federation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membre-federation',
  templateUrl: './membre-federation.component.html',
  styleUrls: ['./membre-federation.component.css']
})
export class MembreFederationComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listmembreFederation:any
  listefederation:any
  membefederationform:FormGroup
  mmfform:FormGroup
  search_name:any
  p: number = 1;
  fileToUpload:Array<File>=[];
  idfederration:any
  submitted = false;
  numlicence:any=[]
  cin:any=[]
  constructor(private membrefederationservice :MembreFederationService,private formbuilder:FormBuilder,private route :Router,private equipeservice:EquipeService) { }


  ngOnInit(): void {
    //ajout
    this.membefederationform=this.formbuilder.group({
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
      // id_equipefeder:['',Validators.required]
      
  })
   //tab3a update
   this.mmfform=this.formbuilder.group({
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
    // id_equipefeder:['',Validators.required]
    
})
    console.log("bonjour")
    this. GETALLMembreFederation()
    this.GETALLEquipe()
  }
  GETALLMembreFederation(){
    this.membrefederationservice.getallmembrefederation().subscribe((res:any)=>{
      this.listmembreFederation=res.filter((el:any)=>el.equipeFederation.type=='federation')
      console.log("list of membre Federation",this.listmembreFederation)
      for (let i = 0; i < this.listmembreFederation.length; i++) {
        this.numlicence.push(this.listmembreFederation[i].numlicence);
        this.cin.push(this.listmembreFederation[i].cin);
      }
  
      console.log("this.numlicence", this.numlicence);
      console.log("this.cin", this.cin);
    })
  }
  deleteMembreFedera(id:any){
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
    this.membrefederationservice.deletemembrefeder(id).subscribe((res:any)=>{
      console.log(res)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this. GETALLMembreFederation()
    })
      
  }
})


  }


  //pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
get f() {
  return this.membefederationform.controls;
}
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }
  Savememefeder(){
    this.submitted = true;

    if (this.membefederationform.invalid) {
      return;
    }
          let formdata=new FormData();
      formdata.append("numlicence",this.membefederationform.value.numlicence);
      formdata.append("cin",this.membefederationform.value.cin);
      formdata.append("nom",this.membefederationform.value.nom);
      formdata.append("prenom",this.membefederationform.value.prenom);
      formdata.append("email",this.membefederationform.value.email);
      formdata.append("datenaissance",this.membefederationform.value.datenaissance);
      formdata.append("region",this.membefederationform.value.region);
      formdata.append("tel",this.membefederationform.value.tel);
      formdata.append("fonction",this.membefederationform.value.fonction);
      formdata.append("file",this.fileToUpload[0]);
      this.membrefederationservice.savemmfeder(formdata,this.idfederration).subscribe((res:any)=>{
        console.log(res)
        Swal.fire("membre ajouté avec succés!")
        this. GETALLMembreFederation()
      
      })
   
  }
  onReset(): void {
    this.submitted = false;
    this.membefederationform.reset();
  }
  GETALLEquipe(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listefederation=res
      .filter((el:any)=>el.type=='federation')
        this.idfederration=this.listefederation[0].id
      console.log("list of federation",this.listefederation)
    })
  }
  open(mmq:any) {
    console.log(mmq)
    this.mmfform.patchValue({
      
      id:mmq.id,
     
     email:mmq.email,
     region:mmq.region,
     tel:mmq.tel,
     fonction:mmq.fonction,
    // id_equipefeder:mmq.id_equipefeder
      
      
  
    })
  }

  updatemmf(){
   
    let formdata=new FormData();
   // formdata.append("numlicence",this.membequipeform.value.numlicence);
   // formdata.append("cin",this.membequipeform.value.cin);
   // formdata.append("nom",this.membequipeform.value.nom);
   // formdata.append("prenom",this.membequipeform.value.prenom);
    formdata.append("email",this.mmfform.value.email);
   // formdata.append("datenaissance",this.membequipeform.value.datenaissance);
    formdata.append("region",this.mmfform.value.region);
    formdata.append("tel",this.mmfform.value.tel);
    formdata.append("fonction",this.mmfform.value.fonction);
   formdata.append("file",this.fileToUpload[0]);
  
       this.membrefederationservice.updatemf1(formdata,this.mmfform.value.id).subscribe((res:any)=>{
        console.log(res)
        this. GETALLMembreFederation()
     })
       }
  
       isresfedera(){
        return this.userconnect.roles[0]=="ROLE_RESPFEDERATION" ? true : false;
      
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
}



