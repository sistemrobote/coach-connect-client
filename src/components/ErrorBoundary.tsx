import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md">
            <h2 className="text-3xl font-extrabold text-strava-orange mb-6 tracking-tight">
              Something went wrong
            </h2>
            <p className="mb-4 text-gray-700">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <pre className="text-xs text-red-500 mb-2">
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
