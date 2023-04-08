import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { container } from '@/src/core/container'
import { validatePlan } from '@/src/core/entities/plan'

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
      const plans = await container.getAllPlansByUserId(token.sub)

      if (!plans.ok) {
        res.status(400).json(plans.error.message)
        return
      }

      res.json(plans.value)
      return
    }

    if (req.method === 'POST') {
      const validatedPlan = validatePlan(req.body)

      if (!validatedPlan.ok) {
        res.status(400).json(validatedPlan.error.message)
        return
      }

      const plans = await container.createOrUpdatePlan(token.sub, req.body)

      if (!plans.ok) {
        res.status(400).json(plans.error.message)
        return
      }

      res.json(plans.value)
      return
    }

    res.status(405).end()
  } catch (e) {
    console.error(e)
    res.status(400).send('Unknown error')
    return
  }
}
