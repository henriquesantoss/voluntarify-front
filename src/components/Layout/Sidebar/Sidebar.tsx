import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { Avatar } from 'components/Avatar'
import { Flex } from 'components/Flex'
import { Logo } from 'components/Logo'
import { MenuButton, MenuButtonProps } from 'components/MenuButton'
import { ROUTES, createRoute } from 'constants/routes'
import Link from 'next/link'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as S from './Sidebar.styles'
import { Heading, Text } from 'components/Typography'
import { Button } from 'components/Button'
import Image from 'next/image'
import { Card } from 'components/Card'

interface DecodedToken extends JwtPayload {
  id?: string
}

interface DropdownItem {
  mainText: string
  items: {
    text: string
    href: string
  }[]
}

interface PageProps {
  dropdownItems: DropdownItem[]
  userId: string
}

const Page: React.FC<PageProps> = ({ dropdownItems, userId }) => {
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([])

  const toggleDropdown = (index: number) => {
    if (openDropdowns.includes(index)) {
      setOpenDropdowns(openDropdowns.filter((item) => item !== index))
    } else {
      setOpenDropdowns([...openDropdowns, index])
    }
  }

  const handleItemClick = (href: string) => {
    window.location.href = href
  }

  return (
    <Flex gap={24} align='center'>
      {dropdownItems.map((dropdown, index) => (
        <Flex direction='column' key={index} gap={10}>
          <Text
            style={{ cursor: 'pointer' }}
            onClick={() => toggleDropdown(index)}
          >
            {dropdown.mainText}
          </Text>
          {openDropdowns.includes(index) && (
            <Flex
              direction='column'
              style={{ position: 'absolute', marginTop: '30px' }}
            >
              <Card backgroundColor='dark'>
                {dropdown.items.map((item, itemIndex) => (
                  <Text
                    style={{ cursor: 'pointer' }}
                    color='mutted'
                    key={itemIndex}
                    onClick={() => handleItemClick(item.href)}
                  >
                    - {item.text}
                  </Text>
                ))}
              </Card>
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export const Sidebar = () => {
  const routes = useRouter()
  const [userId, setUserId] = useState<string>('')
  const [yid, setId] = useState<string | null>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setId(localStorage.getItem('accessToken'))
    }
  }, [])

  const dropdownItems: DropdownItem[] = [
    {
      mainText: 'Empresa',
      items: [
        {
          text: 'Home',
          href: ROUTES.HOME_COMPANY.url,
        },
        {
          text: 'Perfil',
          href: createRoute(userId, ROUTES.PERFIL_COMPANY.url),
        },
        {
          text: 'Cria Vagas',
          href: ROUTES.CREAT_VACANCIES.url,
        },
        {
          text: 'Vagas',
          href: ROUTES.VACANCIES.url,
        },
      ],
    },
    {
      mainText: 'Voluntario',
      items: [
        {
          text: 'Home',
          href: ROUTES.HOME_VOLUNTARY.url,
        },
        {
          text: 'Perfil',
          href: createRoute(userId, ROUTES.PERFIL_VOLUNTARY.url),
        },
        {
          text: 'Vagas',
          href: ROUTES.VACANCIES.url,
        },
      ],
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const token: string | null = localStorage.getItem('accessToken')
      try {
        if (token) {
          const decodedToken = jwt.decode(token) as DecodedToken
          const id = decodedToken?.id || ''
          setUserId(id)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const close = () => {
    localStorage.removeItem('accessToken')
    routes.push(ROUTES.LOGIN.url)
  }

  return (
    <S.Wrapper direction='column' fill='both'>
      <Flex fill='horizontal' justify='space-around'>
        <Image src='/logo.svg' height='32px' width='100%' />
        {yid === null || yid === undefined ? (
          <Flex gap='sm' align='center'>
            <a href='#home'>Home</a>
            <a href='#hability'>Habilidades</a>
            <a href='#about'>About</a>
          </Flex>
        ) : (
          <Page dropdownItems={dropdownItems} userId={userId} />
        )}
        <Flex gap={10}>
          {yid === null || yid === undefined ? (
            <>
              <Link href={ROUTES.LOGIN.url}>
                <Button styleType='outlined'>Logar</Button>
              </Link>
            </>
          ) : (
            <>
              <Button onClick={() => close()}>Sair</Button>
            </>
          )}
        </Flex>
      </Flex>
    </S.Wrapper>
  )
}
