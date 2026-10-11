
import { NavLink } from 'react-router';
import grLogo from '../image/gr-logo.svg';
import arrowUpRight from '../image/arrow-up-right.svg';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface NavbarItem {
  label: string;
  url: string;
}

const navbarItems: NavbarItem[] = [
  { label: 'Home', url: '#hero' },
  { label: 'About', url: '#about' },
  { label: 'Skills', url: '#skills' },
  { label: 'Projects', url: '#projects' },
  { label: 'Experience', url: '#experience' },
  { label: 'Testimonials', url: '#testimonials' },
];

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (url: string) => {
    if (url === '#hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    const section = document.querySelector(url);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavbarItem,
  ) => {
    e.preventDefault();
    handleScroll(item.url);
    setActiveNav(item.label);
    setIsMenuOpen(false);
  };

  const handleContactClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    handleScroll('#contact');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScrollPosition = () => {
      let currentSection = 'Home';

      navbarItems.forEach((item) => {
        const section = document.querySelector(item.url);

        if (section && section.getBoundingClientRect().top <= 100) {
          currentSection = item.label;
        }
      });

      setActiveNav(currentSection);
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  return (
    <header className="relative z-100 w-full bg-[#171A24] border border-[#FFFFFF]/8 backdrop-blur-md">
      <nav className="flex items-center justify-between w-full h-20 px-5 md:px-8 lg:px-20">
        {/* LOGO */}
        <div className="flex items-center shrink-0">
          <NavLink to="/" className="flex items-center gap-1">
            <img
              src={grLogo}
              alt="GR Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-jetbrains text-sm font-semibold leading-5 tracking-[1.4px] text-[#F5F3EE]">
              GLENN RMB
            </span>
          </NavLink>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center w-fit h-fit gap-1 px-1.5 py-1.5 bg-white/8 border border-white/20 backdrop-blur-md rounded-full shadow-[0_4px_20px_-2px_#00000040]">
          {navbarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.url}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex items-center justify-center w-fit h-fit px-3.5 py-1.5 rounded-full transition-colors ${
                activeNav === item.label
                  ? 'bg-[#E85D2A] shadow-[0_1px_2px_0_#0000000D]'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="font-jetbrains font-medium text-xs text-white leading-4 tracking-[0.6px]">
                {item.label.toUpperCase()}
              </span>
            </NavLink>
          ))}
        </div>

        {/* DESKTOP CONTACT */}
        <div className="hidden lg:flex items-center justify-end">
          <NavLink
            to="#contact"
            onClick={handleContactClick}
            className="flex items-center justify-between gap-2 px-6 py-3 rounded-full bg-[#F45B3C] border border-[#FFFFFF]/20 shadow-[0_1px_2px_0_#0000000D]"
          >
            <span className="font-space text-sm text-white font-medium leading-3.5 tracking-[-0.16px]">
              Get in touch with us
            </span>
            <img
              src={arrowUpRight}
              alt=""
              className="w-4 h-4 -translate-y-px"
            />
          </NavLink>
        </div>

        {/* MOBILE AND TABLET CONTROLS */}
        <div className="flex lg:hidden items-center gap-3">
          <NavLink
            to="#contact"
            onClick={handleContactClick}
            className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full bg-[#F45B3C] border border-[#FFFFFF]/20"
          >
            <span className="font-space text-xs md:text-sm text-white font-medium">
              Contact
            </span>
            <img
              src={arrowUpRight}
              alt=""
              className="w-3.5 h-3.5"
            />
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center shrink-0 w-10 h-10 text-[#F5F3EE] border border-white/20 rounded-full"
          >
            {isMenuOpen ? (
              <FaTimes className="w-4 h-4" />
            ) : (
              <FaBars className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE AND TABLET MENU */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 flex flex-col w-full px-5 md:px-8 py-4 gap-1 bg-[#171A24] border-b border-white/10 shadow-lg lg:hidden">
          {navbarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.url}
              onClick={(e) => handleNavClick(e, item)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                activeNav === item.label
                  ? 'bg-[#E85D2A] text-white'
                  : 'text-[#A5A7B0] hover:bg-white/10'
              }`}
            >
              <span className="font-jetbrains text-xs font-medium tracking-[0.6px]">
                {item.label.toUpperCase()}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
