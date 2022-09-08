import { Navbar } from "flowbite-react";

const NavbarCustom = (props) => {
  return (
    <Navbar fluid={true} border={true}>
      <Navbar.Brand href='https://flowbite.com/'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          {props.title}
        </span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarCustom;
