import { Component, OnInit } from '@angular/core';
import { AttachedImage } from 'src/app/models/attachedImage';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-adjuntos',
  templateUrl: './adjuntos.component.html',
  styleUrls: ['./adjuntos.component.scss']
})
export class AdjuntosComponent implements OnInit {
  fotos: AttachedImage[] | undefined;
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.imageService.getAllImages().subscribe(photos => {
      console.log(photos)
      this.fotos = photos;
    })
  }

}
