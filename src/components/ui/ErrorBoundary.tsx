import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected rendering issue occurred.',
    };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Sanctuary ErrorBoundary caught:', error, info);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-12 max-w-xl rounded-xl border border-sanctuary-brown/15 bg-sanctuary-parchment p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
            {this.props.fallbackTitle || 'Unable to load this sanctuary view'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
            {this.state.errorMessage}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream transition-colors hover:bg-sanctuary-burgundy-deep"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Retry View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
