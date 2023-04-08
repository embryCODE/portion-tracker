import Container from '@/src/components/layout/Container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="tw-border-solid tw-border-t-2 tw-border-protein tw-bg-gray-100">
        <Container>
          <div className="tw-flex tw-justify-center">
            <small>&copy; {currentYear} embryCODE</small>
          </div>
        </Container>
      </div>
    </footer>
  )
}
