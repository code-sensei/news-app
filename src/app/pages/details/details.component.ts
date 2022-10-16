import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  article: any = {};
  current_user: any = null; 

  constructor(
    private router: Router,
    private auth: AuthService,
    private bookmark: BookmarkService,
    private notification: NotificationService
  ) {
    this.article = this.router.getCurrentNavigation()?.extras.state;
    this.auth.current_user?.subscribe((result) => {
      // console.log('User', result);
      this.current_user = {
        uid: result?.uid
      };
    });
  }

  bookmark_article() {
    try {
      this.bookmark.bookmark_article(this.article)
      .then((result) => {
        if (result) {
          this.bookmark.update_bookmark(String(result?.key));
          this.notification.success('Article Bookmarked');
        } else {
          this.notification.error('Unable to bookmark');
        }
      })
      .catch((error: Error) => {
        console.log('Bookmark Error', error.message);
        this.notification.error(error.message);
      });
    } catch (error: any) {
      console.log('Bookmark Error', error.message);
    }
  }

  ngOnInit(): void {
    // console.log(history.state);
    this.article = history.state;
  }

}
