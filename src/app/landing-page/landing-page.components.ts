import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-container">
      <header class="header">
        <div class="logo">SkillsMatch AI</div>
        <nav class="nav">
          <a [routerLink]="['/auth/login']" class="nav-link">Login</a>
          <a [routerLink]="['/auth/signup']" class="nav-link primary"
            >Sign Up</a
          >
        </nav>
      </header>

      <main class="hero">
        <div class="hero-content">
          <h1>Find Your Perfect Job Match</h1>
          <p>
            AI-powered job matching platform connecting skilled professionals
            with their dream careers
          </p>
          <div class="cta-buttons">
            <button [routerLink]="['/auth/signup']" class="btn primary">
              Get Started
            </button>
            <button [routerLink]="['/auth/login']" class="btn secondary">
              Login
            </button>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="assets/hero.jpg"
            alt="Professional Team Collaboration"
            class="hero-img"
          />
        </div>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>About Us</h3>
            <p>
              SkillsMatch AI helps professionals find their perfect career match
              using advanced AI technology.
            </p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a [routerLink]="['/auth/login']">Login</a></li>
              <li><a [routerLink]="['/auth/signup']">Sign Up</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contact</h3>
            <p>Email: emmanuelkipkoech742&#64;gmail.com</p>
            <p>Phone: 0712375082</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 SkillsMatch AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .landing-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%);
        display: flex;
        flex-direction: column;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 5%;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2196f3;
      }

      .nav {
        display: flex;
        gap: 1rem;
      }

      .nav-link {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #333;
        border-radius: 4px;
        transition: all 0.3s ease;

        &.primary {
          background: #2196f3;
          color: white;
        }

        &:hover {
          background: #f0f0f0;
        }
      }

      .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4rem 5%;
        max-width: 1200px;
        margin: 0 auto;
        gap: 2rem;
        flex: 1;
      }

      .hero-content {
        flex: 1;
        max-width: 600px;

        h1 {
          font-size: 3rem;
          color: #2196f3;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }
      }

      .hero-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hero-img {
        max-width: 100%;
        height: auto;
        animation: float 6s ease-in-out infinite;
      }

      .cta-buttons {
        display: flex;
        gap: 1rem;
      }

      .btn {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &.primary {
          background: #2196f3;
          color: white;
        }

        &.secondary {
          background: transparent;
          border: 2px solid #2196f3;
          color: #2196f3;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
        }
      }

      .footer {
        background: #fff;
        padding: 3rem 5% 1rem;
        margin-top: auto;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .footer-section {
        h3 {
          color: #2196f3;
          margin-bottom: 1rem;
        }

        p,
        li {
          color: #666;
          line-height: 1.6;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            margin-bottom: 0.5rem;
          }

          a {
            color: #666;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: #2196f3;
            }
          }
        }
      }

      .footer-bottom {
        text-align: center;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
        color: #666;
      }

      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      @media (max-width: 768px) {
        .hero {
          flex-direction: column;
          text-align: center;
        }

        .cta-buttons {
          justify-content: center;
        }

        .hero-content {
          margin-bottom: 2rem;
        }

        .hero-image {
          order: -1;
        }

        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
    `,
  ],
})
export class LandingPageComponent {}
