import { find } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Arrow } from 'react-konva';
import { CANVAS_HEIGHT } from '..';
import { mapNodes } from '../lib';

interface Props {
  rods: Array<$Rod>;
  nodes: Array<$Node>;
  zoomRate: number;
}

const Nodes = ({ rods, nodes, zoomRate }: Props) => {
  const arrowWidth = 50;
  const nodesMap = mapNodes(rods, zoomRate);
  return (
    <>
      {nodes.map((node) => {
        const currentNode = find(nodesMap, { index: node.nodeIndex });
        if (currentNode) {
          return (
            <Arrow
              key={`${node.index}`}
              strokeWidth={15}
              stroke="green"
              fill="green"
              points={[
                currentNode.offset,
                CANVAS_HEIGHT / 2,
                node.n > 0 ? arrowWidth + currentNode.offset : currentNode.offset - arrowWidth,
                CANVAS_HEIGHT / 2,
              ]}
            />
          );
        }
      })}
    </>
  );
};

export default observer(Nodes);
