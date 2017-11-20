import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { WelcomePage } from '../welcome/welcome';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

profileData={ "id":"", "fullname":"", "gender":"", "dob":"", "place":"","blood":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public loadingCtrl: LoadingController) {
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
    console.log('ionViewDidLoad ProfilePage');
  }

  submit(){
    this.presentLoadingDefault();
    this.profileData.id = this.navParams.get('param3');

    var body={
      "type": "insert",
      "args": {
        "table": "profile",
        "objects": [{
          "id" : this.profileData.id,
          "fullname" : this.profileData.fullname,
          "gender" : this.profileData.gender,
          "dob" : this.profileData.dob,
          "place" : this.profileData.place,
          "blood" : this.profileData.blood
        }]
     }
   };

    this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(body), {"headers":{
      "Content-Type": "application/json",
        "Authorization": "Bearer b6a7ff13d1143b8dacf6aba0ae06af21268eb74997bfed6b"
    }})
      .subscribe(data => {

        this.navCtrl.push(WelcomePage);
      },error => {
        console.log(error);
      });
  }


}
