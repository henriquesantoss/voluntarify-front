import { ReactNode } from 'react'
import { hideModal } from 'store/modal/actions'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { Flex } from 'components/Flex'
import { Icon } from 'components/Icon'
import { Footer, FooterProps } from 'components/Layout/Footer'
import { Heading, HeadingLevel } from 'components/Typography'
import { theme } from 'styles/theme/main'
import { MODALS } from 'constants/modals'
import { Confirm } from './Confirm'
import { Contact } from './Contact'
import { Devolution } from './Devolution'
import { DevolutionOrder } from './DevolutionOrder'
import { EditEmergencyProduct } from './EditEmergencyProduct'
import { EditProduct } from './EditProduct'
import { EditProfile } from './EditProfile'
import { ExcellenceProgramScore } from './ExcellenceProgramScore'
import { FinalizeOrder } from './FinalizeOrder'
import { FranchiseGroupSelection } from './FranchiseGroupSelection'
import { MinimumProductValue } from './MinimumProductValue'
import { MonthlyPreOrder } from './MonthlyPreOrder'
import { Onboarding } from './Onboarding'
import { PreOrderDescription } from './PreOrderDescription'
import { SaleOrder } from './SaleOrder'
import { SoulColletion } from './SoulColletion'
import * as S from './styles'
import { ViewAdminGroup } from './ViewAdminGroup'
import { ViewAdminMaterial } from './ViewAdminMaterial'

interface ModalProps {
  children: ReactNode
  title: string
  footer?: FooterProps
  titleLevel?: HeadingLevel
  backgroundColor?: keyof typeof theme.colors.background
  hideCloseIcon?: boolean
  rightTitleContent?: ReactNode
  onClose?: () => void
}

const createdModals = {
  [MODALS.EDIT_PRODUCT]: EditProduct,
  [MODALS.EDIT_EMERGENCY_PRODUCT]: EditEmergencyProduct,
  [MODALS.MINIMUM_PRODUCT_VALUE]: MinimumProductValue,
  [MODALS.MONTHLY_PRE_ORDER]: MonthlyPreOrder,
  [MODALS.CONFIRM]: Confirm,
  [MODALS.SALE_ORDER]: SaleOrder,
  [MODALS.FINALIZE_ORDER]: FinalizeOrder,
  [MODALS.PLAN_EXCELLENCE]: ExcellenceProgramScore,
  [MODALS.CONTACT]: Contact,
  [MODALS.DEVOLUTION]: Devolution,
  [MODALS.DEVOLUTION_ORDER]: DevolutionOrder,
  [MODALS.VIEW_ADMIN_MATERIAL]: ViewAdminMaterial,
  [MODALS.VIEW_ADMIN_GROUP]: ViewAdminGroup,
  [MODALS.ONBOARDING]: Onboarding,
  [MODALS.PRE_ORDER_DESCRIPTION]: PreOrderDescription,
  [MODALS.SOUL_COLLETION]: SoulColletion,
  [MODALS.FRANCHISE_GROUP_SELECTION]: FranchiseGroupSelection,
  [MODALS.EDIT_PROFILE]: EditProfile,
}

export const Modal = ({
  children,
  title,
  footer,
  titleLevel = 'h1',
  hideCloseIcon,
  rightTitleContent,
  onClose,
  backgroundColor,
}: ModalProps) => {
  const dispatch = useAppDispatch()

  return (
    <S.ModalLayout
      fill='vertical'
      direction='column'
      backgroundColor={backgroundColor}
    >
      <Flex style={{ overflow: 'auto' }} fill='vertical' direction='column'>
        <Flex
          margin={{ all: 10 }}
          gap='md'
          align='center'
          justify='space-between'
        >
          <Heading as={titleLevel}>{title}</Heading>
          {rightTitleContent}
          {!hideCloseIcon && (
            <Icon
              color='dark'
              as='close'
              onClick={() => {
                onClose ? onClose() : dispatch(hideModal())
              }}
            />
          )}
        </Flex>
        <S.ContentContainer direction='column' margin={{ horizontal: 'xs' }}>
          {children}
        </S.ContentContainer>
      </Flex>
      {!!footer && <Footer {...footer} />}
    </S.ModalLayout>
  )
}

export const ModalRoot = () => {
  const { modals } = useAppSelector(({ modal }) => modal)
  return (
    <>
      {!!modals.length &&
        modals.map(({ currentModal, modalType, modalProps }) => {
          const SpecificModal = currentModal
            ? createdModals[currentModal]
            : null

          return (
            <div key={currentModal}>
              <S.Overlay isOpen={!!currentModal} />
              {!!currentModal && (
                <S.ModalContainer isOpen={!!currentModal} modalType={modalType}>
                  {SpecificModal && <SpecificModal {...modalProps} />}
                </S.ModalContainer>
              )}
            </div>
          )
        })}
    </>
  )
}
