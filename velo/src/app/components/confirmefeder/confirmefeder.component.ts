import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArbitreService } from 'src/app/services/arbitre.service';
import { CategorieveloService } from 'src/app/services/categorievelo.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { CoureurService } from 'src/app/services/coureur.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmefeder',
  templateUrl: './confirmefeder.component.html',
  styleUrls: ['./confirmefeder.component.css']
})
export class ConfirmefederComponent implements OnInit {

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  resequipe:any
  listcompetition:any
  listcategorievelo:any
  listcoureur:any
  listarbitre:any
  listequipe:any
  form:FormGroup
  listcoureurdossards:any
  listecoureurs:any=[]
  listearbitre:any=[]
  idc:any=[]
  ida:any=[]
listcoureurajouter:any=[]
idcoureur:any
dossardsform:FormGroup
ok=false;
idcompetition:any
listnew:any
competition:any
formbuilderupdate:FormGroup
submitted = false;
  constructor(private resequipeservice:ResponsableEquipeService,private competitionservice:CompetitionService,private route :Router,private formbuilder:FormBuilder,private categorieveloservice:CategorieveloService,private arbitreservice:ArbitreService,private coureurservice:CoureurService ,private equipeservice:EquipeService) { }

  ngOnInit(): void {

    this.dossardsform=this.formbuilder.group({
    
      // dossards:['',Validators.required],
      id_coureur:['',Validators.required],
    })



    this.form=this.formbuilder.group({
      
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],

      lieu:['',Validators.required],
      distance: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
     pointdepart:['',Validators.required],
     pointarrive:['',Validators.required],
     heure:['',Validators.required],

     nomcompetition:['',Validators.required],
    //  COMP_ARBITRE:['',Validators.required],
    //  id_equipefederation:['',Validators.required],
    //  COMP_COUREUR:['',Validators.required],
     id_categorie:['',Validators.required],
     categoriecoureur:['',Validators.required],
     genre:['',Validators.required],

    })
    // update
    this.formbuilderupdate=this.formbuilder.group({
      
      date:['',Validators.required],
      heure:['',Validators.required],
      id:['',Validators.required],


      lieu:['',Validators.required],
      distance:['',Validators.required],
     pointdepart:['',Validators.required],
     pointarrive:['',Validators.required],

     nomcompetition:['',Validators.required],
    //  COMP_ARBITRE:['',Validators.required],
    //  id_equipefederation:['',Validators.required],
    // COMP_COUREUR:['',Validators.required],
     id_categorie:['',Validators.required],
     categoriecoureur:['',Validators.required],
     genre:['',Validators.required],

    })
this.getone()



    console.log("bonjour")
    this.GETALLCompetition()
    this.GETALLArbitre()
    // this. GETALLCoureur()
    this.GETALLCategorieVelo()
    this.GETALLEquipe()
  }
   //pour faciliter l'accès aux contrôles de formulaire dans notre template HTML
get f() {
  return this.form.controls;
}
  GETALLCompetition(){
    this.competitionservice.getallCompetition().subscribe((res:any)=>{
      this.listcompetition=res.filter((el:any)=>el.confirmation=="confirmée")
      console.log("list of competition",this.listcompetition)
    })
  }
  deletecomp(id:any){
    this.competitionservice.deletecompetition(id).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCompetition()
    })

  }
  savecompetition(){
    this.submitted = true;
console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
    // this.ida.push(this.form.value.COMP_ARBITRE)
    // console.log("arbitre",this.ida)
    // this.idc.push(this.form.value.COMP_COUREUR)
    // console.log("coureur",this.idc)

    // for(let i=0;i<this.idc.length;i++){

    //   if(this.idc[i].categorycoureur=="cadet"){
    //     this.coureurservice.updatedistancecoureur(this.form.value.id_categorie,this.idc,this.ida,this.form.value).subscribe((res:any)=>{
    //       console.log(res)
    //   }
    //   }
    
    
    // this.form.patchValue({
    //   date:new Date().toISOString().split('T')[0].toString()
    // })
    this.competitionservice.savecomp(this.form.value.id_categorie,this.form.value).subscribe((res:any)=>{
      console.log(res)
      Swal.fire("compétition ajoutée avec succés")
      this.GETALLCompetition()
    // this.route.navigateByUrl("/home/listcategory")
    })
    
}
onReset(): void {
  this.submitted = false;
  this.form.reset();
}

  GETALLCategorieVelo(){
    this.categorieveloservice.getallCategoryVelo().subscribe((res:any)=>{
      this.listcategorievelo=res
      console.log("list of categorie velo",this.listcategorievelo)
    })
  }
  GETALLArbitre(){
    this.arbitreservice.getallArbitre().subscribe((res:any)=>{
      this.listarbitre=res
      console.log("list of arbitre",this.listarbitre)
      
    // for(let i=0;i<this.listarbitre.length;i++){
    //   this.ida.push(this.form.value.COMP_ARBITRE)
    //       }
    })
  }
  GETALLCoureur(e:any){
    console.log(e.target.value)
    this.coureurservice.getallcoureur().subscribe((res:any)=>{
      this.listcoureur=res
      .filter((el:any)=>el.equipeFederation.id==this.resequipe.equipeFederation.id)
      this.listcoureur=this.listcoureur.filter((el:any)=>el.categorycoureur==e.target.value)
      console.log("list of coureur",this.listcoureur)
      this.listnew=this.listcoureur
    
    })
  }
  GETALLCoureur2(e:any){
    console.log(e.target.value)
    // this.coureurservice.getallcoureur().subscribe((res:any)=>{
      this.listcoureur=this.listnew
      .filter((el:any)=>el.equipeFederation.id==this.resequipe.equipeFederation.id)
      this.listcoureur=this.listcoureur.filter((el:any)=>el.genre==e.target.value)
      console.log("list of coureur",this.listcoureur)
    
    // })
  }
  addcoureur(e:any){
    // if(e.target.checked){
      this.idc.push(this.form.value.COMP_COUREUR)
      console.log("idc",this.idc)
    for(let i=0;i<this.idc.length;i++){
      this.coureurservice.getonecoureur(this.idc[i]).subscribe((res: any) => {
        console.log(res)
      this.listcoureurajouter.push(res)

      console.log("listcpureurajouter",this.listcoureurajouter)
      
      })
    }
      
    }
      // this.listcoureurajouter.push()
    // }
  

  GETALLEquipe(){
    this.equipeservice.getallEquipe().subscribe((res:any)=>{
      this.listequipe=res
      .filter((el:any)=>el.type=='equipe' &&  el.enabled=="activer")
      console.log("list of equipe",this.listequipe)
      // this.GETALLCoureur()
    })
  }
  getone() {
    this.resequipeservice.getoneresequipe(this.userconnect.id).subscribe((res: any) => {
      this.resequipe = res
      console.log("detailrespequipe", this.resequipe)
    })
  }
  //  el.user.id==this.userconnect.id
  // getidcoureur(e:any){
  //   console.log(e.target.value)
  //   this.idcoureur=e.target.value
  //   }
   
  GETALLCoureurdossards(e:any){
    this.coureurservice.getallcoureur().subscribe((res:any)=>{
      this.listcoureurdossards=res
      .filter((el:any)=>el.equipeFederation.id==e.target.value)
      console.log("list of coureurdossards",this.listcoureurdossards)
      // console.log(e.target.checked)

      // for(let i =0;i<this.listcoureur.length;i++){
      //   this.idc.push()
      //   console.log("list id coureur",this.idc)
      // }
    })
  }
  
  isresequipe(){
    return this.userconnect.roles[0]=="ROLE_RESPEQUIPE" ? true : false;
  
  }
  open(c:any) {
this.idcompetition=c.id
console.log("id competition",this.idcompetition)
this.competitionservice.getonecompetition(this.idcompetition).subscribe((res: any) => {
  this.competition = res
  console.log("detail competition",this.competition)
})


this.GETALLCoureurfinal()
  }


  open1(c:any){
this.formbuilderupdate.patchValue({
  date: c.date,
  id: c.id,
  heure:c.heure,
  nomcompetition: c.nomcompetition,
  lieu: c.lieu,
  distance: c.distance,
  pointdepart: c.pointdepart,
  pointarrive: c.pointarrive,
  id_categorie: c.id_categorie,
  categoriecoureur: c.categoriecoureur,
  genre: c.genre



})
  }

  affectercoureur() {
    console.log("coureur", this.dossardsform.value.id_coureur);
    this.competitionservice.affecterCoureur(this.idcompetition, this.dossardsform.value.id_coureur).subscribe((res: any) => {
      console.log(res);
      Swal.fire("coureur affecté");
      this.GETALLCompetition();
      
    });
  }
  
  GETALLCoureurfinal() {
    this.coureurservice.getallcoureur().subscribe((res: any) => {
      this.listcoureur = res.filter((el: any) =>
        el.equipeFederation.id == this.resequipe.equipeFederation.id
      );
      this.listcoureur = this.listcoureur.filter(
        (el: any) =>
          el.categorycoureur == this.competition.categoriecoureur &&
          el.genre == this.competition.genre
      );
      console.log("list of coureur", this.listcoureur);
      this.listnew = this.listcoureur;
    });
  }
  


confirmercompetition(id:any){
  this.competitionservice.confirmercompétition(id).subscribe((res:any)=>{
    console.log(res)
    Swal.fire("compétition confirmée")
    this.GETALLCompetition()
  })
}


updatecomp(){
  this.competitionservice.updatecomp(this.formbuilderupdate.value.id,this.formbuilderupdate.value.id_categorie,this.formbuilderupdate.value).subscribe((res:any)=>{
    console.log(res)
    this.GETALLCompetition()
  })
    }



}
