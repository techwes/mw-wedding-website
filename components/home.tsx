import { useState } from "react";
import useProtectedContent from "../hooks/useProtectedContent";
import Markdown from "./Markdown";
import NavItem from "./NavItem";
import Link from "next/link";

const Home = () => {
  const { content: dresscode } = useProtectedContent("dresscode.md");
  const { content: home } = useProtectedContent("main.md");
  const { content: about } = useProtectedContent("about.md");
  const { content: registry } = useProtectedContent("registry.md");

  // should be "home" to start
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <div className="mb-4">
        <NavItem
          id={0}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          Home
        </NavItem>
        <NavItem
          id={1}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          Dress Code
        </NavItem>
        <NavItem
          id={2}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          About Us
        </NavItem>
        <NavItem
          id={3}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          Registry
        </NavItem>
      </div>

      {home && activeSection === 0 && (
        <>
          <h1>RSVP</h1>
          <Link href="/rsvp">RSVP here</Link>
          <Markdown markdown={home} />
        </>
      )}
      {dresscode && activeSection === 1 && <Markdown markdown={dresscode} />}
      {about && activeSection === 2 && <Markdown markdown={about} />}
      {registry && activeSection === 3 && <Markdown markdown={registry} />}
    </>
  );
};

export default Home;
