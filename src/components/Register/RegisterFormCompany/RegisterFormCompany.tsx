import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Input } from 'components/Input'
import * as S from './RegisterFormCompany.styles'
import { Button } from 'components/Button'
import { Flex } from 'components/Flex'
import { Text } from 'components/Typography'
import { toast } from 'react-toastify'
import { Icon } from 'components/Icon'
import { cpf as isValidCNPJ } from 'cpf-cnpj-validator'
import { Sign } from 'crypto'
import { useState } from 'react'

interface FormData {
  razao_social: string
  nome_fantasia: string
  email: string
  password: string
  telefone: string
  cnpj: string
  endereco: string
  cidade: string
  bairro: string
  end_num: string
  cep: string
  uf: string
  descricao: string
}

export const RegisterFormCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()
  const [data, setData] = useState<any>()
  const formatCNPJ = (value: string) => {
    const cpf = value.replace(/\D/g, '')
    if (cpf.length <= 14) {
      return cpf.replace(
        /(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/,
        (_, p1, p2, p3, p4, p5) => {
          let formattedCPF = ''
          if (p1) {
            formattedCPF += p1
          }
          if (p2) {
            formattedCPF += `.${p2}`
          }
          if (p3) {
            formattedCPF += `.${p3}`
          }
          if (p4) {
            formattedCPF += `/${p4}`
          }
          if (p5) {
            formattedCPF += `-${p5}`
          }
          return formattedCPF
        },
      )
    }
    return value
  }

  const formatPhoneNumber = (value: string) => {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d)(\d{4})(\d{4})$/, '$1 $2-$3')
    return value
  }

  const formatCEP = (value: string) => {
    const cpf = value.replace(/\D/g, '')
    if (cpf.length <= 8) {
      return cpf.replace(/(\d{5})(\d{1,3})/, (_, p1, p2) => {
        let formattedCPF = ''
        if (p1) {
          formattedCPF += p1
        }
        if (p2) {
          formattedCPF += `-${p2}`
        }

        return formattedCPF
      })
    }
    return value
  }

  const handleFormSubmit = async (data: FormData) => {
    try {
      // if (!isValidCNPJ.isValid(data.cnpj)) {
      //   toast.error('CNPJ inválido', {
      //     icon: <Icon color='error' as='error' />,
      //     autoClose: 1500,
      //   })
      //   return
      // }

      const formattedCEP = data.cep.replace(/\D/g, '')
      if (formattedCEP.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${formattedCEP}/json/`,
          )
          setData(response.data)
          const { erro, error } = response.data
          if (erro || error.response.status === 400) {
            toast.error('Cep inválido', {
              icon: <Icon color='error' as='error' />,
              autoClose: 1500,
            })
          }
          return true
        } catch (error) {}
      }

      await axios.post('http://localhost:8050/empresa', data)
      toast.success('Cadastro feito com sucesso.', {
        icon: <Icon color='success' as='error' />,
        autoClose: 1500,
      })
      router.push('/login')
    } catch (error) {
      console.error(error)
      console.log(error)
      toast.error(
        'Erro ao efetuar o cadastro. Verifique suas credenciais e tente novamente.',
        {
          icon: <Icon color='error' as='error' />,
          autoClose: 1500,
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Flex gap={10} fill='both'>
        <Flex direction='column' gap={10}>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Nome
            </Text>
            <input
              type='text'
              placeholder='razao-social'
              {...register('razao_social', { required: true })}
            />
            {errors.razao_social && (
              <Text size='small' color='error'>
                <span>Preencha o razao-social</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Apelido
            </Text>
            <input
              type='text'
              placeholder='nome_fantasia'
              {...register('nome_fantasia', { required: true })}
            />
            {errors.nome_fantasia && (
              <Text size='small' color='error'>
                <span>Preencha o apelido</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Senha
            </Text>

            <input
              type='password'
              placeholder='Senha'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <Text size='small' color='error'>
                <span>Preencha a senha</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              CNPJ
            </Text>
            <input
              type='text'
              placeholder='cnpj'
              maxLength={18}
              {...register('cnpj', { required: true })}
              onChange={(e) => {
                e.target.value = formatCNPJ(e.target.value)
              }}
            />
            {errors.cnpj && (
              <Text size='small' color='error'>
                <span>Preencha o CNPJ</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Telefone
            </Text>
            <input
              type='text'
              placeholder='telefone'
              {...register('telefone', { required: true })}
              maxLength={14}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value)
              }}
            />
            {errors.telefone && (
              <Text size='small' color='error'>
                <span>Preencha o telefone</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              Endereço
            </Text>
            <input
              type='text'
              placeholder='endereco'
              {...register('endereco', { required: true })}
            />
            {errors.endereco && (
              <Text size='small' color='error'>
                <span>Preencha o endereco</span>
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex direction='column' gap={10}>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              cidade
            </Text>
            <input
              type='text'
              placeholder='cidade'
              {...register('cidade', { required: false })}
            />
            {errors.cidade && (
              <Text size='small' color='error'>
                <span>Preencha a cidade</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              bairro
            </Text>
            <input
              type='text'
              placeholder='bairro'
              {...register('bairro', { required: true })}
            />
            {errors.bairro && (
              <Text size='small' color='error'>
                <span>Preencha o bairro</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              numero
            </Text>
            <input
              type='number'
              placeholder='numero'
              {...register('end_num', { required: true })}
            />
            {errors.end_num && (
              <Text size='small' color='error'>
                <span>Preencha o numero</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              descricao
            </Text>
            <input
              type='text'
              placeholder='descricao'
              {...register('descricao', { required: true })}
            />
            {errors.descricao && (
              <Text size='small' color='error'>
                <span>Preencha a descricao</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              UF
            </Text>
            <input
              type='text'
              placeholder='uf'
              {...register('uf', { required: true })}
            />
            {errors.uf && (
              <Text size='small' color='error'>
                <span>Preencha o uf</span>
              </Text>
            )}
          </Flex>

          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              CEP
            </Text>
            <input
              type='text'
              placeholder='cep'
              maxLength={9}
              {...register('cep', { required: true })}
              onChange={(e) => {
                e.target.value = formatCEP(e.target.value)
              }}
            />
            {errors.cep && (
              <Text size='small' color='error'>
                <span>Preencha o cep</span>
              </Text>
            )}
          </Flex>
          <Flex direction='column'>
            <Text size='nano' weight='bold'>
              E-mail
            </Text>
            <input
              type='text'
              placeholder='Email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <Text size='small' color='error'>
                <span>Preencha o email</span>
              </Text>
            )}
          </Flex>
          <Button type='submit'>Cadastrar</Button>
        </Flex>
      </Flex>
    </form>
  )
}

// cadastrame