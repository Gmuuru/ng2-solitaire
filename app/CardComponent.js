System.register(["angular2/core", "./DragDirective"], function(exports_1, context_1) {
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
    var core_1, DragDirective_1;
    var CardComponent, Card;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DragDirective_1_1) {
                DragDirective_1 = DragDirective_1_1;
            }],
        execute: function() {
            CardComponent = (function () {
                function CardComponent() {
                }
                CardComponent = __decorate([
                    core_1.Component({
                        selector: 'card-holder',
                        inputs: ['card'],
                        directives: [DragDirective_1.DraggableDirective],
                        template: "\n\t\t<div \n\t\t\tclass=\"card {{card.getName()}}\" \n\t\t\t[ngClass]=\"{'on' : card.isShown(), 'off' : !card.shown}\" \n\t\t\t[ngStyle]=\"card.getStyle()\"\n\t\t\t[dragcard]=\"card\" >\n\t\t\t<div *ngIf=\"card.highlight\" class=\"highlight\"></div>\n\t\t</div>\n\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CardComponent);
                return CardComponent;
            }());
            exports_1("CardComponent", CardComponent);
            Card = (function () {
                function Card(value, symbol, location) {
                    this.value = value;
                    this.symbol = symbol;
                    this.shown = false;
                    this.position = 0;
                    this.location = location ? location : "";
                    this.highlight = false;
                    this.isLast = false;
                }
                Card.prototype.setPosition = function (position) {
                    this.position = position;
                };
                Card.prototype.setLocation = function (location) {
                    this.location = location;
                };
                Card.prototype.setShown = function (shown) {
                    this.shown = shown;
                };
                Card.prototype.getStyle = function () {
                    this.top = -2;
                    this.left = -2;
                    if (this.location.indexOf("pile") == 0) {
                        if (this.previous && this.previous.value > 0 && this.previous.shown) {
                            this.top += this.previous.top + 19;
                            this.left = this.previous.left;
                        }
                        else {
                            this.top += this.position * 3;
                            this.left += this.position;
                        }
                    }
                    else if (this.location.indexOf("deck") == 0) {
                        this.top += this.position / 2;
                        this.left += this.position / 2;
                    }
                    return {
                        'z-index': this.position + 1,
                        'top': this.top + "px",
                        'left': this.left + "px"
                    };
                };
                Card.prototype.isShown = function () {
                    return this.shown;
                };
                Card.prototype.getValue = function () {
                    return this.value;
                };
                Card.prototype.getSymbol = function () {
                    return this.symbol;
                };
                Card.prototype.getName = function () {
                    var name = "";
                    if (this.value == 1) {
                        name = "Ace";
                    }
                    else if (this.value == 11) {
                        name = "Jack";
                    }
                    else if (this.value == 12) {
                        name = "Queen";
                    }
                    else if (this.value == 13) {
                        name = "King";
                    }
                    else {
                        name = "" + this.value;
                    }
                    return "C" + name + this.symbol;
                };
                Card.prototype.getColor = function () {
                    if (this.symbol == "Spades" || this.symbol == "Clubs") {
                        return "black";
                    }
                    else if (this.symbol == "Hearts" || this.symbol == "Diamonds") {
                        return "red";
                    }
                };
                return Card;
            }());
            exports_1("Card", Card);
        }
    }
});
//# sourceMappingURL=CardComponent.js.map