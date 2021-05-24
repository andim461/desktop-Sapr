import React from 'react';
import { observer } from 'mobx-react';
import { Layer, Stage } from 'react-konva';
import { preStore } from '@stores/PreprocessorStore';
import { sortBy } from 'lodash';
import { toJS } from 'mobx';
import Rods from './Rods';
import Arrows from './Arrows';
import Nodes from './Nodes';
import Support from './Support';
import styles from './Drawing.scss';

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 400;
export const SUPPORTS_WIDTH = 100;

const Drawing = () => {
  const constructionLen = SUPPORTS_WIDTH + preStore.rods.reduce((acc, { L }) => acc + L * 100, 0);
  const zoomRate = constructionLen / CANVAS_WIDTH;
  const rods = sortBy(preStore.rods, 'index');

  return (
    <Stage width={CANVAS_WIDTH + SUPPORTS_WIDTH} height={CANVAS_HEIGHT} className={styles.canvas}>
      <Layer>
        <Rods zoomRate={zoomRate} rods={rods} />
        <Arrows zoomRate={zoomRate} rods={rods} />
        <Nodes rods={rods} nodes={preStore.nodes} zoomRate={zoomRate} />
        <Support rods={rods} support={preStore.support} zoomRate={zoomRate} />
      </Layer>
    </Stage>
  );
};

export default observer(Drawing);
