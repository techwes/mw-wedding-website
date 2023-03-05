import { PropsWithChildren } from "react";
import useProtectedContent from "../hooks/useProtectedContent";
import bgImage from "../public/tamarack_org.jpg";
import Markdown from "./Markdown";
import NavItem from "./NavItem";

const Layout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { content: header } = useProtectedContent("header.md");
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
          <header className="d-flex justify-content-center align-items-center height-500-px text-white">
            {header && <Markdown markdown={header} />}
          </header>
          <div className="content">
            <div className="m-5 height-500-px">
              <div className="m-5 p-5 white-background">
                <div className="mb-4">
                  <NavItem path="/">The Wedding!</NavItem>
                  <NavItem path="/dresscode">Dress Code</NavItem>
                  <NavItem path="/about">M &amp; W</NavItem>
                  <NavItem path="/registry">Registry</NavItem>
                </div>
                {children}
                <div className="m-5">Madalyn &amp; Wesley 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
