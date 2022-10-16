import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  @Input('headline') headline: any = [];
  @Output('open') open = new EventEmitter();

  constructor() { }

  open_article() {
    this.open.emit(this.headline);
  }

  ngOnInit(): void {
  }

}
