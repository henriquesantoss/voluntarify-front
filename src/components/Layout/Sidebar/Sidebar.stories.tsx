import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Sidebar } from '.'

const Template: ComponentStory<typeof Sidebar> = () => <Sidebar />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>
