import { Link } from "gatsby";
import * as React from "react";
import CookieConsent from "react-cookie-consent";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        ← {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>

      <main>{children}</main>

      <footer>
        <ol>
          <li>
            <Link to="/privacy-policy/">Privacy Policy</Link> |
          </li>
          <li>
            <Link to="/cookie-policy/">Cookie Policy</Link> |
          </li>
          <li>
            <Link to="/terms-of-use/">Terms of Use</Link> |
          </li>
          <li>© {new Date().getFullYear()} J. Patrick Fulton</li>
        </ol>
      </footer>

      <CookieConsent
        disableStyles={true}
        buttonText="Accept"
        buttonClasses="cookie-consent-button"
        containerClasses="cookie-consent-container"
        contentClasses="cookie-consent-content"
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};

export default Layout;
