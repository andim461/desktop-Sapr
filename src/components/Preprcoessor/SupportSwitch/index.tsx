import React from 'react';
import { Radio } from 'antd';
import { observer } from 'mobx-react';

import { preStore } from '@stores/PreprocessorStore';

const options = [
  { label: 'Слева', value: 'left' },
  { label: 'Справа', value: 'right' },
  { label: 'Обе', value: 'both' },
];

const SupportSwitch = () => {
  const onChange = (e: { target: { value?: $Support } }) => {
    if (e.target.value) preStore.setSupport(e.target.value);
  };

  return (
    <div>
      Заделка: &nbsp;
      <Radio.Group
        options={options}
        onChange={onChange}
        value={preStore.support}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};

export default observer(SupportSwitch);
