import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CompetitionService } from 'src/app/services/competition.service';
import { CoureurService } from 'src/app/services/coureur.service';
import { ResultatCompetitionService } from 'src/app/services/resultat-competition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultatcompetition',
  templateUrl: './resultatcompetition.component.html',
  styleUrls: ['./resultatcompetition.component.css']
})
export class ResultatcompetitionComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listresultatcompetition:any
  listcompetition:any
  resultatform:FormGroup
  coureurform:FormGroup
idcoureur:any
  listcoureur:any=[]
  compétition:any
a:any
b:any
ok=false
  // updatedossards:FormGroup
  idc:any
  id = this.activeroute.snapshot.params["id"]
classement=0;
  constructor(private resultatcompetitionservice:ResultatCompetitionService, private activeroute: ActivatedRoute,private competitionservice:CompetitionService,private formbuilder:FormBuilder
    ,private coureurservice:CoureurService) { }

  ngOnInit(): void {
    this.resultatform=this.formbuilder.group({
      
    
      // id_competition:['',Validators.required],
      id_coureur:['',Validators.required],
      dossards:['',Validators.required],
      temps:['',Validators.required],
     classement:['',Validators.required],

    })
    this.resultatform=this.formbuilder.group({
      
    
      // id_competition:['',Validators.required],
      id_coureur:['',Validators.required],
      dossards:['',Validators.required],
      temps:['',Validators.required],

    })

   

   this.GETALLCompetition()
    this. GETALLResultatComp()
  }
  GETALLResultatComp(){
    this.resultatcompetitionservice.getallresultatComp().subscribe((res:any)=>{
      this.listresultatcompetition=res.filter((el:any)=>el.competition.id==this.id)
      console.log("list of resultatcompetition",this.listresultatcompetition)
   
      
    })
  }

  deleteresultatcomp(id:any){
    this.resultatcompetitionservice.deleteresultatComp(id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLResultatComp()
    })

  }
  GETALLCompetition(){
   this.competitionservice.getonecompetition(this.id).subscribe((res:any)=>{
     this.listcompetition=res
    console.log("detail competition",this.listcompetition)
    this.GETALLCoureur()
  })
 }

  GETALLCoureur(){
  
      this.idc=this.listcompetition.list
console.log("list coureurs",this.idc)
for(let i=0;i<this.idc.length;i++){
  this.coureurservice.getonecoureur(this.idc[i]).subscribe((res: any) => {
    this.listcoureur.push(res)
    console.log("listcoureur final", this.listcoureur)
  

  console.log("listttt",this.listcoureur)
  for(let i =0;i<this.listresultatcompetition.length;i++){
    for(let j=0;j<this.listcoureur.length;j++){

    
   if(this.listresultatcompetition[i].coureur.id==this.listcoureur[j].id){
   this.ok=true
   console.log("ok",this.ok)
   }
  }
}
})
  
}

      // for(let i=0;)
     // this.listcoureur=.coureurs
  }
//  getallcoureurbycategorie(e:any){
//   this.idc=this.listcompetition.list
//   for(let i=0;i<this.idc.length;i++){
//     this.coureurservice.getonecoureur(this.idc[i]).subscribe((res: any) => {
//       this.listcoureur.push(res)
//   this.listcoureur=this.listcoureur.filter((el:any)=>el.categorycoureur==e.target.value)

//     })
// console.log("list coureur by categorie",this.listcoureur)
//   }
//  }

isresfedera(){
  return this.userconnect.roles[0]=="ROLE_RESPFEDERATION" ? true : false;

}

Addresultat(){
  
  this.resultatcompetitionservice.addresultatComp(this.id,this.resultatform.value.id_coureur,this.resultatform.value).subscribe((res:any)=>{
    console.log(res)
   Swal.fire("résultat ajoutée avec succées")
    this.GETALLResultatComp()
})
}

// GETALLCoureur(e:any){
//   this.coureurservice.getallcoureur().subscribe((res:any)=>{
//     this.listcoureur=res
//     .filter((el:any)=>el.equipeFederation.id==e.target.value)
//     console.log("list of coureur",this.listcoureur)
    
//   })
// }
getidcoureur(e:any){
console.log(e.target.value)
this.idcoureur=e.target.value
}
 // this.idc=this.listcompetition.list
  // console.log("list coureurs",this.idc)
  // for(let i=0;i<this.idc.length;i++){
  //   this.coureurservice.getonecoureur(this.idc[i]).subscribe((res: any) => {
  //     this.listcoureur.push(res)
  //     console.log("listcoureur final", this.listcoureur)
  //   })
  // }
// updateclassementcoureur(){
 
//   for(let i=0;i<this.listcoureur.length;i++){
//     if(this.listcoureur[i].temps>this.listcoureur[i+1].temps){
//      this.classement+=1
//  this.coureurservice.updatecoureurclassement(this.listcoureur[i].id,this.classement).subscribe((res:any)=>{
//       console.log(res)
//      })
//     }
//   }
   
// }




updateClassementCoureur(): void {
  for (let i = 0; i < this.listresultatcompetition.length; i++) {
    const currentCoureur = this.listresultatcompetition[i];
    let classement = 1; // Initialise le classement à 1 pour le coureur actuel
    
    for (let j = 0; j < this.listresultatcompetition.length; j++) {
      if (i !== j && currentCoureur.temps > this.listresultatcompetition[j].temps) {
        classement++; // Incrémente le classement si le temps du coureur est inférieur
      }
    }
    
    this.resultatcompetitionservice.updatecoureurclassement(currentCoureur.id, classement)
      .subscribe((res: any) => {
        console.log("classement",res);
    
      });
      this.GETALLResultatComp()
  }
  
}





















isresequipe(){
  return this.userconnect.roles[0]=="ROLE_RESPEQUIPE" ? true : false;

}

GETALLResultatCompbycategorie(e:any){
  this.resultatcompetitionservice.getallresultatComp().subscribe((res:any)=>{
    this.listresultatcompetition=res.filter((el:any)=>el.coureur.categorycoureur==e.target.value && el.competition.id==this.id)
    console.log("list of resultatcompetition",this.listresultatcompetition)
  })
}
GETALLResultatCompbygenre(e:any){
  this.resultatcompetitionservice.getallresultatComp().subscribe((res:any)=>{
    this.listresultatcompetition=res.filter((el:any)=>el.coureur.genre==e.target.value && el.competition.id==this.id)
    console.log("list of resultatcompetition",this.listresultatcompetition)
  })
}

// updatedossards(){
//   this.resultatcompetitionservice.updatecoureurdossards(this.resultatform.value.id_coureur,this.resultatform.value.dossards,this.resultatform.value.temps).subscribe((res:any)=>{
//     console.log(res)
//     Swal.fire("Affectation terminée")
//    })
// }

public openPDF(): void {
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('angular-demo.pdf');
  });
}
}



