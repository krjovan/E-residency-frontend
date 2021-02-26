import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { ToastrService } from 'ngx-toastr';
import { Application } from '../../models/application';
import { AuthenticationService } from '../../services/authentication.service';
import { Details } from '../../models/details';
import { LocationService } from '../../services/location-service/location.service';
import { Location } from '../../models/location';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applcation: Application = {
    type_of_application: "",
    motivation: "",
    user_id: ""
  };

  details: Details = {
    application_id: '',
    citizenship: '',
    country_of_birth: '',
    date_of_birth: null,
    given_name: '',
    personal_identification_code: '',
    pick_up_location_id: '',
    sex: '',
    surname: ''
  }
  locations: Location [];

  constructor(private applicationService: ApplicationService,
              private toastr: ToastrService,
              private auth: AuthenticationService,
              private locationService: LocationService
            ) { }

  addApplication() {
    this.applicationService.addApplication(this.applcation).subscribe({
      next: res => {
        this.details.application_id = res.application_id;
        console.log(this.details);
      }, error: err => {
        console.log(err);
      }
    });
      /*() => {
      this.toastr.success('You successfully created a applcation!', 'Success');
      this.clearDialog();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });*/
  }

  clearDialog() {
    this.applcation.motivation = "";
    this.applcation.type_of_application = "";
  }

  ngOnInit(): void {
    this.applcation.user_id = this.auth.getUserDetails()._id;
    this.locationService.getLocations('').subscribe({
      next: locations => {
        this.locations = locations;
      }, error: err => {
        console.log(err);
      }
    });
  }

}
