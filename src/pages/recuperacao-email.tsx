import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ROUTES } from 'constants/routes'
import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'
import { Card } from 'components/Card'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { useWindowSize } from 'hooks/useWindowsSize'
import Link from 'next/link'

export default function Home() {
  const { width, breakpoints } = useWindowSize()
  const router = useRouter()

  return (
    <Flex
      direction='column'
      gap={10}
      fill='both'
      align='center'
      justify='center'
    >
      <Card>
        <Flex direction='column' align='center' gap={10}>
          <Flex gap='md'>
            <Link href={ROUTES.EMAIL_VOLUNTARY.url}>
              <Button>Voluntario</Button>
            </Link>
            <Link href={ROUTES.EMAIL_COMPANY.url}>
              <Button>Empresa</Button>
            </Link>
          </Flex>
          <Link href={ROUTES.LOGIN.url}>Voltar para o login</Link>
        </Flex>
      </Card>
    </Flex>
  )
}
