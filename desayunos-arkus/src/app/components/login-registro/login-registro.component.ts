import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_CHECKBOX_REQUIRED_VALIDATOR } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../core/api.service'
import { ConfigService } from '../../core/config.service';
import { UserDataService } from './user-data.service';

interface Sede{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss']
})
export class LoginRegistroComponent implements OnInit {

  hide = true;

  titularAlerta:string='';
  public fLogin: FormGroup;
  public fRegister: FormGroup;

  minDate: Date;
  maxDate: Date;
  
  selectedValue: string;
  sedes: Sede[] = [
    {value: 'mty', viewValue: 'Monterrey'},
    // {value: 'gdl', viewValue: 'Tijuana'},
    // {value: 'col', viewValue: 'Colima'}
  ];

  constructor(private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private configService: ConfigService,
    private userData: UserDataService,
    private router: Router,) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 75, 0, 1); //Fija el valor mínimo a 1 de Enero de hace 75 años
    this.maxDate = new Date(currentYear - 18, 11, 31); //Fija el valor máximo a 31 de Diciembre de hace 18 años

  }

  cookieSession(){
    this.userData.setCookie();
  }

  ngOnInit(): void {
    this.fLogin = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });

    this.fRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['',[Validators.required]],
      sede: ['',[Validators.required]],
      dob: ['',[Validators.required]]
    },
    {
      validators : this.mustMatch('registerPassword','confirmPassword')
    })
  }

  sendLogin(): any{
    let userData:object = {
      email:this.fLogin.get('loginEmail').value,
      pass: this.fLogin.get('loginPassword').value
    }
    this.apiService.GetDataWBody(`${this.configService.config.apiUrl}/api/login`, {...userData}).subscribe(
      (response: object) => {
          if (response){
          this.userData.addUserInfo(response)
          this.userData.setCookie()
          this.router.navigate(['/home'])
          //Mensaje una vez logeado exitosamente
          Swal.fire({
            icon: 'success',
            title: 'Buenos dìas',
            text: 'Bienvenido'
          })
        }
      },
      (error: object) => {
        Swal.fire({
          icon: 'error',
          title: "Tu usuario o contraseña son incorrectos",
          text: "Favor de verificarlos"
        })
      }
    )
  }
  
  sendRegister(): any{
    this.fRegister.controls['name'].setValue(this.normalize(this.fRegister.value.name))
    this.fRegister.controls['lastName'].setValue(this.normalize(this.fRegister.value.lastName))
    let userData = {
      id_user_type: 2,
      first_name: this.fRegister.value.name,
      last_name:  this.fRegister.value.lastName,
      dob: this.fRegister.value.dob,
      email: this.fRegister.value.registerEmail,
      pass: this.fRegister.value.registerPassword,
      location: this.fRegister.value.sede,
      is_active: true
      
    }
    this.apiService.PostData(`${this.configService.config.apiUrl}/api/users`, {...userData}).subscribe(
      (response) => {
        //Mensaje existoso al REGISTRARSE 
        Swal.fire({
          title: 'Registrado con éxito',
          icon: 'success',
          timer: 1500,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      },
      (err) => {
        // ERROR QUE VIENE DESDE BASE DE DATOS
        err.error,
        //Mensaje de error al intentar REGISTRARSE
        Swal.fire({
          icon: 'error',
          title: 'Datos incorrectos',
          text: 'Favor de revisar los datos introducidos, recuerda que el correo debe de ser de un dominio de arkus'
        })
      }
    )
  }
  normalize(str:string):string{
    let normstr = str.split(' ');
    for (const iterator of normstr) {
      normstr[normstr.indexOf(iterator)] = iterator.charAt(0).toUpperCase() + iterator.slice(1).toLowerCase()
    }
    str = '';
    for(const iterator of normstr){
      str += iterator;
      str += ' ';
    }
    try {
      str = str.trim();
    } catch (error) { }
    return str
  }
  // inicia campos login
  loginEmailErrorMessage(){
    if (this.loginEmail.hasError('required')) {
      return 'El correo es requerido';
    }
    return this.loginEmail.hasError('email') ? 'El correo no es válido' : '';
  }
  loginPasswordErrorMessage(){
    if (this.loginPassword.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return this.loginPassword.hasError('minLength', 'maxLength') ? '' : 'Debe contener 8-16 caracteres';
  }
  // termina campos login
  // inicia campos registro
  registerNameErrorMessage(){
    if(this.name.hasError('required')) {
      return 'Tu Nombre es requerido';
    }
    return '';
  }
  registerLastnameErrorMessage(){
    if(this.lastName.hasError('required')) {
      return 'Tu Apellido es requerido';
    }
    return '';
  }
  registerDobErrorMessage(){
    if(this.dob.hasError('required')) {
      return 'Selecciona tu fecha de Nacimiento';
    }
    return '';
  }
  registerSedeErrorMessage(){
    if(this.dob.hasError('required')) {
      return 'Selecciona tu Sede';
    }
    return '';
  }
  registerEmailErrorMessage(){
    if (this.registerEmail.hasError('required')) {
      return 'El correo es requerido';
    }
    return this.registerEmail.hasError('email') ? 'El correo no es válido' : '';
  }
  registerPasswordErrorMessage(){
    if (this.registerPassword.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return this.registerPassword.hasError('minLength', 'maxLength') ? '' : 'Debe contener 8-16 caracteres';
  }
  confirmPasswordErrorMessage(){
    if (this.confirmPassword.hasError('required')) {
      return 'La contraseña debe confirmarse';
    }
    return '';
  }
  // termina campos registro
  mustMatch(password: string, confirmation: string){
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[password];
      const conf = formGroup.controls[confirmation];
      if(conf.errors && !conf.errors.mustMatch){
        return
      }
      if(pass.value === conf.value){
        return conf.setErrors({mustMatch:null});
      }
      else{
        conf.setErrors({mustMatch:true});
      }
    }
  }
  get loginEmail() { return this.fLogin.get('loginEmail');}
  get loginPassword() { return this.fLogin.get('loginPassword');}
  get name() { return this.fRegister.get('name');}
  get lastName() { return this.fRegister.get('lastName');}
  get dob() { return this.fRegister.get('dob');}
  get sede() { return this.fRegister.get('sede');}
  get registerEmail() { return this.fRegister.get('registerEmail');}
  get registerPassword() { return this.fRegister.get('registerPassword');}
  get confirmPassword() { return this.fRegister.get('confirmPassword');}
}