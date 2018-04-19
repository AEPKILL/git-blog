import CantDrag from '@components/cant-drag';
import DragAble from '@components/drag-able';

import * as React from 'react';

import './terminal.scss';

export interface TerminalProps {
  name?: string;
}

export interface TerminalState {
  name?: string;
}

export default class Terminal extends React.Component<
  TerminalProps,
  TerminalState
> {
  constructor(props: TerminalProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <DragAble>
        <div className="terminal">
          <div className="toolbar">
            <div className="button-container">
              <span className="button button-close" />
              <span className="button button-minimize" />
              <span className="button button-maximize" />
            </div>
            <div className="title-container">
              <div className="icon icon-terminal" />
              <div className="name">Terminal</div>
            </div>
          </div>
          <CantDrag>
            <div className="content">
              fuck you xxxxx.
            </div>
          </CantDrag>
        </div>
      </DragAble>
    );
  }
}
