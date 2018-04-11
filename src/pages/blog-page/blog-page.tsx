import * as React from 'react';
import MenuButton from '../../components/menu-button/menu-button';
import classnames from '../../utils/classnames';
import CoverPage from '../cover-page/cover-page';

import './blog-page.scss';

export interface BlogPageState {
  showSide: boolean;
}

export default class BlogPage extends React.Component<{}, BlogPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showSide: false
    };
    this.onClickSwitchSide = this.onClickSwitchSide.bind(this);
  }
  onClickSwitchSide() {
    this.setState({
      showSide: !this.state.showSide
    });
  }
  render() {
    return (
      <div className="blog">
        <div
          className={classnames({ show: this.state.showSide }, 'left-side')}
        >
          <MenuButton
            className="side-switch"
            closed={!this.state.showSide}
            onClick={this.onClickSwitchSide}
          />
          <CoverPage />
        </div>
      </div>
    );
  }
}
