import { Component, ViewChild, ElementRef } from "angular2/core";
import { DraggableDirective } from "./DragDirective";

@Component({
	selector: 'card-holder',
	inputs : ['card'],
	directives : [DraggableDirective],
	template: `
		<div 
			class="card {{card.getName()}}" 
			[ngClass]="{'on' : card.isShown(), 'off' : !card.shown}" 
			[ngStyle]="card.getStyle()"
			[dragcard]="card" >
			<div *ngIf="card.highlight" class="highlight"></div>
		</div>

	`
})
export class CardComponent {

	constructor(){}
}


export class Card {

	top:number;
	left:number;
	location:string;
	position:number;
	shown:boolean;
	isLast:boolean;
	style:any;
	highlight:boolean;
	previous:Card;

	constructor(private value:number, private symbol:string, location?:string){
		this.shown = false;
		this.position = 0;
		this.location = location ? location : "";
		this.highlight = false;
		this.isLast = false;
	}

	setPosition(position){
		this.position = position;
	}

	setLocation(location){
		this.location = location;
	}

	setShown(shown){
		this.shown = shown;
	}

	getStyle(){
		this.top = -2;
		this.left = -2;
		if(this.location.indexOf("pile") == 0){
			if(this.previous && this.previous.value > 0 && this.previous.shown){
				this.top += this.previous.top + 19;
				this.left = this.previous.left;
			} else {
				this.top += this.position * 3;
				this.left += this.position;
			}
		} else if(this.location.indexOf("deck") == 0){
			this.top += this.position/2;
			this.left += this.position/2;
		}

		return {
			'z-index' : this.position + 1,
			'top' : this.top+"px",
			'left' : this.left+"px"
		};
	}

	isShown() :boolean{
		return this.shown;
	}

	getValue() :number{
		return this.value;
	}

	getSymbol() :string {
		return this.symbol;
	}

	getName() :string {
		var name = "";
		if(this.value == 1){
			name = "Ace"
		} else if(this.value == 11){
			name = "Jack";
		} else if(this.value == 12){
			name = "Queen";
		} else if(this.value == 13){
			name = "King";
		} else {
			name = ""+this.value;
		}

		return "C"+name + this.symbol;
	}

	getColor() :string {
		if(this.symbol == "Spades" || this.symbol == "Clubs"){
			return "black";
		} else if(this.symbol == "Hearts" || this.symbol == "Diamonds") {
			return "red";
		}
	}
}