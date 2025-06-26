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
    try {

      const response = await fetch('assets/530763.json.br');

      if (!response.ok) throw new Error('❌ Fetch failed: ' + response.status);
      
      // Provjera podrške
      if (!('DecompressionStream' in window)) {
        throw new Error('❌ DecompressionStream not supported in this browser');
      }
      
      const ds = new (window as any).DecompressionStream('br');
      const decompressedStream = response.body!.pipeThrough(ds);
      const decompressedText = await new Response(decompressedStream).text();
      
      console.log(JSON.parse(decompressedText));

    } catch (err: any) {
      console.error('🔥 Brotli decompression error:', err);
      this.error = err.message || 'Decompression failed';
    }
  }
}
