import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/container'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret })
  let date: Date

  try {
    // The date comes from the query as YYYY-MM-DD, so I construct a UTC date
    // object server-side right here.
    date = new Date(req.query.date as string)
  } catch {
    res.status(400).send('Invalid date')
    return
  }

  if (!token?.sub) {
    res.status(401).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const days = await container.getDayByDate(token.sub, date)

      if (days.isFailure) {
        res.status(400).json(days.getError().message)
        return
      }

      res.json(days.getValue())
      return
    }

    if (req.method === 'POST') {
      const day = await container.createOrUpdateDay(token.sub, req.body)

      if (day.isFailure) {
        res.status(400).json(day.getError().message)
        return
      }

      res.json(day.getValue())
      return
    }

    if (req.method === 'DELETE') {
      const days = await container.deleteDay(req.body.id)

      if (days.isFailure) {
        res.status(400).json(days.getError().message)
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
