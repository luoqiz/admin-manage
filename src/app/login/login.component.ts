import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const paramData = {
        'grant_type': 'password',
        'username': this.validateForm.value.userName,
        'password': this.validateForm.value.password,
        'scope': 'all'
      };
      // const url = '/oauth/token';
      // this.http.post(url, {}, {
      //   params: paramData
      // }).subscribe((result: any) => {
      //   sessionStorage.setItem('token', result['access_token']);
      //   // this.message.info(result);
      //   console.log(result);
      //   // console.log('跳过登录.');
      //   this.router.navigate(['/home']);
      // });

      console.log('跳过登录.');
      this.router.navigate(['/home']);
    }

  }

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['18141916702', [Validators.required]],
      password: ['#EDC4rfv', [Validators.required]],
      remember: [true]
    });
    // this.message.warning('用户名和密码随意输入，但是不能为空！！！');
  }


}
