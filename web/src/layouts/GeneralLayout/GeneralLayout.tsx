import { Link, routes } from '@redwoodjs/router'

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
  return (
    <>
      <header>
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
      </header>
      <main>{children}</main>
    </>
  )
}

export default GeneralLayout
