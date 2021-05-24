import PreprocessorStore from '@stores/PreprocessorStore';
import PostprocessorStore from '@stores/PostprocessorStore';

interface Stores {
  preStore: PreprocessorStore;
  postStore: PostprocessorStore;
}

const stores = {
  preStore: new PreprocessorStore(),
  proStore: new PostprocessorStore(),
};

export { Stores, stores };
