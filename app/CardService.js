System.register(["angular2/core", './CardComponent'], function(exports_1, context_1) {
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
    var core_1, CardComponent_1;
    var CardService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CardComponent_1_1) {
                CardComponent_1 = CardComponent_1_1;
            }],
        execute: function() {
            CardService = (function () {
                function CardService() {
                    var _this = this;
                    this.stacks = {
                        discard: new Array(),
                        deck: null,
                        cards: new Array(),
                        heaps: [
                            [new CardComponent_1.Card(0, '', 'heap0')],
                            [new CardComponent_1.Card(0, '', 'heap1')],
                            [new CardComponent_1.Card(0, '', 'heap2')],
                            [new CardComponent_1.Card(0, '', 'heap3')]
                        ],
                        piles: new Array()
                    };
                    this.currentMovingCard = null;
                    this.symbols = ["Clubs", "Diamonds", "Hearts", "Spades"];
                    this.symbols.forEach(function (symbol) {
                        for (var i_1 = 1; i_1 < 14; i_1++) {
                            _this.stacks.cards.push(new CardComponent_1.Card(i_1, symbol));
                        }
                    });
                    this.shuffle(this.stacks.cards);
                    this.stacks.deck = this.stacks.cards.slice(0, 24);
                    this.stacks.deck.unshift(new CardComponent_1.Card(0, ''));
                    this.updatePositions("deck", this.stacks.deck);
                    var lastIndex = 24;
                    for (var i = 0; i < 7; i++) {
                        this.stacks.piles[i] = this.stacks.cards.slice(lastIndex, lastIndex + i + 1);
                        this.stacks.piles[i].unshift(new CardComponent_1.Card(0, ''));
                        lastIndex += i + 1;
                        this.updatePositions("pile" + i, this.stacks.piles[i]);
                        this.last(this.stacks.piles[i]).setShown(true);
                    }
                }
                CardService.prototype.shuffle = function (cards) {
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
                };
                CardService.prototype.isLast = function (pile, card) {
                    return pile.indexOf(card) == pile.length - 1;
                };
                CardService.prototype.last = function (pile) {
                    return pile[pile.length - 1];
                };
                CardService.prototype.updatePositions = function (pileName, pile) {
                    console.log("update " + pileName + " size : " + pile.length);
                    var previous = null;
                    for (var i = 0; i < pile.length; i++) {
                        pile[i].setLocation(pileName);
                        pile[i].setPosition(i);
                        pile[i].previous = previous;
                        previous = pile[i];
                        if (i == pile.length - 1) {
                            pile[i].isLast = true;
                        }
                    }
                };
                CardService.prototype.restoreDeck = function () {
                    this.stacks.deck = this.stacks.deck.concat(this.stacks.discard.reverse());
                    this.updatePositions('deck', this.stacks.deck);
                    this.stacks.deck.forEach(function (card) {
                        card.shown = false;
                    });
                    this.stacks.discard = [];
                    this.updatePositions('discard', this.stacks.discard);
                };
                CardService.prototype.moveFromDeckToDiscard = function () {
                    var card = this.stacks.deck.pop();
                    card.shown = true;
                    this.stacks.discard.push(card);
                    this.updatePositions('discard', this.stacks.discard);
                };
                CardService.prototype.moveCard = function (destCard) {
                    var cardsToAdd = [];
                    //removing card
                    if (this.currentMovingCard.location.indexOf("pile") == 0) {
                        var index = parseInt(this.currentMovingCard.location.charAt(4));
                        cardsToAdd = this.getCardsToMove(this.stacks.piles[index], this.currentMovingCard.position);
                        this.stacks.piles[index] = this.stacks.piles[index].slice(0, this.currentMovingCard.position);
                        this.updatePositions(this.currentMovingCard.location, this.stacks.piles[index]);
                        if (this.stacks.piles[index].length > 0) {
                            this.last(this.stacks.piles[index]).setShown(true);
                        }
                    }
                    else if (this.currentMovingCard.location.indexOf("heap") == 0) {
                        var index = parseInt(this.currentMovingCard.location.charAt(4));
                        cardsToAdd.push(this.stacks.heaps[index].pop());
                        this.updatePositions(this.currentMovingCard.location, this.stacks.heaps[index]);
                    }
                    else if (this.currentMovingCard.location.indexOf("discard") == 0) {
                        cardsToAdd.push(this.stacks.discard.pop());
                        this.updatePositions(this.currentMovingCard.location, this.stacks.discard);
                    }
                    console.log(cardsToAdd.length + " cards to move");
                    //adding card
                    if (destCard.location.indexOf("pile") == 0) {
                        var index = parseInt(destCard.location.charAt(4));
                        this.stacks.piles[index] = this.stacks.piles[index].concat(cardsToAdd);
                        this.updatePositions(destCard.location, this.stacks.piles[index]);
                    }
                    else if (destCard.location.indexOf("heap") == 0) {
                        var index = parseInt(destCard.location.charAt(4));
                        this.stacks.heaps[index] = this.stacks.heaps[index].concat(cardsToAdd);
                        this.updatePositions(destCard.location, this.stacks.heaps[index]);
                    }
                    destCard.highlight = false;
                    this.currentMovingCard = null;
                    if (this.stacks.heaps[0].length + this.stacks.heaps[1].length +
                        this.stacks.heaps[2].length + this.stacks.heaps[3].length == 14 * 4) {
                        console.log("Victory !");
                    }
                };
                CardService.prototype.getCardsToMove = function (pile, index) {
                    return pile.slice(index, pile.length);
                };
                CardService.prototype.checkMove = function (card) {
                    if (this.currentMovingCard == null || card.location == this.currentMovingCard.location) {
                        return false;
                    }
                    card.highlight = false;
                    if (card.location.indexOf("pile") == 0) {
                        if (card.getColor() != this.currentMovingCard.getColor() &&
                            card.getValue() == this.currentMovingCard.getValue() + 1) {
                            card.highlight = true;
                            return true;
                        }
                        if (card.getValue() == 0 && this.currentMovingCard.getValue() == 13) {
                            card.highlight = true;
                            return true;
                        }
                    }
                    else if (card.location.indexOf("heap") == 0) {
                        if (card.getSymbol() == this.currentMovingCard.getSymbol() &&
                            card.getValue() == this.currentMovingCard.getValue() - 1) {
                            card.highlight = true;
                            return true;
                        }
                        if (card.getValue() == 0 && this.currentMovingCard.getValue() == 1) {
                            card.highlight = true;
                            return true;
                        }
                    }
                    return false;
                };
                CardService.prototype.cancelMove = function (card) {
                    card.highlight = false;
                };
                CardService.prototype.autoMove = function (card) {
                    var hasMoved = false;
                    for (var i = 0; i < this.stacks.heaps.length; i++) {
                        if (this.stacks.heaps[i].length <= 1 && card.getValue() == 1) {
                            this.currentMovingCard = card;
                            this.moveCard(this.stacks.heaps[i][0]);
                            hasMoved = true;
                            break;
                        }
                        var topCard = this.last(this.stacks.heaps[i]);
                        if (card.getSymbol() == topCard.getSymbol() &&
                            card.getValue() == topCard.getValue() + 1) {
                            this.currentMovingCard = card;
                            this.moveCard(this.stacks.heaps[i][0]);
                            hasMoved = true;
                            break;
                        }
                    }
                    return hasMoved;
                };
                CardService.prototype.cascadingAM = function () {
                    var hasMoved = false;
                    for (var i = 0; i < this.stacks.piles.length; i++) {
                        hasMoved = this.autoMove(this.last(this.stacks.piles[i]));
                        if (hasMoved) {
                            break;
                        }
                    }
                    if (hasMoved) {
                        this.cascadingAM();
                    }
                };
                CardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CardService);
                return CardService;
            }());
            exports_1("CardService", CardService);
        }
    }
});
//# sourceMappingURL=CardService.js.map