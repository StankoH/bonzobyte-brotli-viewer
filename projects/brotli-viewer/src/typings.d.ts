declare module 'brotli-dec-wasm' {
    export default function Brotli(): Promise<{
      decompress(input: ArrayLike<number>): Uint8Array;
    }>;
  }
  declare module 'brotli-dec-wasm/browser';