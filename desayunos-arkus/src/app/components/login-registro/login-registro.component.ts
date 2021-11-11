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
  
  selectedValue: string;
  sedes: Sede[] = [
    {value: 'mty', viewValue: 'Monterrey'},
    {value: 'gdl', viewValue: 'Guadalajara'},
    {value: 'col', viewValue: 'Colima'}
  ];

  constructor(private formBuilder: FormBuilder) { }

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
  get registerEmail() { return this.fRegister.get('registerEmail');}
  get registerPassword() { return this.fRegister.get('registerPassword');}
  get confirmPassword() { return this.fRegister.get('confirmPassword');}
}
