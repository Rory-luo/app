import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Http2Service } from 'src/app/provider/http2.service';
import { APP_SERVE_URL } from 'src/app/provider/Constants';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @ViewChild('slide1', null) slide1: any;

  slidesOpts = {
    effect: 'flip',//轮播效果
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  public slidesList: any[] = [];

  constructor(
    public http: Http2Service,
  ) {
    this.showBannerImgs();
    // for (let i = 1; i <= 3; i++) {
    //   this.slidesList.push({
    //     pic: '/assets/images/banners/slides0' + i + '.png',
    //     url: '',
    //   });
    // }
  }

  ngOnInit() { }

  showBannerImgs() {
    this.http.get(APP_SERVE_URL + "api/apiUser/GetBannerImgs").pipe(map((res: any) => res.json())).subscribe(res => {
      console.log(res.data);
      this.slidesList = res.data;
    });
  }

  //手动滑动后轮播图不自动轮播的解决方法
  slideDidChange(){
    this.slide1.startAutoplay();
  }
    
}
