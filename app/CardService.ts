import {Injectable} 	from "angular2/core";
import {Subject}    	from 'rxjs/Subject';
import {Card}    	from './CardComponent';

@Injectable()
export class CardService {

	stacks : {
		cards:Array<Card>,
		deck:Array<Card>,
		discard:Array<Card>,
		piles:Array<Array<Card>>,
		heaps:Array<Array<Card>>
	}
	symbols : Array<string>;
	currentMovingCard:Card;

	constructor(){
		this.stacks = {
			discard: new Array<Card>(),
			deck : null,
			cards : new Array<Card>(),
			heaps : [
				[new Card(0, '', 'heap0')],
				[new Card(0, '', 'heap1')],
				[new Card(0, '', 'heap2')],
				[new Card(0, '', 'heap3')]
			],
			piles : new Array<Array<Card>>()
		};
		this.currentMovingCard = null;
		this.symbols = ["Clubs", "Diamonds", "Hearts", "Spades"];
		this.symbols.forEach(
			(symbol) => {
				for (let i = 1; i < 14; i++){
					this.stacks.cards.push(new Card(i, symbol));
				}
			}
		);
		this.shuffle(this.stacks.cards);
		this.stacks.deck = this.stacks.cards.slice(0, 24);
		this.stacks.deck.unshift(new Card(0, ''));
		this.updatePositions("deck", this.stacks.deck);
		var lastIndex = 24;
		for(var i = 0; i < 7; i++){
			this.stacks.piles[i] = this.stacks.cards.slice(lastIndex, lastIndex + i + 1);
			this.stacks.piles[i].unshift(new Card(0, ''));
			lastIndex += i+1;
			this.updatePositions("pile"+i,  this.stacks.piles[i]);
			this.last(this.stacks.piles[i]).setShown(true);
		}
	}

	shuffle(cards:Array<Card>){
  		var currentIndex = cards.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = cards[currentIndex];
		    cards[currentIndex] = cards[randomIndex];
		    cards[randomIndex] = temporaryValue;
		}
	  return cards;
	}

	isLast(pile, card){
		return pile.indexOf(card) == pile.length-1;
	}

	last(pile) :Card{
		return pile[pile.length-1];
	}

	updatePositions(pileName, pile){
		console.log("update "+pileName+" size : "+pile.length);
		var previous = null;
		for(var i = 0; i < pile.length; i++){
			pile[i].setLocation(pileName);
			pile[i].setPosition(i);
			pile[i].previous = previous;
			previous = pile[i];
			if(i == pile.length-1){
				pile[i].isLast = true;
			}
		}
	}

	public restoreDeck(){
		this.stacks.deck = this.stacks.deck.concat(this.stacks.discard.reverse());
		this.updatePositions('deck', this.stacks.deck);
		this.stacks.deck.forEach(
			(card) => {
				card.shown = false;
			}
		);
		this.stacks.discard = [];
		this.updatePositions('discard', this.stacks.discard);
	}

	public moveFromDeckToDiscard(){
		var card = this.stacks.deck.pop();
		card.shown = true;
		this.stacks.discard.push(card);
		this.updatePositions('discard', this.stacks.discard);
	}

	public moveCard(destCard:Card){

		var cardsToAdd = [];
		//removing card
		if(this.currentMovingCard.location.indexOf("pile") == 0){
			let index = parseInt(this.currentMovingCard.location.charAt(4));

			cardsToAdd = this.getCardsToMove(this.stacks.piles[index], this.currentMovingCard.position);

			this.stacks.piles[index] = this.stacks.piles[index].slice(0, this.currentMovingCard.position);
			this.updatePositions(this.currentMovingCard.location, this.stacks.piles[index]);

			if(this.stacks.piles[index].length > 0){
				this.last(this.stacks.piles[index]).setShown(true);
			}
		} else if(this.currentMovingCard.location.indexOf("heap") == 0){
			let index = parseInt(this.currentMovingCard.location.charAt(4));
			cardsToAdd.push(this.stacks.heaps[index].pop());
			this.updatePositions(this.currentMovingCard.location, this.stacks.heaps[index]);
		} else if(this.currentMovingCard.location.indexOf("discard") == 0){
			cardsToAdd.push(this.stacks.discard.pop());
			this.updatePositions(this.currentMovingCard.location, this.stacks.discard);
		}

		console.log(cardsToAdd.length+" cards to move");
		//adding card
		if(destCard.location.indexOf("pile") == 0){
			let index = parseInt(destCard.location.charAt(4));
			this.stacks.piles[index] = this.stacks.piles[index].concat(cardsToAdd);
			this.updatePositions(destCard.location, this.stacks.piles[index]);
		} else if(destCard.location.indexOf("heap") == 0){
			let index = parseInt(destCard.location.charAt(4));
			this.stacks.heaps[index] = this.stacks.heaps[index].concat(cardsToAdd);
			this.updatePositions(destCard.location, this.stacks.heaps[index]);
		}
		destCard.highlight = false;
		this.currentMovingCard = null;

		if(this.stacks.heaps[0].length + this.stacks.heaps[1].length + 
			this.stacks.heaps[2].length + this.stacks.heaps[3].length == 14*4){
				console.log("Victory !");
		}
	}

	public getCardsToMove(pile, index){
		return pile.slice(index, pile.length);
	}

	public checkMove(card:Card) :boolean {
        if(this.currentMovingCard == null || card.location == this.currentMovingCard.location){
        	return false;
        }
        card.highlight = false;
        if(card.location.indexOf("pile") == 0){
        	if(card.getColor() != this.currentMovingCard.getColor() && 
        		card.getValue() == this.currentMovingCard.getValue() + 1){
				card.highlight = true;
				return true;
			}
			if(card.getValue() == 0 && this.currentMovingCard.getValue() == 13){
				card.highlight = true;
				return true;
			}
        } else if(card.location.indexOf("heap") == 0){
        	if(card.getSymbol() == this.currentMovingCard.getSymbol() && 
        		card.getValue() == this.currentMovingCard.getValue() - 1){
				card.highlight = true;
				return true;
        	}
        	if(card.getValue() == 0 && this.currentMovingCard.getValue() == 1){
				card.highlight = true;
				return true;
        	}
        }
		return false;
	}

	public cancelMove(card:Card){
		card.highlight = false;
	}

	public autoMove(card:Card) :boolean {

		var hasMoved = false;
		for(var i = 0; i < this.stacks.heaps.length; i++){
			if(this.stacks.heaps[i].length <=1 && card.getValue() == 1){
				this.currentMovingCard = card;
				this.moveCard(this.stacks.heaps[i][0]);
				hasMoved = true;
				break;
			}
			var topCard = this.last(this.stacks.heaps[i]);
			if(card.getSymbol() == topCard.getSymbol() && 
        		card.getValue() == topCard.getValue() + 1){
				this.currentMovingCard = card;
				this.moveCard(this.stacks.heaps[i][0]);
				hasMoved = true;
				break;
			}
		}
		return hasMoved;
	}

	public cascadingAM(){
		var hasMoved = false;
		for(var i = 0; i < this.stacks.piles.length; i++){
			hasMoved = this.autoMove(this.last(this.stacks.piles[i]));
			if(hasMoved){
				break;
			}
		}
		if(hasMoved){
			this.cascadingAM();
		}
	}
}
