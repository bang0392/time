/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

import 'zone.js';
import { environment } from './environments/environment';

const e2j_license = `${environment.e2j_license}`

registerLicense(e2j_license);

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
