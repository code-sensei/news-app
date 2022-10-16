import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  bookmarks: any = [];

  constructor(
    private bookmark: BookmarkService,
    private router: Router,
    private notification: NotificationService
  ) { }

  get_bookmarks() {
    try {
      this.bookmark.get_user_bookmarked_articles()
      .on('value', (snapshot) => {
        let bookmarks: any = snapshot.val();
        if (bookmarks && Object.keys(bookmarks).length > 0) {
          for (const key in bookmarks) {
            if (Object.prototype.hasOwnProperty.call(bookmarks, key)) {
              const bookmark = bookmarks[key];
              if (bookmark) {
                this.bookmarks.push({
                  ...bookmark,
                  ref: bookmark.ref ? bookmark.ref : key
                })
              }
            }
          }
          this.notification.success('Bookmarks retrieved');
        } else {
          this.bookmarks = [];
          this.notification.success('No bookmarks found');
        }
        // console.log('Bookmarks', snapshot.val());
      });
    } catch (error) {
      console.log('Get Bookmarks Error', error);
    }
  }

  open_bookmark(bookmark: any) {
    this.router.navigateByUrl('/details', {
      state: bookmark
    })
  }

  delete_bookmark(e: { ref: string }) {
    try {
      this.bookmark.delete_bookmark(e.ref)
      .then((result) => {
        // console.log('Delete Res', result);
        if (result == undefined || !result) {
          this.notification.success('Bookmark removed');
        }
      }).catch((error: Error) => {
        this.notification.error(error.message);
      })
    } catch (error) {
      console.log('Delete Bookmark Error', error);
    }
  }

  async ngOnInit() {
    this.notification.start_loading();
    await this.get_bookmarks();
    this.notification.end_loading(700);
  }

}
