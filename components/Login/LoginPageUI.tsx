"use client";

import LoginCard from "./LoginCard";
import Link from "next/link";
import Title from "../Common/Title";
import LoginStatement from "./LoginStatement";

const LoginPageUI = () => {
  return (
    <div className="mt-5 lg:mt-10 w-full flex flex-col items-center justify-center gap-10">
      <LoginCard textCenter />

      <div className="flex flex-col items-center justify-center gap-5 max-w-[435px]">
        <LoginStatement />
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-semibold">
            <Title
              title="How do I create an account?"
              className="text-xl font-semibold"
            />
          </div>
          <div className="collapse-content flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              You can register for a MySurvivorCare account{" "}
              <Link href={"/register"} className="text-[#4338ca]">
                here.
              </Link>
            </p>
            <p className="text-base font-normal">
              Please note, this menopause symptom management platform is in
              early testing and you need to have been affected by, or currently
              living with cancer to participate.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-semibold">
            <Title
              title="Can I register without a Google or Apple account?"
              className="text-xl font-semibold"
            />
          </div>
          <div className="collapse-content flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              No, To register with MySurvivorCare you must{" "}
              <span>
                <Link href={"/register"} className="text-[#4338ca]">
                  login
                </Link>{" "}
              </span>
              in via Google or Apple.
            </p>
            {/* <p className="text-base font-normal">
              You can register for a MySurvivorCare account{" "}
              <Link href={"/register"} className="text-[#4338ca]">
                here.
              </Link>
            </p>
            <p className="text-base font-normal">
              Please note, this menopause symptom management platform is in
              early testing and you need to have been affected by, or currently
              living with cancer to participate.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageUI;
