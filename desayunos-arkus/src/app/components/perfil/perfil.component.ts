import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserDataService } from '../login-registro/user-data.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  // fadeinout = "fadeinout"
  hide:boolean = true;
  disprop: boolean = true;
  fnameandlas: boolean = true;
  showFiller = false;

  perfilForm = new FormGroup({})

  firstchar: string = "";

  //Valida Todo Los inputs
  constructor(private fb: FormBuilder, private userData: UserDataService,) {
    // this.perfilForm = this.fb.group({
    //   firstName: [this.userData.userData[0].first_name, [Validators.required]],
    //   lastName: [this.userData.userData[0].last_name, [Validators.required]],
    //   sedes: [this.userData.userData[0].location, [Validators.required]],
    //   passw: [null, [Validators.required]],
    //   datePo: [this.userData.userData[0].dob, [Validators.required]]

    // });

    this.perfilForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      datePo: ['', [Validators.required]]

    });

    // this.firstchar = this.fname.charAt(0);

  }

  ngOnInit(): void {
    // console.log(typeof(this.userData.userData[0].last_name))
    this.firstchar = String(this.perfilForm.get("firstName").value).charAt(0);
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
    console.log(this.perfilForm.controls)
  }

  updateProfile() {

    console.log('perfilForm');

  }

  onClickFadeInOut(){

  }

  onSubmit() {
    let PerfilData = {
      
    }
    console.log(this.perfilForm.value);
  }

  buttonD() {
    
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      if (this.perfilForm.get(`${iterator}`).disabled) {
        this.perfilForm.get(`${iterator}`).enable();
      } else {
        this.perfilForm.get(`${iterator}`).disable();
      
      }
    }
  }

}

//#region swalalertmodificacion_usuario
//mensaje de alerta modificacion de usuario correcta
  // Swal.fire({
  //         icon: 'success',
  //         title: 'Usuario modificado con exito',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
//#endregion
//#region swalalertmodificacion_usuario_error
//mensaje de alerta modificacion de usuario no modificada error 
   // Swal.fire({
  //         icon: 'error',
  //         title: 'Usuario no modificado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
//#endregion