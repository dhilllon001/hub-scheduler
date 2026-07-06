import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ fontSize: 18, color: '#0f1a2a' }}>Something went wrong</h1>
          <p style={{ fontSize: 13, color: '#6b7685', marginTop: 8 }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            className="btn btn--primary"
            style={{ marginTop: 20 }}
            onClick={() => window.location.assign('/')}
          >
            Return to hub
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
