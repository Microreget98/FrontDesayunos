import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from 'src/app/core/config.service';
import Swal from 'sweetalert2';
import { UserDataService } from '../login-registro/user-data.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  // fadeinout = "fadeinout"

  hide: boolean = true;
  disprop: boolean = true;
  fnameandlas: boolean = true;
  showFiller = false;

  perfilForm = new FormGroup({})

  firstchar: string = "";

  //Valida Todo Los inputs
  constructor(private fb: FormBuilder, 
    private userData: UserDataService, 
    private router: Router, 
    private apiService: ApiService,
    private configService: ConfigService) {}

  ngOnInit(): void {
    this.userData.ngOnInit();
    let userDataInfo = JSON.parse(this.userData.userDataString)
    this.perfilForm = this.fb.group({
      firstName: [userDataInfo.first_name, [Validators.required]],
      lastName: [userDataInfo.last_name, [Validators.required]],
      sedes: [userDataInfo.location, [Validators.required]],
      passw: [null, [Validators.required]],
      datePo: [userDataInfo.dob, [Validators.required]]

    });
    this.firstchar = String(this.perfilForm.get("firstName").value).charAt(0);
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
  }

  updateProfile() {
    let userData = {
      first_name: this.perfilForm.value.firstName,
      last_name: this.perfilForm.value.lastName,
      dob: this.perfilForm.value.sedes,
      pass: this.perfilForm.value.passw,
      location: this.perfilForm.value.datePo
    }
    this.apiService.PostData(`${this.configService.config.apiUrl}/api/Calendar`,).subscribe(
      (response) => {
        if (response != null || response != undefined) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario modificado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          
        }
      }
    );
  }

  onClickFadeInOut() {

  }

  onSubmit() {

  }

  cerrarSesion() {
    this.userData.deleteCookie()
    this.router.navigate(['/login'])
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

//#region swalalertmodificacion_usuario_error
//mensaje de alerta modificacion de usuario no modificada error 
   // Swal.fire({
  //         icon: 'error',
  //         title: 'Usuario no modificado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
//#endregion