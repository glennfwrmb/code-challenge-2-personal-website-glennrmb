
import { NavLink } from 'react-router';
import neonDatabase from '../image/neon-database-and-api-workspace.png';
import arrowUpRight from '../image/arrow-up-right.svg';

const specifications = [
  {
    content: (
      <>
        · PostgreSQL database with{' '}
        <span className="text-[#F5F5F5]">warehouse_products</span> schema
      </>
    ),
  },
  {
    content: <>· Products table tracking pricing, stock, zone & restock dates</>,
  },
  {
    content: <>· SQL queries filtering products by stock and category</>,
  },
  {
    content: (
      <>
        · Sorting and pagination via{' '}
        <span className="text-[#F5F5F5]">ORDER BY, LIMIT, OFFSET</span>
      </>
    ),
  },
  {
    content: <>· Updating product stock, restock dates, and status</>,
  },
  {
    content: <>· Express.js + TypeScript REST API architecture</>,
  },
  {
    content: <>· POST endpoint for creating new product entities</>,
  },
  {
    content: <>· GET endpoint for paginated product retrieval</>,
  },
  {
    content: <>· API testing via Postman</>,
  },
  {
    content: (
      <>
        · Connection pooling through PostgreSQL{' '}
        <span className="text-[#F5F5F5]">pg</span> client
      </>
    ),
  },
];

const techStack = [
  'PostgreSQL',
  'Express.js',
  'TypeScript',
  'REST API',
  'DBeaver',
  'Postman',
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex flex-col items-start w-full h-fit py-16 border-t border-white/8 bg-[#171A24] sm:py-24 lg:py-36"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* CONTAINER */}
        <div className="flex flex-col items-start w-full h-fit gap-y-8 px-5 sm:gap-y-12 sm:px-8 md:gap-y-16 md:px-8 lg:gap-y-20 lg:px-16 xl:px-20">
          {/* SECTION HEADING */}
          <div className="flex flex-col items-start w-full h-fit gap-y-3">
            <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-4 tracking-3">
              03 // PROJECTS
            </span>

            <h2 className="w-full h-fit font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-1.5px] [font-variation-settings:'opsz'_60] sm:text-5xl sm:leading-12 lg:text-6xl lg:leading-15">
              PROJECTS BUILT TO BE USED
            </h2>
          </div>

          {/* PROJECT ARTICLE */}
          <div className="grid grid-cols-1 w-full h-fit gap-y-8 md:grid-cols-2 md:gap-x-5 md:gap-y-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-16 xl:gap-x-20">
            {/* PROJECT IMAGE */}
            <div className="flex flex-col items-start w-full h-fit gap-3 md:col-start-2 md:col-span-1 md:row-start-1 lg:col-start-7 lg:col-span-6">
              <div className="flex flex-col items-start w-full h-fit bg-[#1D2130] border-t border-white/8 shadow-[0_25px_50px_-12px_#00000040]">
                <img
                  src={neonDatabase}
                  alt="Neon Database"
                  className="w-full h-auto aspect-[4/3] object-cover sm:aspect-[16/10] md:aspect-[4/3]"
                />
              </div>

              <div className="flex flex-col items-start justify-between w-full h-fit gap-y-1 px-1 sm:flex-row sm:items-center sm:gap-x-3">
                <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-[16.5px] tracking-[-0.16px]">
                  DBEAVER SQL CONSOLE &amp; POSTMAN RUNTIME
                </span>

                <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-[16.5px]">
                  PORT 8000 // 200 OK
                </span>
              </div>
            </div>

            {/* PROJECT DETAILS */}
            <div className="flex flex-col items-start w-full h-fit gap-y-6 md:col-start-1 md:col-span-1 md:row-start-1 lg:col-start-1 lg:col-span-6">
              {/* PROJECT TITLE */}
              <div className="flex flex-col items-start w-full h-fit gap-y-2">
                <div className="flex flex-wrap items-center w-full h-fit gap-x-2 gap-y-2">
                  <span className="w-fit h-fit font-jetbrains font-semibold text-xs text-[#E85D2A] leading-4 tracking-2.4">
                    PROJECT 01 // DATABASE + API
                  </span>

                  <span className="font-jetbrains font-normal text-white/20 leading-4">
                    |
                  </span>

                  <div className="flex flex-col items-start w-fit h-fit px-2 py-0.5 bg-[#E85D2A]/10 border-t border-[#E85D2A]/30 rounded-xs">
                    <span className="w-fit h-fit font-jetbrains font-normal text-[10px] text-[#E85D2A] leading-3.75 tracking-0.5">
                      FULLSTACK · DATABASE · REST API
                    </span>
                  </div>
                </div>

                <h3 className="w-full h-fit pt-1 font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-0.16px] [font-variation-settings:'opsz'_48] sm:text-5xl sm:leading-12">
                  WAREHOUSE MANAGEMENT SYSTEM
                </h3>
              </div>

              {/* PROJECT SUMMARY */}
              <p className="w-full h-fit font-space font-light text-base text-[#F5F3EE] leading-6 tracking-[-0.16px]">
                A warehouse management system built with PostgreSQL,
                Express.js, TypeScript, and REST API.
              </p>

              {/* PROJECT DESCRIPTION */}
              <p className="w-full h-fit font-space font-light text-sm text-[#A5A7B0] leading-5 tracking-[-0.16px]">
                I designed and implemented a warehouse database system to
                manage products, stock quantities, minimum stock levels,
                suppliers, warehouse zones, product status, and restock dates.
                The project also includes a REST API for creating and
                retrieving product data.
              </p>

              {/* PROJECT PIPELINE */}
              <div className="flex items-start w-full h-fit gap-x-2 px-3 py-2.5 bg-[#1D2130] border-t border-white/8 rounded-xs">
                <span className="w-1.5 h-1.5 mt-1.5 bg-[#E85D2A] rounded-full shrink-0" />

                <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#E85D2A] leading-4 tracking-0.55">
                  PIPELINE: DATABASE → SQL → REST API → POSTMAN
                </span>
              </div>

              {/* ARCHITECTURAL HIGHLIGHTS */}
              <div className="flex flex-col items-start w-full h-fit gap-y-3 pt-5 border-t border-white/8">
                <span className="w-full h-fit font-jetbrains font-semibold text-xs text-[#E85D2A] leading-4 tracking-1.1">
                  ARCHITECTURAL HIGHLIGHTS &amp; SPECS
                </span>

                <div className="grid grid-cols-1 w-full h-fit gap-x-4 gap-y-2 sm:grid-cols-2">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start w-full h-fit"
                    >
                      <p className="w-full h-fit font-jetbrains font-normal text-[11px] text-[#A5A7B0] leading-[15.1px] tracking-[-0.16px]">
                        {spec.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH STACK */}
              <div className="flex flex-col items-start w-full h-fit gap-y-2 pt-2">
                <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-3.75 tracking-[1px]">
                  TECH STACK
                </span>

                <div className="flex flex-wrap items-start w-full h-fit gap-x-2 gap-y-2">
                  {techStack.map((tech) => (
                    <div
                      key={tech}
                      className="flex flex-col items-start w-fit h-6.75 px-3 py-1 bg-[#1D2130] border-t border-white/8"
                    >
                      <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#F5F3EE] leading-[16.5px] tracking-[-0.16px]">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>

                {/* VIEW PROJECT */}
                <div className="flex items-center w-full h-fit pt-2 sm:pt-4">
                  <NavLink
                    to="https://github.com/glennfwrmb/glenn-JCWDBSD40-sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center w-fit h-fit gap-x-2.5 px-7 py-3.5 bg-[#E85D2A]"
                  >
                    <span className="absolute inset-0 pointer-events-none bg-white/[0.2%] shadow-[0_10px_15px_-3px_#E85D2A33,0_4px_6px_-4px_#E85D2A33]" />

                    <span className="relative font-jetbrains font-semibold text-xs text-white leading-4 tracking-1.2">
                      VIEW PROJECT
                    </span>

                    <img
                      src={arrowUpRight}
                      alt=""
                      aria-hidden="true"
                      className="relative w-4 h-4 -translate-y-px"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
