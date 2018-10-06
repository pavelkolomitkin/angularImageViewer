import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PhotoLoadStateEnum } from '../../models/photo-load-state.enum';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.css']
})
export class LoadMoreComponent implements OnInit {

  States = PhotoLoadStateEnum;

  _currentState: PhotoLoadStateEnum = PhotoLoadStateEnum.READY;

  @Output('onInitLoading') initLoading: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  get currentState()
  {
    return this._currentState;
  }

  @Input()
  set currentState(value: PhotoLoadStateEnum)
  {
    this._currentState = value;
  }

  ngOnInit() {

  }

  onLoadClickHandler()
  {
    this.initLoading.emit();
  }
}
