import classNames from 'classnames'
import { ReactNode } from 'react'

const Container = ({
  children,
  isProse,
}: {
  children: ReactNode
  isProse?: boolean
}) => (
  <div
    className={classNames(
      'tw-mx-auto tw-max-w-6xl tw-px-4 tw-py-4 lg:tw-px-8',
      isProse && 'tw-prose'
    )}
  >
    {children}
  </div>
)

export default Container
