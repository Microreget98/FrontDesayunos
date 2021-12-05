import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators  } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from 'src/app/core/config.service';
import Swal from 'sweetalert2';
import { UserDataService } from '../login-registro/user-data.service';
import { MatDialog } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  hide: boolean = true;
  disprop: boolean = true;
  fnameandlas: boolean = true;
  showFiller = false;

  perfilForm = new FormGroup({})
  isAdmin = false;

  firstchar: string = "";
  public image: string;
  public archivos: any = []

  //Valida Todo Los inputs
  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private userData: UserDataService,
    private router: Router,
    private apiService: ApiService,
    private configService: ConfigService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log(this.isAdmin)
    this.userData.ngOnInit();
    this.isAdmin = this.userData.getUserType();
    let userDataInfo = JSON.parse(this.userData.userDataString)
    this.perfilForm = this.fb.group({
      firstName: [userDataInfo.first_name, [Validators.required, Validators.pattern('^[a-zñ A-ZÑ]+$')]],
      lastName: [userDataInfo.last_name, [Validators.required, Validators.pattern('^[a-zñ A-ZÑ]+$')]],
      sedes: [userDataInfo.location, [Validators.required]],
      passw: ['',[Validators.minLength(8),Validators.maxLength(16)]],
      datePo: [userDataInfo.dob, [Validators.required]]
    });

    this.firstchar = String(this.perfilForm.get("firstName").value).charAt(0);
    for (const iterator of Object.keys(this.perfilForm.controls)) {
      this.perfilForm.get(`${iterator}`).disable();
    }
  }

  updateProfile() {
    let userDataInfo = JSON.parse(this.userData.userDataString);
    let userData = {
      id_user: userDataInfo.id_user,
      id_user_type: userDataInfo.id_user_type,
      email: userDataInfo.email,
      is_active: userDataInfo.is_active,
      first_name: this.perfilForm.value.firstName,
      last_name: this.perfilForm.value.lastName,
      dob: this.perfilForm.value.datePo,
      pass: this.perfilForm.value.passw,
      location: this.perfilForm.value.sedes
    }
    this.apiService.PutData(`${this.configService.config.apiUrl}/api/users/${userDataInfo.id_user}`, userData).subscribe(
      (response) => {
        if (response != null || response != undefined) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario modificado con exito',
            showConfirmButton: false
          })
        }
        else {

        }
      }
    );
  }

  vistaEn() {
    this.router.navigate(['/vistausuarios'])
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
  registerLastNameErrorMessage(){
    if (this.lastName.hasError('required')) {
      return 'Tu Nombre es requerido';
    }
    return this.lastName.hasError('pattern') ? 'Solo se permiten letras' : '';
  }
  registerFirstNameErrorMessage(){
    if (this.firstName.hasError('required')) {
      return 'Tu Nombre es requerido';
    }
    return this.firstName.hasError('pattern') ? 'Solo se permiten letras' : '';
  }
  registerPasswordErrorMessage() {
    if (this.passw.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return this.passw.hasError('minLength', 'maxLength') ? '' : 'Debe contener 8-16 caracteres';
    // return this.registerPassword.hasError('minLength', 'maxLength') ? '' : `Debe contener 8-16 caracteres - carcteres actuales ${this.registerPassword.errors?.maxlength.actualLength}`;
  }
  get lastName() { return this.perfilForm.get('lastName'); }
  get firstName() { return this.perfilForm.get('firstName'); }
  get passw() { return this.perfilForm.get('passw'); }
}
