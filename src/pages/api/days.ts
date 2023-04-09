import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/container'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret })

  if (!token?.sub) {
    res.status(401).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const days = await container.getDayByDate(
        token.sub,
        req.query.date as string
      )

      if (!days.ok) {
        res.status(400).json(days.error.message)
        return
      }

      res.json(days.value)
      return
    }

    if (req.method === 'POST') {
      const days = await container.createOrUpdateDay(token.sub, req.body)

      if (!days.ok) {
        res.status(400).json(days.error.message)
        return
      }

      res.json(days.value)
      return
    }

    if (req.method === 'DELETE') {
      const days = await container.deleteDay(req.body.id)

      if (!days.ok) {
        res.status(400).json(days.error.message)
        return
      }

      res.status(204).end()
      return
    }

    res.status(405).end()
  } catch (e) {
    console.error(e)
    res.status(400).send('Unknown error')
    return
  }
}
