import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string) {
    Notify.success(message, {
      cssAnimationDuration: 1000
    })
  }

  error(message: string) {
    Notify.failure(message, {
      cssAnimationDuration: 1000
    })
  }

  start_loading(message?: string) {
    Loading.dots(message, {
      svgColor: '#2B1C12',
      backgroundColor: '#FFFFFF'
    });
  }

  end_loading(delay: number = 2000) {
    Loading.remove(delay);
  }
}
