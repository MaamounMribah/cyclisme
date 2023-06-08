import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CategorieveloService } from 'src/app/services/categorievelo.service';
  import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorievelo',
  templateUrl: './categorievelo.component.html',
  styleUrls: ['./categorievelo.component.css']
})
export class CategorieveloComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  listcategorievelo:any
  veloform:FormGroup
  veloformupdate:FormGroup
  fileToUpload:Array<File>=[];
  submitted = false;
  type:any=[]
  constructor(private categorieveloservice:CategorieveloService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this. GETALLCategorieVelo()
    // this.uniqueTypeValidator
    this.veloform=this.formbuilder.group({
     
  
      description: ['', Validators.required],
      
      type: ['', [Validators.required], [this.uniqueTypeValidator.bind(this)]]
    })
    // update
    this.veloformupdate=this.formbuilder.group({
      id:['',Validators.required],
      type:['',Validators.required],
      description:['',Validators.required],
      
    })
    console.log("bonjour")
   
  }


 
  open(velo:any) {
    console.log(velo)
    this.veloform.patchValue({
      type:velo.type,
      id:velo.id,
     description:velo.description,
      
      

    })
  }
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload)
    
        }
  GETALLCategorieVelo(){
    this.categorieveloservice.getallCategoryVelo().subscribe((res:any)=>{
      this.listcategorievelo=res
      console.log("list of categorie velo",this.listcategorievelo)
      for(let i=0;i<this.listcategorievelo.length;i++){
       this.type.push(this.listcategorievelo[i].type)
      }
      console.log("this.type",this.type)
    })
  }



  deletevelo(id:any){
    this.categorieveloservice.deletevelo(id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCategorieVelo()
    })
}



updatevelo(){
  let formdata=new FormData();
  formdata.append("type",this.veloformupdate.value.type);
  formdata.append("description",this.veloformupdate.value.description);
 formdata.append("file",this.fileToUpload[0]);

     this.categorieveloservice.updatevelo(this.veloformupdate.value.id,formdata).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCategorieVelo()
   })
     }



//pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
get f() {
  return this.veloform.controls;
}
     savevelo(){
      this.submitted = true;

      if (this.veloform.invalid) {
        return;
      }
  
      let formdata=new FormData();
  
  formdata.append("type",this.veloform.value.type);
  formdata.append("description",this.veloform.value.description);
 
  
  
  formdata.append("file",this.fileToUpload[0]);
      this.categorieveloservice.saveveelo(formdata).subscribe((res:any)=>{
        console.log(res)
        Swal.fire(" velo ajoutée ")
        this.GETALLCategorieVelo()
      })
  } 
  onReset(): void {
    this.submitted = false;
    this.veloform.reset();
  }
 
  isresfedera(){
    return this.userconnect.roles[0]=="ROLE_RESPFEDERATION" ? true : false;
  
  }
  
  
  // ...
  
  uniqueTypeValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      console.log("types",this.type)
      const typeValue = control.value;
      const otherTypes = this.type; // Remplacez par vos valeurs existantes
  
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
