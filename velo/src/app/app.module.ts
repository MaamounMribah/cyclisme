import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoureurComponent } from './components/coureur/coureur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { DetailresultatComponent } from './components/detailresultat/detailresultat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecherchePipe } from './pipes/recherche.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecherchmmequipePipe } from './pipes/recherchmmequipe.pipe';
import { RecherchmfedPipe } from './pipes/recherchmfed.pipe';
import { RechercoureurPipe } from './pipes/rechercoureur.pipe';
import { DetailRespfederaComponent } from './components/detail-respfedera/detail-respfedera.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProfiluserComponent } from './components/profiluser/profiluser.component';
import { ConfirmefederComponent } from './components/confirmefeder/confirmefeder.component';
import { SendmailComponent } from './components/sendmail/sendmail.component';
import { ConfirmecoureurComponent } from './components/confirmecoureur/confirmecoureur.component';
import { ConfirmememberComponent } from './components/confirmemember/confirmemember.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    HomeComponent,
    NavbarComponent,
    CoureurComponent,
    ArbitreComponent,
   
    MembreEquipeComponent,
    EquipeComponent,
    CompetitionComponent,
    ResultatcompetitionComponent,
    CategorieveloComponent,
   
    DetailcompetitionComponent,
    DetailCoureurComponent,
    DetailarbitreComponent,
   
    DetailmembreEquipeComponent,
    DetailcategorieveloComponent,
    ResponsableEquipeComponent,
    ResponsableFederationComponent,
    FederationComponent,
    MembreFederationComponent,
    DetailRespoequipeComponent,
    DetailEquipeComponent,
    DetailresultatComponent,
    LoginComponent,
    RegisterComponent,
    RecherchePipe,
    RecherchmmequipePipe,
    RecherchmfedPipe,
    RechercoureurPipe,
    DetailRespfederaComponent,
    ForgetComponent,
    ResetComponent,
    ProfilComponent,
    ProfiluserComponent,
    ConfirmefederComponent,
    SendmailComponent,
    ConfirmecoureurComponent,
    ConfirmememberComponent,
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
