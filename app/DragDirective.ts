import {Directive, ElementRef, Input, Inject, Injectable} from 'angular2/core';
import {Card}        from './CardComponent';
import {CardService}  from "./CardService";


@Directive({
    selector: '[dragcard]',
    host: {
        '(dragstart)': 'onDragStart($event)',
        '(dragover)': 'onDragOver($event)',
        '(dragleave)': 'onDragLeave($event)',
        '(dragenter)': 'onDragEnter($event)',
        '(drop)': 'onDrop($event)',
        '(contextmenu)': 'onRightClick($event)',
        '(click)':'onClick($event)',
        '(dblclick)':'onDoubleClick($event)'
    }
})
@Injectable()
export class DraggableDirective {
    refcount = 0;

    @Input('dragcard') card: Card;

    moveAllowed:boolean;

    constructor( @Inject(ElementRef) private el: ElementRef, private cardService:CardService) {
        el.nativeElement.setAttribute('draggable', 'true');
        this.moveAllowed = false;
    }

    onClick(ev){
        if(this.card.location !="deck"){
            return false;
        } else {
            if(this.card.getValue() == 0){
                this.cardService.restoreDeck();
            } else {
                this.cardService.moveFromDeckToDiscard();
            }
        }
    }

    onDoubleClick(){
        console.log("doubleClick !");
        if(this.cardService.autoMove(this.card)){
            this.cardService.cascadingAM();
        }
    }

    onRightClick(ev){
        console.log(this.card);
        ev.preventDefault();
    }

    onDragStart(ev) {
        if(this.card.location =="deck" || this.card.getValue() == 0){
            return false;
        }
        this.cardService.currentMovingCard = this.card;
        ev.dataTransfer.setData('Text', ev.target.id);
    }

    onDragOver(ev) {
        return false;
    }

    onDragEnter(ev) {
        if (this.refcount === 0 && (this.card.isLast || this.card.getValue() == 0)) {
            console.log("Entering card", this.card);
            this.moveAllowed = this.cardService.checkMove(this.card);
        }
        this.refcount++;
    }

    onDragLeave(ev) {
        this.refcount--;
        if (this.refcount === 0 && this.card.isLast) {
            this.cardService.cancelMove(this.card);
            console.log("leaving");
            this.moveAllowed = false;
        }
    }

    onDrop(ev) {

        if(this.moveAllowed){
            console.log("droping");
            this.cardService.moveCard(this.card);
        }
        this.refcount = 0;
    }
}