import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttachedImage } from '../models/attachedImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  allImages: Observable<AttachedImage[]> | undefined
  apiUrl = 'https://bsite.net/ronytuquizz/api'

  constructor(private http: HttpClient) { }

  getAllImages() {
    this.allImages = this.http.get<AttachedImage[]>(`${this.apiUrl}/photos`);
    return this.allImages;
  }

  countImage() {
    this.allImages?.subscribe(total => {
      return total.length;
    })
  }
}
