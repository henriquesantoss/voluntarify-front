import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Card } from '.'

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>
