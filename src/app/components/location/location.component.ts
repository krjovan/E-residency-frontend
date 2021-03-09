import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location-service/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  selectedLocation: Location = {
    country: "",
    city: "",
    street: "",
    street_number: "",
    contact_email: ""
  }
  locations: Location [] = [];
  location: Location = {
    country: "",
    city: "",
    street: "",
    street_number: "",
    contact_email: ""
  };
  search = '';
  currentPage = 0;
  currnetLimit = 8;
  numberOfPages = 0;

  constructor(private locationService: LocationService, private toastr: ToastrService) { }

  getLocations() {
    if (this.search === '') {
      this.locationService.getLocationsWithPagination(this.currentPage, this.currnetLimit)
      .subscribe(locations => {
        this.locations = locations;
      });
    this.locationService.getLocationsCount()
      .subscribe(res => {
        this.numberOfPages = Math.ceil(res.numberOfLocations / this.currnetLimit);
      });
    } else {
      this.locationService.getLocations(this.search)
      .subscribe(locations => {
        this.locations = locations;
        this.toastr.success('Found ' + locations.length + ' location/s', 'Success');
      });
    }

  }

  addLocation() {
    this.locationService.addLocation(this.location).subscribe(() => {
      this.getLocations();
      this.toastr.success('You successfully added a location!', 'Success');
      document.getElementById('id01').style.display = 'none'
      this.clearDialog();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

  updateLocation() {
    this.locationService.updateLocation(this.selectedLocation)
      .subscribe(data => {
        document.getElementById('id02').style.display = 'none';
        this.toastr.success('You successfully updated this location!', 'Success');
        this.getLocations();
      }, (err) => {
        this.toastr.error(err.error.message, 'Error');
      });
  }

  deletelocation() {
    this.locationService.deleteLocation(this.selectedLocation._id)
      .subscribe(data => {
        this.getLocations();
        document.getElementById('id03').style.display = 'none';
        this.toastr.success('You successfully deleted this location!', 'Success');
      }, (err) => {
        this.toastr.error(err.error.message, 'Error');
      });
  }

  selectlocation(option, location) {
    if (location != null && option != null) {
      this.selectedLocation = location;
      if (option === 2) {
        document.getElementById('id02').style.display = 'block'
      } else if (option === 3) {
        document.getElementById('id03').style.display = 'block';
      } else {
        console.log("Something unexpected hapend!");
      }
    }
  }

  clearDialog() {
    this.location.country = '';
    this.location.city = '';
    this.location.street = '';
    this.location.street_number = '';
    this.location.contact_email = '';
  }

  nextPage() {
    if (this.currentPage >= this.numberOfPages - 1) {
      this.toastr.error('No next page!', 'Error');
      return;
    }
    ++this.currentPage;
    this.getLocations();
  }

  previousPage() {
    if (this.currentPage <= 0) {
      this.toastr.error('No previous page!', 'Error');
      return;
    }
    --this.currentPage;
    this.getLocations();
  }

  jumpToPage(event) {
    if (event.target.value >= 1 && event.target.value <= this.numberOfPages) {
      this.currentPage = event.target.value - 1;
      this.getLocations();
    } else {
      this.toastr.error('This page does not exist!', 'Error');
    }
  }

  onLimitChange(value) {
    this.currentPage = 0;
    this.getLocations();
  }

  ngOnInit(): void {
    this.getLocations();
  }

}
