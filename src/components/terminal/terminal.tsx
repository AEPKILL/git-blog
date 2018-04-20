import CantDrag from '@components/cant-drag';
import DragAble from '@components/drag-able';
import ResizeAble from '@components/resize-able';
import i18n from '@i18n/index';
import classnames from '@utils/classnames';

import * as React from 'react';
import { Link } from 'react-router-dom';

import './terminal.scss';

export interface TerminalProps {
  name?: string;
}

export interface TerminalState {
  name?: string;
  max: boolean;
}

export default class Terminal extends React.Component<
  TerminalProps,
  TerminalState
> {
  constructor(props: TerminalProps) {
    super(props);

    this.state = {
      max: false
    };
    this.handleClickMax = this.handleClickMax.bind(this);
  }
  handleClickMax() {
    this.setState({
      max: !this.state.max
    });
  }
  render() {
    return (
      <ResizeAble>
        <DragAble>
          <div className={classnames('terminal', { max: this.state.max })}>
            <div className="toolbar">
              <div className="button-container">
                <Link className="button button-close" to="/" />
                <span className="button button-minimize" />
                <span
                  className="button button-maximize"
                  onClick={this.handleClickMax}
                />
              </div>
              <div className="title-container">
                <div className="icon icon-terminal" />
                <div className="name">{i18n.terminal}</div>
              </div>
            </div>
            <CantDrag>
              <div className="content">
                <div className="line-container">
                  SHARK-BLOG: ~{BLOG_INFO.BLOG_INFO.author}$
                </div>
              </div>
            </CantDrag>
          </div>
        </DragAble>
      </ResizeAble>
    );
  }
}
