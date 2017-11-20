import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  loading:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

    if(localStorage.getItem('userData')){
      this.navCtrl.setRoot(TabsPage)
    }
  }


    presentLoadingDefault(loading: LoadingController){

        this.loading.present();

                      setTimeout(() => {
                        this.loading.dismiss();
                      }, 500);

    }

  login(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      this.presentLoadingDefault(this.loading);
  this.navCtrl.push(LoginPage,{}, {animate: false});
  }

  signup(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      this.presentLoadingDefault(this.loading);
  this.navCtrl.push(SignupPage,{}, {animate: false});
  }

}
