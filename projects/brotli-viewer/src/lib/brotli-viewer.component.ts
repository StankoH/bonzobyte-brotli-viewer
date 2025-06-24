import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-brotli-viewer',
  standalone: true,
  imports: [],
  template: `
    <p>
      brotli-viewer works!
    </p>
  `,
  styles: ``
})
export class BrotliViewerComponent {@Input() filePath!: string;}