import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'src/components/ui/navigation-menu'

type GeneralLayoutProps = {
  children?: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  const { isAuthenticated, logIn, logOut } = useAuth()
  return (
    <>
      <header className="flex w-full justify-around">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={routes.home()}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={routes.loans()}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Loans
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={routes.debts()}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Debts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {!isAuthenticated ? (
          <button onClick={() => logIn()}>Login</button>
        ) : (
          <button onClick={() => logOut()}>Logout</button>
        )}
      </header>
      <main>{children}</main>
    </>
  )
}

export default GeneralLayout
