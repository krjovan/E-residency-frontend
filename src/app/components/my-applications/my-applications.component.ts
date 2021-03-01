import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { Application } from '../../models/application';
import { DetailsService } from '../../services/details-service/details.service';
import { Details } from '../../models/details';
import { Location } from '../../models/location';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

  myApplications: Application [] = [];
  selectedApplication: Application = {
    motivation: '',
    type_of_application: '',
    user_id: ''
  }
  details: any = {
    citizenship: '',
    country_of_birth: '',
    date_of_birth: new Date(),
    given_name: '',
    personal_identification_code: '',
    photo_code: '',
    sex: '',
    surname: '',
    application_id: '',
    pick_up_location_id: '',
    location: Location
  }


  constructor(private applicationService: ApplicationService,
              private detailsService: DetailsService) { }

  viewDetails(application) {
    this.selectedApplication = application;
    this.detailsService.getApplicationDetailsById(this.selectedApplication._id).subscribe({
      next: applicationDetails => {
        this.details = applicationDetails;
        document.getElementById('id01').style.display='block';
      }, error: err => {
        console.log(err);
      }
    });
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
