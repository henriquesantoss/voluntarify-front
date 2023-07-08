import axios from 'axios'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Page } from 'components/Page'
import { Heading, Text } from 'components/Typography'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { ROUTES, createRoute } from 'constants/routes'
import { Button } from 'components/Button'
import { useWindowSize } from 'hooks/useWindowsSize'

const a4: NextPage = () => {
  const { width, breakpoints } = useWindowSize()
  const router = useRouter()
  return (
    <Flex align='center' fill='both' justify='center'>
      <Card>
        <Flex
          gap={24}
          direction='column'
          align='center'
          fill='both'
          justify='center'
          fixedSize={
            width && width >= breakpoints.sm
              ? { vertical: '500px', horizontal: '500px' }
              : { vertical: '250px', horizontal: '250px' }
          }
        >
          <Flex gap={10} align='center'>
            <Link href={ROUTES.HOME_COMPANY.url}>
              <Button size={width && width >= breakpoints.sm ? 'lg' : 'sm'}>
                EMPRESA CLICA AQUI
              </Button>
            </Link>
            <Link href={ROUTES.HOME_VOLUNTARY.url}>
              <Button size={width && width >= breakpoints.sm ? 'lg' : 'sm'}>
                VOLUNTARIO CLICA AQUI
              </Button>
            </Link>
          </Flex>

          <Link href={ROUTES.LOGIN.url}>
            <Button styleType='text' size='lg'>
              voltar pro login
            </Button>
          </Link>
        </Flex>
      </Card>
    </Flex>
  )
}

export default a4
