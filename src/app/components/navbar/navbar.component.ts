import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('page') page: string = "";
  @Output('bookmark') bookmark = new EventEmitter();
  protected title: string  = "";

  constructor(
    protected router: Router
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.title = this.router.url.split('/')[1].toUpperCase();
        // console.log('T', this.title)
      }
    })
  }

  go_back() {
    history.back();
  }

  to_bookmarks() {
    this.router.navigateByUrl('/bookmarks');
  }

  bookmark_article() {
    this.bookmark.emit();
  }

  ngOnInit(): void {
  }

}
