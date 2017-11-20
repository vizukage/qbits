import { Component } from '@angular/core';
import { NavController ,App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { WelcomePage } from '../welcome/welcome';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public userDetails: any;

  constructor(public navCtrl: NavController,public app: App,public http: HttpClient, public loadingCtrl: LoadingController) {
  const data = JSON.parse(localStorage.getItem('userData'));
  console.log(data.mobile);
  this.userDetails=data;



  //  this.userDetails = data.username;
  //  console.log(this.userDetails);
  }

  presentLoadingDefault(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

                    setTimeout(() => {
                      loading.dismiss();
                    }, 1500);

  }

  logout(){

    //var body = {};
    this.presentLoadingDefault();

    this.http.post("https://auth.bethink79.hasura-app.io/v1/user/logout",{},{"headers":{
        "Authorization": "Bearer " + this.userDetails.auth_token
    }})
      .subscribe(data => {
        console.log("logged out");
        localStorage.clear();
        this.app.getRootNav().setRoot(WelcomePage);
      },error => {
        console.log(error);
      });

    //this.navCtrl.push(WelcomePage); this one persists the tabs.
  }
}
