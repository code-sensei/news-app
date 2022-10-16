import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  top_headlines: any = [];
  all_articles: any = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private notification: NotificationService
  ) {
  }

  open_article(article: any) {
    this.router.navigateByUrl('/details', {
      state: article
    })
  }

  get_top_headlines() {
    try {
      this.api.get_top_headlines().subscribe((result: any) => {
        // console.log('Get Top Headlines', result);
        if (result.status === "ok") {
          result.articles.forEach((article: any) => {
            if (this.top_headlines.length < 5) {
              this.top_headlines.push(article);
            }
          });
          // this.notification.success('Headlines retrieved');
        } else {
          // show error
          this.notification.error('Unable to retrieve headlines');
        }
      }) 
    } catch (error: any) {
      console.log('Error', error);
      this.notification.error(error?.message);
    }
  }

  get_all_articles() {
    try {
      this.api.get_all_articles().subscribe((result: any) => {
        // console.log('Get All Articles', result);
        if (result.status === "ok") {
          result.articles.forEach((article: any) => {
            if (this.all_articles.length < 15) {
              this.all_articles.push(article);
            }
          });
          // this.notification.success('Articles retrieved');
        } else {
          // show error
          this.notification.error('Unable to retrieve articles');
        }
      }) 
    } catch (error: any) {
      console.log('Error', error);
      this.notification.error(error?.message);
    }
  }

  async ngOnInit() {
    this.notification.start_loading();
    await this.get_top_headlines();
    await this.get_all_articles();
    this.notification.end_loading();
  }

}
