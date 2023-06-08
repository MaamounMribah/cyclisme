import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArbitreService } from 'src/app/services/arbitre.service';

@Component({
  selector: 'app-detailarbitre',
  templateUrl: './detailarbitre.component.html',
  styleUrls: ['./detailarbitre.component.css']
})
export class DetailarbitreComponent implements OnInit {
  arbitre: any
  id = this.activeroute.snapshot.params["id"]
  constructor(private arbitreservice:ArbitreService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.arbitreservice.getonearbitre(this.id).subscribe((res: any) => {
      this.arbitre = res
      console.log("detail coureur", this.arbitre)
    })
  }


}
