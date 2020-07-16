import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { PopComponentComponent } from './pop-component/pop-component.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopComponentComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();

    // const { data } = await popover.onDidDismiss();
    // console.log(data);
  }

}
