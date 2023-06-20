import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from 'src/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'

type GeneralLayoutProps = {
  children?: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  const { isAuthenticated, logIn, logOut, currentUser } = useAuth()
  console.log(currentUser)
  return (
    <div className="container">
      <header className="border-b-1 border-grey-500 flex w-full justify-around rounded-md border-solid py-1">
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
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={currentUser.imageUrl as string}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {(currentUser.firstName as string)[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="flex flex-col">
                <button onClick={() => logOut()}>Logout</button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </header>
      <main className="mt-10">{children}</main>
    </div>
  )
}

export default GeneralLayout
