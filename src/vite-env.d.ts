/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module 'virtual:academy-localization-en' {
  const patches: Record<number, unknown>;
  export default patches;
}

declare module 'virtual:academy-localization-pl' {
  const patches: Record<number, unknown>;
  export default patches;
}
