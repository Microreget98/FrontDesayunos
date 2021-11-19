import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  zindex = 1;
  hide = true;
  disprop: boolean = true;
  fnameandlas: boolean = true;
  showFiller = false;

  perfilForm = new FormGroup({})

  firstchar: string = "";

  //Valida Todo Los inputs
  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      firstName: [{value:null, disabled: true}, [Validators.required]],
      lastName: ['', [Validators.required]],
      sedes: ['', [Validators.required]],
      passw: ['', [Validators.required]],
      datePo: ['', [Validators.required]]

    });

    // this.firstchar = this.fname.charAt(0);

  }

  ngOnInit(): void {
    this.firstchar = String(this.perfilForm.get("firstName").value).charAt(0);
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
    console.log(this.perfilForm.controls)
  }

  updateProfile() {

    console.log('perfilForm');

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