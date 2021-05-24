import { action, observable, makeObservable, computed, toJS } from 'mobx';
import { find } from 'lodash';

class Preprocessor {
  @observable rods: Array<$Rod> = [];
  @observable nodes: Array<$Node> = [];
  @observable support: $Support = 'both';

  constructor() {
    makeObservable(this);
  }

  @action
  addRod(rod: $Rod) {
    if (this.isRodExists(rod.index))
      this.rods = this.rods.map(({ index, ...rest }) =>
        index === rod.index ? { ...rod } : { index, ...rest }
      );
    else this.rods.push(rod);
  }

  @action
  deleteRod(rod: $Rod) {
    this.rods = this.rods
      .filter(({ index }) => index !== rod.index)
      .map(({ index, ...rest }) => ({
        ...rest,
        index: index > rod.index ? index - 1 : index,
      }));
  }

  @action
  swapRods(rod1Index: number, rod2Index: number) {
    const rod1 = find(this.rods, { index: rod1Index });
    const rod2 = find(this.rods, { index: rod2Index });
    if (rod1 && rod2) {
      rod1.index = rod2Index;
      rod2.index = rod1Index;
    }
  }

  @action
  isRodExists(index: number) {
    return find(this.rods, { index });
  }

  @action
  addNode(node: $Node) {
    if (this.isNodeExists(node.index))
      this.nodes = this.nodes.map(({ index, ...rest }) =>
        index === node.index ? { ...node } : { index, ...rest }
      );
    else this.nodes.push(node);
  }

  @action
  deleteNode(index: string) {
    this.nodes = this.nodes.filter((node) => node.index !== index);
  }

  @action
  isNodeExists(index: string) {
    return find(this.nodes, { index });
  }

  @action
  private wipeData() {
    this.nodes = [];
    this.rods = [];
    this.support = 'both';
  }

  @action
  uploadFile(data: $PreStore) {
    this.wipeData();
    this.rods = data.rods;
    this.nodes = data.nodes;
    this.support = data.support;
  }

  @action
  getData(): $PreStore {
    return {
      rods: toJS(this.rods),
      nodes: toJS(this.nodes),
      support: toJS(this.support),
    };
  }

  @action
  setSupport(support: $Support) {
    this.support = support;
  }

  @computed
  get maxRodIndex() {
    return this.rods.reduce((acc, { index }) => (index > acc ? index : acc), 0);
  }
}

export default Preprocessor;

const preStore = new Preprocessor();

export { preStore };
