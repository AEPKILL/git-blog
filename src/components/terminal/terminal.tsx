import CantDrag from '@components/cant-drag';
import DragAble from '@components/drag-able';
import ResizeAble from '@components/resize-able';
import { TerminalStore } from '@stores/terminal';
import classnames from '@utils/classnames';
import TerminalCursor from './terminal-cursor';

import PropTypes from 'prop-types';
import * as React from 'react';
import { RouterChildContext } from 'react-router-dom';
import { inject, observer } from 'ts-mobx-react';

import './terminal.scss';

export interface TerminalProps {
  name?: string;
}

export interface TerminalState {
  max: boolean;
  command: string;
  cursorPos: number;
  historyPointer: number;
}

@observer
export default class Terminal extends React.Component<
  TerminalProps,
  TerminalState
> {
  @inject() terminal!: TerminalStore;

  context!: RouterChildContext<{}>;
  inputRef = React.createRef<HTMLInputElement>();
  lineContainerRef = React.createRef<HTMLDivElement>();
  pressWhitespace = false;
  // 历史记录指针
  historyPointer = 0;

  constructor(props: TerminalProps) {
    super(props);
    this.state = {
      max: false,
      command: '',
      cursorPos: 0,
      historyPointer: 0
    };
    this.handleClickMax = this.handleClickMax.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }
  focusInput() {
    const inputElement = this.inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }
  handleClickMax() {
    this.setState({
      max: !this.state.max
    });
  }
  handleClickClose() {
    this.context.router.history.goBack();
  }
  handleInputChange(event: React.FormEvent<HTMLElement>) {
    const { command, cursorPos } = this.state;
    const target = event.target as HTMLInputElement;
    const start = command.substring(0, cursorPos);
    const next = command.substring(cursorPos);
    let value = target.value;
    if (!this.pressWhitespace) {
      value = value.trim();
    }
    this.setState({
      command: start + value + next,
      cursorPos: this.state.cursorPos + value.length
    });
  }
  handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    console.log(event.keyCode);
    const { command, cursorPos } = this.state;
    const { history } = this.terminal;
    this.pressWhitespace = false;
    switch (event.keyCode) {
      // enter
      case 13: {
        if (!event.ctrlKey) {
          this.historyPointer = history.length + 1;
          this.terminal.exec(command);
          this.setState({
            command: '',
            cursorPos: 0
          });
        }
        break;
      }
      // backspace
      case 8: {
        const start = command.substring(0, cursorPos);
        const next = command.substring(cursorPos);
        const newPos = this.state.cursorPos - 1;
        this.setState({
          command: start.slice(0, start.length - 1) + next,
          cursorPos: newPos < 0 ? 0 : newPos
        });
      }
      // left
      case 37: {
        const newPos = this.state.cursorPos - 1;
        this.setState({
          cursorPos: newPos < 0 ? 0 : newPos
        });
        break;
      }
      // up
      case 38: {
        if (this.historyPointer > 0) {
          this.historyPointer--;
        }
        const historyCommand = history[this.historyPointer] || '';
        this.setState({
          cursorPos: historyCommand.length,
          command: historyCommand
        });
        break;
      }
      // right
      case 39: {
        const newPos = this.state.cursorPos + 1;
        this.setState({
          cursorPos:
            newPos > this.state.command.length
              ? this.state.command.length
              : newPos
        });
        break;
      }
      // down
      case 40: {
        if (this.historyPointer < history.length - 1) {
          this.historyPointer++;
        }
        const historyCommand = history[this.historyPointer] || '';
        this.setState({
          cursorPos: historyCommand.length,
          command: historyCommand
        });
        break;
      }
      // whitespace
      case 32: {
        this.pressWhitespace = true;
        break;
      }
      // c
      case 67: {
        // ctrl + c
        if (event.ctrlKey) {
          this.terminal.killCurrentApp();
        }
        break;
      }
      // tab
      case 9: {
        const result = this.terminal.hint(this.state.command);
        console.log(result);
        if (result) {
          this.setState({
            command: result,
            cursorPos: result.length
          });
        }
        event.preventDefault();
        break;
      }
    }
  }
  componentDidUpdate() {
    const lineContainer = this.lineContainerRef.current;
    if (lineContainer) {
      lineContainer.scrollTop = lineContainer.scrollHeight;
    }
  }
  renderHistoryLines() {
    if (this.terminal.output.length) {
      return React.createElement(React.Fragment, {}, ...this.terminal.output);
    }
    return null;
  }
  renderInputLine() {
    const { prefix } = this.terminal;
    const { command, cursorPos } = this.state;
    const before = command.substring(0, cursorPos);
    const after = command.substring(cursorPos);
    return (
      <div className="line">
        <span className="line-prefix">{prefix}</span>
        <span className="line-command">
          <span>{before}</span>
          <input
            onChange={this.handleInputChange}
            className="line-input"
            ref={this.inputRef}
            value=""
          />
          <TerminalCursor />
          <span>{after}</span>
        </span>
      </div>
    );
  }
  render() {
    return (
      <ResizeAble>
        <DragAble>
          <div
            className={classnames('terminal', {
              max: this.state.max
            })}
          >
            <div className="toolbar" onDoubleClick={this.handleClickMax}>
              <div className="button-container">
                <span
                  className="button button-close"
                  onClick={this.handleClickClose}
                />
                <span className="button button-minimize" />
                <span
                  className="button button-maximize"
                  onClick={this.handleClickMax}
                />
              </div>
              <div className="title-container">
                <div className="icon icon-terminal" />
                <div className="name">{this.terminal.title}</div>
              </div>
            </div>
            <CantDrag>
              <div
                className="content"
                onMouseUp={this.focusInput}
                onKeyDown={this.handleKeyDown}
              >
                <div className="line-container" ref={this.lineContainerRef}>
                  {this.renderHistoryLines()}
                  {this.renderInputLine()}
                </div>
              </div>
            </CantDrag>
          </div>
        </DragAble>
      </ResizeAble>
    );
  }
  static contextTypes = {
    router: PropTypes.object
  };
}
