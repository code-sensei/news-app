import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private current_user: any;
  private bookmarks_ref: string = 'bookmarks'
  private users_ref: string = 'users'

  constructor(
    private database: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.auth.current_user?.subscribe((result) => {
      this.current_user = result;
    });
  }

  bookmark_article(article: any) {
    return this.database.database
      .ref(`${this.bookmarks_ref}/${this.current_user.uid}`)
      .push({
        ...article,
        navigationId: null
      });
  }

  update_bookmark(ref: string) {
    return this.database.database
      .ref(`${this.bookmarks_ref}/${this.current_user.uid}`)
      .child(ref)
      .update({
        id: ref
      })
  }

  delete_bookmark(ref: string) {
    return this.database.database
      .ref(`${this.bookmarks_ref}/${this.current_user.uid}`)
      .child(ref)
      .remove()
  }

  get_user_bookmarked_articles() {
    return this.database.database
      .ref(`${this.bookmarks_ref}/${this.current_user?.uid}`)
      // .child(this.bookmarks_ref);
  }

  add_ref_to_user(ref: string) {
    return this.database.database
      .ref(`${this.users_ref}/${this.current_user?.uid}`)
      .child(this.bookmarks_ref)
      .push(ref);
  }

}
