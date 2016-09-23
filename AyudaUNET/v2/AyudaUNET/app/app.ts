import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {AlertController} from 'ionic-angular';

import { Inicio } from './pages/inicio/inicio';
import { Tabla } from './pages/tabla/tabla';
import { Cuanto } from './pages/cuanto/cuanto';
import { Guarda } from './pages/guarda/guarda';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Inicio;

  pages: Array<{id: string, title: string, component: any, icono: string}>;

  testRadioOpen: boolean;
  testRadioResult;

  constructor(public platform: Platform, public alerCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { id: '1', title: 'Inicio', component: Inicio, icono: 'home' },
      { id: '2', title: 'Tabla de Conversión', component: Tabla, icono: 'apps' },
      { id: '3', title: '¿Cuánto me Falta?', component: Cuanto, icono: 'calculator' },
      { id: '4', title: 'Guarda tus Notas', component: Guarda, icono: 'archive' },
      { id: '5', title: 'Inicia Sesión', component: Guarda, icono: 'power' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.id == "3"){
      this.doRadio();
    }else {
      this.nav.setRoot(page.component);
    }
  }


  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Cantidad de Parciales');

    alert.addInput({
      type: 'radio',
      label: '2 Parciales',
      value: '2',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '3 Parciales',
      value: '3'
    });

    alert.addInput({
      type: 'radio',
      label: '4 Parciales',
      value: '4'
    });

    alert.addButton({
      text: 'Cancelar',
      handler: data => {
        this.nav.setRoot(Inicio);      }
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        if(data == "2"){
          this.nav.setRoot(Cuanto, {
            cantidad: '2'
          });
        }
        if(data == "3"){
          this.nav.setRoot(Cuanto, {
            cantidad: '3'
          });
        }
        if(data == "4"){
          this.nav.setRoot(Cuanto, {
            cantidad: '4'
          });
        }
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
}

ionicBootstrap(MyApp);
