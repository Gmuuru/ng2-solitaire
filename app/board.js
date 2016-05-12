System.register(["angular2/core", "./CardComponent", "./CardService"], function(exports_1, context_1) {
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
    var core_1, CardComponent_1, CardService_1;
    var Board;
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
            Board = (function () {
                function Board(cardService) {
                    this.cardService = cardService;
                    this.stacks = cardService.stacks;
                }
                Board = __decorate([
                    core_1.Component({
                        selector: 'board',
                        directives: [CardComponent_1.CardComponent],
                        template: "\n\t\t<div class=\"row\">\n\t\t\t<div id=\"deck\" class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><div class=\"slot\">\n\t\t\t\t<card-holder *ngFor=\"#card of stacks.deck\" [card]=\"card\"></card-holder>\n\t\t\t</div></div>\n\t\t\t<div id=\"discard\" class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\n\t\t\t\t<div class=\"slot\">\n\t\t\t\t\t<card-holder *ngFor=\"#card of stacks.discard\" [card]=\"card\"></card-holder>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"blank\" class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"></div>\n\t\t\t<div *ngFor=\"#heap of stacks.heaps; #i = index\" class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\n\t\t\t\t<div class=\"slot\">\n\t\t\t\t\t<card-holder *ngFor=\"#card of heap\" [card]=\"card\"></card-holder>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"blank\" class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"></div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div id=\"blank\" class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"></div>\n\t\t\t<div *ngFor=\"#pile of stacks.piles\" class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\n\t\t\t\t<div class=\"slot\">\n\t\t\t\t\t<card-holder *ngFor=\"#card of pile\" [card]=\"card\"></card-holder>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"blank\" class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"></div>\n\t\t</div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [CardService_1.CardService])
                ], Board);
                return Board;
            }());
            exports_1("Board", Board);
        }
    }
});
//# sourceMappingURL=board.js.map