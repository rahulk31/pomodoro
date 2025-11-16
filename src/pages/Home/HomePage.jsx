import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import {
  IoTimerOutline,
  IoCheckmarkCircleOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

const HomePage = () => {
  return (
    <>
      <div className="main-home">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Pomodoro Timer <span className="emoji">🍅</span>
            </h1>
            <p className="hero-subtitle">
              Boost your productivity with the proven time management technique
            </p>

            <div className="features-grid">
              <div className="feature-card">
                <IoTimerOutline className="feature-icon" />
                <h3>Focused Work Sessions</h3>
                <p>25-minute focused work intervals for maximum productivity</p>
              </div>

              <div className="feature-card">
                <IoCheckmarkCircleOutline className="feature-icon" />
                <h3>Regular Breaks</h3>
                <p>Short breaks to recharge and maintain mental clarity</p>
              </div>

              <div className="feature-card">
                <IoTrendingUpOutline className="feature-icon" />
                <h3>Track Progress</h3>
                <p>Monitor your tasks and build consistent work habits</p>
              </div>
            </div>

            <div className="how-it-works">
              <h2>How It Works</h2>
              <div className="steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <p>Choose a task you want to work on</p>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <p>Set the timer and focus for 25 minutes</p>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <p>Take a 5-minute break when the timer rings</p>
                </div>
                <div className="step">
                  <span className="step-number">4</span>
                  <p>After 4 pomodoros, take a longer 15-30 minute break</p>
                </div>
              </div>
            </div>

            <Link to="/tasks" className="cta-link">
              <button className="btn-home">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
