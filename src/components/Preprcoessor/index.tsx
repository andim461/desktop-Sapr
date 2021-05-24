import React from 'react';
import { observer, inject } from 'mobx-react';

import RodsTable from '@components/Preprcoessor/RodsTable';
import NodesTable from '@components/Preprcoessor/NodesTable';
import Drawing from '@components/Preprcoessor/Drawing';
import styles from './Preprocessor.scss';
import Files from './Files';

const Preprocessor = inject('preStore')(
  observer(() => {
    return (
      <div>
        <Files />
        <div className={styles.table}>
          <RodsTable />
          <NodesTable />
        </div>
        <Drawing />
      </div>
    );
  })
);

export default Preprocessor;
