import {Component} from '@angular/core';
import {AlarmasPage} from '../alarmas/alarmas';
import {BuscarPage} from '../buscar/buscar';
import {FarmaciasPage} from '../farmacias/farmacias';
import {DataService} from "../data/data";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',

})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = AlarmasPage;
    this.tab2Root = BuscarPage;
    this.tab3Root = FarmaciasPage;
  }

  openModal(){
    console.log('hola');
  }
}
