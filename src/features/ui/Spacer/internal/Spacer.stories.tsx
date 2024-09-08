import type { Meta, StoryObj } from '@storybook/react';

import Spacer from './Spacer.component';

const SpacerStory: Meta<typeof Spacer> = {
  component: Spacer,
};

export default SpacerStory;

export const Vertical: StoryObj<typeof Spacer> = {
  args: {
    size: '100px',
    direction: 'VERTICAL',
  },
};

export const Horizontal: StoryObj<typeof Spacer> = {
  args: {
    size: '100px',
    direction: 'HORIZONTAL',
  },
};
