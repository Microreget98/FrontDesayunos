import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { ConfigService } from 'src/app/core/config.service';
import Swal from 'sweetalert2';
import { UserDataService } from '../login-registro/user-data.service';
import {MatDialog} from '@angular/material/dialog';
import { FotopComponent } from '../fotop/fotop.component';
import { DomSanitizer } from '@angular/platform-browser';


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
    this.isAdmin=this.userData.getUserType();
    let userDataInfo = JSON.parse(this.userData.userDataString)
    this.perfilForm = this.fb.group({
      firstName: [userDataInfo.first_name, [Validators.required,Validators.pattern('^[a-zñ A-ZÑ]+$')]],
      lastName: [userDataInfo.last_name, [Validators.required,Validators.pattern('^[a-zñ A-ZÑ]+$')]],
      sedes: [userDataInfo.location, [Validators.required]],
      passw: [null],
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

  openarch(): void{
    const dialogRef = this.dialog.open(FotopComponent,{});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  imgperfil(event): any {
      const imagenrecibida = event.target.files[0]
      this.extraerBase64(imagenrecibida).then((imagen: any) => {
      this.image = imagen.base;
      console.log(imagen);

      })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }catch (e){
      return null;
    }
  })
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
