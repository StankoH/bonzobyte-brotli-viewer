import { Component, Input, OnInit } from '@angular/core';
import BrotliDecode from 'brotli-dec-wasm';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lib-brotli-viewer',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <div *ngIf="jsonData; else loading">
      <pre>{{ jsonData | json }}</pre>
    </div>
    <ng-template #loading>
      <p>Loading and decompressing...</p>
    </ng-template>
  `
})
export class BrotliViewerComponent implements OnInit {
  @Input() filePath!: string;
  jsonData: any;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    if (!this.filePath) return;

    const brotli = await BrotliDecode();
    const compressed = await this.http.get(this.filePath, { responseType: 'arraybuffer' }).toPromise();
    if (!compressed) {
      console.error('Failed to load compressed file.');
      return;
    }
    const decompressed = brotli.decompress(new Uint8Array(compressed));
    const decoded = new TextDecoder().decode(decompressed);
    this.jsonData = JSON.parse(decoded);
  }
}
