import Container from '@/src/components/layout/Container'
import Plans from '@/src/components/plan/Plans'
import UserForm from '@/src/components/user/UserForm'

export default function Settings() {
  return (
    <Container>
      <div className={'tw-prose'}>
        <h1>Settings</h1>
      </div>

      <div className={'tw-prose tw-mt-6 tw-mb-2'}>
        <h2>User</h2>
      </div>

      <UserForm />

      <div className={'tw-prose tw-mt-6 tw-mb-2'}>
        <h2>Plans</h2>
      </div>

      <Plans />
    </Container>
  )
}
