import { Component } from "@angular/core";
import { FormBuilder, Control, ControlGroup, Validators, FORM_DIRECTIVES } from '@angular/common';
import {NavController, Alert} from 'ionic-angular';
import {RecuperarClavePage} from "../recuperar-clave/recuperar-clave";


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [FORM_DIRECTIVES]
})
export class HomePage {
  loginForm: ControlGroup;

  constructor(
    private nav: NavController,
    builder: FormBuilder
  ) {
    this.loginForm = builder.group({
      'dni': [
        '', // default value
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      'clave': [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });
  }

  validate(): boolean {
    if (this.loginForm.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let control = this.loginForm.controls['dni'];
    if (!control.valid) {
      if (control.errors['required']) {
        errorMsg = 'DNI es un campo obligatorio';
      } else if (control.errors['minlength']) {
        errorMsg = 'DNI debe ser mayor a 5 caracteres';
      }
    }
    else {
      let controlClave = this.loginForm.controls['clave'];
      if (!controlClave.valid) {
        if (controlClave.errors['required']) {
          errorMsg = 'Clave es un campo obligatorio';
        } else if (controlClave.errors['minlength']) {
          errorMsg = 'Clave debe ser mayor a 5 caracteres';
        }
      }
    }

    let alert = Alert.create({
      //title: 'Error!',
      subTitle: errorMsg || 'Empty error message!',
      buttons: ['OK']
    });
    this.nav.present(alert);

    return false;
  }

  submit(): void {
    if (this.validate()) {
      // process the data
    }
  }

  recuperarClave(){
    this.nav.push(RecuperarClavePage);
  }

}
