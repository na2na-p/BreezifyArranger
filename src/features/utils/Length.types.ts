export type Length =
  | `${number}${'px' | 'vw' | 'vh' | '%'}`
  | `calc(${string})`
  | 'auto'
  | 'fit-content';
