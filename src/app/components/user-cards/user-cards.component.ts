import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card-service/card.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  cards: Card [] = [];

  constructor(private cardService: CardService) { }

  getAll() {
    this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  changeCardState(option: number, card: Card) {
    console.log(option);
    console.log(card);
  }

  ngOnInit(): void {
    this.getAll();
  }

}
