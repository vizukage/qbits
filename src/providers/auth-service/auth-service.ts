import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = "https://auth.bethink79.hasura-app.io/v1/";
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type) {
      return new Promise((resolve, reject) => {




        let body = {
            "provider": "mobile-password",
            "data": {
              "mobile":credentials.mobile,
              "country_code": "91",
              "password": credentials.password
                }
              };

        console.log(JSON.stringify(body));

        this.http.post(apiUrl+type, JSON.stringify(body), {"headers":{
          "Content-Type": "application/json",
        }})
          .map(response => response)
          .subscribe(response => {
            resolve(response);
          }, (err) => {
            reject(err);
          });

      });

    }

  verifyOtp(verifydata){
    return new Promise((resolve, reject) => {

      let otpUrl = "https://auth.bethink79.hasura-app.io/v1/providers/mobile-password/verify-otp";




      let body = {

            "mobile":verifydata.mobile,
            "country_code": "91",
            "otp": verifydata.otp
            };

      console.log(JSON.stringify(body));

      this.http.post(otpUrl, JSON.stringify(body), {"headers":{
        "Content-Type": "application/json",
      }})
        .map(response => response)
        .subscribe(response => {
          resolve(response);
        }, (err) => {
          reject(err);
        });

    });

  }
}
