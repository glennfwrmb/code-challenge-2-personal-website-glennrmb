
import { useForm } from 'react-hook-form'; //langkah 1 (validasi)
import {
  contactSchema,
  type contactRequest,
} from '../features/contact/validation/contactSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contact() {
  const {
    //langkah 2 (validasi) //langkah 3 : tambahin {...register('...')} (penempatan di dalam <input />)
    register, //langkah 4 : buat file ...Schema.ts
    handleSubmit,
    reset, // xs md lg
    formState: { errors },
  } = useForm<contactRequest>({
    resolver: zodResolver(contactSchema),
  }); //langkah 5 : tulis useForm<...>({ resolver: zodResolver(...) })

  const handleContact = async (data: contactRequest) => {
    //langkah 6
    try {
      const res = await axios.post(
        'https://api.backendless.com/DD60CBD4-51C5-4ADA-BF08-7B8497A5C9D5/8D67D8C6-62AA-45BC-8C7E-331629C31DDE/data/contact-me',
        data,
      );

      console.log(res);
      reset();
      toast.success('Your message has been sent successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-start w-full h-fit px-5 py-16 border-t border-white/8 bg-[#171A24] sm:px-8 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-36"
    >
      <div className="w-full max-w-280 mx-auto">
        {/* CONTAINER */}
        <div className="grid grid-cols-1 w-full h-fit gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-12 lg:gap-x-12 xl:gap-x-16">
          {/* RIGHT */}
          <div className="order-2 col-start-1 col-span-1 row-start-auto flex flex-col items-start w-full h-fit px-5 py-6 bg-[#1D2130] border border-white/8 shadow-[0_25px_50px_-12px_#00000040] sm:px-8 sm:py-8 md:order-2 md:col-start-6 md:col-span-7 md:row-start-1 md:px-6 md:py-8 lg:px-8 xl:px-12">
            {/* FORM */}
            <form
              onSubmit={handleSubmit(handleContact)}
              className="flex flex-col items-start w-full h-fit gap-y-6"
            >
              {/* CONTAINER */}
              <div className="flex flex-col items-start w-full h-fit gap-y-5 sm:flex-row sm:gap-x-6 sm:gap-y-0">
                {/* CONTAINER 01 */}
                <div className="flex flex-col items-start w-full h-fit gap-y-2">
                  {/* LABEL */}
                  <label
                    htmlFor="name"
                    className="flex flex-col items-start w-full h-fit"
                  >
                    <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[1.2px]">
                      YOUR NAME *
                    </span>
                  </label>

                  {/* INPUT */}
                  <div className="flex flex-row items-start justify-center w-full h-fit px-4 py-3.75 bg-[#171A24] border border-white/8">
                    {/* CONTAINER */}
                    <div className="flex flex-col items-start w-full h-fit">
                      {/* GLENN RMB */}
                      <input
                        id="name"
                        type="text"
                        placeholder="Glenn Rmb"
                        className="w-full h-fit bg-transparent outline-none font-space font-normal text-sm text-[#A5A7B0] leading-[normal] tracking-[-0.16px] placeholder:text-[#A5A7B0]"
                        {...register('name')}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-red-600">
                    {errors?.name?.message}
                  </p>
                </div>

                {/* CONTAINER 02 */}
                <div className="flex flex-col items-start w-full h-fit gap-y-2">
                  {/* LABEL */}
                  <label
                    htmlFor="email"
                    className="flex flex-col items-start w-full h-fit"
                  >
                    <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[1.2px]">
                      YOUR EMAIL *
                    </span>
                  </label>

                  {/* INPUT */}
                  <div className="flex flex-row items-start justify-center w-full h-fit px-4 py-3.75 bg-[#171A24] border border-white/8">
                    {/* CONTAINER */}
                    <div className="flex flex-col items-start w-full h-fit">
                      {/* EMAIL */}
                      <input
                        id="email"
                        type="email"
                        placeholder="glennrmb@gmail.com"
                        className="w-full h-fit bg-transparent outline-none font-space font-normal text-sm text-[#A5A7B0] leading-[normal] tracking-[-0.16px] placeholder:text-[#A5A7B0]"
                        {...register('email')}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-red-600">
                    {errors?.email?.message}
                  </p>
                </div>
              </div>

              {/* CONTAINER 03 */}
              <div className="flex flex-col items-start w-full h-fit gap-y-2 pb-1.75">
                {/* LABEL */}
                <label
                  htmlFor="brief"
                  className="flex flex-col items-start w-full h-fit"
                >
                  <span className="w-full h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[1.2px]">
                    PROJECT BRIEF OR MESSAGE *
                  </span>
                </label>

                {/* TEXT AREA */}
                <div className="flex flex-row items-start justify-center w-full h-fit px-4 pt-3.5 pb-23.5 bg-[#171A24] border border-white/8">
                  {/* CONTAINER */}
                  <div className="flex flex-col items-start w-full h-fit">
                    {/* AREA */}
                    <textarea
                      id="brief"
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="w-full h-fit resize-none bg-transparent outline-none font-space font-normal text-sm text-[#A5A7B0] leading-5 tracking-[-0.16px] placeholder:text-[#A5A7B0]"
                      {...register('brief')}
                    />
                  </div>
                </div>

                <p className="text-sm text-red-600">
                  {errors?.brief?.message}
                </p>
              </div>

              {/* BUTTON + DIRECT RESPONSE */}
              <div className="flex flex-col items-start w-full h-fit gap-y-4 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn flex items-center justify-center w-fit h-fit gap-x-3 px-8 py-4 bg-[#E85D2A] shadow-[0_10px_15px_-3px_#E85D2A33,0_4px_6px_-4px_#E85D2A33]"
                >
                  {/* CONTAINER */}
                  <div className="flex flex-col items-center justify-start w-fit h-fit">
                    {/* SEND MESSAGE */}
                    <span className="w-fit h-fit font-jetbrains font-semibold text-xs text-white leading-4 tracking-[1.2px]">
                      SEND MESSAGE
                    </span>
                  </div>

                  {/* CONTAINER */}
                  <div className="flex flex-col items-center justify-start w-fit h-fit">
                    {/* TEXT */}
                    <span className="w-fit h-fit font-nimbus font-bold text-xs text-white leading-4 tracking-[1.2px]">
                      →
                    </span>
                  </div>
                </button>

                {/* DIRECT RESPONSE */}
                <div className="flex flex-col items-start w-fit h-fit">
                  <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-[16.5px] tracking-[-0.16px]">
                    I'll get back to you soon.
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* LEFT */}
          <div className="order-1 col-start-1 col-span-1 row-start-auto flex flex-col items-start w-full h-fit gap-y-8 md:order-1 md:col-start-1 md:col-span-5 md:row-start-1">
            {/* CONTAINER */}
            <div className="flex flex-col items-start w-full h-fit gap-y-4">
              {/* CONTAINER */}
              <div className="flex flex-col items-start w-full h-fit">
                <span className="w-full h-fit font-jetbrains font-medium text-xs text-[#E85D2A] leading-4 tracking-3">
                  06 // GET IN TOUCH / CONTACT
                </span>
              </div>

              {/* HEADING */}
              <h2 className="flex flex-col items-start w-full h-fit font-bodoni text-4xl text-[#F5F3EE] leading-[1.05] tracking-[-1.2px] [font-variation-settings:'opsz'_48] sm:text-5xl md:text-5xl md:leading-[1.05] lg:text-6xl lg:leading-15 lg:tracking-[-1.5px] lg:[font-variation-settings:'opsz'_60]">
                LET&apos;S BUILD SOMETHING USEFUL.
              </h2>

              {/* DESCRIPTION */}
              <div className="flex flex-col items-start w-full h-fit">
                <p className="w-full h-fit font-space font-light text-sm text-[#A5A7B0] leading-6 tracking-[-0.16px] sm:text-base">
                  Have an idea, project, or opportunity? Let&apos;s turn it into
                  something real.
                </p>
              </div>

              {/* DIRECT COORDINATES */}
              <div className="flex flex-col items-start w-full h-fit gap-y-3 pt-6 border-y border-white/8">
                {/* HORIZONTAL BORDER 1 */}
                <div className="flex flex-col items-start w-full h-fit gap-y-2 py-2 border-b border-white/8 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
                  {/* CONTAINER */}
                  <div className="flex flex-col items-start w-fit h-full">
                    {/* EMAIL */}
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[-0.16px]">
                      EMAIL
                    </span>
                  </div>

                  {/* LINK */}
                  <div className="flex flex-col items-start w-fit h-full">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=glennrmb97@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit h-fit font-jetbrains font-normal text-xs text-[#F5F3EE] leading-4 tracking-[-0.16px] break-all sm:break-normal"
                    >
                      glennrmb97@gmail.com
                    </a>
                  </div>
                </div>

                {/* HORIZONTAL BORDER 2 */}
                <div className="flex flex-col items-start w-full h-fit gap-y-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
                  {/* CONTAINER */}
                  <div className="flex flex-col items-start w-fit h-full">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#A5A7B0] leading-4 tracking-[-0.16px]">
                      LOCATION / TIMEZONE
                    </span>
                  </div>

                  {/* CONTAINER */}
                  <div className="flex flex-col items-start w-fit h-full">
                    <span className="w-fit h-fit font-jetbrains font-normal text-xs text-[#F5F3EE] leading-4 tracking-[-0.16px]">
                      Indonesia — Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
