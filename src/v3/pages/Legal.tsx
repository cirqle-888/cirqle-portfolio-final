import { Helmet } from 'react-helmet-async';
import { CONTACT } from '../data';

const UPDATED = 'November 2026';

interface LegalProps {
  kicker: string;
  title: string;
  description: string;
  path: string;
  sections: [string, string][];
}

function LegalPage({ kicker, title, description, path, sections }: LegalProps) {
  return (
    <>
      <Helmet>
        <title>{kicker} | Cirqle</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://cirqle.work${path}`} />
      </Helmet>

      <section id="top" style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(40px, 4vw, 64px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <span className="kicker">{kicker}</span>
          <h1 className="h-l">{title}</h1>
          <p className="small">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(72px, 8vw, 120px)' }}>
        <div className="wrap">
          <div className="legal">
            {sections.map(([heading, body]) => (
              <div key={heading}>
                <h2>{heading}</h2>
                <p style={{ marginTop: 10 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <LegalPage
      kicker="Privacy"
      title="Privacy policy."
      path="/privacy"
      description="How Cirqle collects, uses and stores the details you share with us."
      sections={[
        [
          'What we collect',
          'When you contact us or send a request, we collect the details you give us: your name, phone number, email address and the message or files you share.',
        ],
        [
          'How we use it',
          'We use your details to reply to you, to prepare quotes and to deliver the work you ask for. We do not sell your information or share it with third parties for marketing.',
        ],
        [
          'Where it is stored',
          'Your information is stored in the systems we use to run Cirqle, with access limited to the team working on your account.',
        ],
        [
          'Cookies and analytics',
          'This website may use basic analytics to understand how pages are used. No personal profile is built from this data.',
        ],
        [
          'Your choices',
          `You can ask us to update or delete your information at any time by writing to ${CONTACT.email}.`,
        ],
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms of service."
      path="/terms"
      description="The terms Cirqle works under: scope, approvals, payment, ownership and compliance work."
      sections={[
        [
          'Scope of work',
          'Every project starts with a written brief or quote. Work outside that scope is quoted separately before we begin.',
        ],
        [
          'Approvals and revisions',
          'We share drafts for your approval. The number of revision rounds is stated in your quote. Approved work is treated as final.',
        ],
        [
          'Payment',
          'Payment terms are stated on each invoice. Recurring services are billed monthly. Final files are released once payment is received.',
        ],
        [
          'Ownership',
          'Once paid in full, you own the final deliverables created for you. Cirqle may show completed work in its portfolio unless you ask us not to.',
        ],
        [
          'Compliance services',
          'For accounts and compliance work, you are responsible for giving us complete and accurate records on time. Filing deadlines depend on receiving them.',
        ],
        ['Contact', `Questions about these terms can be sent to ${CONTACT.email}.`],
      ]}
    />
  );
}
