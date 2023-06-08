import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe.service';
import { MembreEquipeService } from 'src/app/services/membre-equipe.service';

@Component({
  selector: 'app-detail-equipe',
  templateUrl: './detail-equipe.component.html',
  styleUrls: ['./detail-equipe.component.css']
})
export class DetailEquipeComponent implements OnInit {
  id = this.activeroute.snapshot.params["id"]
  equipe:any
  listmembreEquipe:any
  constructor(private equipeservice:EquipeService, private activeroute: ActivatedRoute,private membreequipeservice:MembreEquipeService) { }

  ngOnInit(): void {

    console.log("id", this.id)
    this.getone()
    this.GETALLMembreEquipe()
  }
  getone() {
    this.equipeservice.getonecoureur(this.id).subscribe((res: any) => {
      this.equipe = res
      console.log("detail Equipe", this.equipe)
    })
  }
  GETALLMembreEquipe(){
    this.membreequipeservice.getallmembreEquipe().subscribe((res:any)=>{
      this.listmembreEquipe=res.filter((el:any)=>el.equipeFederation.type=='equipe')
      .filter((el:any)=>el.equipeFederation.id==this.id)
      console.log("list of membre Equipe",this.listmembreEquipe)
    })
  }
}
