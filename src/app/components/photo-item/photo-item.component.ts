import {Component, Input, OnInit} from '@angular/core';
import {PhotoModel} from '../../models/photo.model';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {

  @Input() photo: PhotoModel;

  constructor() { }

  ngOnInit() {
  }

}
