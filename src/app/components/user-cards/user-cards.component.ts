import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card-service/card.service';
import { Card } from '../../models/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  cards: Card [] = [];
  search = '';

  constructor(private cardService: CardService,
              private toastr: ToastrService) { }

  getAll() {
    this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  changeCardState(option: number, card: Card) {
    if (option === 2) {
      this.cardService.updateCard(card._id, false).subscribe({
        next: res => {
          this.getAll();
          this.toastr.success('Card ' + card.card_code + ' deactivated!', 'Success');
        },
        error: err => {
          console.log(err);
        }
      });
    } else if (option === 1) {
      this.cardService.updateCard(card._id, true).subscribe({
        next: res => {
          this.getAll();
          this.toastr.success('Card ' + card.card_code + ' reactivated!', 'Success');
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      console.log('Something unexpected happend!');
    }
  }

  ngOnInit(): void {
    this.getAll();
  }

}
