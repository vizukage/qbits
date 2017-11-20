import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  private userInfo: any;
  appData: any;
  viewData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userInfo=data;
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
    console.log('ionViewDidLoad ViewPage');
  }

  ionViewWillEnter() {

    this.presentLoadingDefault();

    let newauth ="Bearer " + this.userInfo.auth_token;

    var body = {
              "type": "select",
              "args": {
                  "table": "appointments",
                  "columns": ["app_id","dept","date","doc_id"],
                  "where": {"patient_id": this.userInfo.hasura_id},
                  "order_by": [{"column": "date","order": "asc"}]
                      }
              };





    this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(body), {"headers":{
      "Content-Type": "application/json",
        "Authorization": newauth
    }})
      .subscribe(data => {
        console.log(data);
        this.appData = data;
        //fetch doctor names
        var ids = this.appData.map( a => a.doc_id);
        console.log(ids);
            var newbody = {
                "type": "select",
                "args": {
                  "table": "doctor",
                  "columns": ["doc_id","name"],
                  "where": {"doc_id": {"$in": ids}}
                    }
                  };
            this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(newbody), {"headers":{
              "Content-Type": "application/json",
                "Authorization": newauth
            }})
            .subscribe(res => {
                this.viewData=res;
              console.log(this.viewData);
              console.log("debug");
              console.log(this.appData);
                for(var i in this.appData){
                  for(var j in this.viewData){
                    if(this.appData[i].doc_id == this.viewData[j].doc_id)
                          this.appData[i].name = this.viewData[j].name;
                  }
                };

            });

      },error => {
        console.log(error);
      });
  }

  cancel(appid){
    //var comp = this.navCtrl.getActive().instance;

    let authtocken ="Bearer " + this.userInfo.auth_token;
    var body = {
      "type": "delete",
    "args": {
        "table": "appointments",
        "where": {"app_id": appid}
          }
        };
        this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(body), {"headers":{
          "Content-Type": "application/json",
            "Authorization": authtocken
        }})
          .subscribe(data => {
            console.log(data);
            this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
   let index = this.viewCtrl.index;
   this.navCtrl.remove(index);
})

          },error => {
            console.log(error);
          });




  }



}
