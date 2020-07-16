import { Component } from '@angular/core';
import { NavController, LoadingController, Events, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public nav: NavController,
  ) {}

  gotoRizhi(){
    this.nav.navigateRoot(['rizhi']);
  }
}
