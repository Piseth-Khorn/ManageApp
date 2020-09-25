import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  NODE_API_SERVER = 'http://localhost:9000';
  constructor(private _httpClient: HttpClient) {}

  fileUpload(user) {
    this._httpClient
      .post(`${this.NODE_API_SERVER}/user/create`, user, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload Progress: ' +
                Math.round((event.loaded / event.total) * 100) +
                '%'
            );
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
          }
        },
        (err) => {}
      );
  }
}
