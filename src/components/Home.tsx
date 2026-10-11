
import { NavLink } from 'react-router';
import glennLandscape from '../image/glenn-landscape-model.jpg';
import arrowUpRight from '../image/arrow-up-right.svg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface HeroLink {
  label: string;
  url: string;
  type: 'primary' | 'social';
}

const heroLinks: HeroLink[] = [
  {
    label: 'VIEW MY WORK',
    url: '#projects',
    type: 'primary',
  },
  {
    label: 'GITHUB',
    url: 'https://github.com/glennfwrmb',
    type: 'social',
  },
  {
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/glenn-rmb-a266b4397/',
    type: 'social',
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[600px] md:min-h-[100svh] lg:min-h-234 bg-[#171A24]"
    >
      {/* ATMOSPHERIC SUBTLE RADIAL GLOW */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-70 md:translate-x-0 lg:left-90 top-0 w-100 md:w-125 lg:w-150 h-100 md:h-125 lg:h-150 bg-[radial-gradient(circle,#E85D2A1F_0%,#E85D2A00_70%)] z-0" />

      {/* BACKGROUND PORTRAIT LAYER */}
      <div className="absolute inset-0 w-full h-[600px] md:h-[100svh] lg:h-234">
        {/* GRADIENT 1 */}
        <div className="absolute inset-0 mix-blend-multiply bg-[radial-gradient(circle,#090C1300_35%,#090C1366_80%)] z-40" />

        {/* GRADIENT 2 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#090C13_0%,#090C13F5_24%,#0E121BA6_44%,#11162226_60%,#11162200_78%)] z-30" />

        {/* MASK GROUP */}
        <div className="absolute inset-0 z-20">
          <div
            className="flex flex-col items-start justify-center w-full h-[600px] md:h-[100svh] lg:h-234 absolute inset-0"
            style={{
              WebkitMaskImage: `
                linear-gradient(
                  to right,
                  #00000000 0%,
                  #00000000 18%,
                  #00000033 28%,
                  #000000CC 42%,
                  #000000FF 55%,
                  #000000FF 86%,
                  #000000E6 94%,
                  #00000000 100%
                ),
                linear-gradient(
                  to bottom,
                  #00000000 0%,
                  #000000FF 12%
                )
              `,
              maskImage: `
                linear-gradient(
                  to right,
                  #00000000 0%,
                  #00000000 18%,
                  #00000033 28%,
                  #000000CC 42%,
                  #000000FF 55%,
                  #000000FF 86%,
                  #000000E6 94%,
                  #00000000 100%
                ),
                linear-gradient(
                  to bottom,
                  #00000000 0%,
                  #000000FF 12%
                )
              `,
            }}
          >
            <img
              src={glennLandscape}
              alt="Glenn RMB"
              className="absolute inset-0 w-full h-full object-cover object-[60%_20%] md:object-[62%_20%] lg:object-[60%_20%]"
            />
          </div>
        </div>

        {/* GRADIENT 3 */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#090C13_0%,#0C1018_20%,#111622_36%,#1C2434_50%,#333F52_64%,#6B7C93_78%,#CBD5E1_90%,#F1F5F9_100%)]" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-50 flex flex-col items-start justify-center w-full min-h-[600px] px-5 py-6 md:min-h-[100svh] md:px-10 md:py-12 lg:min-h-234 lg:px-20 lg:py-16">
        <div className="flex flex-col items-start w-full max-w-3xl gap-3 sm:gap-5 md:gap-6 lg:gap-6">
          <div className="flex items-center w-full gap-3">
            <div className="w-6 md:w-7 lg:w-8 h-0.5 bg-[#E85D2A]" />
            <span className="font-jetbrains font-semibold text-[10px] md:text-xs lg:text-sm text-[#E85D2A] leading-4 md:leading-5 tracking-2 md:tracking-3 lg:tracking-3.5">
              // PORTFOLIO 2026 — INDONESIA
            </span>
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <h2 className="w-full">
              <span className="font-space font-semibold text-3xl md:text-4xl lg:text-5xl text-[#F5F3EE] leading-9 md:leading-10 lg:leading-12 tracking-[1.2px] md:tracking-2 lg:tracking-2.4">
                GLENN RMB
              </span>
            </h2>
          </div>

          <div className="flex items-center w-full gap-2.5">
            <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
            <span className="font-jetbrains font-normal text-[10px] md:text-xs lg:text-sm text-[#A5A7B0] leading-4 md:leading-5 tracking-[2px] md:tracking-3 lg:tracking-3.5">
              FULL STACK WEB DEVELOPER STUDENT
            </span>
          </div>

          {/* HEADING */}
          <div>
            <h1 className="flex flex-col items-start w-full pt-2">
              <span className="font-bodoni font-normal text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-white leading-[1.05] tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.5px] lg:tracking-[-3.2px]">
                I BUILD WITH PURPOSE.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start w-full max-w-2xl pt-1 md:pt-2">
            <p className="w-full font-space font-light text-base md:text-lg lg:text-xl text-[#A5A7B0] leading-6 md:leading-7 lg:leading-7 tracking-[-0.16px]">
              Glenn RMB is a full-stack web developer who builds structured,
              useful, and thoughtfully built digital experiences made to feel as
              good as they function.
            </p>
          </div>

          {/* HERO CTA */}
          <div className="flex flex-nowrap items-center w-full gap-2 sm:gap-3 md:gap-4 pt-2 md:pt-6">
            {heroLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.url}
                className="shrink-0"
                target={link.type === 'social' ? '_blank' : undefined}
                rel={link.type === 'social' ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (link.type === 'primary') {
                    e.preventDefault();

                    const section = document.getElementById('projects');

                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {link.type === 'primary' && (
                  <div className="relative flex items-center justify-center w-fit gap-1 px-3 sm:gap-2 sm:px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-4 bg-[#E85D2A]">
                    <div className="absolute inset-0 pointer-events-none w-full h-full bg-white/[0.2%] shadow-[0_10px_15px_-3px_#E85D2A33,0_4px_6px_-4px_#E85D2A33]" />
                    <span className="font-jetbrains text-[10px] md:text-xs font-semibold leading-4 tracking-[1px] md:tracking-1.2 text-white">
                      {link.label}
                    </span>
                    <img
                      src={arrowUpRight}
                      alt="Arrow Up Right"
                      className="w-3.5 h-3.5 md:w-4 md:h-4"
                    />
                  </div>
                )}

                {link.type === 'social' && (
                  <div className="flex items-center w-fit gap-1 px-1 sm:gap-2 sm:px-2 md:px-3 py-2">
                    {link.label === 'GITHUB' && (
                      <FaGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#A5A7B0]" />
                    )}
                    {link.label === 'LINKEDIN' && (
                      <FaLinkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#A5A7B0]" />
                    )}
                    <span className="font-jetbrains text-[9px] sm:text-[10px] md:text-xs font-normal leading-4 tracking-[0.3px] sm:tracking-[1px] md:tracking-1.2 text-[#A5A7B0]">
                      {link.label}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#E85D2A] -translate-y-1">
                      ↗
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
