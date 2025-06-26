import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import initBrotli from 'brotli-dec-wasm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-brotli-viewer',
  standalone: true,
  imports: [NgIf, JsonPipe, CommonModule],
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
  
      const buffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
  
      const brotli = await initBrotli();
      const decompressedBytes = brotli.decompress(uint8Array);
  
      const decoded = new TextDecoder('utf-8').decode(decompressedBytes);
      this.json = JSON.parse(decoded);
    } catch (err: any) {
      this.error = err.message || 'Unknown error';
      console.error('BrotliViewerComponent error:', err);
    }
  }
}