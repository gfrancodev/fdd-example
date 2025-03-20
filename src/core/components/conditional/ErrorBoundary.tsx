import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Component for catching and handling rendering errors
 * Prevents an error in one component from crashing the entire application
 * 
 * @param children Components to be monitored for errors
 * @param fallback Content to be rendered when an error occurs
 *                 Can be a ReactNode or a function that receives the error and returns a ReactNode
 */
class ErrorBoundary extends React.Component<Core.Component.ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: Core.Component.ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!);
      }
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;