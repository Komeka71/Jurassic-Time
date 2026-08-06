import { Component } from "react";

export default class DebugErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, componentStack: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // info.componentStack tells you exactly which component tree
    // was rendering when it threw.
    this.setState({ componentStack: info.componentStack });
    console.error("DebugErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            background: "#1a0000",
            color: "#ff6b6b",
            padding: "24px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            minHeight: "100vh",
            overflow: "auto",
          }}
        >
          <h1 style={{ color: "#ff4444" }}>💥 Render crash caught</h1>

          <h3 style={{ color: "#ffaaaa" }}>error.message</h3>
          <div>{String(this.state.error.message)}</div>

          <h3 style={{ color: "#ffaaaa" }}>error.stack</h3>
          <div>{String(this.state.error.stack)}</div>

          <h3 style={{ color: "#ffaaaa" }}>componentStack</h3>
          <div>{this.state.componentStack}</div>
        </div>
      );
    }

    return this.props.children;
  }
}