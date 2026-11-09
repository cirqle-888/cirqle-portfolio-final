import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CONTACT } from '../data';
import { ArrowRight, ServiceIcon } from '../icons';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/** Submits to the same Formspree form the live site uses. */
export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch(CONTACT.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact | Cirqle</title>
        <meta
          name="description"
          content="Tell Cirqle what you need — creative, digital or accounts. Send a message and we reply within one working day."
        />
        <link rel="canonical" href="https://cirqle.work/contact" />
      </Helmet>

      <section id="top" style={{ padding: 'clamp(140px, 14vw, 190px) 0 clamp(40px, 4vw, 64px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <span className="kicker">Contact</span>
          <h1 className="h-xl">
            Tell us what{' '}
            <span className="ital acc" style={{ fontWeight: 500 }}>
              you need.
            </span>
          </h1>
          <p className="lead" style={{ maxWidth: 520 }}>
            Send a message and we will reply within one working day.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(72px, 8vw, 120px)' }}>
        <div className="wrap">
          <div className="cg">
            <div className="ways">
              <a className="way" href={`mailto:${CONTACT.email}`}>
                <span className="mico">
                  <ServiceIcon name="Mail" size={24} />
                </span>
                <span>
                  <b>Email</b>
                  <span className="small">{CONTACT.email}</span>
                </span>
              </a>
              <a className="way" href={CONTACT.whatsapp}>
                <span className="mico">
                  <ServiceIcon name="Social Media" size={24} />
                </span>
                <span>
                  <b>WhatsApp</b>
                  <span className="small">Chat with us</span>
                </span>
              </a>
            </div>

            <form className="form" onSubmit={submit}>
              <div className="frow">
                <label className="fld">
                  Name
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label className="fld">
                  Phone
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>
              <label className="fld">
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="fld">
                Service
                <select name="service" defaultValue="Creative">
                  <option>Creative</option>
                  <option>Digital</option>
                  <option>Accounts &amp; Compliance</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="fld">
                Message
                <textarea name="message" />
              </label>
              <input type="hidden" name="_subject" value="New enquiry from cirqle.work" />

              <button
                type="submit"
                className="btn btn-dark"
                style={{ alignSelf: 'flex-start' }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight />
              </button>

              {status === 'sent' && (
                <p className="small" role="status" style={{ color: '#13744E', fontWeight: 600 }}>
                  Thank you. We have your message and will reply within one working day.
                </p>
              )}
              {status === 'failed' && (
                <p className="small" role="alert" style={{ color: '#8F1C62', fontWeight: 600 }}>
                  That did not send. Please email {CONTACT.email} or message us on WhatsApp.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
