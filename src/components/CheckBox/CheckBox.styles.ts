import * as Checkbox from '@radix-ui/react-checkbox'
import styled from 'styled-components'

export const CheckboxRoot = styled(Checkbox.Root)`
  background-color: white;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  border-color: #415ec6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 0 0.2px black;
  }
`

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  color: #415ec6;
`
