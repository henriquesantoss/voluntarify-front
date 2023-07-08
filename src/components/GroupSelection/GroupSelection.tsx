import { showModal } from 'store/modal/actions'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { Flex } from 'components/Flex'
import { Icon } from 'components/Icon'
import { Text } from 'components/Typography'
import { MODALS, MODAL_TYPES } from 'constants/modals'
import { useState } from 'react'

export const GroupSelection = () => {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      showModal({
        currentModal: MODALS.FRANCHISE_GROUP_SELECTION,
        modalType: MODAL_TYPES.CENTER,
        modalProps: { showClose: true },
      }),
    )
  }

  const showSelection = () => {
    setShow(true)
  }

  return (
    <Flex align='center' gap='xxs' fill='horizontal' justify='space-between'>
      <Text size='nano' weight='bold'>
        {'bla'}
      </Text>
      {show === true && (
        <Icon size='md' as='chevron-down' onClick={handleClick} />
      )}
    </Flex>
  )
}
