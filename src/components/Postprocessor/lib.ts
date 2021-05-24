import { range } from 'lodash';

const gaussJordan = (matrix: Array<Array<number>>, solve: Array<number>): Array<number> => {
  const matr = matrix.map((val) => val.map((val) => val));

  const n = matr.length;
  const matrixBig = [];

  for (let i = 0; i < n; i++) {
    const arr = [];
    for (let k = 0; k <= n; k++) {
      arr.push(0);
    }
    matrixBig.push(arr);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrixBig[i][j] = matr[i][j];
    }
    matrixBig[i][n] = solve[i];
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n + 1; i++) matrixBig[k][i] = matrixBig[k][i] / matr[k][k];

    for (let i = k + 1; i < n; i++) {
      let K = matrixBig[i][k] / matrixBig[k][k];

      for (let j = 0; j < n + 1; j++) matrixBig[i][j] = matrixBig[i][j] - matrixBig[k][j] * K;
    }

    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) matr[i][j] = matrixBig[i][j];
  }

  for (let k = n - 1; k > -1; k--) {
    for (let i = n; i > -1; i--) matrixBig[k][i] = matrixBig[k][i] / matr[k][k];

    for (let i = k - 1; i > -1; i--) {
      let K = matrixBig[i][k] / matrixBig[k][k];

      for (let j = n; j > -1; j--) matrixBig[i][j] = matrixBig[i][j] - matrixBig[k][j] * K;
    }
  }
  const solvetion = [];
  for (let i = 0; i < solve.length; i++) {
    solvetion.push(matrixBig[i][solve.length]);
  }
  return solvetion;
};

const solve = (store: $PreStore) => {
  const rodsData = store.rods;
  const nodesData = store.nodes;
  const left = ['left', 'both'].includes(store.support);
  const right = ['right', 'both'].includes(store.support);

  const rods = rodsData.map((val) => [val.E, val.A, val.L]);

  const nodesLoads = [];
  for (let i = 0; i < rodsData.length + 1; i++) {
    const loadsSum = nodesData
      .filter((val) => val.nodeIndex === i + 1)
      .map((val) => val.n)
      .reduce((prev, curr) => prev + curr, 0);
    nodesLoads.push(loadsSum);
  }

  const rodsLoads = rodsData.map((val) => val.q);

  const matrixA: Array<Array<number>> = [];
  for (let i = 0; i < rods.length + 1; i++) {
    const append = [];
    for (let j = 0; j < rods.length + 1; j++) {
      append.push(0);
    }
    matrixA.push(append);
  }

  const minors: Array<Array<Array<number>>> = [];

  rods.forEach((rod) => {
    let tempMinor = [];
    for (let i = 0; i < 2; i++) {
      tempMinor.push([0, 0]);
    }
    tempMinor = tempMinor.map((val, ind) => val.map(() => (rod[0] * rod[1]) / rod[2]));
    tempMinor[0][1] *= -1;
    tempMinor[1][0] *= -1;
    minors.push(tempMinor);
  });

  minors.forEach((val, ind) => {
    for (let i of range(ind, ind + 2)) {
      for (let k of range(ind, ind + 2)) {
        if (i === k) {
          if (i === 0 || i === matrixA.length - 1) {
            matrixA[i][k] = val[i - ind][k - ind];
          } else {
            matrixA[i][k] += val[i - ind][k - ind];
          }
        } else {
          matrixA[i][k] = val[i - ind][k - ind];
        }
      }
    }
  });

  if (left) {
    for (let i = 0; i < matrixA.length; i++) {
      for (let k = 0; k < matrixA.length; k++) {
        if (i !== k && (i === 0 || k === 0)) {
          matrixA[i][k] = 0;
        }
      }
    }
  }
  if (right) {
    for (let i = 0; i < matrixA.length; i++) {
      for (let k = 0; k < matrixA.length; k++) {
        if (i !== k && (i === matrixA.length - 1 || k === matrixA.length - 1)) {
          matrixA[i][k] = 0;
        }
      }
    }
  }

  const vectorB = [];

  for (let i of range(0, matrixA.length)) {
    if ((left && i === 0) || (right && i === matrixA.length - 1)) {
      vectorB.push(0);
    } else if (i !== 0 && i !== matrixA.length - 1) {
      vectorB.push(
        nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2) + rodsLoads[i - 1] * (rods[i - 1][2] / 2)
      );
    } else if (i === 0) {
      vectorB.push(nodesLoads[i] + rodsLoads[i] * (rods[i][2] / 2));
    } else if (i === matrixA.length - 1) {
      vectorB.push(nodesLoads[i] + rodsLoads[i - 1] * (rods[i - 1][2] / 2));
    }
  }

  const deltas = gaussJordan(matrixA, vectorB).map((val) => Number(val.toFixed(14)));

  const U: Array<(x: number) => number> = [];
  rods.forEach((val, ind) => {
    const Ux = (x: number) =>
      Number(
        (
          deltas[ind] +
          (x / val[2]) * (deltas[ind + 1] - deltas[ind]) +
          ((rodsLoads[ind] * val[2] * val[2]) / (2 * val[0] * val[1])) *
            (x / val[2]) *
            (1 - x / val[2])
        ).toFixed(12)
      );
    U.push(Ux);
  });

  const N: Array<(x: number) => number> = [];
  const S: Array<(x: number) => number> = [];
  rods.forEach((val, ind) => {
    const Nx = (x: number) =>
      Number(
        (
          ((val[0] * val[1]) / val[2]) * (deltas[ind + 1] - deltas[ind]) +
          ((rodsLoads[ind] * val[2]) / 2) * (1 - 2 * (x / val[2]))
        ).toFixed(12)
      );
    N.push(Nx);
    S.push((x: number) => Nx(x) / val[1]);
  });

  const solution = {
    U: U,
    N: N,
    S: S,
  };

  return solution;
};

export { solve, gaussJordan };
