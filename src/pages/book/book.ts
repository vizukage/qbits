import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {

  public userInfo: any;

  bookData={
    "dept":"","date":"","doc_id":""

  };
  docList:any;
  loading:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,private NgZone: NgZone,private viewCtrl: ViewController, public loadingCtrl: LoadingController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userInfo=data;
    //this.NgZone.run(()=>{this.docList = data});

  }

  presentLoadingDefault(loading: LoadingController){
      this.loading.present();
  }

  dismissLoadingDefault(loading: LoadingController){
    this.loading.dismiss();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }


  docSelect(){

    this.loading = this.loadingCtrl.create({
      content: 'Fetching Data...'
    });

  //  this.NgZone.run(()=>{
      //this.NgZone.run(()=>{
      //this.presentLoadingDefault(this.loading);
        let authtocken ="Bearer " + this.userInfo.auth_token;
        var body = {
              "type": "select",
              "args": {
                  "table": "doctor",
                  "columns": ["doc_id","name"],
                  "where": {
                      "dept": this.bookData.dept
            }
        }
      };
      this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(body), {"headers":{
        "Content-Type": "application/json",
          "Authorization": authtocken
      }})
        .subscribe(data => {
          console.log(data);
          this.NgZone.run(()=>{this.docList = data;});


        },error => {
          console.log(error);
        },
      ()=>{
        this.dismissLoadingDefault(this.loading);
      });
      //});
  //  });


};



  book(){
    this.loading = this.loadingCtrl.create({
      content: 'Fetching Data...'
    });
    this.presentLoadingDefault(this.loading);
    let authtocken ="Bearer " + this.userInfo.auth_token;
    var body = {
        "type": "insert",
        "args": {
            "table": "appointments",
            "objects": [{
              "patient_id":this.userInfo.hasura_id,
              "dept":this.bookData.dept,
              "date":this.bookData.date,
              "doc_id":this.bookData.doc_id

            }]
        }
    };

    this.http.post("https://data.bethink79.hasura-app.io/v1/query",JSON.stringify(body), {"headers":{
      "Content-Type": "application/json",
        "Authorization": authtocken
    }})
      .subscribe(data => {
        this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
            let index = this.viewCtrl.index;
            this.navCtrl.remove(index);
          })

      },error => {
        console.log(error);
      },
    ()=>{
      this.dismissLoadingDefault(this.loading);
    });

  }

}
