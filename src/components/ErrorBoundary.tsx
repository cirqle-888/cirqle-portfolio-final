import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    // Attempt to recover by resetting state
    this.setState({ hasError: false, error: undefined });
    // In a real app, you might also want to re-navigate or clear bad cache
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-md w-full liquid-glass-card refraction p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#A259FF]/10 to-[#4CC3FF]/10 blur-3xl rounded-full z-0 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h1 className="text-2xl font-bold mb-3 tracking-tight text-gray-900">
                Oops, something went wrong
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed">
                We apologize for the inconvenience. The application encountered an unexpected error.
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full rounded-full py-6 text-base bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 shadow-lg cursor-hover"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full rounded-full py-6 text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 cursor-hover"
                >
                  Reload Page
                </Button>
              </div>

              {this.state.error && (
                <div className="mt-8 text-left bg-gray-50 p-4 rounded-xl border border-gray-100 overflow-auto max-h-48 text-xs font-mono text-gray-800 shadow-inner">
                  <p className="font-semibold text-red-600 mb-2">{this.state.error.toString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
