import react from "react";

const NavItem = ({ children, id, activeSection, setActiveSection }) => {
  return (
    <>
      <button
        key={id}
        color={activeSection === id ? "light" : "success"}
        onClick={() => setActiveSection(id)}
      >
        {children}
      </button>
    </>
  );
};
export default NavItem;
