import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavbarComponent } from './layout/sidenavbar/sidenavbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResponsiveDirective } from './directives/responsive.directive';
import { MaterialModule } from './shared/material-module';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectItemsComponent } from './components/projects/project-items/project-items.component';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  terminateOnPointerUp: false,
  animation: {
    enterDuration: 300,
    exitDuration: 1000,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidenavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    FooterComponent,
    ResponsiveDirective,
    ConfirmationComponent,
    ResumeComponent,
    ProjectItemsComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
