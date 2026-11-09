import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Keeps a render failure from blanking the page. */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  public render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section style={{ padding: 'clamp(120px, 14vw, 190px) 0' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
          <span className="kicker">Something went wrong</span>
          <h1 className="h-l">This page did not load.</h1>
          <p className="lead" style={{ maxWidth: 460 }}>
            Reload the page to try again. If it keeps happening, write to team@cirqle.work and we will sort it out.
          </p>
          <button type="button" className="btn btn-dark" onClick={() => window.location.reload()}>
            Reload the page
          </button>
        </div>
      </section>
    );
  }
}
