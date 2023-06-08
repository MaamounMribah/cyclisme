<div class="body d-flex py-lg-3 py-md-2">
    <div class="container-xxl">
        <div class="row align-items-center">
            <div class="border-0 mb-4">
                <div
                    class="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 class="fw-bold py-3 mb-0">Liste Competition </h3>
                    <div class="d-flex py-2 project-tab flex-wrap w-sm-100">


                        <button *ngIf="isresequipe()" type="button" class="btn btn-dark w-sm-100" data-bs-toggle="modal"
                        data-bs-target="#depadd"><i class="icofont-plus-circle me-2 fs-6"></i>Ajouter Compétition</button>



                        <button type="button" *ngIf="ok==true" class="btn btn-dark w-sm-100" data-bs-toggle="modal"
                            data-bs-target="#createproject"><i class="icofont-plus-circle me-2 fs-6"></i>Compléter...</button>



                        <ul class="nav nav-tabs tab-body-header rounded ms-3 prtab-set w-sm-100" role="tablist">
                            <li class="nav-item" role="presentation"><a class="nav-link active" data-bs-toggle="tab"
                                    href="#All-list" role="tab" aria-selected="true">All</a></li>
                            <li class="nav-item" role="presentation"><a class="nav-link" data-bs-toggle="tab"
                                    href="#Started-list" role="tab" aria-selected="false" tabindex="-1">Started</a></li>
                            <li class="nav-item" role="presentation"><a class="nav-link" data-bs-toggle="tab"
                                    href="#Approval-list" role="tab" aria-selected="false" tabindex="-1">Approval</a>
                            </li>
                            <li class="nav-item" role="presentation"><a class="nav-link" data-bs-toggle="tab"
                                    href="#Completed-list" role="tab" aria-selected="false" tabindex="-1">Completed</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> <!-- Row end  -->
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 flex-column">
                <div class="tab-content mt-4">
                    <div class="tab-pane fade show active" id="All-list" role="tabpanel">
                        <div class="row g-3 gy-5 py-3 row-deck">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            *ngFor="let c of listcompetition" >
                                <div class="card"  >
                                    <div class="card-body" >
                                        <div class="d-flex align-items-center justify-content-between mt-5">
                                            <div class="lesson_name">
                                                <div class="project-block light-info-bg">
                                                    <i class="icofont-paint"></i>
                                                </div>
                                                <span class="small text-muted project_name fw-bold"> Social Geek Made
                                                </span>
                                                <h6 class="mb-0 fw-bold  fs-6  mb-2"  [routerLink]="['/home/detailCompetition',c.id]">{{c.nomcompetition}}</h6>
                                            </div>
                                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                <button type="button" class="btn btn-outline-secondary"
                                                    data-bs-toggle="modal" data-bs-target="#editproject"><i
                                                        class="icofont-edit text-success"></i></button>
                                                <button type="button" class="btn btn-outline-secondary"
                                                    data-bs-toggle="modal" data-bs-target="#deleteproject" (click)="deletecomp(c.id)"><i
                                                        class="icofont-ui-delete text-danger"></i></button>
                                                <!-- <a  class="btn btn-dark btn-sm mt-1"><i
                                                        class="icofont-invisible me-2 fs-6"></i>Detail</a> -->
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="avatar-list avatar-list-stacked pt-2">
                                                <img class="avatar rounded-circle sm" src="assets/images/xs/avatar2.jpg"
                                                    alt="">
                                                <img class="avatar rounded-circle sm" src="assets/images/xs/avatar1.jpg"
                                                    alt="">
                                                <img class="avatar rounded-circle sm" src="assets/images/xs/avatar3.jpg"
                                                    alt="">
                                                <img class="avatar rounded-circle sm" src="assets/images/xs/avatar4.jpg"
                                                    alt="">
                                                <img class="avatar rounded-circle sm" src="assets/images/xs/avatar8.jpg"
                                                    alt="">
                                                <span class="avatar rounded-circle text-center pointer sm"
                                                    data-bs-toggle="modal" data-bs-target="#addUser"><i
                                                        class="icofont-ui-add"></i></span>
                                            </div>
                                        </div>
                                        <div class="row g-2 pt-4">
                                            <div class="col-6">
                                                <div class="d-flex align-items-center">
                                                    <i class="icofont-paper-clip"></i>
                                                    <span class="ms-2">{{c.lieu}}</span>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="d-flex align-items-center">
                                                    <i class="icofont-sand-clock"></i>
                                                    <span class="ms-2">Distance: {{c.distance}}</span>
                                                </div>
                                            </div>
                                            <!-- <div class="col-6">
                                                <div class="d-flex align-items-center">
                                                    <i class="icofont-group-students "></i>
                                                    <span class="ms-2">{{c.genre}}</span>
                                                </div>
                                            </div> -->
                                            <div class="col-6">
                                                <div class="d-flex align-items-center">
                                                    <i class="icofont-ui-text-chat"></i>
                                                    <span class="ms-2">Date Compétition:  {{c.date}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dividers-block"></div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <h4 class="small fw-bold mb-0"></h4>
                                            <span class="small light-danger-bg  p-1 rounded"><i
                                                    class="icofont-ui-clock"></i> </span>
                                        </div>
                                       
                                            <div class="d-flex flex-wrap align-items-center ct-btn-set">
                                
                                                <a  class="btn btn-dark btn-sm mt-1" [routerLink]="['/home/resultatcompetition',c.id]"><i class="icofont-invisible me-2 fs-6" ></i>Resultat</a>
                                            </div>

                                     
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>


<!-- Ajout -->


<div class="modal fade " id="createproject" tabindex="-1" aria-modal="true" role="dialog" style="display: none;">
    <div class="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header" >
            <h5 class="modal-title  fw-bold" id="createprojectlLabel"> Ajouter Compétition</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form [formGroup]="form">
            <div class="mb-3">
                <label for="exampleFormControlInput77" class="form-label">Nom Du Compétition</label>
                <input type="text" class="form-control" id="exampleFormControlInput77" formControlName="nomcompetition" placeholder="Explain what the Project Name">
            </div>
            <div class="mb-3">
                <label class="form-label">Categorie Velo</label>
                <select class="form-select" aria-label="Default select Project Category"  formControlName="id_categorie">
                    <option selected="" *ngFor="let e of listcategorievelo" [value]="e.id">{{e.type}}</option>
                    
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Organisateur</label>
                <!-- -->
                <select class="form-select" aria-label="Default select Project Category" formControlName="id_equipefederation"  >
                    <option selected="" *ngFor="let e of listequipe" [value]="e.id">{{e.nom}}</option>
                    
                </select>
            </div>
            <div class="deadline-form">
              
                    <div class="row g-3 mb-3">
                      <div class="col">
                        <label for="datepickerded" class="form-label">date de Compétition</label>
                        <input type="date" class="form-control" id="datepickerded" formControlName="date">
                      </div>
                      <div class="col">
                        <label for="datepickerdedone" class="form-label">Lieu du Compétition</label>
                        <input type="text" class="form-control" id="datepickerdedone" formControlName="lieu">
                      </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col">
                          <label for="datepickerded" class="form-label">distance</label>
                          <input type="text" class="form-control" id="datepickerded" formControlName="distance">
                        </div>
                        <div class="col">
                          <label for="datepickerdedone" class="form-label">point</label>
                          <input type="text" class="form-control" id="datepickerdedone" formControlName="point">
                        </div>
                      </div>
                      <!-- <div class="row g-3 mb-3">
                        <div class="col">
                          <label for="datepickerded" class="form-label">genre</label>
                          <input type="text" class="form-control" id="datepickerded" formControlName="genre">
                        </div>
                        
                      </div> -->
                    <div class="row g-3 mb-3">
                       
                        <div class="col-sm-12">
                            <label for="formFileMultipleone" class="form-label">Arbitre</label>
                            <select class="form-select" multiple="" aria-label="Default select Priority" formControlName="COMP_ARBITRE">
                                <option *ngFor="let a of listarbitre" [value]="a.id"> {{a.nom}} {{a.prenom}} </option>
                                
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Equipe</label>
                            <!-- -->
                            <select class="form-select" aria-label="Default select Project Category" (change)="GETALLCoureur($event)"  >
                                <option selected="" *ngFor="let e of listequipe" [value]="e.id">{{e.nom}}</option>
                                
                            </select>
                        </div>

                        <div class="col-sm-12">
                            <label for="formFileMultipleone" class="form-label">Coureur</label>
                            <select class="form-select" multiple="" aria-label="Default select Priority" formControlName="COMP_COUREUR" (change)="addcoureur($event)" >
                                <option *ngFor="let e of listcoureur" [value]="e.id"> {{e.nom}} {{e.prenom}} </option>
                                
                            </select>
                        </div>
                    </div>
                
            </div>
            <div class="col-sm">
                <label for="formFileMultipleone" class="form-label">Liste Coureur Ajouter</label>
                <select  multiple class="form-select" aria-label="Default select Priority">
                    <option *ngFor="let c of listcoureurajouter">{{c.nom}}{{c.prenom}}</option>
                 
                </select>
            </div>
            <!-- <div class="row g-3 mb-3">
                <div class="col-sm">
                    <label for="formFileMultipleone" class="form-label">Budget</label>
                    <input type="number" class="form-control">
                </div>
                <div class="col-sm">
                    <label for="formFileMultipleone" class="form-label">Priority</label>
                    <select class="form-select" aria-label="Default select Priority">
                        <option selected="">Highest</option>
                        <option value="1">Medium</option>
                        <option value="2">Low</option>
                        <option value="3">Lowest</option>
                    </select>
                </div> 
            </div> -->
            <!-- <div class="mb-3">
                <label for="exampleFormControlTextarea78" class="form-label">Description (optional)</label>
                <textarea class="form-control" id="exampleFormControlTextarea78" rows="3" placeholder="Add any extra details about the request"></textarea>
            </div> -->
        </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="button" class="btn btn-primary" (click)="savecompetition()" data-bs-dismiss="modal">Create</button>
        </div>
    </div>
    </div>
</div>









<!-- update dossards -->
<div class="modal fade " id="depadd" tabindex="-1" aria-modal="true" role="dialog" style="display: none;">
    <div class="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title  fw-bold" id="depaddLabel"> Ajouter Résultat Compétition</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form [formGroup]="dossardsform">
                <div class="mb-3">
                    <label class="form-label">Equipe</label>
                    <!-- -->
                    <select class="form-select"  aria-label="Default select Project Category" (change)="GETALLCoureurdossards($event)"  >
                        <option selected="" *ngFor="let e of listequipe" [value]="e.id">{{e.nom}}</option>
                        
                    </select>
                </div>
            <!-- <div class="mb-3">
                <label class="form-label">Choisir Compétition</label>
                <select class="form-select" formControlName="id_competition" (change)="GETALLCoureur($event)">
                    <option *ngFor="let c of listcompetition" [value]="c.id">{{c.nomcompetition}}</option>

             
                </select>
            </div> -->
            <div class="mb-3">
                <label class="form-label">Choisir Coureur</label>
                <select class="form-select"  multiple  formControlName="id_coureur" >
                    <option *ngFor="let c of listcoureurdossards" [value]="c.id">{{c.nom}} {{c.prenom}}</option>

             
                </select>
            </div>
            <div class="deadline-form">
              
                    <div class="row g-3 mb-3">
                      
                      <div class="col-sm-6">
                        <label for="deptwo" class="form-label">Dossards</label>
                        <input type="number" class="form-control" id="deptwo" formControlName="dossards">
                      </div>
                      
                    </div>
                
            </div>
        </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary"  (click)="updateclassementcoureur()">Done</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" >Save</button>
        </div>
    </div>
    </div>
</div>




















// hedha ts


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArbitreService } from 'src/app/services/arbitre.service';
import { CategorieveloService } from 'src/app/services/categorievelo.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { CoureurService } from 'src/app/services/coureur.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { ResultatCompetitionService } from 'src/app/services/resultat-competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

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
  constructor(private competitionservice:CompetitionService,private route :Router,private formbuilder:FormBuilder,private categorieveloservice:CategorieveloService,private arbitreservice:ArbitreService,private coureurservice:CoureurService ,private equipeservice:EquipeService) { }

  ngOnInit(): void {

    this.dossardsform=this.formbuilder.group({
    
      dossards:['',Validators.required],
      id_coureur:['',Validators.required],
    })



    this.form=this.formbuilder.group({
      
      date:['',Validators.required],

      lieu:['',Validators.required],
      distance:['',Validators.required],
     point:['',Validators.required],
     genre:['',Validators.required],
     nomcompetition:['',Validators.required],
     COMP_ARBITRE:['',Validators.required],
     id_equipefederation:['',Validators.required],
     COMP_COUREUR:['',Validators.required],
     id_categorie:['',Validators.required],
    })




    console.log("bonjour")
    this.GETALLCompetition()
    this.GETALLArbitre()
    // this. GETALLCoureur()
    this.GETALLCategorieVelo()
    this.GETALLEquipe()
  }
  GETALLCompetition(){
    this.competitionservice.getallCompetition().subscribe((res:any)=>{
      this.listcompetition=res
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
    this.ida.push(this.form.value.COMP_ARBITRE)
    console.log("arbitre",this.ida)
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
    this.competitionservice.savecomp(this.form.value.id_categorie,this.form.value.id_equipefederation,this.idc,this.ida,this.form.value).subscribe((res:any)=>{
      console.log(res)
      this.GETALLCompetition()
    // this.route.navigateByUrl("/home/listcategory")
    })
    
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
    this.coureurservice.getallcoureur().subscribe((res:any)=>{
      this.listcoureur=res
      .filter((el:any)=>el.equipeFederation.id==e.target.value)
      console.log("list of coureur",this.listcoureur)
      // console.log(e.target.checked)

      // for(let i =0;i<this.listcoureur.length;i++){
      //   this.idc.push()
      //   console.log("list id coureur",this.idc)
      // }
    })
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
      .filter((el:any)=>el.type=='equipe')
      console.log("list of equipe",this.listequipe)
    })
  }
  // getidcoureur(e:any){
  //   console.log(e.target.value)
  //   this.idcoureur=e.target.value
  //   }
    updateclassementcoureur(){
      this.coureurservice.updatecoureurdossards(this.dossardsform.value.id_coureur,this.dossardsform.value.dossards).subscribe((res:any)=>{
        console.log(res)
        this.ok=true
       })
  }

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
}
