import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { LocationComponent } from './components/location/location.component';
import { ApplicationComponent } from './components/application/application.component';
import { MyApplicationsComponent } from './components/my-applications/my-applications.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminAuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'my-applications', component: MyApplicationsComponent, canActivate: [AuthGuardService] },
  { path: 'application', component: ApplicationComponent, canActivate: [AuthGuardService] },
  { path: 'location', component: LocationComponent, canActivate: [AdminAuthGuardService] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    ProfileComponent,
    RegisterComponent,
    UsersComponent,
    LocationComponent,
    ApplicationComponent,
    MyApplicationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      closeButton: true,
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
