import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from '.'

const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>
