import { Component, ViewChild, ElementRef } from "angular2/core";
import { CardComponent } from "./CardComponent";
import { CardService } from "./CardService";
import {Card}    	from './CardComponent';

@Component({

	selector: 'board',
	directives : [CardComponent],
	template: `
		<div class="row">
			<div id="deck" class="col-xs-1 col-sm-1 col-md-1 col-lg-1"><div class="slot">
				<card-holder *ngFor="#card of stacks.deck" [card]="card"></card-holder>
			</div></div>
			<div id="discard" class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
				<div class="slot">
					<card-holder *ngFor="#card of stacks.discard" [card]="card"></card-holder>
				</div>
			</div>
			<div id="blank" class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
			<div *ngFor="#heap of stacks.heaps; #i = index" class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
				<div class="slot">
					<card-holder *ngFor="#card of heap" [card]="card"></card-holder>
				</div>
			</div>
			<div id="blank" class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
		</div>
		<div class="row">
			<div id="blank" class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>
			<div *ngFor="#pile of stacks.piles" class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
				<div class="slot">
					<card-holder *ngFor="#card of pile" [card]="card"></card-holder>
				</div>
			</div>
			<div id="blank" class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
		</div>
	`
})
export class Board {

	stacks:any;
	constructor(private cardService:CardService){
		this.stacks = cardService.stacks;
	}
}