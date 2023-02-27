import { useState } from "react";
import useProtectedContent from "../hooks/useProtectedContent";
import bgImage from "../public/tamarack_org.jpg";
import Markdown from "./Markdown";
import NavItem from "./NavItem";

const Home = () => {
  const { content: header } = useProtectedContent("homepage.md");
  const { content: dresscode } = useProtectedContent("dresscode.md");

  // should be "home" to start
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          width: "100%",
          minHeight: "100vh",
          backgroundPositionY: "center",
        }}
      >
        <div
          className="mask"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <div className="d-flex justify-content-center align-items-center height-500-px text-white">
            {header && <Markdown markdown={header} />}
          </div>
          <div className="content">
            <div className="m-5 height-500-px">
              <div className="m-5 p-5 white-background">
                <div>
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

                {dresscode && activeSection === 1 && (
                  <Markdown markdown={dresscode} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
