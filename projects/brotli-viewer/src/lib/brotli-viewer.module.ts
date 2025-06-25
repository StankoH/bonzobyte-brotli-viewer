import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrotliViewerComponent } from './brotli-viewer.component';

@NgModule({
  imports: [CommonModule, BrotliViewerComponent], // ⬅ dodaj komponentu u imports
  exports: [BrotliViewerComponent]
})
export class BrotliViewerModule {}
