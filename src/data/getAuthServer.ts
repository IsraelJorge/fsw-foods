import { authConfig } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export const getAuthServer = async () => {
  const session = await getServerSession(authConfig)
  const auth = session ? session.user : null

  return auth
}
