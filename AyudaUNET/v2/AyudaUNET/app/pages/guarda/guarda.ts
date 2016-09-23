import {Component} from '@angular/core';
import {AlertController, Nav, NavController} from 'ionic-angular';

import { NuevaMateria } from '../nuevamateria/nuevamateria';


@Component({
  templateUrl: 'build/pages/guarda/guarda.html'
})
export class Guarda {

  constructor(public alerCtrl: AlertController,public navCtrl: NavController) { }

  onAgregarMateria(){
    console.log("aqui");
    this.navCtrl.push(NuevaMateria);
  }

}
