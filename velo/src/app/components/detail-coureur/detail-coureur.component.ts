import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/services/competition.service';
import { CoureurService } from 'src/app/services/coureur.service';
import { ResultatCompetitionService } from 'src/app/services/resultat-competition.service';

@Component({
  selector: 'app-detail-coureur',
  templateUrl: './detail-coureur.component.html',
  styleUrls: ['./detail-coureur.component.css']
})
export class DetailCoureurComponent implements OnInit {
  coureur: any
  id = this.activeroute.snapshot.params["id"]
  listcompetition:any
  listresultatcompetition:any
  constructor(private coureurservice:CoureurService, private activeroute: ActivatedRoute,private competitionservice:CompetitionService,private resultatcompetitionservice:ResultatCompetitionService) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
    this.GETALLCompetition()
    this.GETALLResultatbycoureur()
  }
  getone() {
    this.coureurservice.getonecoureur(this.id).subscribe((res: any) => {
      this.coureur = res
      console.log("detail coureur", this.coureur)
    })
  }
   GETALLCompetition(){
    this.competitionservice.getallCompetition().subscribe((res:any)=>{
      this.listcompetition=res
      .filter((el:any)=>el.coureurs.id==this.id)
      console.log("list of competition",this.listcompetition)
    })
  }
  GETALLResultatbycoureur(){
    this.resultatcompetitionservice.getallresultatComp().subscribe((res:any)=>{
      this.listresultatcompetition=res
      .filter((el:any)=>el.coureur.id==this.id)
      console.log("list of resultatcompetition",this.listresultatcompetition)
    })
  }
}
