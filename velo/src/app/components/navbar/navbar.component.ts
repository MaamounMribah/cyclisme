import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsableEquipeService } from 'src/app/services/responsable-equipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
user:any
  constructor(private route:Router,private resequipeservice:ResponsableEquipeService) { }

  ngOnInit(): void {
    console.log("userconnect",this.userconnect)
    this.getone()
  }
logout(){
  localStorage.clear()
  this.route.navigateByUrl("/")
}
getone() {
  this.resequipeservice.getoneresequipe(this.userconnect.id).subscribe((res: any) => {
    this.user = res
    console.log("detailrespequipe", this.user)
   
  })
}
gottoprofile(){
  if(this.userconnect.roles[0]=="ROLE_ADMIN"){
    this.route.navigateByUrl("/home/profile")

  }
  else{
    this.route.navigateByUrl("/home/profileuser")

  }
}
}
