import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from '../../services/application-status-service/application-status.service';
import { Application } from '../../models/application';
import { Location } from '../../models/location';
import { DetailsService } from '../../services/details-service/details.service';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.css']
})
export class UserApplicationsComponent implements OnInit {

  applications: any [] = [];

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

  statuses: any [] = [];

  status_type = 'submitted';

  constructor(private applicationStatusService: ApplicationStatusService,
              private detailsService: DetailsService) { }

  viewDetails(application) {
    this.selectedApplication = application.application;
    this.detailsService.getApplicationDetailsById(this.selectedApplication._id).subscribe({
      next: applicationDetails => {
        this.details = applicationDetails;
        this.applicationStatusService.getApplicationDetailsById(this.selectedApplication._id).subscribe({
          next: applicationStatus => {
            this.statuses = applicationStatus;
            document.getElementById('id01').style.display='block';
          }, error: err => {
            console.log(err);
          }});

      }, error: err => {
        console.log(err);
      }
    });
  }

  onStatusTypeChange() {
    this.getApplications();
  }

  getApplications() {
    if (this.status_type === 'submitted'){
      this.applicationStatusService.getSubmittedApplications().subscribe({
        next: applications => {
          this.applications = applications;
        }, error: err => {
          console.log(err);
        }
      });
    } else if (this.status_type === 'processing') {
      this.applicationStatusService.getProcessingApplications().subscribe({
        next: applications => {
          this.applications = applications;
        }, error: err => {
          console.log(err);
        }
      });
    } else if (this.status_type === 'accepted') {
      let req = {status_type: this.status_type};
      this.applicationStatusService.getApplicationsByStatusType(req).subscribe({
        next: applications => {
          this.applications = applications;
        }, error: err => {
          console.log(err);
        }
      });
    } else if (this.status_type === 'rejected') {
      let req = {status_type: this.status_type};
      this.applicationStatusService.getApplicationsByStatusType(req).subscribe({
        next: applications => {
          this.applications = applications;
        }, error: err => {
          console.log(err);
        }
      });
    } else {
      console.log('Something unexpected happend!');
    }
  }

  ngOnInit(): void {
    this.getApplications();
  }

}
