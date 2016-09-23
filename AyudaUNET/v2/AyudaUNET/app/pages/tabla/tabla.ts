import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Cuanto} from "../cuanto/cuanto";

@Component({
  templateUrl: 'build/pages/tabla/tabla.html'
})
export class Tabla {

  private _tabla: number[] = new Array(100);
  private _numero = 0;
  private _nota;
  private _notaCalcular: number;
  testRadioOpen: boolean;
  testRadioResult;

  constructor(public navCtrl: NavController, public alerCtrl: AlertController) {
    for (var j = 0; j <= 100; j++)
    {
      if(j < 8)
        this._numero = 10;
      else if(j == 17 || j == 18)
        this._numero = 20;
      else if(j == 28 || j == 29)
        this._numero = 30;
      else if(j == 39 || j == 40)
        this._numero = 40;
      else if(j == 48 || j == 49)
        this._numero = 48;
      else if(j == 54 || j == 55)
        this._numero = 53;
      else if(j == 62 || j == 63)
        this._numero = 60;
      else if(j == 73 || j == 74)
        this._numero = 70;
      else if(j == 84 || j == 85)
        this._numero = 80;
      else if(j > 94)
        this._numero = 90;
      else
        this._numero ++;
      this._tabla[j] = this._numero/10;
    }
  }

  get notaCalcular(): number {
    return this._notaCalcular;
  }

  set notaCalcular(value: number) {
    this._notaCalcular = value;
  }

  DevolverNumero()
  {
    return this._tabla[this._notaCalcular];
  }

  DevolverNota(numero)
  {
    if(numero > 9.0)
      return -1;
    if(numero == 0)
      return 0;
    this._nota = 0;
    for (var i = 0; i <= 100; i++)
    {
      if(this._tabla[i] == numero)
      {
        this._nota = i;
        break;
      }
    }
    return this._nota;
  }

  showAlert() {
    let alert = this.alerCtrl.create({
      title: 'Tabla de Conversión!',
      subTitle: 'El Resultado es: '+this._tabla[this._notaCalcular],
      buttons: ['OK']
    });
    alert.present();
  }

}
