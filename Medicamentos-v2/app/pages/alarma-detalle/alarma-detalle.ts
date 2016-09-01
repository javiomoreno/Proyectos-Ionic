/**
 * Created by Javier Moreno on 1 ago 2016.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/alarma-detalle/alarma-detalle.html'
})
export class AlarmaDetallePage {
  private navParams;
  private medicamento;
  private cantidad;
  constructor(navParams: NavParams) {
    this.navParams = navParams;

    this.medicamento = this.navParams.get('alarma').medicamento;
    this.cantidad = this.navParams.get('alarma').cantidad;
  }

}
