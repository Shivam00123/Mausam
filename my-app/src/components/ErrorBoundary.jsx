import { Component } from "react";
import Error from "../assets/Images/error.gif";
import "../style/errorBoundary.css";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  removeError = () => {
    this.setState({ hasError: false });
  };

  render() {
    return (
      <>
        {this.state.hasError ? (
          <div className="errorWrapper">
            <div className="errorContainer">
              <img src={Error} alt="error-pic" />
            </div>
            <button onClick={() => this.removeError()} className="backButton">
              Go Back
            </button>
          </div>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
