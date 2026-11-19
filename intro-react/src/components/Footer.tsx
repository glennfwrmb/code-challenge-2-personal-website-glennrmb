import { NavLink } from 'react-router';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface FooterNavItem {
  label: string;
  url: string;
}

const footerNavItems: FooterNavItem[] = [
  {
    label: 'Home',
    url: '#hero',
  },
  {
    label: 'About',
    url: '#about',
  },
  {
    label: 'Skills',
    url: '#skills',
  },
  {
    label: 'Projects',
    url: '#projects',
  },
  {
    label: 'Experience',
    url: '#experience',
  },
  {
    label: 'Testimonials',
    url: '#testimonials',
  },
  {
    label: 'Contact',
    url: '#contact',
  },
];

export default function Footer() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    if (!url.startsWith('#')) return;

    e.preventDefault();

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

  return (
    <footer className="flex flex-col items-start w-full h-fit gap-y-8 py-8 sm:py-10 lg:py-12 bg-[#171A24] border-t border-white/8">
      {/* FOOTER MAIN ROW */}
      <div className="flex flex-col items-center w-full h-fit gap-y-6 px-5 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0 lg:px-20">
        {/* GLENN RMB — ROLE */}
        <div className="flex flex-wrap items-center justify-center w-fit h-fit gap-x-2">
          <span className="w-fit h-fit font-jetbrains font-semibold text-xs text-[#F5F3EE] leading-4 tracking-[-0.16px]">
            GLENN RMB
          </span>

          <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-4 tracking-[-0.16px]">
            // FULL-STACK WEB DEVELOPER
          </span>
        </div>

        {/* CENTER NAVIGATION */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-nowrap items-center justify-center w-full max-w-none h-fit gap-x-3 sm:gap-x-5 lg:w-fit lg:gap-x-6"
        >
          {footerNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.url}
              onClick={(e) => handleScroll(e, item.url)}
              className="flex shrink-0 items-center justify-center w-fit h-fit"
            >
              <span className="w-fit h-fit font-jetbrains font-normal text-[10px] text-[#A5A7B0] leading-4 tracking-[-0.16px] transition-colors duration-200 hover:text-[#F5F3EE] sm:text-xs">
                {item.label.toUpperCase()}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* SOCIAL LINKS */}
        <div className="flex items-center justify-center w-fit h-fit gap-x-6">
          {/* GITHUB */}
          <NavLink
            to="https://github.com/glennfwrmb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-fit h-fit p-1"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5 text-[#A5A7B0] transition-colors duration-200 hover:text-[#F5F3EE]" />
          </NavLink>

          {/* LINKEDIN */}
          <NavLink
            to="https://www.linkedin.com/in/glenn-rmb-a266b4397/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-fit h-fit p-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 text-[#A5A7B0] transition-colors duration-200 hover:text-[#F5F3EE]" />
          </NavLink>

          {/* EMAIL */}
          <NavLink
            to="https://mail.google.com/mail/?view=cm&fs=1&to=glennrmb97@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-fit h-fit p-1"
            aria-label="Email"
          >
            <FaEnvelope className="w-5 h-5 text-[#A5A7B0] transition-colors duration-200 hover:text-[#F5F3EE]" />
          </NavLink>
        </div>
      </div>

      {/* HORIZONTAL BORDER + COPYRIGHT */}
      <div className="flex flex-col items-center justify-center w-full min-h-16 px-5 py-5 border-t border-white/8 sm:px-8 md:px-10">
        <p className="w-fit h-fit font-jetbrains font-normal text-[10px] text-[#A5A7B0] leading-5 tracking-[-0.16px] text-center sm:text-xs">
          © 2026 GLENN RMB. All rights reserved. Built with purpose.
        </p>
      </div>
    </footer>
  );
}