import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  get config() {
    return this.appConfig;
  }

  private appConfig!: Config;

  constructor(private injector: Injector) { 
  }

  loadAppConfig() {
    const httpClient = this.injector.get(HttpClient);

    return httpClient.get('./assets/configuration/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data as Config;
      })
      .catch(error => {
        const errorMessage = 'Could not load config.json!  Please check the config.json file had exist and valid.';
        console.error(errorMessage);
        alert(errorMessage);
        throw error;
      });
  }
}