/**
 * Created by Javier Moreno on 1 ago 2016.
 */
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage, SqlStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/alarma-nueva/alarma-nueva.html'
})
export class AlarmaNuevaPage {
  private nav;
  private navParams;
  private medicamento;
  private cantidad;
  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.nav = navCtrl;
    this.navParams = navParams;

    this.medicamento = "";
    this.cantidad = "";
  }

  saveAlarma(){
    let newAlarma = {
      medicamento: this.medicamento,
      cantidad: this.cantidad,
    }
    console.log(newAlarma);

    this.navParams.get('alarmasPage').saveAlarma(newAlarma);
    this.nav.pop();
  }
}
