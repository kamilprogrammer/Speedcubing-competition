import { useEffect, useState } from "react";
import VideoThumb from "..//..//..//public/images/hero-image-01.jpg";
import ModalVideo from "@/components/ui/modal-video";
import supabase from "../../app/supabase-client";
import { Badge } from "@/components/ui/badge";
export default function Hero() {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const fetch = async () => {
      const data = (await supabase.from("status").select("*")).data;
      setStatus(data?.[0]?.status || "");
    };
    fetch();
  }, []);
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="absolute inset-0 -z-10 h-[648px] sm:h-[648px] md:h-[800px] lg:h-[948px] w-full bg-white [background:radial-gradient(140%_90%_at_50%_0%,#030712_40%,#FF6500_140%)]"></div>
          <div className="pb-12 text-center items-center justify-center md:pb-20">
            <Badge
              className={`w-[200px] mb-2 text-white ${
                status === "Finished" ? "bg-green-500" : ""
              }`}
              variant={
                status === "Finished"
                  ? "outline"
                  : status === "Not Started Yet!"
                  ? "destructive"
                  : "default"
              }
            >
              {status}
            </Badge>
            <h1
              className="animate-[gradient_8s_linear_infinite] bg-[linear-gradient(to_right,var(--color-orange-500),var(--color-gray-50))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              SpeedCubing Got Prime!{" "}
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-indigo-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Hi Guys! Welcome to SpeedCubingHub! I really dont know what to
                write here; BTW, we are still on testing mode; KamelRifai
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn cursor-none group mb-4 w-full bg-linear-to-t from-orange-600 to-orange-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="/results"
                  >
                    <span className="relative inline-flex items-center">
                      Contest Results
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
                <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn cursor-none relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="https://wa.me/+963943846160"
                  >
                    Whatsapp Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1104}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="videos//video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
