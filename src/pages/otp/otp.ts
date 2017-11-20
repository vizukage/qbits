import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  responseData : any;
  otpData = {"mobile": "","country_code": "91","otp": ""};
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }




  otp(){
      this.presentLoadingDefault();
      this.otpData.mobile = this.navParams.get('param1');
      let newparam = this.navParams.get('param2');
       this.authService.verifyOtp(this.otpData).then((result) => {
        this.responseData = result;
        if(this.responseData.message == "success"){
          console.log(this.responseData.message);
          this.navCtrl.push(ProfilePage, {
            param3: newparam
          });
        }
        else
        {
          console.log("Otp verification failed");
          console.log(this.responseData.message);
        }

      }, (err) => {
        // Error log
      });

    }


}
