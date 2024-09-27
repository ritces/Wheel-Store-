import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { X, Menu, Bike, ShoppingCart } from 'lucide-react';
import Cart from '@/components/Cart'; // Import the Cart component

const products = [
  {
    Bike,
    name: 'Bycicles',
    description: 'Get a better understanding of your traffic',
    href: '/product/1',
    icon: Bike,
  },
  {
    name: 'Skis',
    description: 'Speak directly to your customers',
    href: '/product/2',
  },
  {
    name: 'Surfboards',
    description: 'Your customers data will be safe and secure',
    href: '/product/3',
  },
  {
    name: 'Roller Skates',
    description: 'Connect with third-party tools',
    href: '/product/4',
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-slate-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 bg-slate-50">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-24 w-auto"
              src={`${
                import.meta.env.VITE_SERVER
              }/uploads/marcus-store-icon.png`}
              alt=""
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      to="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Featuresssss
                    </Link>
                    <Link
                      to="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </Link>
                    <Link
                      to="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      to="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Pay
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden lg:flex lg:gap-x-12">
          <NavigationMenuList className="gap-x-4">
            <NavigationMenuItem>
              <Link
                to="/"
                className="text-[1rem] font-semibold leading-6 text-gray-900"
              >
                Products
              </Link>
            </NavigationMenuItem>

            {/* Administration */}
            <NavigationMenuItem>
              <Link
                to="/admin"
                className="text-[1rem] font-semibold leading-6 text-gray-900"
              >
                Administration
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            variant="ghost"
            onClick={() => setCartOpen(true)}
            className="text-[1rem] font-semibold leading-6 text-gray-900 "
          >
            <div className="flex items-center gap-x-2">
              <ShoppingCart />
              Cart
            </div>
          </Button>
        </div>
      </nav>

      {/* Add the Cart component here */}
      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Navbar;
