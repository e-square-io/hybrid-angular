import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';

import { Component } from '@angular/core';
import { HybridModule } from '@phonecat-v2/hybrid';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'hb-old-app-container',
  template: '',
})
export class OldAppContainerComponent { }


const routes: Routes = [
  {
    path: 'phone-list-v2',
    loadChildren: () => import('@phonecat-v2/phone-list/features').then(m => m.PhoneListFeaturesModule)
  },
  {
    path: '',
    component: OldAppContainerComponent,
    data: { navState: 'main' },
  },
  {
    path: 'phones/:phoneId',
    component: OldAppContainerComponent,
    data: { navState: 'phone' },
  },
];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HybridModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
