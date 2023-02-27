import react from "react";

const NavItem = ({ children, id, activeSection, setActiveSection }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary me-2"
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
