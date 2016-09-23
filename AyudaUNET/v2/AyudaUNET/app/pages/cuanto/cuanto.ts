import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/cuanto/cuanto.html'
})
export class Cuanto {
  private _numeroParciales: any;
  private _vector: any[];
  private _porcentaje1: number;
  private _porcentaje2: number;
  private _porcentaje3: number;
  private _nota1: number;
  private _nota2: number;
  private _nota3: number;

  constructor(public navCtrl: NavController, navParams: NavParams, public toastCtrl: ToastController) {

    this._numeroParciales = navParams.get('cantidad');
    this._vector = [];
    for(var i = 1; i < this._numeroParciales; i ++){
      this._vector.push({
        numero: i,
      });
    }

  }

  onCalcular(){
    console.log(this._porcentaje1);
    console.log(this._nota1);
    if(this._numeroParciales == 2){
      if(this._porcentaje1 > 0 && this._nota1 > 0) {

      }else{
        let toast = this.toastCtrl.create({
          message: 'Todos los Campos son obligatorios',
          duration: 3000
        });
        toast.present();
      }
    }

    else if(this._numeroParciales == 3){
      if((this._porcentaje1 > 0 && this._nota1 > 0) && (this._porcentaje2 > 0 && this._nota2 > 0)) {

      }else{
        let toast = this.toastCtrl.create({
          message: 'Todos los Campos son obligatorios',
          duration: 3000
        });
        toast.present();
      }
    }

    else if(this._numeroParciales == 4){
      if((this._porcentaje1 > 0 && this._nota1 > 0) && (this._porcentaje2 > 0 && this._nota2 > 0) && (this._porcentaje3 > 0 && this._nota3 > 0)) {

      }else{
        let toast = this.toastCtrl.create({
          message: 'Todos los Campos son obligatorios',
          duration: 3000
        });
        toast.present();
      }
    }
  }

}
