declare module 'brotli-dec-wasm/browser' {
    export interface BrotliDecoder {
      decompress(input: Uint8Array): Uint8Array;
    }
  
    const init: () => Promise<BrotliDecoder>;
    export default init;
  }