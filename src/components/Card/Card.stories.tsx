import { Componenthttp://localhost:8050, ComponentMeta } from '@http://localhost:8050book/react'
import { Card } from '.'

const Template: Componenthttp://localhost:8050<typeof Card> = (args) => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {}

export default {
  title: 'Card',
  component: Card,
} as ComponentMeta<typeof Card>
