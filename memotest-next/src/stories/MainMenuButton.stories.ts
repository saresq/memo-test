import type { Meta, StoryObj } from '@storybook/react';

import { MainMenuButton } from './MainMenuButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/MainMenuButton',
  component: MainMenuButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
  },
} satisfies Meta<typeof MainMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
  },
};
