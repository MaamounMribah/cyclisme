import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';
import { ResponsableFederationService } from 'src/app/services/responsable-federation.service';

@Component({
  selector: 'app-detail-respfedera',
  templateUrl: './detail-respfedera.component.html',
  styleUrls: ['./detail-respfedera.component.css']
})
export class DetailRespfederaComponent implements OnInit {



  resefeder: any
  id = this.activeroute.snapshot.params["id"]
  constructor(private respfederaservice:ResponsableFederationService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.respfederaservice.getoneresefeder(this.id).subscribe((res: any) => {
      this.resefeder = res
      console.log("detailrespequipe", this.resefeder)
    })
  }
}
