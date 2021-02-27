import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { ToastrService } from 'ngx-toastr';
import { Application } from '../../models/application';
import { AuthenticationService } from '../../services/authentication.service';
import { Details } from '../../models/details';
import { LocationService } from '../../services/location-service/location.service';
import { Location } from '../../models/location';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  applcation: Application = {
    type_of_application: "First e-Residency application",
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
  locations: Location[];

  constructor(private applicationService: ApplicationService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  addApplication() {
    if (!this.fileUploadForm.get('uploadedImage').value) {
      this.toastr.error('Please choose a photo', 'Error');
      return false;
    }

    this.applicationService.addApplication(this.applcation).subscribe({
      next: res => {
        this.details.application_id = res.application_id;
        const formData = new FormData();
        formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
        formData.append('agentId', '007');
        formData.append('given_name', this.details.given_name.toString());
        formData.append('surname', this.details.surname.toString());
        formData.append('country_of_birth', this.details.country_of_birth.toString());
        formData.append('citizenship', this.details.citizenship.toString());
        formData.append('date_of_birth', this.details.date_of_birth.toString());
        formData.append('sex', this.details.sex.toString());
        formData.append('personal_identification_code', this.details.personal_identification_code.toString());
        formData.append('pick_up_location_id', this.details.pick_up_location_id.toString());
        formData.append('application_id', this.details.application_id.toString());

        this.http.post<any>('http://localhost:8080/uploadfile', formData).subscribe(response => {
          console.log(response);
          if (response.statusCode === 200) {
            // Reset the file input
            this.uploadFileInput.nativeElement.value = "";
            this.fileInputLabel = undefined;
          }
        }, er => {
          console.log(er);
          alert(er.error.error);
        });

      }, error: err => {
        console.log(err);
      }
    });

  }

  clearDialog() {
    this.applcation.motivation = "";
    this.applcation.type_of_application = "";
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
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
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

}
