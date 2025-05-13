import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Что-то пошло не так!</h2>
          <p>Попробуйте обновить страницу или обратитесь в поддержку.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;