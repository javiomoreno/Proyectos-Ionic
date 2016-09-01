import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlarmaDetallePage} from '../alarma-detalle/alarma-detalle'
import {AlarmaNuevaPage} from '../alarma-nueva/alarma-nueva'
import {DataService, Alarma} from  '../data/data'

@Component({
  templateUrl: 'build/pages/alarmas/alarmas.html'
})
export class AlarmasPage {
  private nav;
  private dataService;
  private lista;
  constructor(private navCtrl: NavController, dataService: DataService) {
    this.nav = navCtrl;
    this.dataService = dataService;

    this.lista = [];

    this.dataService.getAll().then(
      data => {
        this.lista = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.lista.push(new Alarma(item.medicamento, item.cantidad, item.id));
          }
        }
      });

    console.log(this.lista);
  }

  addAlarma(){
    this.nav.push(AlarmaNuevaPage, {alarmasPage: this});
  }

  saveAlarma(alarma){
    this.lista.push(alarma);
  }

  viewAlarma(alarma){
    this.nav.push(AlarmaDetallePage, {alarma: alarma});
  }
}
