import { Link } from 'react-router-dom';
import { ART, CONTACT, DIVISIONS, DIVISION_ORDER, TAGLINE } from './data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="fgrid">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <Link to="/" aria-label="Cirqle home" className="cq-logo">
              <img src={ART.logo} alt="Cirqle" />
            </Link>
            <p className="small" style={{ maxWidth: 320 }}>
              Creative, digital and accounts services for growing businesses. One team, one point of contact.
            </p>
          </div>

          <div>
            <p className="outfit" style={{ fontSize: 15, fontWeight: 600 }}>
              Services
            </p>
            <ul className="flist">
              {DIVISION_ORDER.map((key) => (
                <li key={key}>
                  <Link className="ul" to={DIVISIONS[key].path}>
                    {DIVISIONS[key].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="ul" to="/services">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="outfit" style={{ fontSize: 15, fontWeight: 600 }}>
              Company
            </p>
            <ul className="flist">
              <li>
                <Link className="ul" to="/work">
                  Work
                </Link>
              </li>
              <li>
                <Link className="ul" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="ul" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="ul" to="/careers">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="outfit" style={{ fontSize: 15, fontWeight: 600 }}>
              Connect
            </p>
            <ul className="flist">
              <li>
                <a className="ul" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a className="ul" href={CONTACT.whatsapp}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="ul" href={CONTACT.instagram}>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottom">
          <p>© {new Date().getFullYear()} Cirqle Works. All rights reserved.</p>
          <p>{TAGLINE}</p>
          <p>
            <Link className="ul" to="/privacy">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link className="ul" to="/terms">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
