import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorieveloService } from 'src/app/services/categorievelo.service';

@Component({
  selector: 'app-detailcategorievelo',
  templateUrl: './detailcategorievelo.component.html',
  styleUrls: ['./detailcategorievelo.component.css']
})
export class DetailcategorieveloComponent implements OnInit {

 velo: any
  id = this.activeroute.snapshot.params["id"]
  constructor(private categorieveloservice:CategorieveloService, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("id", this.id)
    this.getone()
  }
  getone() {
    this.categorieveloservice.getonevelo(this.id).subscribe((res: any) => {
      this.velo = res
      console.log("detail velo", this.velo)
    })
  }

}
