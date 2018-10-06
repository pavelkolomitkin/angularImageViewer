import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BaseApiUrlInterceptor} from './services/intercepters/base-api-url.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PhotoProviderService} from './services/photo-provider.service';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';


const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoItemComponent,
    LoadMoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
      httpInterceptorProviders,
      PhotoProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
