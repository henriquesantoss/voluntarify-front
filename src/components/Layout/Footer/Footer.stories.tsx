import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Footer } from '.'

const Template: ComponentStory<typeof Footer> = () => <Footer />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>
