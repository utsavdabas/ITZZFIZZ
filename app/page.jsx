"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const boatRef = useRef(null);
  const trailRef = useRef(null);
  const textRef = useRef(null);

  const text = "WELCOMEITZFIZZ";

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const boat = boatRef.current;
    const trail = trailRef.current;
    const textContainer = textRef.current;

    if (!section || !boat || !trail || !textContainer) return;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".boat-letter");

      const getValues = () => {
        const road = section.querySelector(".boat-road");

        const roadWidth = road.offsetWidth;
        const boatWidth = boat.offsetWidth;

        return {
          endX: roadWidth - boatWidth,
        };
      };

      const updateLetters = () => {
        const boatRect = boat.getBoundingClientRect();
        const boatCenter = boatRect.left + boatRect.width / 2;

        letters.forEach((letter) => {
          const letterRect = letter.getBoundingClientRect();
          const letterCenter =
            letterRect.left + letterRect.width / 2;

          if (boatCenter >= letterCenter) {
            gsap.to(letter, {
              opacity: 1,
              y: 0,
              duration: 0.15,
              overwrite: true,
            });
          } else {
            gsap.to(letter, {
              opacity: 0,
              y: 20,
              duration: 0.15,
              overwrite: true,
            });
          }
        });
      };

      const animation = gsap.to(boat, {
        x: () => getValues().endX,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: "bottom top",

          scrub: true,

          pin: true,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            const road = section.querySelector(".boat-road");

            const roadWidth = road.offsetWidth;

            const boatWidth = boat.offsetWidth;

            const boatX =
              (roadWidth - boatWidth) * progress;

            
            gsap.set(trail, {
              width: `${boatX + boatWidth * 0.45}px`,
            });

            updateLetters();
          },
        },
      });

      
      gsap.set(letters, {
        opacity: 0,
        y: 20,
      });

      
      gsap.to(boat, {
        y: -4,

        duration: 0.8,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",
      });

      
      gsap.utils.toArray(".info-card").forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: section,

            start: `${25 + index * 15}% top`,

            end: `${35 + index * 15}% top`,

            scrub: true,
          },
        });
      });

      
      ScrollTrigger.refresh();

      return () => {
        animation.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="relative min-h-[300vh] bg-[#f4f3ef] text-black"
    >

      

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-10">

        <div className="text-xl font-black tracking-[-0.05em]">
          ITZFIZZ
        </div>

        <div className="hidden gap-10 text-xs font-black uppercase md:flex">
          <a href="#mission">Mission</a>
          <a href="#numbers">Numbers</a>
          <a href="#contact">Contact</a>
        </div>

      </nav>


      

      <section className="sticky top-0 flex h-screen items-center overflow-hidden">

        <div className="w-full px-6 md:px-10">

          {/* INTRO */}

          <div className="mb-8 max-w-lg">

            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em]">
              Assignment / 2026
            </p>

            <p className="text-sm font-bold leading-6">
              Scroll to move the boat. As it travels across
              the water, the message is revealed behind it.
            </p>

          </div>


        

          <div
            className="
              boat-road
              relative
              h-[120px]
              w-full
              overflow-hidden
              bg-[#171717]
              md:h-[150px]
            "
          >

            

            <div className="absolute left-0 top-4 h-[2px] w-full bg-white/10" />

            

            <div className="absolute bottom-4 left-0 h-[2px] w-full bg-white/10" />


            

            <div
              ref={trailRef}
              className="
                absolute
                left-0
                top-0
                h-full
                w-0
                bg-[#55f02d]
              "
            />


            

            <div className="absolute inset-0 opacity-30">

              <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white/20" />

              <div className="absolute left-0 top-[35%] h-[2px] w-full bg-white/10" />

              <div className="absolute left-0 top-[65%] h-[2px] w-full bg-white/10" />

            </div>


            

            <div
              ref={textRef}
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                flex
                -translate-x-1/2
                -translate-y-1/2
                whitespace-nowrap
                text-[8vw]
                font-black
                uppercase
                tracking-[-0.06em]
                md:text-[7vw]
              "
            >

              {text.split("").map((letter, index) => (

                <span
                  key={index}
                  className="
                    boat-letter
                    inline-block
                    opacity-0
                  "
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>

              ))}

            </div>


            

            <div
              ref={boatRef}
              className="
                absolute
                left-0
                top-1/2
                z-30
                w-[120px]
                -translate-y-1/2
                md:w-[170px]
              "
            >

             
              <svg
                viewBox="0 0 240 120"
                className="w-full"
              >

             

                <ellipse
                  cx="120"
                  cy="88"
                  rx="80"
                  ry="13"
                  fill="black"
                  opacity="0.25"
                />

                

                <path
                  d="
                    M35 57
                    C55 25 185 20 207 57
                    C190 86 60 90 35 57Z
                  "
                  fill="#ff6500"
                />

                

                <ellipse
                  cx="120"
                  cy="55"
                  rx="55"
                  ry="27"
                  fill="#202020"
                />

                

                <path
                  d="
                    M88 55
                    C95 35 108 30 120 30
                    C132 30 145 35 152 55
                    C145 75 132 80 120 80
                    C108 80 95 75 88 55Z
                  "
                  fill="#65c9ff"
                />

                

                <path
                  d="M105 37 L95 62"
                  stroke="white"
                  strokeWidth="5"
                  opacity="0.35"
                />

                

                <path
                  d="
                    M207 57
                    L230 45
                    L217 58
                    L230 69
                    Z
                  "
                  fill="#ff6500"
                />

                

                <circle
                  cx="184"
                  cy="55"
                  r="5"
                  fill="white"
                />

              </svg>

            </div>

          </div>


          

          <div className="pointer-events-none absolute bottom-8 left-6 right-6 md:left-10 md:right-10">

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

              <div className="info-card translate-y-10 bg-[#def54f] p-5 opacity-0">

                <div className="text-4xl font-black">
                  58%
                </div>

                <p className="mt-2 text-xs font-bold uppercase">
                  Increase in pick up point use
                </p>

              </div>


              <div className="info-card translate-y-10 bg-[#6ac9ff] p-5 opacity-0">

                <div className="text-4xl font-black">
                  23%
                </div>

                <p className="mt-2 text-xs font-bold uppercase">
                  Better engagement
                </p>

              </div>


              <div className="info-card translate-y-10 bg-[#333] p-5 text-white opacity-0">

                <div className="text-4xl font-black">
                  27%
                </div>

                <p className="mt-2 text-xs font-bold uppercase">
                  More interaction
                </p>

              </div>


              <div className="info-card translate-y-10 bg-[#fa7328] p-5 opacity-0">

                <div className="text-4xl font-black">
                  40%
                </div>

                <p className="mt-2 text-xs font-bold uppercase">
                  More conversion
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      

      <section
        id="mission"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-black
          px-6
          text-white
        "
      >

        <div className="max-w-5xl">

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Mission
          </p>

          <h2 className="text-6xl font-black uppercase tracking-[-0.06em] md:text-9xl">
            Motion
            <br />
            becomes
            <br />
            interaction.
          </h2>

        </div>

      </section>


      

      <section
        id="contact"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#55f02d]
          px-6
        "
      >

        <h2 className="text-center text-6xl font-black uppercase tracking-[-0.07em] md:text-9xl">
          Let&apos;s
          <br />
          create.
        </h2>

      </section>

    </main>
  );
}