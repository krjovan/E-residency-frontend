import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card-service/card.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent implements OnInit {

  myCardInfo: any;
  isLoaded: Boolean = false;

  constructor(private cardService: CardService,
              private auth: AuthenticationService,
              private toastr: ToastrService) { }

  getMyCard() {
    this.isLoaded = false;
    this.cardService.getUserCard(this.auth.getUserDetails()._id).subscribe({
      next: myCardInfo => {
        console.log(myCardInfo);
        this.myCardInfo = myCardInfo;
        if (myCardInfo.card.expire_date < new Date()) {
          this.cardService.updateCard(this.myCardInfo.card._id,false).subscribe({
            next: res => {
              this.getMyCard();
            }, error: err => {
              console.log(err);
            }
          });
        }
        this.isLoaded = true;
      }, error: err => {
        console.log(err);
      }
    });
  }

  deactivate() {
    this.cardService.updateCard(this.myCardInfo.card._id,false).subscribe({
      next: res => {
        this.getMyCard();
        document.getElementById('id03').style.display = 'none';
        this.toastr.success('You successfully deactivated your card!', 'Success');
      }, error: err => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getMyCard();
  }

}
