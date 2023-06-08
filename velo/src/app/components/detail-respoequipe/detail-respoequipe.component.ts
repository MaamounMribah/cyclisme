import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';

@Component({
  selector: 'app-detail-respoequipe',
  templateUrl: './detail-respoequipe.component.html',
  styleUrls: ['./detail-respoequipe.component.css']
})
export class DetailRespoequipeComponent implements OnInit {
  resequipe: any
  id = this.activeroute.snapshot.params["id"]
  constructor(private resequipeservice:ResponsableEquipeService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.resequipeservice.getoneresequipe(this.id).subscribe((res: any) => {
      this.resequipe = res
      console.log("detailrespequipe", this.resequipe)
    })
  }

}
