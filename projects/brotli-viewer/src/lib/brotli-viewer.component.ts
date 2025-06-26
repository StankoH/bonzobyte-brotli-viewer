import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-brotli-viewer',
  standalone: true,
  imports: [NgIf, JsonPipe],
  template: `
    <div *ngIf="error" style="color: red;">❌ {{ error }}</div>
    <div *ngIf="!json && !error">Loading...</div>
    <pre *ngIf="json">{{ json | json }}</pre>
  `
})
export class BrotliViewerComponent implements OnInit {
  @Input() filePath!: string;

  json: any = null;
  error: string | null = null;

  async ngOnInit() {
    if (!this.filePath) {
      this.error = 'No filePath provided.';
      return;
    }

    try {
      const response = await fetch(this.filePath);
      if (!response.ok) throw new Error(`Failed to fetch .br file: ${response.status}`);

      const compressedStream = response.body;
      if (!compressedStream) throw new Error('No response body');

      if ('DecompressionStream' in window) {
        const ds = new (window as any).DecompressionStream('br');
        const decompressedStream = compressedStream.pipeThrough(ds);
        const decompressedText = await new Response(decompressedStream).text();
        this.json = JSON.parse(decompressedText);
      } else {
        this.error = '❌ DecompressionStream is not supported in this browser.';
      }
    } catch (err: any) {
      console.error('🔥 Brotli dekompresija neuspješna:', err);
      this.error = 'Brotli dekompresija neuspješna: ' + (err?.message || err);
    }
  }
}
