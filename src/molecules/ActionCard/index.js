// @flow
import React, { PureComponent } from 'react';
import type { ComponentType } from 'react';
import { Button, Title, Label } from './components';

type Props = {
  title: string,
  label: string,
  icon?: ComponentType<any>,
  onClick: (e: SyntheticMouseEvent<HTMLButtonElement>) => void | Promise<void>,
};

type State = {};

class ActionCard extends PureComponent<Props, State> {
  state = {};

  handleClick = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.props.onClick(e);
  };

  render() {
    const { title, label, icon: Icon } = this.props;

    return (
      <Button>
        <Title>{title}</Title>
        <Label onClick={this.handleClick}>
          {Icon && <Icon />} {label}
        </Label>
      </Button>
    );
  }
}

export { ActionCard as default };
