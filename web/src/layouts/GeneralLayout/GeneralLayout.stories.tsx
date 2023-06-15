import type { ComponentMeta, ComponentStory } from '@storybook/react'

import GeneralLayout from './GeneralLayout'

export const generated: ComponentStory<typeof GeneralLayout> = (args) => {
  return <GeneralLayout {...args} />
}

export default {
  title: 'Layouts/GeneralLayout',
  component: GeneralLayout,
} as ComponentMeta<typeof GeneralLayout>
