import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input('article') article: any;
  @Input('canDelete') canDelete: boolean = false;
  @Output('open') open = new EventEmitter();
  @Output('delete') delete = new EventEmitter();

  constructor() { }

  open_article() {
    this.open.emit();
  }

  delete_bookmark(bookmark: any) {
    this.delete.emit({ ref: bookmark.ref })
  }

  ngOnInit(): void {
  }

}
