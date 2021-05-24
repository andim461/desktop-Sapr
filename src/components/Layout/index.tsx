import React from 'react';
import { Layout as BaseLayout, Menu } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './Layout.scss';

const { Content, Sider } = BaseLayout;

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <BaseLayout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={false}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={
          collapsed ? (
            <RightOutlined className={styles.trigger} />
          ) : (
            <LeftOutlined className={styles.trigger} />
          )
        }
      >
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <div className={styles.logo}>САПР</div>
          <Menu.Item key="1" className={styles.menuItem}>
            <Link to="/">Препроцессор</Link>
          </Menu.Item>
          <Menu.Item key="2" className={styles.menuItem}>
            <Link to="postprocessor">Постпроцессор</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <BaseLayout className="site-layout">
        <Content>
          <div className={styles.layoutContent}>{children}</div>
        </Content>
      </BaseLayout>
    </BaseLayout>
  );
};

export default Layout;
