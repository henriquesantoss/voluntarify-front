import * as Checkbox from '@radix-ui/react-checkbox'
import { Flex } from 'components/Flex'
import { CheckboxRoot } from './CheckBox.styles'
import { CheckIcon } from 'components/Icons'
import * as S from './CheckBox.styles'
import { Text } from 'components/Typography'

interface CheckBoxProps {
  label: string
}

export const CheckBox = ({ label }: CheckBoxProps) => (
  <form>
    <Flex align='center' gap='sm'>
      <CheckboxRoot defaultChecked id='c1'>
        <S.CheckboxIndicator>
          <CheckIcon />
        </S.CheckboxIndicator>
      </CheckboxRoot>
      <Text size='small'>{label}</Text>
    </Flex>
  </form>
)

export default CheckBox
