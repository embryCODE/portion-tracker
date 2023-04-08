import Container from '@/src/components/layout/Container'
import TrackerComponent from '@/src/components/tracker/Tracker'

export default function Tracker() {
  return (
    <Container>
      <div className={'tw-prose tw-mb-2'}>
        <h1>Tracker</h1>
      </div>

      <TrackerComponent />
    </Container>
  )
}
