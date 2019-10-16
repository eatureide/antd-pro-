import { Avatar, Icon, Menu, Spin } from 'antd'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event
    key === 'logout' && router.replace('/user/login')
  }

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
    } = this.props;
    // console.log(this.props)
    const menuHeaderDropdown = (
      <Menu className={ styles.menu } selectedKeys={ [] } onClick={ this.onMenuClick }>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />
          个人设置
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={ menuHeaderDropdown }>
        <span className={ `${styles.action} ${styles.account}` }>
          <Avatar size="small" className={ styles.avatar } src={ currentUser.avatar } icon="user" alt="avatar" />
          <span className={ styles.name }>{ currentUser.name }</span>
        </span>
      </HeaderDropdown>
    ) : (
        <Spin
          size="small"
          style={ {
            marginLeft: 8,
            marginRight: 8,
          } }
        />
      )
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown)
