import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application-service/application.service';
import { ToastrService } from 'ngx-toastr';
import { Application } from '../../models/application';
import { AuthenticationService } from '../../services/authentication.service';

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

  constructor(private applicationService: ApplicationService,
              private toastr: ToastrService,
              private auth: AuthenticationService
            ) { }

  addApplication() {
    this.applicationService.addApplication(this.applcation).subscribe(() => {
      this.toastr.success('You successfully created a applcation!', 'Success');
      this.clearDialog();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

  clearDialog() {
    this.applcation.motivation = "";
    this.applcation.type_of_application = "";
  }

  ngOnInit(): void {
    this.applcation.user_id = this.auth.getUserDetails()._id;
  }

}
