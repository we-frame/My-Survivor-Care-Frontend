"use client";

import React from "react";
import Title from "../Common/Title";
import Accordion from "../Common/Accordion";
import useSettingStore from "@/store/SettingStore";
import { CircleHelp } from "lucide-react";
import Tooltip from "../Common/Tooltip";

const PractitionerResourcesUI = () => {
  const { buttonBgColor } = useSettingStore((state) => ({
    buttonBgColor: state.buttonBgColor,
  }));
  return (
    <div className="mt-5 lg:mt-10 w-full lg:w-[60%] flex flex-col items-start justify-start gap-10">
      <Title
        title="Resources for Healthcare Practitioners"
        className="text-4xl font-semibold"
      />

      <div className="flex flex-col items-start justify-start gap-4">
        <Accordion
          title="The Practitioner’s Toolkit for the Management of Menopause"
          className="text-2xl font-semibold"
          groupName="practitioner-resources"
        >
          <div className="flex flex-col items-start justify-start gap-3">
            <p className="text-base font-normal">
              The Practitioner's Toolkit for Managing Menopause was created by
              the Women's Health Research Program at Monash University School of
              Public Health and Preventive Medicine in 2023. Additional notes
              supporting the toolkit are published for free access in
              Climacteric, the journal of the International Menopause Society.
            </p>

            <div className="flex items-center justify-center gap-3">
              <p className="text-base font-normal">
                To view the toolkit, visit{" "}
                <a
                  href="https://www.menopause.org.au/"
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  www.menopause.org.au
                </a>
              </p>

              <Tooltip
                content={
                  <div className="flex flex-col items-start justify-start gap-5">
                    <p className="text-xs font-normal">
                      From the home page, hover over “Healthcare Professionals”
                      and click on “Information sheets” from the dropdown menu.
                    </p>
                    <p className="text-xs font-normal">
                      Then scroll down to “A Practitioner’s Toolkit for the
                      Management of Menopause” to read more
                    </p>
                  </div>
                }
              >
                <CircleHelp
                  color="#374151"
                  size={20}
                  className="cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Forms of treatment"
          className="text-2xl font-semibold"
          groupName="practitioner-resources"
        >
          <div className="flex flex-col items-start justify-start gap-5">
            <div>
              <p className="text-base font-normal">
                There are some therapies available for managing symptoms of
                menopause in cancer survivors and to improve their quality of
                life. These management options can be categorised as menopause
                hormone therapy, non-hormonal therapy, and non-medical
                treatments.
              </p>
            </div>

            <div>
              <h1
                style={{ color: buttonBgColor }}
                className="text-xl font-semibold"
              >
                Menopausal hormone therapies
              </h1>
              <p className="text-base font-normal">
                Menopausal hormone therapies are effective for managing hot
                flushes and night sweats. However, they are contraindicated in
                paDents with cancers that depend on hormones to grow and divide
                such as some breast cancers, advanced stage endometrial cancers,
                uterine sarcoma, and low grade serous endometrial ovarian
                cancer. Some studies have shown MHT can increase the risk of
                recurrence, poor prognosis, and risk of thromboembolism.
              </p>
            </div>

            <div>
              <p className="text-base font-normal">
                To view the toolkit, visit{" "}
                <a
                  href="https://www.menopause.org.au/"
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  www.menopause.org.au
                </a>
              </p>
            </div>

            <div>
              <h1
                style={{ color: buttonBgColor }}
                className="text-xl font-semibold"
              >
                Menopausal hormone therapies
              </h1>
              <p className="text-base font-normal">
                Non-hormonal medications such as selective serotonin reuptake
                inhibitors (paroxetine, fluoxetine, sertraline, citalopram, and
                escitalopram) and selective serotonin-norepinephrine reuptake
                inhibitors (duloxetine, venlafaxine and desvenlafaxine),
                anticonvulsants (gabapentin and pregabalin), anD-hypertensive
                alpha-adrenergic agonist (clonidine), are effective for the
                management of troublesome hot flushes and night sweats..
              </p>
            </div>

            <div>
              <p className="text-base font-normal">
                For more information, visit www.menopause.org.au or you can
                download the menopause society’s resource on nonhormonal
                treatments{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  here
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Evidence and dosages on treatments"
          className="text-2xl font-semibold"
          groupName="practitioner-resources"
        >
          <div className="flex flex-col items-start justify-start gap-3">
            <p className="text-base font-normal">
              This fact sheet was created by the Royal Women’s Hospital in
              Victoria, Australia. It provides information about non-hormonal
              medicines used for hot flushes. However, it's important to note
              that this information should not be a substitute for the official
              product details.
            </p>

            <div>
              <p className="text-base font-normal">
                To view the toolkit, visit{" "}
                <a
                  href="https://www.thewomens.org.au/"
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  www.thewomens.org.au{" "}
                </a>
                or download from{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  here
                </a>
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="Deciding about hormone therapy use"
          className="text-2xl font-semibold"
          groupName="practitioner-resources"
        >
          <div className="flex flex-col items-start justify-start gap-5">
            <div>
              <h1
                style={{ color: buttonBgColor }}
                className="text-xl font-semibold"
              >
                Managing menopause after cancer
              </h1>
              <div>
                <p className="text-base font-normal">
                  The paper linked below, titled ‘managing menopause after
                  cancer’ published in the Lancet, provides evidence about when
                  systemic menopausal hormone therapy (MHT) or tibolone can be
                  offered or should be avoided. Of note:
                </p>
              </div>
              <ul>
                <li>
                  Figure 1 provides a summary of evidence regarding the safety
                  of MHT after different cancer types.
                </li>
                <li>
                  Figure 2 summarises advice about MHT use in female-specific
                  cancer.
                </li>
                <li>
                  Figure 3 provides specific advice for MHT after cancers that
                  affect both men and women. This article emphasizes that the
                  decisions about MHT after cancer should use a shared
                  decision-making the paDent and the treating oncologist. This
                  article can be accessed{" "}
                  <a
                    href=""
                    target="_blank"
                    style={{ color: buttonBgColor }}
                    className="underline"
                  >
                    here
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h1
                style={{ color: buttonBgColor }}
                className="text-xl font-semibold"
              >
                Deciding About Hormone Therapy Use
              </h1>
              <p className="text-base font-normal">
                This resource was created by the North American Menopause
                Society Education Committee, provides current general
                information but not specific medical advice. This document can
                be downloadeds{" "}
                <a
                  href=""
                  target="_blank"
                  style={{ color: buttonBgColor }}
                  className="underline"
                >
                  here
                </a>
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default PractitionerResourcesUI;
