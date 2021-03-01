import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { Application } from '../../models/application';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  myApplications: Application [] = [];

  constructor(private applicationService: ApplicationService) { }

  viewDetails(application) {
    console.log(application);
    document.getElementById('id01').style.display='block';
  }

  ngOnInit(): void {
    this.applicationService.getUserApplications().subscribe({
      next: userApplications => {
        this.myApplications = userApplications;
      }, error: err => {
        console.log(err);
      }
    })
  }

}
