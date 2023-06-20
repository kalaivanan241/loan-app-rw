import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { Button } from 'src/components/ui/button'

export type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="flex items-center justify-between py-3">
        <h1 className="text-xl font-bold no-underline">
          <Link
            to={routes[titleTo]()}
            className="text-gray-800 no-underline hover:underline"
          >
            {title}
          </Link>
        </h1>
        <Link to={routes[buttonTo]()}>
          <Button>
            <div>+</div> {buttonLabel}
          </Button>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default ScaffoldLayout
