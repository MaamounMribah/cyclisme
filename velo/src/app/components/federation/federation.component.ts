import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EquipeService } from 'src/app/services/equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-federation',
  templateUrl: './federation.component.html',
  styleUrls: ['./federation.component.css']
})
export class FederationComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listfederation:any
  fedrform:FormGroup
  federupdate:FormGroup
  fileToUpload:Array<File>=[];
  rne:any=[]
  submitted = false;
  constructor(private equipeservice:EquipeService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.fedrform=this.formbuilder.group({
      rne:['', [Validators.required,  Validators.pattern(/^[0-9]*$/)],
       [this.uniqueTypeValidator.bind(this)]],
     
      datecreation:['',Validators.required],
      dateelection:['',Validators.required],
      nom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/)]],
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
    this.federupdate=this.formbuilder.group({
      id:['',Validators.required],
      rne:['',Validators.required],
     // domination:['',Validators.required],
      datecreation:['',Validators.required],
      dateelection:['',Validators.required],
      nom:['',Validators.required],
      type:['',Validators.required],
      etat:['',Validators.required],
     description:['',Validators.required],
     email:['',Validators.required],
     adress:['',Validators.required],
       // id_user:['',Validators.required],
      
    })

    console.log("bonjour")
    this. GETALLfederation()
  }
  GETALLfederation(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listfederation=res
      .filter((el:any)=>el.type=='federation')
      console.log("list of federation",this.listfederation)
      for(let i=0;i<this.listfederation.length;i++){
        this.rne.push(this.listfederation[i].rne);
     
       }
       console.log("this.rne",this.rne);
       
    })
  }
  
  get f() {
    return this.fedrform.controls;
  }
  deletefederation(id:any){
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
      this. GETALLfederation()
    })
      
  }
})


  }
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }
        savefederation(){
          this.submitted = true;
          this.fedrform.patchValue({
            type:"federation"
          })
          if (this.fedrform.invalid) {
            return;
          }
      
        
          let formdata=new FormData();
      
      formdata.append("rne",this.fedrform.value.rne);
      formdata.append("dateelection",this.fedrform.value.dateelection);
      formdata.append("datecreation",this.fedrform.value.datecreation);
      formdata.append("nom",this.fedrform.value.nom);
      formdata.append("type",this.fedrform.value.type);
    //  formdata.append("domination",this.fedrform.value.domination);
      formdata.append("etat",this.fedrform.value.etat);
      formdata.append("description",this.fedrform.value.description);
      formdata.append("email",this.fedrform.value.email);
      formdata.append("adress",this.fedrform.value.adress);
      
      
     
    formdata.append("file",this.fileToUpload[0]);
          this.equipeservice.savefederation( formdata).subscribe((res:any)=>{
            console.log(res)
            this.GETALLfederation()
         
          })

      } 
      onReset(): void {
        this.submitted = false;
        this.fedrform.reset();
      }
      open(equipe:any) {
        console.log(equipe)
        this.federupdate.patchValue({
          id:equipe.id,
          type:equipe.type,
       
          description:equipe.description,
         rne:equipe.rne,
         nom:equipe.nom,
         email:equipe.email,
         adress:equipe.adress,

         datecreation:equipe.datecreation,
         dateelection:equipe.dateelection,
         etat:equipe.etat,
         domination:equipe.domination,
         
          
          
    
        })
      }

      updatefeder(){
       
        let formdata=new FormData();
        formdata.append("rne",this.federupdate.value.rne);
        formdata.append("dateelection",this.federupdate.value.dateelection);
        formdata.append("datecreation",this.federupdate.value.datecreation);
        formdata.append("nom",this.federupdate.value.nom);
        formdata.append("type",this.federupdate.value.type);
       // formdata.append("domination",this.federupdate.value.domination);
        formdata.append("description",this.federupdate.value.description);
        formdata.append("etat",this.federupdate.value.etat);
        formdata.append("email",this.federupdate.value.email);
        formdata.append("adress",this.federupdate.value.adress);

       formdata.append("file",this.fileToUpload[0]);
      
           this.equipeservice.updateequipefederation(this.federupdate.value.id,formdata).subscribe((res:any)=>{
            console.log(res)
           this.GETALLfederation()
         })
           }

           desactiver(id:any){
            this.equipeservice.updateequipefederationdesactiver(id).subscribe((res:any)=>{
              console.log(res)
              this.GETALLfederation()
           })
          }
          
          activer(id:any){
            this.equipeservice.updateequipefederationactiver(id).subscribe((res:any)=>{
              console.log(res)
              this.GETALLfederation()
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
}
