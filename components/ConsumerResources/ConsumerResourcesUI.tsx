"use client";

import React from "react";
import Title from "../Common/Title";
import Accordion from "../Common/Accordion";

const ConsumerResourcesUI = () => {
  return (
    <div className="mt-5 lg:mt-10 w-full lg:w-[60%] flex flex-col items-start justify-start gap-10">
      <Title
        title="Resources for Consumers"
        className="text-4xl font-semibold"
      />

      <div className="flex flex-col items-start justify-start gap-4 w-full">
        <Accordion
          title="What might cause menopause in cancer survivors?"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              Early or induced menopause in cancer survivors means that after
              cancer treatment, women may stop having their regular monthly
              periods. Treatments like chemotherapy, radiation therapy,
              endocrine therapy, and surgery can bring about this early
              menopause, especially in women who were still having their periods
              before the treatment.
            </p>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Surgery
              </h1>
              <p className="text-base font-normal">
                Surgery is often used to treat various gynaecological cancers
                like fallopian, endometrial, cervical, ovarian, and breast
                cancers. For some of these patients, doctors may recommend
                removing one or both ovaries as part of the treatment to either
                cure the cancer or lower the risk of it returning or developing
                another cancer. When ovaries are surgically removed in cancer
                patients who haven't reached menopause yet, it leads to early
                menopause.
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Radiation therapy
              </h1>
              <p className="text-base font-normal">
                Radiation therapy involves the exposure of cancer cells to a
                high dose of radiation. When this radiation is aimed at the
                pelvis or abdominal area, it can kill and/or prevent the ovaries
                from producing estrogen, leading to early menopause. This mostly
                happens in paDents with cancers like uterine, colorectal,
                cervical, and ovarian cancers.
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Chemotherapy
              </h1>
              <p className="text-base font-normal">
                Chemotherapy is a cancer treatment that aims to slow down or
                stop the growth of cancer cells. It works well for various types
                of cancer, including solid tumours like breast, colorectal and
                blood cancers, and leukemia and lymphoma. However, these drugs
                can also harm healthy cells, including those in the ovaries. For
                women who haven't gone through menopause yet, this damage can
                make it difficult for the body to produce eggs and estrogen
                after treatment, resulting in menopause.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="What are some symptoms of menopause after cancer?"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <div className="flex flex-col items-start justify-start gap-5">
            <p className="text-base font-normal">
              Many cancer survivors deal with bothersome symptoms like vasomotor
              symptoms (VMS) and the genitourinary syndrome of menopause (GSM).
            </p>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Vasomotor symptoms
              </h1>
              <p className="text-base font-normal">
                Vasomotor symptoms are a collective name for suddenly feeling
                really hot and sweaty (hot flushes) or sweat a lot during the
                night (night sweats). Hot flushes characterized by sudden waves
                of heat and/or feeling warm and sweaty, sometimes with chills.
                Night sweats are commonly reported as excessive sweat especially
                around your face, neck, and chest, mostly at night. Vasomotor
                symptoms are common for women, whether they reach menopause
                naturally or because of cancer treatment. For example, around
                80% of women experiencing natural menopause and about 67.7-82.2%
                of breast cancer survivors have these symptoms. The symptoms can
                be quite strong or severe.
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Genitourinary syndrome of menopause (GSM)
              </h1>
              <p className="text-base font-normal">
                Genitourinary syndrome of menopause (GSM) is when women
                experience problems like dryness in the vagina, pain during
                urination, burning and irritation in the vulva and vagina,
                persistent pain during or after sex, always feeling like you
                need to urinate urgently, and getting urinary tract infections.
                These symptoms are common in all women going through menopause,
                and they are even more common in cancer survivors. For example,
                about 75% of breast cancer survivors experience genitourinary
                syndrome of menopause, compared to an average of 50% in the
                general population.
              </p>
            </div>

            <div>
              <h1
                style={{ color: "#14b8a6" }}
                className="text-xl font-semibold">
                Other symptoms
              </h1>
              <p className="text-base font-normal">
                During menopause, many cancer survivors can also experience
                symptoms like feeling sad, depressed, anxiety, mood swings,
                worry, irritability, tiredness, joint pain, fast or irregular
                heartbeat, reduced interest in intimacy, dry skin, and
                difficulty remembering or staying focused.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="How can symptoms of menopause after cancer be managed?"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <>
            <div className="flex flex-col items-start justify-start gap-3">
              <p className="text-base font-normal">
                There are different ways to help cancer survivors manage
                menopausal symptoms and improve their quality of life. These
                approaches include using menopause hormone therapy, non-hormonal
                methods, and non-medical treatments.
              </p>

              <div>
                <h1
                  style={{ color: "#14b8a6" }}
                  className="text-xl font-semibold">
                  Menopausal Hormone Therapy or Hormone Replacement Therapy
                </h1>
                <p className="text-base font-normal">
                  Menopausal Hormone Therapy or Hormone Replacement Therapy are
                  effective for dealing with hot flushes and night sweats.
                  However, it's not recommended for paDents with cancers that
                  rely on hormones to grow, like certain breast cancers,
                  advanced stage endometrial cancers, uterine sarcoma, and
                  low-grade serous endometrial and ovarian cancer. Studies have
                  shown that using menopausal hormone therapy or hormone
                  replacement therapy in these cases might increase the risk of
                  the cancer coming back, negatively affect the chances of
                  recovery or positive outcomes, and even lead to blood clot
                  issues.
                </p>
              </div>

              <div>
                <p className="text-base font-normal">
                  For more information, visit{" "}
                  <a
                    href="https://www.askearlymenopause.org/"
                    target="_blank"
                    style={{ color: "#14b8a6" }}
                    className="underline">
                    www.askearlymenopause.org
                  </a>
                </p>
              </div>

              <div>
                <h1
                  style={{ color: "#14b8a6" }}
                  className="text-xl font-semibold">
                  Non-hormonal medications
                </h1>
                <p className="text-base font-normal">
                  Since menopausal hormone therapy or hormone replacement
                  therapy may not be suitable for some women, especially those
                  with cancer sensitive to hormones, there's a growing interest
                  in non-hormonal options. Examples include antidepressants
                  (like paroxetine, fluoxetine, venlafaxine, and
                  desvenlafaxine), anticonvulsants (gabapentin and pregabalin),
                  and an antihypertensive medication called clonidine. These
                  non-hormonal options have been shown to help reduce the
                  frequency and severity of troublesome symptoms like night
                  sweats and hot flushes in cancer survivors.
                </p>
              </div>

              <div>
                <p className="text-base font-normal">
                  For more information, visit{" "}
                  <a
                    href="https://www.askearlymenopause.org/"
                    target="_blank"
                    style={{ color: "#14b8a6" }}
                    className="underline">
                    www.askearlymenopause.org
                  </a>
                </p>
              </div>
            </div>
          </>
        </Accordion>

        <Accordion
          title="Questions to ask your doctor"
          className="text-2xl font-semibold"
          groupName="consumer-resources">
          <>
            <div className="flex flex-col items-start justify-start gap-5">
              <div>
                <p className="text-base font-normal">
                  Sometimes, it can be hard to talk to your general practitioner
                  (GP) about menopause symptoms, especially those related to
                  changes in libido, vaginal dryness, and pain during and after
                  sex, as these topics are sensitive. There might be challenges
                  in getting a GP appointment, and even if you do, the Dme for
                  discussion during the appointment can be limited. To make the
                  most of your appointment with your GP, we've provided links to
                  additional resources with helpful, straightforward tips and
                  questions you can ask during your appointment.
                </p>
              </div>
              <div>
                <p className="text-base font-normal">
                  Remember that not all the information on the websites may be
                  relevant to you. We suggest modifying or noting down the tips
                  that apply to your situation and add them to the reports from
                  our website.
                </p>
              </div>

              <div>
                <p className="text-base font-normal">
                  <a
                    href="https://www.askearlymenopause.org/"
                    target="_blank"
                    style={{ color: "#14b8a6" }}
                    className="underline">
                    www.askearlymenopause.org
                  </a>
                </p>
                <p className="text-base font-normal">
                  <a
                    href="https://henpicked.net/"
                    target="_blank"
                    style={{ color: "#14b8a6" }}
                    className="underline">
                    https://henpicked.net
                  </a>
                </p>
              </div>
            </div>
          </>
        </Accordion>
      </div>
    </div>
  );
};

export default ConsumerResourcesUI;
