interface $Rod {
  index: number;
  L: number;
  A: number;
  E: number;
  S: number;
  q: number;
}

interface $Node {
  index: string;
  nodeIndex: number;
  n: number;
}

type $Support = 'both' | 'left' | 'right';

interface $PreStore {
  rods: Array<$Rod>;
  nodes: Array<$Node>;
  support: $Support;
}

interface $FileInfo {
  file: {
    name: string;
    originFileObj: { path?: string };
  };
}

interface $File {
  path?: string;
  name: string;
}

interface $SolvedData {
  U: Array<(x: number) => number>;
  N: Array<(x: number) => number>;
  S: Array<(x: number) => number>;
}

interface $Point {
  x: number;
  y: number;
}

interface $TableData {
  x: number;
  Nx: number;
  Ux: number;
  Sx: number;
  isRed: boolean;
}
