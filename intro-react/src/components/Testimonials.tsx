export default function Testimonials() {
  const testimonials = [
    {
      note: 'NOTE 01',
      quote:
        '"Glenn is a detail-oriented and dedicated learner. He takes the time to understand how things work and is always willing to improve his skills."',
      name: '[ JOVIN NAJWAN ]',
    },
    {
      note: 'NOTE 02',
      quote:
        '"Working with Glenn is a great experience. He is responsible, easy to communicate with, and always willing to learn when facing something new."',
      name: '[ ARIVIANO SUMANTRI ]',
    },
    {
      note: 'NOTE 03',
      quote:
        '"Glenn is someone who takes his work seriously and keeps learning when faced with challenges. His curiosity and determination make him a great person to work with."',
      name: '[ IAN ONGKOYOYO ]',
    },
  ];

  return (
    <section
      id="testimonials"
      className="flex flex-col items-start w-full h-fit py-20 border-t border-white/8 bg-[#171A24] sm:py-24 md:py-28 lg:py-36"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* CONTAINER */}
        <div className="flex flex-col items-start w-full h-fit gap-y-12 px-5 sm:gap-y-16 sm:px-8 md:px-10 lg:gap-y-20 lg:px-20">
          {/* HEADER */}
          <div className="flex flex-col items-start w-full h-fit gap-y-3">
            {/* SECTION LABEL */}
            <div className="flex flex-col items-start w-full h-fit">
              <span className="w-full h-fit font-jetbrains font-medium text-xs text-[#E85D2A] leading-4 tracking-3">
                05 // TESTIMONIALS / PEER FEEDBACK
              </span>
            </div>

            {/* HEADING */}
            <h2 className="w-full max-w-4xl h-fit font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-1.2px] [font-variation-settings:'opsz'_48] sm:text-5xl md:text-6xl md:leading-15 md:tracking-[-1.5px] md:[font-variation-settings:'opsz'_60]">
              WHAT PEOPLE SAY ABOUT WORKING WITH ME
            </h2>
          </div>

          {/* TESTIMONIAL LIST */}
          <div className="flex flex-col items-start w-full h-fit border-t border-white/8">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.note}
                className={`grid grid-cols-1 gap-y-6 py-10 sm:grid-cols-12 sm:gap-x-8 sm:gap-y-8 md:py-14 lg:gap-x-12 lg:gap-y-12 lg:py-16 ${
                  index > 0 ? 'border-t border-white/10' : ''
                }`}
              >
                {/* NOTE */}
                <div className="flex flex-col items-start w-full h-fit sm:col-start-1 sm:col-span-2 sm:row-start-1">
                  <span className="w-fit h-fit font-jetbrains font-semibold text-xs text-[#E85D2A] leading-4 tracking-[2.4px]">
                    {testimonial.note}
                  </span>
                </div>

                {/* QUOTE + AUTHOR */}
                <div className="flex flex-col items-start w-full h-fit gap-y-6 sm:col-start-3 sm:col-span-10 sm:row-start-1">
                  {/* BLOCKQUOTE */}
                  <blockquote className="w-full h-fit font-bodoni text-2xl text-[#F5F3EE] leading-tight tracking-[-0.5px] [font-variation-settings:'opsz'_28] sm:text-3xl sm:leading-9 sm:tracking-[-0.7px] lg:text-4xl lg:leading-10 lg:tracking-[-0.9px] lg:[font-variation-settings:'opsz'_36]">
                    {testimonial.quote}
                  </blockquote>

                  {/* AUTHOR */}
                  <div className="flex flex-wrap items-baseline justify-start w-full h-fit gap-x-3 gap-y-2 pt-2 sm:gap-x-4">
                    <span className="w-fit h-fit font-jetbrains font-semibold text-xs text-[#F5F3EE] leading-4 tracking-[0.6px]">
                      {testimonial.name}
                    </span>

                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-white/20 leading-4 tracking-[-0.16px]">
                      /
                    </span>

                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[0.6px]">
                      [ CLASSMATE ]
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}