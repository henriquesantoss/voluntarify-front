import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MenuSidebar } from '.'

const Template: ComponentStory<typeof MenuSidebar> = (args) => (
  <MenuSidebar {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'MenuSidebar',
  component: MenuSidebar,
} as ComponentMeta<typeof MenuSidebar>
