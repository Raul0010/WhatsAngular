import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { ErrorService } from '../../../core/services/error.service';
import { MatSnackBar } from '@angular/material';
import { StorageKeys } from '../../../storage-keys';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  configs = {
    isLogin: true,
    actionText: 'Sign In',
    buttonActionText: 'Criar conta',
    isLoading: false
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  private alive = true

  @HostBinding('class.app-login-spinner') private applySpinnerClass = true;

  constructor( 
    private errorService: ErrorService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar ) {
    authService.init();
  }

  ngOnInit() {
    this.createForm();

    const userData = this.authService.getRememberMe();

    if (userData) {
      this.email.setValue(userData.email);
      this.password.setValue(userData.password);
    }
  }

  createForm():void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onKeepSigned(): void {
    this.authService.toggleKeepSigned();
  }

  onRememberMe(): void {
    this.authService.toggleRememberMe();
  }

  onSubmit(): void{
    console.log(this.loginForm.value);

    this.configs.isLoading = true;

    const operation =
      (this.configs.isLogin)
        ? this.authService.SignInUser(this.loginForm.value)
        : this.authService.SignUpUser(this.loginForm.value);

    operation
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe( 
        res => {
          this.authService.setRememberMe(this.loginForm.value);
          const redirect: string = this.authService.redirectURL || '/dashboard';
          console.log('redirecionando...', redirect);
          this.router.navigate([redirect]);
          this.authService.redirectURL = null;
          this.configs.isLoading = false
        },
        err => { 
          console.log(err)
          this.configs.isLoading = false
          this.snackBar.open(this.errorService.getErrorMessage(err), 'Done', {duration: 5000, verticalPosition: 'top'});
         },
        () => console.log('Observable completado!')
      );

  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin
    this.configs.actionText = !this.configs.isLogin ? 'Sign Up' : 'Sign In';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Já possui conta' : 'Cria conta';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

  get name(): FormControl { return <FormControl>this.loginForm.get('name') }
  get email(): FormControl { return <FormControl>this.loginForm.get('email') }
  get password(): FormControl { return <FormControl>this.loginForm.get('password') }


  ngOnDestroy(): void{
    this.alive = false;
  }

}
