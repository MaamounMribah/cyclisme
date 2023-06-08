import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArbitreService } from 'src/app/services/arbitre.service';
import { EquipeService } from 'src/app/services/equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arbitre',
  templateUrl: './arbitre.component.html',
  styleUrls: ['./arbitre.component.css']
})
export class ArbitreComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listarbitre:any
  arbitreform:FormGroup
  arbitreformupdate:FormGroup
  fileToUpload:Array<File>=[];
  submitted = false;
  numlicence:any=[]
  cin:any=[]
  idfederration:any
  listefederation:any
  constructor(private arbitreservice:ArbitreService,private equipeservice:EquipeService,private formbuilder:FormBuilder,private route :Router) { }

  ngOnInit(): void {
    this.arbitreform=this.formbuilder.group({
      numlicence: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        
        ],
        [this.uniqueTypeValidator.bind(this)]
      ],
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
      datenaissance: [
        '',
        [
          Validators.required,
         
        
        ]
      ],
      
      region: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)
        
        ]
      ],
      tel: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}$/)
        
        ]
      ],
    
      
  })


  // update


  this.arbitreformupdate=this.formbuilder.group({
    id:['',Validators.required],
    //numlicence:['',Validators.required],
      //cin:['',Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      //datenaissance:['',Validators.required],
      region:['',Validators.required],
      
      tel:['',Validators.required],
})
    console.log("bonjour")
    this.GETALLArbitre()
    this.GETALLEquipe()
  }
//pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
   get f() {
    return this.arbitreform.controls;
  }

  GETALLArbitre() {
    this.arbitreservice.getallArbitre().subscribe((res: any) => {
      this.listarbitre = res.filter((el:any)=>el.equipeFederation.type=='federation')
      console.log("list of arbitre", this.listarbitre);
     
  
      for (let i = 0; i < this.listarbitre.length; i++) {
        this.numlicence.push(this.listarbitre[i].numlicence);
        this.cin.push(this.listarbitre[i].cin);
      }
  
      console.log("this.numlicence", this.numlicence);
      console.log("this.cin", this.cin);
    });
  }








  deletearbitre(id:any){
    
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
    this.arbitreservice.deletearbitre(id).subscribe((res:any)=>{
      console.log(res)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this.GETALLArbitre()
    })
      
  }
})


  }
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }
      
  savearbitre(){
    this.submitted = true;

    if (this.arbitreform.invalid) {
      return;
    }

   
      let formdata=new FormData();
      formdata.append("numlicence",this.arbitreform.value.numlicence);
      formdata.append("cin",this.arbitreform.value.cin);
      formdata.append("nom",this.arbitreform.value.nom);
      formdata.append("prenom",this.arbitreform.value.prenom);
      formdata.append("email",this.arbitreform.value.email);
      formdata.append("datenaissance",this.arbitreform.value.datenaissance);
      formdata.append("region",this.arbitreform.value.region);
      formdata.append("tel",this.arbitreform.value.tel);
      
      formdata.append("file",this.fileToUpload[0]);
    this.arbitreservice.savearbitre(formdata,this.idfederration).subscribe((res:any)=>{
      console.log(res)
      Swal.fire("arbitre ajouté avec succés!")
      this.GETALLArbitre()
       })

   }
   onReset(): void {
    this.submitted = false;
    this.arbitreform.reset();
  }
 

  GETALLEquipe(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listefederation=res
      .filter((el:any)=>el.type=='federation')
        this.idfederration=this.listefederation[0].id
      console.log("list of federation",this.listefederation)
    })
  }
open(arbitre:any) {
  console.log(arbitre)
  this.arbitreformupdate.patchValue({
    id:arbitre.id,
    //numlicence:arbitre.numlicence,
   
  // cin:arbitre.cin,
   nom:arbitre.nom,
   prenom:arbitre.prenom,
   email:arbitre.email,
   //datenaissance:arbitre.datenaissance,
   region:arbitre.region,
   tel:arbitre.tel,
  
  
    
    

  })
}
updatearbitre(){
  let formdata=new FormData();
  //formdata.append("numlicence",this.arbitreformupdate.value.numlicence);
//formdata.append("cin",this.arbitreformupdate.value.cin);
formdata.append("nom",this.arbitreformupdate.value.nom);
formdata.append("prenom",this.arbitreformupdate.value.prenom);
formdata.append("email",this.arbitreformupdate.value.email);
//formdata.append("datenaissance",this.arbitreformupdate.value.datenaissance);
formdata.append("region",this.arbitreformupdate.value.region);
formdata.append("tel",this.arbitreformupdate.value.tel);

formdata.append("file",this.fileToUpload[0]);
    this.arbitreservice.updatearbitre(formdata,this.arbitreformupdate.value.id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLArbitre()
    
    })
    
  

}


isresfedera(){
  return this.userconnect.roles[0]=="ROLE_RESPFEDERATION" ? true : false;

}




// ...

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
