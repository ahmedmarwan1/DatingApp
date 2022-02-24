import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryComponent } from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user!: User   ;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private userservice: UserService,
     private alertify: AlertifyService,
     private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.user = data['user'];
      });

      // this.route.queryParams.subscribe( params => {
      //   this.memberTabs.tabs[params['tab']].active = true;
      // });

      this.galleryOptions = [
        {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
        }
      ];

      this.galleryImages = this.getImages();

  }

  getImages(){
    const imageUrls = [];
    for (let i =0; i< this.user.photos!.length ; i++){
      imageUrls.push({
        small:  this.user.photos![i].url,
        medium: this.user.photos![i].url ,
        big: this.user.photos![i].url ,
        description: this.user.photos![i].description
      });
    }
    return imageUrls;
  }
  
  SelectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

}
