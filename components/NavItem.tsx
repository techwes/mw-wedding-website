import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

interface Props {
  path: string;
  buttonClass?: string;
}

const NavItem: React.FunctionComponent<PropsWithChildren<Props>> = ({
  path,
  children,
  buttonClass = "",
}) => {
  const router = useRouter();
  const isActiveLink = router.pathname === path;
  return (
    <>
      <Link
        href={path}
        className={`btn btn-link ${buttonClass} me-2 mb-2 nav-item`}
        color={isActiveLink ? "light" : "success"}
      >
        {children}
      </Link>
    </>
  );
};
export default NavItem;
