import { ReactNode, UIEventHandler, useEffect } from 'react'

import { useAppDispatch } from 'hooks/useAppDispatch'
import { Flex } from 'components/Flex'
import { Footer, FooterProps } from 'components/Layout/Footer'
import { Sidebar } from 'components/Layout/Sidebar'
import { Heading } from 'components/Typography'
import { MODALS, MODAL_TYPES } from 'constants/modals'
import * as S from './Page.styles'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'

const PageTitle = ({
  title,
  rightItem,
}: {
  title: ReactNode
  rightItem?: ReactNode
}) => {
  return (
    <S.TitleContainer>
      <Flex fill='horizontal'>
        <Heading as='h1' lineHeight='tight'>
          {title}
        </Heading>
      </Flex>
      {rightItem}
    </S.TitleContainer>
  )
}
interface PageProps {
  children?: ReactNode
  title?: ReactNode
  footer?: FooterProps
  titleContent?: ReactNode
  onScrollContent?: UIEventHandler<HTMLDivElement>
}

export const Page = ({
  children,
  title,
  footer,
  titleContent,
  onScrollContent,
}: PageProps) => {
  const router = useRouter()
  const token = localStorage.getItem('accessToken')
  if (!token) return router.push(ROUTES.LOGIN.url)
  return (
    <>
      <S.Wrapper>
        <Sidebar />
        <S.Column>
          <S.ContentContainer onScroll={onScrollContent}>
            {!!title && <PageTitle title={title} rightItem={titleContent} />}
            {children}
          </S.ContentContainer>
          {!!footer && <Footer {...footer} />}
        </S.Column>
      </S.Wrapper>
    </>
  )
}
