import { ReactNode, useEffect, useRef, useState } from 'react'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'
import * as S from './Tabs.styles'

interface Tab {
  label: string
  content: ReactNode
}

interface TabsHeaderProps {
  tabs: Tab[]
  currentTab: number
  headerInfo: ReactNode
  setCurrentTab: (index: number) => void
}

const TabsHeader = ({
  tabs,
  currentTab,
  headerInfo,
  setCurrentTab,
}: TabsHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [barPosition, setBarPosition] = useState(0)

  const handleClick = (index: number) => {
    setCurrentTab(index)
  }

  useEffect(() => {
    let position = 0
    if (containerRef.current) {
      for (let child = 0; child < currentTab; child++) {
        position += containerRef.current.children[child].clientWidth
      }
    }
    setBarPosition(position)
  }, [currentTab])

  return (
    <S.TabContainer data-testid='tabs-header' barPosition={barPosition}>
      <Flex ref={containerRef} className='tabs'>
        {tabs.map((tab, i) => (
          <div key={i} onClick={() => handleClick(i)}>
            <Text
              transform='capitalize'
              color={currentTab === i ? 'darkPrimary' : 'mutted'}
              weight='bold'
              size='small'
              lineHeight='loose'
              noWrap
            >
              {tab.label}
            </Text>
          </div>
        ))}
      </Flex>
      {headerInfo}
    </S.TabContainer>
  )
}

interface TabsProps {
  tabs: Tab[]
  tabIndex?: number
  sticky?: boolean
  headerInfo?: ReactNode
  onChange?: (index: number) => void
  noContent?: boolean
}

export const Tabs = ({
  tabs,
  tabIndex,
  sticky,
  headerInfo,
  onChange,
  noContent,
}: TabsProps) => {
  const stickyRef = useRef<HTMLDivElement>(null)
  const [currentTab, setCurrentTab] = useState(0)

  const currentTabIndex = tabIndex !== undefined ? tabIndex : currentTab

  useEffect(() => {
    if (stickyRef.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          e.target.classList.toggle('is-pinned', e.intersectionRatio < 1)
        },
        { threshold: [1] },
      )

      observer.observe(stickyRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stickyRef?.current])

  useEffect(() => {
    if (tabIndex !== undefined) {
      setCurrentTab(tabIndex)
    }
  }, [tabIndex])

  if (!tabs?.length) return null

  const handleSetTab = (index: number) => {
    if (currentTabIndex !== index) {
      setCurrentTab(index)
      onChange && onChange(index)
    }
  }

  return (
    <>
      {sticky ? (
        <S.Sticky ref={stickyRef}>
          <div>
            <TabsHeader
              tabs={tabs}
              currentTab={currentTabIndex}
              headerInfo={headerInfo}
              setCurrentTab={handleSetTab}
            />
          </div>
        </S.Sticky>
      ) : (
        <TabsHeader
          tabs={tabs}
          currentTab={currentTabIndex}
          headerInfo={headerInfo}
          setCurrentTab={handleSetTab}
        />
      )}
      {!noContent && tabs[currentTabIndex].content}
    </>
  )
}
