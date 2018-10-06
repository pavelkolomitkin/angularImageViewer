import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PhotoModel} from '../../models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  @Input() photos: Array<PhotoModel> = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
