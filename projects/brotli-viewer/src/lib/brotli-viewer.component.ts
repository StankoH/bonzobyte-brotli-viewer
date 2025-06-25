import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import initBrotli, { BrotliDecoder } from 'brotli-dec-wasm/browser';

@Component({
  selector: 'lib-brotli-viewer',
  standalone: true,
  imports: [NgIf, JsonPipe],
  template: `
    <div *ngIf="error" style="color: red;">Error: {{ error }}</div>
    <div *ngIf="!json && !error">Loading...</div>
    <pre *ngIf="json">{{ json | json }}</pre>
  `
})
export class BrotliViewerComponent implements OnInit {
  @Input() filePath!: string;
  json: any = null;
  error: string | null = null;

  async ngOnInit() {
    try {
      const response = await fetch(this.filePath);
      if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
      const compressedBuffer = await response.arrayBuffer();
      const compressedBytes = new Uint8Array(compressedBuffer);
  
      // ✅ Dinamički import iz browser ulazne točke
      const brotliModule = await import('brotli-dec-wasm/browser');
      const brotli = await brotliModule.default(); // poziva init()
      const decompressedBytes = brotli.decompress(compressedBytes);
  
      const decodedString = new TextDecoder('utf-8').decode(decompressedBytes);
      this.json = JSON.parse(decodedString);
    } catch (err: any) {
      this.error = err.message || 'Unknown error';
      console.error('BrotliViewerComponent error:', err);
    }
  }
}
