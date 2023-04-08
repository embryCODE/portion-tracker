import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/core/container'
import { validateDay } from '@/src/core/entities/day'

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
      const dateString = req.query.date

      if (typeof dateString !== 'string') {
        res.status(400).send('Invalid date')
        return
      }

      const date = new Date(dateString)
      const days = await container.getDayByDate(token.sub, date)

      if (!days.ok) {
        res.status(400).json(days.error.message)
        return
      }

      res.json(days.value)
      return
    }

    if (req.method === 'POST') {
      const validatedDay = validateDay(req.body)

      if (!validatedDay.ok) {
        res.status(400).json(validatedDay.error.message)
        return
      }

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
