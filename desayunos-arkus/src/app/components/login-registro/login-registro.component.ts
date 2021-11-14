import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
  
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

  public fLogin: FormGroup;
  public fRegister: FormGroup;

  minDate: Date;
  maxDate: Date;
  
  selectedValue: string;
  sedes: Sede[] = [
    {value: 'mty', viewValue: 'Monterrey'},
    {value: 'gdl', viewValue: 'Guadalajara'},
    {value: 'col', viewValue: 'Colima'}
  ];

  constructor(private formBuilder: FormBuilder) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 75, 0, 1); //Fija el valor mínimo a 1 de Enero de hace 75 años
    this.maxDate = new Date(currentYear - 18, 11, 31); //Fija el valor máximo a 31 de Diciembre de hace 18 años

  }

  ngOnInit(): void {
    this.fLogin = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['',[Validators.required, Validators.minLength(8)]]
    });

    this.fRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8)]],
      sede: ['',[Validators.required]],
      dob: ['',[Validators.required]]
    })

  }
  sendLogin(): any{
    console.log(this.fLogin.value);
  }
  sendRegister(): any{
    console.log(this.fRegister.value);
  }
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
    return this.loginPassword.hasError('minLength') ? '' : 'Debe contener 8 caracteres';
  }
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
    return this.registerPassword.hasError('minLength') ? '' : 'Debe contener 8 caracteres';
  }
  confirmPasswordErrorMessage(){
    if (this.confirmPassword.hasError('required')) {
      return 'La contraseña debe confirmarse';
    }
    return this.confirmPassword.hasError('minLength') ? '' : 'Debe contener 8 caracteres';
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
