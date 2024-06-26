import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris','Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],[this.forbiddenEmails.bind(this)])
        }),
      'gender': new FormControl('male'),
      'hobbies':new FormArray([])
    });
    /*this.signupForm.valueChanges.subscribe((value) =>{
      console.log(value);
    });*/
    this.signupForm.statusChanges.subscribe((status) =>{
      console.log(status);
    });
    this.signupForm.patchValue({
      'userData': {
        'username':'Bren'
      },
      'gender': 'male',
      'hobbies':[]
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(formControl);
  }

  getHobbyControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl):{[s:string]: boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() =>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }

}
