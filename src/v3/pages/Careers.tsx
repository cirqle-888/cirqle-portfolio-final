import { Helmet } from 'react-helmet-async';
import { CONTACT } from '../data';
import { ArrowRight, ServiceIcon } from '../icons';

const ROLES: [string, string][] = [
  ['Graphic Designers', 'Design'],
  ['Video Editors', 'Video'],
  ['Social Media Creators', 'Social Media'],
  ['Ads Specialists', 'Meta Ads'],
  ['Web Developers', 'Websites'],
  ['Accountants', 'Bookkeeping'],
];

export function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | Cirqle</title>
        <meta
          name="description"
          content="Work with Cirqle — a remote, flexible team across creative, digital and accounts. See the roles we hire for and apply."
        />
        <link rel="canonical" href="https://cirqle.work/careers" />
      </Helmet>

      <section id="top" style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(40px, 4vw, 64px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <span className="kicker">Careers</span>
          <h1 className="h-xl">
            Work with{' '}
            <span className="ital acc" style={{ fontWeight: 500 }}>
              Cirqle.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 560 }}>
            We are a remote, flexible team working across creative, digital and accounts. If you do good work and keep
            your word on deadlines, we would like to hear from you.
          </p>
          <a className="btn btn-dark" href={CONTACT.applyUrl}>
            Apply now <ArrowRight />
          </a>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(72px, 8vw, 120px)' }}>
        <div className="wrap">
          <h2 className="h-l" style={{ marginBottom: 28 }}>
            Roles we hire for.
          </h2>
          <div className="roles">
            {ROLES.map(([role, icon]) => (
              <div className="role" key={role}>
                <span className="mico">
                  <ServiceIcon name={icon} size={22} />
                </span>
                {role}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact">
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 22,
                maxWidth: 640,
              }}
            >
              <h2 className="h-l" style={{ color: '#fff' }}>
                Send us your portfolio.
              </h2>
              <p className="lead" style={{ color: 'rgba(255,255,255,.75)' }}>
                A short application form. We reply to every applicant.
              </p>
              <a className="btn btn-acc" href={CONTACT.applyUrl}>
                Apply now <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
