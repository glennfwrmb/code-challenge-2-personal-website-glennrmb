
const specifications = [
  {
    label: 'SPEC. 01 - FRONT-END',
    title: 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS',
    description:
      'Semantic HTML5, responsive CSS layout paradigms, modern ESNext, component architecture, state hierarchies, fluid typography, tokenized design systems, and WCAG accessibility standards.',
  },
  {
    label: 'SPEC. 02 - BACK-END',
    title: 'Node.js, Express, REST API, Database Fundamentals',
    description:
      'RESTful endpoint routing, middleware pipelines, error handling, SQL and NoSQL schema modeling, authentication workflows, and performant data persistence layers.',
  },
  {
    label: 'SPEC. 03 - DEVOPS & TOOLS',
    title: 'Git, GitHub, Postman, VS Code, Figma',
    description:
      'Version control with branch protection, API contract testing and profiling with Postman, development tooling and linting in VS Code, and pixel-accurate design-to-code implementation from Figma.',
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex flex-col items-start w-full h-fit pt-12 pb-16 border-t border-white/8 bg-[#171A24] sm:pt-16 sm:pb-20 md:py-24 lg:py-36"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* CONTAINER */}
        <div className="flex flex-col items-start w-full h-fit gap-10 px-5 sm:gap-12 sm:px-8 md:gap-16 md:px-10 lg:gap-20 lg:px-20">
          {/* HEADER */}
          <header className="flex flex-col items-start w-full h-fit gap-3">
            {/* CONTAINER */}
            <div className="flex flex-col items-start w-full h-fit">
              {/* TEXT */}
              <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-4 tracking-3">
                02 // TECHNICAL SKILLS
              </span>
            </div>

            {/* HEADING 2 */}
            <h2 className="flex flex-col items-start w-full max-w-5xl h-fit">
              {/* TEXT */}
              <span className="w-fit h-fit font-bodoni font-normal text-4xl text-[#F5F3EE] leading-10 tracking-[-1.5px] [font-variation-settings:'opsz'_40] sm:text-5xl sm:leading-12 md:text-5xl md:leading-13 lg:text-6xl lg:leading-15 lg:[font-variation-settings:'opsz'_60]">
                TOOLS ARE ONLY USEFUL WHEN THEY HELP SOLVE THE PROBLEM.
              </span>
            </h2>
          </header>

          {/* SPECIFICATION MATRIX */}
          <div className="flex flex-col items-start w-full h-fit border-t border-white/8">
            {specifications.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-1 items-start w-full h-fit gap-y-4 px-2 py-6 border-t border-white/8 sm:gap-y-5 sm:px-4 sm:py-8 md:grid-cols-12 md:gap-x-6 md:gap-y-6 md:py-9 lg:gap-x-8 lg:py-10"
              >
                {/* CONTAINER - SPEC LABEL */}
                <div className="flex flex-col items-start w-full h-fit md:col-span-3">
                  <span className="w-fit h-fit font-jetbrains font-semibold text-[10px] text-[#E85D2A] leading-4 tracking-[2.4px] sm:text-xs">
                    {spec.label}
                  </span>
                </div>

                {/* CONTAINER - CONTENT */}
                <div className="flex flex-col items-start w-full h-fit gap-2 md:col-span-9">
                  {/* HEADING 3 */}
                  <h3 className="flex flex-col items-start w-full h-fit">
                    <span className="w-full h-fit font-space font-medium text-base text-[#F5F3EE] leading-6 tracking-[-0.16px] sm:text-lg sm:leading-7 md:text-xl md:leading-7 lg:text-2xl lg:leading-8">
                      {spec.title}
                    </span>
                  </h3>

                  {/* CONTAINER */}
                  <div className="flex flex-col items-start w-full h-fit">
                    <p className="w-full h-fit font-jetbrains font-light text-xs text-[#A5A7B0] leading-5 tracking-[-0.16px] sm:text-sm">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
