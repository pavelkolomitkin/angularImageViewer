import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotoModel} from './models/photo.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {PhotoProviderService} from './services/photo-provider.service';
import {environment} from '../environments/environment';
import {PhotoLoadStateEnum} from './models/photo-load-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  photoSubscription: Subscription = null;
  loadingState = PhotoLoadStateEnum.READY;

  currentLoadingPhotoOffset: number = 0;
  photos: Array<PhotoModel> = [];

  constructor(private photoProvider: PhotoProviderService) { }

  ngOnInit() {
      this.loadPhotos(environment.PHOTO_LIST_PAGE_SIZE, this.currentLoadingPhotoOffset);
  }

  ngOnDestroy() {
    this.cleanSubscription();
  }

  loadPhotos(limit: number, offset: number)
  {
    this.cleanSubscription();

    this.loadingState = PhotoLoadStateEnum.LOADING;
    this.photoSubscription = this.photoProvider.getImages(limit, offset)
        .subscribe((list: Array<PhotoModel>) => {

          this.currentLoadingPhotoOffset += list.length;
          this.photos = this.photos.concat(list);

          if (list.length < environment.PHOTO_LIST_PAGE_SIZE)
          {
            this.loadingState = PhotoLoadStateEnum.NO_MORE;
          }
          else
          {
              this.loadingState = PhotoLoadStateEnum.READY;
          }
        });
  }

  cleanSubscription()
  {
    if (this.photoSubscription !== null)
    {
      this.photoSubscription.unsubscribe();
      this.photoSubscription = null;
    }
  }

  onInitLoadingHandler()
  {
    this.loadPhotos(environment.PHOTO_LIST_PAGE_SIZE, this.currentLoadingPhotoOffset);
  }
}
