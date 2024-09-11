"use client";

import React from "react";
import Title from "../Common/Title";
import Accordion from "../Common/Accordion";

const HealthcareProfessionalUI = () => {
  return (
    <div className="mt-5 lg:mt-10 w-full lg:w-[60%] flex flex-col items-start justify-start gap-10">
      <Title
        title="Find a Healthcare Professional"
        className="text-4xl font-semibold"
      />

      <div className="flex flex-col items-start justify-start gap-4">
        <Accordion
          title="Find an Australasian Menopause Society Doctor"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              To assist you in finding a doctor suitable for your needs, the
              Australasian Menopause Society (AMS) has a search feature listing
              their members who have special interest in women's health in
              midlife and menopause, and the promoDon of healthy ageing. This
              page gives you a link to a list of AMS doctors who specialize in
              managing menopause, which could be beneficial for cancer
              survivors.
            </p>

            <div>
              <p className="text-base font-normal">
                Visit{" "}
                <a
                  href="https://www.menopause.org.au/"
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  www.menopause.org.au
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Find a McGrath Breast Care Nurse"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              If you're looking for a breast care nurse, McGrath Breast Care
              Nurses are available for free, whether you're in the private or
              public health system. They can provide support in managing your
              menopause symptoms.
            </p>

            <div>
              <p className="text-base font-normal">
                Visit{" "}
                <a
                  href="https://www.mcgrathfoundation.com.au/"
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  www.mcgrathfoundation.com.au
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Teal Support Nurse Program-Ovarian Cancer Survivors"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-3">
            <p className="text-base font-normal">
              The Teal Support Program is a free telehealth outreach program
              supporting women with ovarian cancer throughout their diagnosis,
              treatment and beyond. The main aim of the program is to provide
              continuity of care when you are not regularly seeing your treating
              team and focus on areas of care where there are unmet needs. They
              can provide support in managing your menopause symptoms.
            </p>

            <div>
              <p className="text-base font-normal">
                Visit{" "}
                <a
                  href="https://www.ovariancancer.net.au/"
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  www.ovariancancer.net.au
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="NET Nurse- NeuroEndocrine Cancer Survivors"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              NeuroEndocrine Cancer Australia offer a FREE, confidential
              telephone information and refer paDents to other relevant services
              and specialists within the locality of the paDents. They can
              provide support in managing your menopause symptoms.
            </p>

            <div>
              <p className="text-base font-normal">
                Visit{" "}
                <a
                  href="https://https://neuroendocrine.org.au/"
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  https://neuroendocrine.org.au
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Related websites"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              We're here to help you with managing menopause symptoms after
              cancer through the MySurvivorCare app. However, we are aware of
              the other information and support needs, therefore we are going to
              refer you to some other verified and evidence-based resources that
              can provide you with more understanding about these symptoms.
              Please keep in mind that not all of these resources may be helpful
              or suitable to you.
            </p>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Jean Hailes Foundation
              </h1>
              <p className="text-base font-normal">
                Jean Hailes for Women's Health is a non-profit organization
                focused on women's health. They offer clinical care, educational
                resources, and evidence-based health information for women,
                girls, and gender-diverse individuals, as well as the healthcare
                professionals who support them.{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  Visit website
                </a>
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Australasian Menopause Society
              </h1>
              <p className="text-base font-normal">
                The Australasian Menopause Society website offers information
                about menopause, treatment options, and additional resources.
                It's a valuable source for women and healthcare professionals
                seeking more knowledge about menopause.{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  Visit website
                </a>
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Ask Early Menopause
              </h1>
              <p className="text-base font-normal">
                The Ask Early Menopause website/app is designed to offer
                reliable information from top experts. It helps you understand
                menopause, provides tools like a personal dashboard to track
                symptoms, and supports you in finding a healthy lifestyle and
                the best management options for your situation.{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  Visit website
                </a>
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Cancer Council
              </h1>
              <p className="text-base font-normal">
                Cancer council is Australia’s leading cancer charity, working
                across every area of every cancer. Their website provides
                resources on early menopause after cancer, symptoms, and ways to
                manage them.{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  Visit website
                </a>
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Healthtalk Australia
              </h1>
              <p className="text-base font-normal">
                Healthtalk Australia has compiled video from an interview they
                conducted with women experiencing menopause about their
                experiences and impact of early menopause (EM) on a range of
                personal relationships – with partners, children, parents, other
                family members, and friends.{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: "#14b8a6" }}
                  className="underline">
                  Visit website
                </a>
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default HealthcareProfessionalUI;
