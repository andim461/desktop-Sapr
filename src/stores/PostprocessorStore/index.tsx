import { action, observable, makeObservable } from 'mobx';

class Postprocessor {
  @observable solvedData: $SolvedData = { U: [], N: [], S: [] };

  @action
  setSolvedData(data: $SolvedData) {
    this.solvedData = data;
  }

  constructor() {
    makeObservable(this);
  }
}

export default Postprocessor;

const postStore = new Postprocessor();

export { postStore };
