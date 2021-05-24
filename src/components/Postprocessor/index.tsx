import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Card, Divider, PageHeader, Tabs } from 'antd';

import { preStore } from '@stores/PreprocessorStore';
import { solve } from './lib';
import { postStore } from '@stores/PostprocessorStore';
import Chart from './Charts/Chart';
import styles from './Postprocessor.scss';
import PointValues from './PointValues';
import Table from './Table';

const Postprocessor = () => {
  useEffect(() => {
    const preData = preStore.getData();
    const solvedData = solve(preData);
    postStore.setSolvedData(solvedData);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.charts}>
        <Card title="Эпюры" className={styles.chartsCard}>
          <Chart type="N" />
          <Chart type="U" />
          <Chart type="S" />
        </Card>
      </div>
      <div className={styles.points}>
        <PointValues />
        <Table />
      </div>
    </div>
  );
};

export default inject((stores) => stores)(observer(Postprocessor));
