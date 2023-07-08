import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Logo } from '.'

const Template: ComponentStory<typeof Logo> = () => <Logo />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>
