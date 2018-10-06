import {Component, Input, OnInit} from '@angular/core';
import {PhotoModel} from '../../models/photo.model';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  @Input() photo: PhotoModel;

  constructor() { }

  ngOnInit() {
  }

}
