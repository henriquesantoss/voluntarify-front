import axios from 'axios'
import { Card } from 'components/Card'
import { Flex } from 'components/Flex'
import { Sidebar } from 'components/Layout/Sidebar'
import { Text } from 'components/Typography'
import jwt from 'jsonwebtoken'
import React, { useState, useEffect } from 'react'

interface Vaga {
  id: number
  titulo: string
  descricao: string
}

interface FavoritoData {
  id: number
  Vaga: Vaga
}

const Favorito = () => {
  const [favoriteVagas, setFavoriteVagas] = useState<FavoritoData[]>([])

  const [userId, setUserId] = useState<number>()
  useEffect(() => {
    const fetchData = () => {
      const token: string | null = localStorage.getItem('accessToken')
      try {
        console.log('token=> ', token)
        if (token) {
          const decodedToken: any = jwt.decode(token)

          setUserId(decodedToken.id)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchFavoriteVagas = async () => {
      try {
        const response = await axios.get<FavoritoData[]>(
          ` https://voluntarify-api.onrender.com/favoritos/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
        )
        setFavoriteVagas(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchFavoriteVagas()
  },[userId])

  return (
    <Flex direction='column' gap={20}>
      <Flex fill='horizontal' style={{ position: 'fixed' }}>
        <Sidebar />
      </Flex>
      <h2>Vagas Favoritas</h2>
      {favoriteVagas.length === 0 ? (
        <p>Nenhuma vaga favorita encontrada.</p>
      ) : (
        favoriteVagas.map((favorito) => (
          <Card title={`titulo: ${favorito.Vaga.titulo}`} key={favorito.id}>
            <Text>{`Descrição: ${favorito.Vaga.descricao}`}</Text>
          </Card>
        ))
      )}
    </Flex>
  )
}

export default Favorito
