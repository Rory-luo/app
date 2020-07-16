import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, Events, Platform } from '@ionic/angular';



@Component({
  selector: 'app-worktab',
  templateUrl: './worktab.page.html',
  styleUrls: ['./worktab.page.scss'],
})
export class WorktabPage implements OnInit {

  constructor(
    public nav: NavController,
  ) {}

  ngOnInit() {}

  gotoRizhi(){
    this.nav.navigateRoot(['rizhi']);
  }

  gotoRizhi2(){
    this.nav.navigateRoot(['rizhi2']);
  }

  gotoRizhi3(){
    this.nav.navigateRoot(['rizhi3']);
  }

  goXiangce(){
    this.nav.navigateRoot(['xiangce']);

  }

  gotoLogin(){
    this.nav.navigateRoot(['login']);
  }

  gotoPopover(){

    this.nav.navigateRoot(['popover']);
  }
}
