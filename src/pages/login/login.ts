import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData = {"mobile": "","password": ""};

  constructor(public navCtrl: NavController,public navParams: NavParams, public authService: AuthServiceProvider, private toastCtrl:ToastController, public loadingCtrl: LoadingController) {
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
      this.presentLoadingDefault();
   if(this.userData.mobile && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
      console.log('loggedd inn');
    this.responseData=JSON.stringify(result);
    console.log(this.responseData);
    if(this.responseData){
     localStorage.setItem("userData",this.responseData )
    this.navCtrl.push(TabsPage, {}, {animate: false});
  }
  else{
    this.presentToast("Please give valid mobile number and password");
  }



    }, (err) => {
      //Connection failed message
    });
   }
   else{
    this.presentToast("Give Mobile number and password");
   }

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}


/*




*/
