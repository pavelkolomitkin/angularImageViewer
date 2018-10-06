import {Component, EmbeddedViewRef, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {PhotoModel} from './models/photo.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {PhotoProviderService} from './services/photo-provider.service';
import {environment} from '../environments/environment';
import {PhotoLoadStateEnum} from './models/photo-load-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('modalWindowTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild('modalContainer', {read: ViewContainerRef}) modalContainer: ViewContainerRef;
  openedModalWindow: EmbeddedViewRef<any> = null;

  photoSubscription: Subscription = null;
  loadingState = PhotoLoadStateEnum.READY;

  currentLoadingPhotoOffset: number = 0;
  photos: Array<PhotoModel> = [];
  selectedPhoto: PhotoModel;

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

  onSelectPhotoHandler(photo: PhotoModel)
  {
      this.selectedPhoto = photo;
      this.openedModalWindow = this.modalContainer.createEmbeddedView(this.modalTemplate);
  }

  onModalCloseHandler()
  {
      if (this.openedModalWindow !== null)
      {
          this.openedModalWindow.destroy();
          this.openedModalWindow = null;
      }
  }

  @HostListener('window:keyup', ['$event']) onPageEscape($event: KeyboardEvent)
  {
      if ($event.code === 'Escape')
      {
          this.onModalCloseHandler();
      }
  }
}
