import Link from "next/link";
import Tooltip from "@/components/Common/Tooltip";
import { CircleHelp } from "lucide-react";
export const moderateText = {
  hormonal: {
    title: `Management of menopausal symptoms in women with a history of hormonedependent cancers.`,
    para: [
      "People who have had cancers affected by hormones, like some breast cancers,endometrial cancers, and ovarian cancers, need special advice.",
      "Cancer Australia have a guideline that gives advice based on evidence specifically for breast cancer survivors. This guideline helps healthcare professionals and breast cancer paDents make informed decisions about managing menopausal symptoms.",
      "The use of this guideline is currently endorsed by the Breast Cancer Network Australia, Australasian Menopause Society, Medical Oncology Group of Australia (MOGA), and Breast Surgeons of Australia & New Zealand.",
      "This guideline applies to women of all ages and can offer helpful Dps for managing these symptoms. Also, while there aren’t specific guidelines for endometrial and ovarian cancers, the principles around hormone sensiDve cancers apply.",
    ],
    richText: (
      <div className="flex items-center gap-2">
        <p className="text-base font-normal">
          To view the guideline, visit{" "}
          <Link
            className=" text-violet-600 underline"
            href={"https://www.canceraustralia.gov.au"}>
            www.canceraustralia.gov.au
          </Link>{" "}
          or to download it{" "}
          <Link
            className=" text-violet-600 underline"
            href={
              "https://www.canceraustralia.gov.au/sites/default/files/publications/managing-menopausal-symptoms-after-breast-cancer-guide-women/pdf/2016_bcmc_booklet_0.pdf"
            }>
            here
          </Link>{" "}
        </p>
        <Tooltip
          content={
            <div className="flex flex-col items-start justify-start gap-5">
              <p className="text-xs font-normal">
                You will find this information by clicking on “Resources” on the
                home page, then select “Clinical Practice Guideline” from the
                dropdown menu.
                <br />
                <br />
                You will find the guideline titled “Management of menopausal
                symptoms in women with history of breast cancer” on the
                left-hand side.
              </p>
            </div>
          }>
          <CircleHelp color="#374151" size={20} className="cursor-pointer" />
        </Tooltip>
      </div>
    ),
  },
  default: {
    title:
      "Management of menopausal symptoms in women with other cancer types.",
    para: [
      "People with cancers that are not affected by hormones such as uterine, vaginal, vulval, colon, rectal, bladder, lung, and haematological cancers (among others) can follow the general guideline for managing menopause.",
      `The Endocrine Society created a clinical pracDce guideline that give advice for managing and treaDng menopausal symptoms in all women, including those who have had cancer. This helps healthcare professionals and paDents make informed decisions about managing menopausal symptoms.`,
      `The guideline has been reviewed and endorsed by the following:
The Australasian Menopause Society, the BriDsh Menopause
Society, the European Menopause and Andropause Society, the European Society of Endocrinology, and the InternaDonal
Menopause Society`,
    ],
    richText: (
      <div className="flex gap-5 flex-col">
        <p className="text-base font-normal">
          To view or download the guideline, visit:
          <br />
          <Link
            className=" text-violet-600 underline"
            href={"https://academic.oup.com/jcem/article/100/11/3975/2836060"}>
            https://academic.oup.com/jcem/article/100/11/3975/2836060
          </Link>{" "}
        </p>
        <p className="max-w-[50ch] text-base font-normal">
          <strong>Reference</strong>
          <br />
          Cynthia A. Stuenkel, Susan R. Davis, Anne Gompel, Mary Ann Lumsden, M.
          Hassan Murad, JoAnn V. Pinkerton, and Richard J. Santen. Treatment of
          Symptoms of the Menopause: An Endocrine Society Clinical Practice
          <br />
          Guideline. DOI:
          <Link
            className="underline text-violet-600"
            href="http://dx.doi.org/10.1210/ic.2015-2236">
            http://dx.doi.org/10.1210/ic.2015-2236
          </Link>
        </p>
      </div>
    ),
  },
};
