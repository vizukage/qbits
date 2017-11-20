import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OtpPage } from '../otp/otp';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  userData = {"mobile": "","password": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, public loadingCtrl: LoadingController) {
  }

  presentLoadingDefault(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

                    setTimeout(() => {
                      loading.dismiss();
                    }, 3000);

  }

  signup(){
      this.presentLoadingDefault();
       this.authService.postData(this.userData,'signup').then((result) => {
        this.responseData = result;
        //console.log(this.responseData);
        //localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(OtpPage, {
	param1: this.userData.mobile, param2: this.responseData.hasura_id});
      }, (err) => {
        // Error log
      });

    }

    login(){
      //Login page link
      this.navCtrl.push(LoginPage);
    }
  }
