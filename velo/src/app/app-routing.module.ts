import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CoureurComponent } from './components/coureur/coureur.component';
import { ArbitreComponent } from './components/arbitre/arbitre.component';

import { MembreEquipeComponent } from './components/membre-equipe/membre-equipe.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { ResultatcompetitionComponent } from './components/resultatcompetition/resultatcompetition.component';
import { CategorieveloComponent } from './components/categorievelo/categorievelo.component';

import { DetailcompetitionComponent } from './detailcompetition/detailcompetition.component';
import { DetailCoureurComponent } from './components/detail-coureur/detail-coureur.component';
import { DetailarbitreComponent } from './components/detailarbitre/detailarbitre.component';

import { DetailmembreEquipeComponent } from './components/detailmembre-equipe/detailmembre-equipe.component';
import { DetailcategorieveloComponent } from './components/detailcategorievelo/detailcategorievelo.component';
import { ResponsableEquipeComponent } from './components/responsable-equipe/responsable-equipe.component';
import { ResponsableFederationComponent } from './components/responsable-federation/responsable-federation.component';
import { FederationComponent } from './components/federation/federation.component';
import { MembreFederationComponent } from './components/membre-federation/membre-federation.component';
import { DetailRespoequipeComponent } from './components/detail-respoequipe/detail-respoequipe.component';
import { DetailEquipeComponent } from './components/detail-equipe/detail-equipe.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailRespfederaComponent } from './components/detail-respfedera/detail-respfedera.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProfiluserComponent } from './components/profiluser/profiluser.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmefederComponent } from './components/confirmefeder/confirmefeder.component';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { ConfirmecoureurComponent } from './components/confirmecoureur/confirmecoureur.component';
import { ConfirmememberComponent } from './components/confirmemember/confirmemember.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget',component:ForgetComponent},
  {path:'savepassword/:resetlink',component:ResetComponent},
  // {path:'sidebar',component:SidebarComponent},
  {path:'home',canActivate:[AuthGuard],component:HomeComponent,
  
  
  children:[
    {path:'',component:LayoutComponent},
    {path:'coureur',component:CoureurComponent},
    {path:'arbitre',component:ArbitreComponent},
    {path:'responsableEquipe',component:ResponsableEquipeComponent},
    {path:'responsableFederation',component:ResponsableFederationComponent},
    {path:'detailRespoequipe/:id',component:DetailRespoequipeComponent},
    {path:'sendmail',component:SendmailComponent},
   
    {path:'detailRespfedera/:id',component:DetailRespfederaComponent},
   
    {path:'membreEquipe',component:MembreEquipeComponent},
    {path:'membreFederation',component:MembreFederationComponent},
    {path:'equipe',component:EquipeComponent},
    {path:'detailequipe/:id',component:DetailEquipeComponent},
    {path:'federation',component:FederationComponent},
    {path:'competition',component:CompetitionComponent},
    {path:'resultatcompetition/:id',component:ResultatcompetitionComponent},
    {path:'categorieVelo',component:CategorieveloComponent},
   
    {path:'detailCompetition/:id',component:DetailcompetitionComponent},
    {path:'detailCoureur/:id',component:DetailCoureurComponent},
    {path:'detailarbitre/:id',component:DetailarbitreComponent},
    
    {path:'detailmembreEquipe/:id',component:DetailmembreEquipeComponent},
    {path:'detailcategorievelo/:id',component:DetailcategorieveloComponent},
    {path:'profile',component:ProfilComponent},
    {path:'profileuser',component:ProfiluserComponent},
    {path:'competitionconfirme',component:ConfirmefederComponent},
    {path:'coureurconfirme',component:ConfirmecoureurComponent},
    {path:'memberconfirme',component:ConfirmememberComponent},


  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
