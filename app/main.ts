/// <reference path="../node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } 		from "angular2/platform/browser";
import { Component } 		from "angular2/core";

import {Board}  from "./board";
import {CardService}  from "./CardService";
//############################ APP #########################################

@Component(
{
	selector: 'solitaire',
	template: `
		<board></board>
	`,
	directives: [Board],
	providers : []
}
)
class mainApp {
	
	constructor(){
	}
		
}

bootstrap(mainApp, [CardService]);