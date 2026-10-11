const technologies = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Express.js',
  'PostgreSQL',
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="flex flex-col items-start w-full h-fit py-12 border-t border-white/8 bg-[#171A24] sm:py-16 lg:py-36"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* CONTAINER */}
        <div className="flex flex-col items-start w-full h-fit gap-y-10 px-5 sm:gap-y-16 sm:px-8 md:gap-y-20 md:px-10 lg:px-16 xl:px-20">
          {/* LABEL & HEADLINE */}
          <div className="flex flex-col items-start w-full h-fit gap-y-3">
            {/* CONTAINER */}
            <div className="flex flex-col items-start w-full h-fit">
              <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-4 tracking-3">
                04 // EXPERIENCE
              </span>
            </div>

            {/* HEADING 2 */}
            <h2 className="flex flex-col items-start w-full max-w-4xl h-fit">
              <span className="w-fit h-fit font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-1.5px] [font-variation-settings:'opsz'_60] sm:text-5xl sm:leading-12 lg:text-6xl lg:leading-15">
                WHERE I&apos;M BUILDING MY EXPERIENCE
              </span>
            </h2>
          </div>

          {/* RESUME CHRONOLOGY */}
          <div className="flex flex-col items-start w-full h-fit border-t border-white/8">
            {/* CONTAINER */}
           <div className="grid grid-cols-1 w-full h-fit gap-y-5 pt-8 pb-6 sm:gap-y-6 sm:pt-10 sm:pb-8 md:grid-cols-12 md:gap-x-3 md:gap-y-3 md:py-10">
              {/* DATE — LEFT */}
              <div className="flex items-center w-full h-fit gap-x-3 md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-1">
                {/* BACKGROUND + SHADOW */}
                <span className="w-2.5 h-2.5 bg-[#E85D2A] rounded-full shrink-0 shadow-[0_0_8px_0_#E85D2A]" />

                {/* TEXT */}
                <span className="w-fit h-fit font-jetbrains font-light text-xl text-[#F5F3EE] leading-8 tracking-[-0.16px] sm:text-2xl">
                  2026 — PRESENT
                </span>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col items-start w-full h-fit gap-y-[15.3px] md:col-start-4 md:col-span-9 md:row-start-1 md:row-span-1">
                {/* HEADING 3 */}
                <h3 className="flex flex-col items-start w-full h-fit">
                  <span className="w-full h-fit font-bodoni text-2xl text-[#F5F3EE] leading-8 tracking-[-0.16px] [font-variation-settings:'opsz'_24]">
                    FULL-STACK SOFTWARE DEVELOPMENT STUDENT
                  </span>
                </h3>

                {/* METADATA */}
                <div className="flex flex-wrap items-center w-full h-fit gap-x-2 gap-y-2 pt-[2.7px]">
                  {/* PURWADHIKA */}
                  <div className="flex flex-col items-start w-fit h-fit">
                    <span className="w-fit h-fit font-jetbrains font-medium text-xs text-[#E85D2A] leading-4 tracking-[0.6px]">
                      PURWADHIKA DIGITAL TECHNOLOGY SCHOOL
                    </span>
                  </div>

                  {/* SEPARATOR */}
                  <div className="flex flex-col items-start w-fit h-fit">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-white/20 leading-4 tracking-[-0.16px]">
                      ·
                    </span>
                  </div>

                  {/* PROGRAM */}
                  <div className="flex flex-col items-start w-fit h-fit px-2 py-0.5 bg-[#1D2130] border-t border-white/8">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-3.75 tracking-[0.5px]">
                      FULL-STACK SOFTWARE DEVELOPMENT
                    </span>
                  </div>

                  {/* SEPARATOR */}
                  <div className="flex flex-col items-start w-fit h-fit">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-white/20 leading-4 tracking-[0.16px]">
                      ·
                    </span>
                  </div>

                  {/* LOCATION */}
                  <div className="flex flex-col items-start w-fit h-fit">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-3.75 tracking-[0.5px]">
                      ON-CAMPUS — BSD
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col items-start w-full max-w-3xl h-fit">
                  <p className="w-full h-fit font-space font-light text-sm text-[#A5A7B0] leading-[22.8px] tracking-[-0.16px]">
                    Currently undergoing an intensive Full-Stack Software
                    Development program at Purwadhika Digital Technology School,
                    focusing on building practical skills in programming
                    fundamentals, frontend development, backend development,
                    REST APIs, databases, and full-stack application
                    development.
                  </p>
                </div>

                {/* TECHNOLOGY STACK */}
                <div className="flex flex-wrap items-start w-full h-fit gap-x-2 gap-y-2 pt-[8.7px]">
                  {technologies.map((technology) => (
                    <div
                      key={technology}
                      className="flex flex-col items-start w-fit h-fit px-3 py-1 bg-[#1D2130] border-t border-white/8"
                    >
                      <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-[16.5px] tracking-[-0.16px]">
                        {technology}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
