import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PhotoModel} from '../../models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  @Input() photos: Array<PhotoModel> = [];

  @Output('select') select: EventEmitter<PhotoModel> = new EventEmitter<PhotoModel>();

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onSelectPicture(photo: PhotoModel)
  {
    this.select.emit(photo);
  }

}
