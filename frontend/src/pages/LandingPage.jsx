import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Menu, X, ArrowRight, Zap, Download } from 'lucide-react';
import { landingPageStyles } from '../assets/dummystyle';
import { UserContext } from '../context/usercontext';
import { ProfileInfo } from '../components/cards';
import Modal from '../components/Modal.jsx';
import Login from '../components/Login';
import Signup from '../components/signup.jsx';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
      setMobileMenuOpen(false); // ✅ Close mobile menu if open
    } else {
      navigate('/dashboard');
    }
  };

  const stats = [
    { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
    { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
    { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className={landingPageStyles.container}>
      {/* Header */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          {/* Logo */}
          <div className={landingPageStyles.logoContainer} aria-label="Company Logo">
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} aria-hidden="true" />
            </div>
            <span className={landingPageStyles.logotext}>ResumeExpert</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} aria-hidden="true" />
            ) : (
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} aria-hidden="true" />
            )}
          </button>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center">
            {user ? (
              <ProfileInfo />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModal(true)}
              >
                <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenuContainer}>
            {user ? (
              <div className={landingPageStyles.mobileUserInfo}>
                <div className={landingPageStyles.mobileUserWelcome}>WELCOME BACK</div>
                <button
                  className={landingPageStyles.mobileDashboardButton}
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <button
                className={landingPageStyles.mobileAuthButton}
                onClick={handleCTA}
              >
                GET STARTED
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={landingPageStyles.main}>
        {/* Hero Section */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* Left Content */}
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>Professional Resume Builder</div>
              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft </span>
                <span className={landingPageStyles.headingGradient}>Professional </span>
                <span className={landingPageStyles.headingText}>Resumes</span>
              </h1>
              <p className={landingPageStyles.description}>
                Create job-winning resumes with expertly designed templates. ATS-friendly,
                recruiter-approved, and tailored to your career goals.
              </p>
              <div className={landingPageStyles.ctaButton}>
                <button className={landingPageStyles.primaryButton} onClick={handleCTA}>
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start Building
                    <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18} aria-hidden="true" />
                  </span>
                </button>
                <button className={landingPageStyles.secondaryButton} onClick={handleCTA}>
                  View Templates
                </button>
              </div>

              {/* Stats Grid */}
              <div className={landingPageStyles.statsContainer}>
                {stats.map((stat, idx) => (
                  <div className={landingPageStyles.statItem} key={idx}>
                    <div className={`${landingPageStyles.statNumber} ${stat.gradient}`}>
                      {stat.value}
                    </div>
                    <div className={landingPageStyles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Illustration */}
            <div className={landingPageStyles.heroIllustration} aria-hidden="true">
              <div className={landingPageStyles.heroIllustrationBg}></div>
              <div className={landingPageStyles.heroIllustrationContainer}></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={landingPageStyles.featuresSection}>
          <div className={landingPageStyles.featuresContainer}>
            <div className={landingPageStyles.featuresHeader}>
              <div className={landingPageStyles.featuresTitle}>
                Why Choose <span className={landingPageStyles.featuresTitleGradient}>ResumeExpert?</span>
              </div>
              <p className={landingPageStyles.featuresDescription}>
                Build your resume with expert suggestions for impactful design, tailored content,
                and professional presentation to maximize career opportunities
              </p>
            </div>

            <div className={landingPageStyles.featuresGrid}>
              {[
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: "Lightning Fast",
                  description: "Create professional resumes in under 5 minutes with our streamlined process",
                  gradient: landingPageStyles.featureIconViolet,
                  bg: landingPageStyles.featureCardViolet
                },
                {
                  icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                  title: "Pro Templates",
                  description: "Choose from dozens of recruiter-approved, industry-specific templates",
                  gradient: landingPageStyles.featureIconFuchsia,
                  bg: landingPageStyles.featureCardFuchsia
                },
                {
                  icon: <Download className={landingPageStyles.featureIcon} />,
                  title: "Instant Export",
                  description: "Download high-quality PDFs instantly with perfect formatting",
                  gradient: landingPageStyles.featureIconOrange,
                  bg: landingPageStyles.featureCardOrange
                }
              ].map((feature, index) => (
                <div key={index} className={`${landingPageStyles.featureCard} `}>
                  <div className={landingPageStyles.featureCardHover}></div>
                  <div className={`${landingPageStyles.featureCardContent} ${feature.bg} `}></div>
                  <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                    {feature.icon}
                  </div>
                  <h3 className={landingPageStyles.featureTitle}>{feature.title}</h3>
                  <p className={landingPageStyles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={landingPageStyles.ctaSection}>
          <div className={landingPageStyles.ctaContainer}>
            <div className={landingPageStyles.ctaCard}>
              <div className={landingPageStyles.ctaCardBg}></div>
              <div className={landingPageStyles.ctaCardContent}>
                <h3 className={landingPageStyles.ctaTitle}>
                  Ready to Create Your <span className={landingPageStyles.ctaTitleGradient}>StandOut Resume?</span>
                </h3>
                <p className={landingPageStyles.ctaDescription}>
                  Join Thousands of Professionals who landed their Dream job with our platforms
                </p>
                <button className={landingPageStyles.ctaButton} onClick={handleCTA}>
                  <div className={landingPageStyles.ctaButtonOverlay}></div>
                  <span className={landingPageStyles.ctaButtonText}>Start Building Now</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={landingPageStyles.footer}>
        <div className={landingPageStyles.footerContainer}>
          <p className={landingPageStyles.footerText}>
            Crafted with <span className={landingPageStyles.footerHeart}>❤️</span> by{' '}
            <a href="https://www.google.com">Google</a>
          </p>
        </div>
      </footer>

      {/* Modal for Login and Signup */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login');
        }}
        hideheader
      >
        <div>
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
