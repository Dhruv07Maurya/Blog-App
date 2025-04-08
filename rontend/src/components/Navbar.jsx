import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu"; // Assuming you're importing UI components from your custom path

const Navbar = () => {
  return (
    
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-black">
              Navigate To
            </NavigationMenuTrigger>
            <NavigationMenuContent >
              {/* Use Link from react-router-dom for routing */}
              <Link to="/signup">
                <NavigationMenuLink>Register</NavigationMenuLink>
              </Link>
              <br />
              <Link to="/">
                <NavigationMenuLink>Login</NavigationMenuLink>
              </Link>
              <br />
              <Link to="/dashboard/reads">
                <NavigationMenuLink >Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
