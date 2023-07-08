import { Flex } from 'components/Flex'
import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`
export const BorderRadius = styled(Flex)`
  border-radius: 20px;
`

export const backgroundImage = styled(Flex)`
  background-image: url('light.png');

  padding-top: 200px;
  padding-bottom: 200px;
`

export const backgroundIcon = styled.div`
  background: #22c55e;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`

export const Column = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
  flex-direction: column;
`

export const ContentContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: ${theme.spacings[10]};
  `}
`

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${theme.spacings[14]};
    margin-bottom: ${theme.spacings[9]};
  `}
`
