import { PropsWithChildren } from "react";
import useProtectedContent from "../hooks/useProtectedContent";
import bgImage from "../public/tamarack_org.jpg";
import Markdown from "./Markdown";
import NavItem from "./NavItem";

const Layout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { content: header } = useProtectedContent("header.md");
  return (
    <div className="Layout">
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
          <header className="text-white Layout-header">
            {header && (
              <Markdown
                className="d-flex justify-content-center align-items-center flex-column h-100"
                markdown={header}
              />
            )}
          </header>
          <div className="content">
            <div className="m-lg-3 height-500-px">
              <div className="m-lg-3 p-3 p-md-5 white-background">
                <div className="mb-3 text-center">
                  <NavItem path="/">The Wedding!</NavItem>
                  <NavItem path="/dresscode">Dress Code</NavItem>
                  <NavItem path="/about">M &amp; W</NavItem>
                  <NavItem path="/registry">Registry</NavItem>
                  <NavItem path="/rsvp" buttonClass="btn-success">
                    RSVP Here
                  </NavItem>
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
