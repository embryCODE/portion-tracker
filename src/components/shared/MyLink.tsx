import classNames from 'classnames'
import Link from 'next/link'
import { HTMLProps, Ref } from 'react'
import { UrlObject } from 'url'

import useIsCurrentLocation from '@/src/hooks/useIsCurrentLocation'

interface MyLinkProps
  extends Omit<HTMLProps<HTMLAnchorElement>, 'href' | 'ref'> {
  activeClassName?: string
  href: string | UrlObject
  ref?: Ref<HTMLAnchorElement> | undefined
}

const MyLink = ({
  activeClassName,
  className,
  children,
  href,
  ...rest
}: MyLinkProps) => {
  const isCurrentLocation = useIsCurrentLocation()

  return (
    <Link
      className={classNames(
        className,
        isCurrentLocation(href) ? activeClassName : ''
      )}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default MyLink
