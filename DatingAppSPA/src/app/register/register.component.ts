import { Router } from '@angular/router';
import { User } from './../_models/User';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user! : User ;
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(private authservice: AuthService,
    private alerttfy: AlertifyService,
     private fb: FormBuilder,
     private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: "theme-red"
    };
   this.craeteRegisterForm();
   this.registerForm.setValidators(this.passwordValidatore);
  }

  craeteRegisterForm()
  {
      this.registerForm = this.fb.group({
        gender: ['male'],
        username: ['',Validators.required],
        knownAs: ['',Validators.required],
        dateOfBirth: [null,Validators.required],
        city: ['',Validators.required],
        country: ['',Validators.required],
        password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
        confirmPassword: ['',Validators.required]
      });
  }

   register(){
     if(this.registerForm.valid){
       this.user = Object.assign({},this.registerForm.value);
       this.authservice.Regsiter(this.user).subscribe(()=>{
         this.alerttfy.success('Register Successfully');
       }, error => {
         this.alerttfy.error(error);
       }, ()=>{
         this.authservice.login(this.user).subscribe(()=>{
           this.router.navigate(['/members']);
         });
       });
     }
   
  };

   cancel(){
    this.cancelRegister.emit(false);
  };

  passwordValidatore(g: FormGroup)
  {
      return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {'mismatch' : true}  ;
  }

 

}
