import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { CoureurService } from '../services/coureur.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-detailcompetition',
  templateUrl: './detailcompetition.component.html',
  styleUrls: ['./detailcompetition.component.css']
})
export class DetailcompetitionComponent implements OnInit {
  competition: any
  id = this.activeroute.snapshot.params["id"]
  listearbitre:any=[]
  listcoureur:any=[]
  idc:any
  search_name:any
  p: number = 1;
  search_namee:any
  
  constructor(private competitionservice:CompetitionService, private activeroute: ActivatedRoute,private coureurservice:CoureurService) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.competitionservice.getonecompetition(this.id).subscribe((res: any) => {
      this.competition = res
      this.listearbitre=this.competition.arbitres
      console.log("detail competition", this.competition)
      console.log("liste arbitre", this.listearbitre)

      this.GETALLCoureur()

    })
  }


  GETALLCoureur(){
  
      this.idc= this.competition.list
console.log("list coureurs",this.idc)
for(let i=0;i<this.idc.length;i++){
  this.coureurservice.getonecoureur(this.idc[i]).subscribe((res: any) => {
    //console.log(res)
    console.log("listcoureur final", this.listcoureur)
  })
}

    
  }

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
