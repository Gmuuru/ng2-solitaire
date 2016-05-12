System.register(['angular2/core', './CardComponent', "./CardService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, CardComponent_1, CardService_1;
    var DraggableDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CardComponent_1_1) {
                CardComponent_1 = CardComponent_1_1;
            },
            function (CardService_1_1) {
                CardService_1 = CardService_1_1;
            }],
        execute: function() {
            DraggableDirective = (function () {
                function DraggableDirective(el, cardService) {
                    this.el = el;
                    this.cardService = cardService;
                    this.refcount = 0;
                    el.nativeElement.setAttribute('draggable', 'true');
                    this.moveAllowed = false;
                }
                DraggableDirective.prototype.onClick = function (ev) {
                    if (this.card.location != "deck") {
                        return false;
                    }
                    else {
                        if (this.card.getValue() == 0) {
                            this.cardService.restoreDeck();
                        }
                        else {
                            this.cardService.moveFromDeckToDiscard();
                        }
                    }
                };
                DraggableDirective.prototype.onDoubleClick = function () {
                    console.log("doubleClick !");
                    if (this.cardService.autoMove(this.card)) {
                        this.cardService.cascadingAM();
                    }
                };
                DraggableDirective.prototype.onRightClick = function (ev) {
                    console.log(this.card);
                    ev.preventDefault();
                };
                DraggableDirective.prototype.onDragStart = function (ev) {
                    if (this.card.location == "deck" || this.card.getValue() == 0) {
                        return false;
                    }
                    this.cardService.currentMovingCard = this.card;
                    ev.dataTransfer.setData('Text', ev.target.id);
                };
                DraggableDirective.prototype.onDragOver = function (ev) {
                    return false;
                };
                DraggableDirective.prototype.onDragEnter = function (ev) {
                    if (this.refcount === 0 && (this.card.isLast || this.card.getValue() == 0)) {
                        console.log("Entering card", this.card);
                        this.moveAllowed = this.cardService.checkMove(this.card);
                    }
                    this.refcount++;
                };
                DraggableDirective.prototype.onDragLeave = function (ev) {
                    this.refcount--;
                    if (this.refcount === 0 && this.card.isLast) {
                        this.cardService.cancelMove(this.card);
                        console.log("leaving");
                        this.moveAllowed = false;
                    }
                };
                DraggableDirective.prototype.onDrop = function (ev) {
                    if (this.moveAllowed) {
                        console.log("droping");
                        this.cardService.moveCard(this.card);
                    }
                    this.refcount = 0;
                };
                __decorate([
                    core_1.Input('dragcard'), 
                    __metadata('design:type', CardComponent_1.Card)
                ], DraggableDirective.prototype, "card", void 0);
                DraggableDirective = __decorate([
                    core_1.Directive({
                        selector: '[dragcard]',
                        host: {
                            '(dragstart)': 'onDragStart($event)',
                            '(dragover)': 'onDragOver($event)',
                            '(dragleave)': 'onDragLeave($event)',
                            '(dragenter)': 'onDragEnter($event)',
                            '(drop)': 'onDrop($event)',
                            '(contextmenu)': 'onRightClick($event)',
                            '(click)': 'onClick($event)',
                            '(dblclick)': 'onDoubleClick($event)'
                        }
                    }),
                    core_1.Injectable(),
                    __param(0, core_1.Inject(core_1.ElementRef)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, CardService_1.CardService])
                ], DraggableDirective);
                return DraggableDirective;
            }());
            exports_1("DraggableDirective", DraggableDirective);
        }
    }
});
//# sourceMappingURL=DragDirective.js.map