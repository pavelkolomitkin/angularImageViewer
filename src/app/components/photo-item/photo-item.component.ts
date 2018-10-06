import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PhotoModel} from '../../models/photo.model';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {

  @Input() photo: PhotoModel;

  @Output('selectPicture') selectPicture: EventEmitter<PhotoModel> = new EventEmitter<PhotoModel>();

  constructor() { }

  ngOnInit() {
  }

  onImageClick()
  {
      this.selectPicture.emit(this.photo);
  }
}
