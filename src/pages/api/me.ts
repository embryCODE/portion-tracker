import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/core/container'
import { validateUserName } from '@/src/core/entities/user'

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
      const user = await container.getUserById(token.sub)

      if (!user.ok) {
        res.status(400).json(user.error.message)
        return
      }

      res.json(user.value)
      return
    }

    if (req.method === 'PUT') {
      const validatedUserName = validateUserName(req.body.name)

      if (!validatedUserName.ok) {
        res.status(400).json(validatedUserName.error.message)
        return
      }

      const user = await container.updateUserName(
        token.sub,
        validatedUserName.value
      )

      if (!user.ok) {
        res.status(400).json(user.error.message)
        return
      }

      res.json(user.value)
      return
    }

    res.status(405).end()
  } catch (e) {
    console.error(e)
    res.status(400).send('Unknown error')
    return
  }
}
