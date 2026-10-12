export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-start w-full h-fit px-5 py-16 border-t border-white/8 bg-[#161C28] sm:px-8 md:px-6 md:py-24 lg:px-16"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* CONTAINER */}
        <div className="grid grid-cols-1 items-start w-full h-fit gap-x-8 gap-y-8 md:grid-cols-12 md:gap-x-4 md:gap-y-12 lg:gap-x-16 lg:gap-y-16">
          {/* RIGHT COLUMN - ABOUT CONTENT */}
          <div className="col-span-1 row-start-1 flex flex-col items-start w-full h-fit gap-y-6 md:col-start-6 md:col-span-7 md:row-start-1 lg:gap-y-6">
            {/* LABEL & HEADLINE */}
            <div className="flex flex-col items-start w-full h-fit gap-y-3">
              {/* SECTION LABEL */}
              <div className="flex items-center w-full h-fit">
                <span className="w-full h-fit font-jetbrains font-medium text-xs text-[#E85D2A] leading-4 tracking-0.6px">
                  01 // ABOUT ME
                </span>
              </div>

              {/* HEADING 2 */}
              <h2 className="w-full h-fit font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-1.2px] [font-variation-settings:'opsz'_48] md:text-4xl lg:text-5xl lg:leading-12">
                I CARE ABOUT HOW THINGS WORK — AND HOW THEY FEEL.
              </h2>
            </div>

            {/* LEFT COLUMN - PORTRAIT MOBILE */}
            <div className="flex items-start justify-center w-full h-fit md:hidden">
              <a
                href="https://res.cloudinary.com/j9oiujmw/image/upload/l_text:Arial_36_bold:GLENN%20RMB,co_white,o_50/a_330/c_lpad,w_400,h_160/fl_layer_apply,fl_tiled,x_80,y_80/v1791738626/glenn-rmb.jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open watermarked portrait of Glenn RMB in a new tab"
              >
                <img
                 src="https://res.cloudinary.com/j9oiujmw/image/upload/f_auto,q_auto/v1791738626/glenn-rmb.jpg"
                  alt="Glenn Rmb"
                  className="w-full max-w-70 h-auto object-contain object-top"
                />
              </a>
            </div>

            {/* BIO */}
            <div className="flex flex-col items-start w-full h-fit gap-y-4">
              {/* PARAGRAPH 1 */}
              <div className="flex flex-col items-start w-full h-fit">
                <p className="w-full h-fit font-space font-light text-sm text-[#A5A7B0] leading-6 tracking-[-0.16px] md:text-sm lg:text-sm">
                  I am a Full-Stack Software Development student at Purwadhika
                  Digital Technology School, passionate about building
                  structured and useful digital experiences.
                </p>
              </div>

              {/* PARAGRAPH 2 */}
              <div className="flex flex-col items-start w-full h-fit">
                <p className="w-full h-fit font-space font-light text-sm text-[#A5A7B0] leading-6 tracking-[-0.16px] md:text-sm lg:text-sm">
                  I am currently building my skills across frontend and backend
                  development, working with modern technologies to understand
                  how complete web applications are designed and built.
                </p>
              </div>
            </div>

            {/* TECH STACK OVERVIEW */}
            <div className="flex flex-col items-start w-full h-fit gap-y-4 pt-5 border-t border-white/8">
              {/* SECTION LABEL */}
              <div className="flex flex-col items-start w-full h-fit">
                <span className="w-full h-fit font-jetbrains font-medium text-[10px] text-[#A5A7B0] leading-4 tracking-[0.6px]">
                  / TECH_STACK_OVERVIEW
                </span>
              </div>

              {/* FRONTEND & BACKEND */}
              <div className="grid grid-cols-1 w-full h-fit gap-y-5 sm:grid-cols-2 sm:gap-x-6">
                {/* FRONTEND */}
                <div className="flex flex-col items-start w-full h-fit gap-y-3">
                  <h3 className="w-full h-fit font-jetbrains font-semibold text-[10px] text-[#F5F3EE] leading-4 tracking-[0.6px]">
                    FRONTEND
                  </h3>

                  <div className="flex flex-col items-start w-full h-fit gap-y-2">
                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        React
                      </span>
                    </div>

                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        TypeScript
                      </span>
                    </div>

                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        Tailwind CSS
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACKEND */}
                <div className="flex flex-col items-start w-full h-fit gap-y-3 sm:border-l sm:border-white/8 sm:pl-5">
                  <h3 className="w-full h-fit font-jetbrains font-semibold text-[10px] text-[#F5F3EE] leading-4 tracking-[0.6px]">
                    BACKEND
                  </h3>

                  <div className="flex flex-col items-start w-full h-fit gap-y-2">
                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        Node.js / Express
                      </span>
                    </div>

                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        PostgreSQL
                      </span>
                    </div>

                    <div className="flex items-center w-full h-fit gap-x-2">
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#E85D2A]" />
                      <span className="font-jetbrains font-normal text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                        REST APIs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DESIGN PHILOSOPHY */}
            <div className="flex flex-col items-start w-full h-fit gap-y-3 pt-5 border-t border-white/8">
              <div className="flex flex-col items-start w-full h-fit">
                <span className="w-full h-fit font-jetbrains font-medium text-[10px] text-[#A5A7B0] leading-4 tracking-[0.6px]">
                  / DESIGN_PHILOSOPHY
                </span>
              </div>

              <blockquote className="w-full h-fit border-l-2 border-[#E85D2A] pl-3">
                <p className="font-jetbrains font-normal italic text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                  “Function is the highest form of beauty. Complexity is a debt
                  we must constantly pay down through refinement.”
                </p>
              </blockquote>
            </div>
          </div>
          {/* LEFT COLUMN - PORTRAIT TABLET & DESKTOP */}
          <div className="hidden md:col-start-1 md:col-span-5 md:row-start-1 md:flex md:items-start md:justify-center md:w-full md:h-fit md:-translate-y-5">
            <a
              href="https://res.cloudinary.com/j9oiujmw/image/upload/l_text:Arial_36_bold:GLENN%20RMB,co_white,o_50/a_330/c_lpad,w_400,h_160/fl_layer_apply,fl_tiled,x_80,y_80/v1791738626/glenn-rmb.jpg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open watermarked portrait of Glenn RMB in a new tab"
            >
              <img
              src="https://res.cloudinary.com/j9oiujmw/image/upload/f_auto,q_auto/v1791738626/glenn-rmb.jpg"
                alt="Glenn Rmb"
                className="w-full max-w-90 h-auto object-contain object-top lg:max-w-[440.67px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
