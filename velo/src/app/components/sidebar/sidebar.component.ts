import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
isadmin(){
  return this.userconnect.roles[0]=="ROLE_ADMIN" ? true : false;

}
gotocompetition(){
  if(this.userconnect.roles[0]=="ROLE_RESPFEDERATION"){
   this.route.navigateByUrl("/home/competition")
  }
  else{
   this.route.navigateByUrl("/home/competitionconfirme")

  }
}
gotocoureur(){
  if(this.userconnect.roles[0]=="ROLE_RESPFEDERATION"){
   this.route.navigateByUrl("/home/coureur")
  }
  else{
   this.route.navigateByUrl("/home/coureurconfirme")

  }
}
gotomember(){
  if(this.userconnect.roles[0]=="ROLE_RESPFEDERATION"){
   this.route.navigateByUrl("/home/membreEquipe")
  }
  else{
   this.route.navigateByUrl("/home/memberconfirme")

  }
}
}
