import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accontService: AccountService,
    private titleService: Title
  ) {this.titleService.setTitle('Profile'); //ชื่อตรงหัวแท็ป
 }

  ngOnInit() {
    const {firstName,lastName} = this.accontService.account
    const v = [Validators.required, Validators.minLength(3)]
    this.form = this.fb.group({
      firstName: [firstName, v],
      lastName: [lastName, [...v, Validators.maxLength(10)]] //... จุดสามจุด แค่เอาอันนั้นออกจาก array อีกชุดนึ่ง
    });
  }

  onSubmit(form: FormGroup){
    if(form.valid){
      const {firstName, lastName} = form.value;
      // console.log(form)
      // alert('You input firstname is '+ firstName +' and lastname is '+lastName);
      const accont = new Account(firstName, lastName);
      this.accontService.account = accont;
    } else{
        alert('Please input firstname or lastname');
      }
  }
}

