import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembreEquipeService } from 'src/app/services/membre-equipe.service';

@Component({
  selector: 'app-detailmembre-equipe',
  templateUrl: './detailmembre-equipe.component.html',
  styleUrls: ['./detailmembre-equipe.component.css']
})
export class DetailmembreEquipeComponent implements OnInit {
  memequipe: any
  id = this.activeroute.snapshot.params["id"]
  constructor(private membreequipeservice:MembreEquipeService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.membreequipeservice.getonemembreEquipe(this.id).subscribe((res: any) => {
      this.memequipe = res
      console.log("detail membre Equipe ", this.memequipe)
    })
  }
}
