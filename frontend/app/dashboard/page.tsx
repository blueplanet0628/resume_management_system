"use client";

import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

import useWindowDimensions from "@/hooks/dimensions";

import ButtonWithBadge from "@/components/button-with-badge";

import InfoCard from "@/components/card/info";
import IconCard from "@/components/card/icon";
import StepCard from "@/components/card/step";
import TestimonialCard from "@/components/card/testimonial";
import AccordionCard from "@/components/card/accordion";
import ImageCardWithBg from "@/components/image-with-bg";
import { accordion_list, section_desc_1, section_info_list, section_job_seekers_desc, section_log_desc_list, section_usage_list } from "@/seeker/page";

import Image from 'next/image';
import MobileMenu from "@/components/MobileMenu";

const services = [
  {
    title: '職務職務の添削・作成支援',
    description:
      'プロの視点であなたの職務経歴書をブラッシュアップし、企業に伝わる魅力を引き出します。',
    icon: '/images/note-bold (1).png',
  },
  {
    title: '面接対策',
    description:
      '職務経歴書からその人独自の想定質問と回答例を提供し、自身をもって臨めるようにサポートします。',
    icon: '/images/user-sound-bold.png',
  },
  {
    title: '企業と直接マッチング',
    description:
      '転職エージェントを挟まず、プロフィール登録だけで、企業から直接オファーを受ける可能性が広がります。',
    icon: '/images/building-bold.png',
  },
];

const sectionInfoList = [
  ["職務経歴書をエージェントに", "相談したが、", "大して修正されず終わった"],
  ["未経験職種 への", "転職を考えているが、", "どう書けばいいのか分からない"],
  ["書き方が分からず、", "ネットのテンプレを", "コピペしてしまう"],
  ["自分の強みが分からず、", "「市場価値がないのでは？」と", "不安になる"],
  ["書類を出しても、", "何社も書類落ちしてしまう"],
  ["ブランクがあり、", "書く内容に困る"],
];

const images = [
  "/images/Group 425.png",
  "/images/Group 426.png",
  "/images/Group 427.png",
  "/images/Group 428.png",
  "/images/Group 429.png",
  "/images/Group 430.png",
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <section id="fee-structure" className="py-8 md:py-4 w-full flex flex-col items-center">
        <div className="px-10 md:px-0 md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-4">
          <img
            src="/images/for-job-seekers-mobile.png"
            className="md:mx-8 w-full md:w-[800px] aspect-4/3 block md:hidden"
            alt="プロによる添削料"
          />
          <img
            src="/images/for-job-seekers.png"
            width="800"
            height="204"
            className="md:mx-8 w-full md:w-[800px] aspect-4/1 hidden md:block"
            alt="プロによる添削料"
          />
          <div className="w-full md:w-[800px] text-xs">
            {section_job_seekers_desc.map((_item, index) => (
              <div key={`section_job_seekers_desc_${index}`}>{_item}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="my-12 w-full flex flex-col items-center overflow-hidden">
        <div
          className={`py-8 text-center w-full md:w-[800px] font-light text-xl xl:text-2xl 2xl:text-4xl flex flex-col gap-2 lg:gap-4 xl:gap-6 2xl:gap-8 relative`}
        >
          <div className="absolute left-0 -top-4">
            <img
              src={"/images/note1.png"}
              className="w-[92px] h-[92px] object-cover"
              alt=""
            />
          </div>
          {section_desc_1.map((_item, index) => (
            <div key={`section-1-${index}`}>{_item}</div>
          ))}
          <div className="absolute -top-8 -bottom-8 h-full aspect-square self-center object-center">
            <img src={"/images/circle.png"} className="" alt="" />
          </div>
          <div className="absolute right-0 -bottom-4">
            <img
              src={"/images/note2.png"}
              className="w-[92px] h-[92px] object-cover"
              alt=""
            />
          </div>
        </div>
      </section>
      <section id="about-us" className={`w-full flex flex-col items-center`}>
        <div className="px-10 pb-10 md:pb-0 md:px-0 md:w-[700px]  lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] grid grid-cols-1 md:grid-cols-2">
          <div className="py-20 pr-6 relative">
            <div className="absolute -top-16 left-0 w-1/2 aspect-square z-0 opacity-50">
              <img src={"/images/circle.png"} className="" alt="" />
            </div>
            <img
              src={"/images/peoples.png"}
              className="w-full aspect-16/7 object-cover z-20 opacity-100"
              alt=""
            />
            <div className="absolute -bottom-16 right-0 w-1/2 aspect-square z-0 opacity-50">
              <img src={"/images/circle.png"} className="" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <span className="text-primary-active text-base">Trumeeについて</span>
            <div className="dark:text-white text-black lg:text-lg xl:text-xl 2xl:text-2xl lg:leading-7 xl:leading-8 2xl:leading-10">
              <span className="mr-1 pr-4 bg-black text-white">
                職務経歴書・履歴書の添削
              </span>
              を通じて、求職者の魅力を最大限に引き出し、企業へのアピール力を向上させる
              <br />
              <span className="m4-1 pr-4 bg-black text-white">
                添削・マッチングサービス です。
              </span>
            </div>
            <div className="text-base">
              プロの視点で書類をブラッシュアップし、面接での想定質問や効果的な回答例の提供、キャリアコーチングまで一貫してサポート。さらに、企業からのスカウトのチャンスも広がり、理想のキャリア実現を強力に後押しします。
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 w-full gradient-background text-gray-light flex flex-col items-center">
        <div className="w-full px-4 md:px-6 xl:px-0 max-w-screen-xl text-gray-light flex flex-col items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-center">
            職務経歴書のよくある悩み
          </h3>
          <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-6">
              <img src={"/images/Group 425.png"} className="" alt="" />
              <img src={"/images/Group 426.png"} className="" alt="" />
              <img src={"/images/Group 427.png"} className="" alt="" />
              <img src={"/images/Group 428.png"} className="" alt="" />
              <img src={"/images/Group 429.png"} className="" alt="" />
              <img src={"/images/Group 430.png"} className="" alt="" />
          </div>
        </div>
      </section>
      <section className="py-10 px-10 md:px-0 w-full flex flex-col items-center gap-6">
        <h3 className="text-2xl text-[#FF733E] font-semibold text-primary-active">
          Trumeeならそのお悩み、解決できます
        </h3>
        <div className="px-10 md:px-0 w-full md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col md:flex-row items-center gap-10">
          <div className="py-12 px-10 md:px-0 w-full md:w-unset md:basis-1/3 relative">
            <div className="w-3/5 bg-[#FF733E] rounded-2xl bg-primary-active aspect-3/4 self-center justify-self-center" />
            <img
              src={"/images/group_02.png"}
              className="absolute right-0 bottom-0 w-3/5 aspect-3/4"
              alt=""
            />
            <img
              src={"/images/group_01.png"}
              className="absolute left-0 top-0 w-3/5 aspect-3/4"
              alt=""
            />
          </div>
          <div className="md:basis-2/3 lg:text-lg xl:text-xl 2xl:text-3xl flex flex-col items-center gap-8 relative">
            <div className="absolute px-10 md:px-0 w-full md:w-unset md:h-full aspect-square">
              <img src={"/images/circle.png"} className="" alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl">“ありのまま”を武器に。</span>
              <span className="text-xl">
                職務経歴書も面接もあなたの魅力が伝わる！
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 z-20">
              <div className="flex-1 pt-6 px-6 bg-orange-90 shadow-md aspect-4/1">
                <img src={"/images/3x.png"} className="" alt="" />
              </div>
              <div className="flex-1 pt-6 px-6 bg-orange-90 shadow-md aspect-4/1">
                <img src={"/images/150percent.png"} className="" alt="" />
              </div>
            </div>
            <div className="-mt-4 w-full text-gray-dark text-xs">
              ※2024年度に弊社でご支援した求職者の実績
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#FF9871] w-full bg-orange-main flex flex-col items-center">
        <div className="px-10 md:px-0 md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-4">
          <img src={"/images/card.png"} className="w-10 h-10" alt="" />
          <div className="flex flex-col text-white font-semibold lg:text-xl xl:text-xl 2xl:text-2xl items-center gap-1">
            <h3 className="text-white font-semibold">
              あなたのキャリアを最大限に引き出す
            </h3>
            <div className="flex flex-row items-end gap-1">
              <span className="px-2 lg:text-xl xl:text-2xl 2xl:text-3xl border border-white">
                3つ
              </span>
              のサポート
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="px-4 py-8 rounded-xl bg-white flex flex-col gap-3 shadow-sm"
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex-none w-12 h-12 rounded-full bg-[#FFE3D9] text-primary-active flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="w-[23.54px] h-[23.54px]"
                    />
                  </div>
                  <span className="font-semibold text-lg">{service.title}</span>
                </div>
                <div className="text-base text-gray-700">{service.description}</div>
              </div>
            ))}
          </div>
          <span className="text-5xl text-white">+</span>
          <div className="w-full flex flex-col gap-1">
            <div className="py-6 px-3 w-full bg-white flex flex-row items-center justify-center">
              <span>
                希望者には企業への応募代行、キャリアコーチングのサービスも。
              </span>
            </div>
            <span className="text-xs text-white">
              ※2
              面接対策は一部無料、一部有料のサービスです。詳しくはこちらをお読みください。
            </span>
            <span className="text-xs text-white">
              ※3
              現在、サービスの詳細を調整中のため、ご希望の方はお気軽にご相談ください。マイページのチャットでご連絡いただければ、あなたに合ったサポートを個別にご案内いたします。
            </span>
          </div>
        </div>
      </section>
      <section className="pt-12 pb-16 w-full bg-[#F7E6E1] flex flex-col items-center">
        <div className="px-10 md:px-0 md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-4">
          <img
            src={"/images/50000_mobile.png"}
            className="w-full aspect-4/3 block md:hidden"
            alt=""
          />
          <img
            src={"/images/50000.png"}
            className="w-full aspect-4/1 hidden md:block"
            alt=""
          />
          <div className="flex flex-col md:flex-row gap-1">
            <span>皆さまの転職活動の成功に</span>
            <span className="px-1 font-semibold text-primary-active bg-white">
              コミットできる自信
            </span>
            <span>があるからこそ、実施できる特典です。</span>
          </div>
        </div>
      </section>
      <section className="pt-12 pb-16 px-[30px] w-full flex flex-col items-center relative">
        <div className="md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-6 z-100">
          <div className="w-32 h-10 flex flex-col items-center justify-center text-white">
            <img 
                src={"/logo/logo_white.png"}
                className="w-[166px] h-[28px]"
                alt="Xrosspoint"
            />
          </div>
          <h3 className="text-white">自分を知り、自信を持てる職務経歴書へ</h3>
          <div className="flex flex-col items-center gap-1">
            {section_log_desc_list.map((_desc, index) => (
              <span className="text-xs text-white" key={`desc_${index}`}>
                {_desc}
              </span>
            ))}
          </div>
          <ButtonWithBadge
            href="/register"
            label="Webで簡単！添削サービスに申し込む"
            variant="secondary"
            rounded={true}
            badge="今なら100% キャッシュバック"
            className="mt-10 py-3"
          />
        </div>

        <div className="absolute inset-0 bg-primary-active opacity-70 z-10 bg-[#E69070]" />
        <div className="absolute inset-0">
          <img
            src={"/images/resume.png"}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </section>
      <section id="service-flow" className="py-12 w-full flex flex-col items-center bg-white">
        <div className="px-10 md:px-0 md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-6 z-100">
          <div className="flex flex-col items-center gap-1">
            <img src={"/images/card.png"} className="w-10 h-10" alt="" />
            <span className="text-xl">ご利用の流れ</span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
            {section_usage_list.map((_item, index) => (
              <StepCard
                {..._item}
                showNext={true}
                key={`step-card-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="success-stories" className="py-12 w-full bg-[#FCF9F4] flex flex-col items-center">
        <div className="px-10 md:px-0 md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-6 z-100">
          <div className="flex flex-col items-center gap-1">
          <img
            src="/images/card.png"
            className="w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-auto"
            alt=""
          />            
          <span className="text-xl">転職成功事例</span>
            <span className="text-sm font-semibold text-secondary-30">
              職務経歴書の改善がきっかけで、理想の転職を叶えた求職者の皆さまの声をご紹介
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {section_testimonials.map((_item, index) => (
              <TestimonialCard {..._item} key={`testimonial-card-${index}`} />
            ))}
          </div>
        </div>
      </section>
      <section id="FAQ" className="py-12 w-full bg-secondary-20 flex flex-col items-center">
        <div className="px-2 w-full md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-3 z-100">
          <div className="flex flex-col items-center gap-1">
            <img src={"/images/card.png"} className="w-10 h-10" alt="" />
            <span className="text-xl">よくある質問</span>
          </div>
          <AccordionCard content={accordion_list} />
        </div>
      </section>
      <section className="pt-12 pb-16 w-full flex flex-col items-center relative">
        <div className="md:w-[700px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1400px] flex flex-col items-center gap-6 z-100">
          <div className="w-32 h-10 flex flex-col items-center justify-center text-white">
            <img 
                src={"/logo/logo_white.png"}
                className="w-[166px] h-[28px]"
                alt="Xrosspoint"
            />
          </div>
          <h3 className="text-white">自分を知り、自信を持てる職務経歴書へ</h3>
          <div className="flex flex-col items-center gap-1">
            {section_log_desc_list.map((_desc, index) => (
              <span className="text-xs text-white" key={`desc_${index}`}>
                {_desc}
              </span>
            ))}
          </div>
          <ButtonWithBadge
            href="/register"
            label="Webで簡単！添削サービスに申し込む"
            variant="secondary"
            rounded={true}
            badge="今なら100% キャッシュバック"
            className="mt-10 py-3"
          />
        </div>

        <div className="absolute inset-0 bg-[#E69373] opacity-70 z-10" />
        <div className="absolute inset-0">
          <img
            src={"/images/resume.png"}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </section>
      <div>
        <MobileMenu />
      </div>
      
    </>
  );
}

const HeroSection = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { width } = useWindowDimensions();

  const [whiteCardWidth, whiteCardHeight] = useMemo(() => {
    if (width > 1600) return [250, 320];
    if (width >= 1366) return [225, 285];
    if (width >= 1024) return [180, 230];
    if (width >= 768) return [150, 190];
    if (width >= 450) return [120, 120];
    return [120, 120];
  }, [width]);

  return (
    <section className="px-0 py-6 w-full bg-orange-90 overflow-hidden">
      <div className="w-ful flex flex-col gap-8 relative">
        <div className={`absolute inset-0 md:flex md:flex-row justify-between hidden `}>
          {
            Array.from({ length: 5 }).map((_, index) => (
              <div className={`h-full flex flex-col ${index % 2 == 0 ? "justify-start" : "justify-end"}`} key={`white-card-${index}`}>
                <div className="bg-white" style={{ width: `${whiteCardWidth}px`, height: `${whiteCardHeight}px`, borderRadius: "20px" }} />
              </div>
            ))
          }
        </div>
        <div className="w-full aspect-5/4 relative grid grid-cols-2 md:hidden">
          <div className="w-full h-full relative overflow-hidden">
            <ImageCardWithBg
              left={-2}
              top={0}
              borderRadius={8}
              src={"/images/header-girl-02.png"}
              width={45}
            />
            <ImageCardWithBg
              left={35}
              top={40}
              borderRadius={8}
              src={"/images/header-man-04.png"}
              width={45}
            />
            <div className="bg-white absolute z-0" style={{ 
              left: "-20%",
              top: "-30%",
              width: "100%", 
              aspectRatio: 3 / 5,
              height: ``, 
              borderRadius: "20px",
            }} />
          </div>
          <div className="w-full h-full relative">
            <ImageCardWithBg
              left={0}
              top={-20}
              borderRadius={12}
              src={"/images/header-girl-01.png"}
              width={130}
            />

            <ImageCardWithBg
              right={5}
              top={90}
              borderRadius={8}
              src={"/images/header-man-03.png"}
              width={35}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse items-start md:grid md:grid-cols-3 z-20" style={{
          paddingLeft: `${isMobile ? 24 : whiteCardWidth}px`,
          paddingRight: `${isMobile ? 24 : whiteCardWidth}px`,
          height: `${whiteCardHeight}px`
        }}>
        <div className="text-primary-default font-bold flex flex-col gap-3 justify-end px-4 md:px-0 items-start">
            {[
              { text: "もう悩まない。", w: "w-full " },
              { text: "伝わる。", w: "w-[70%]" },
              { text: "職務経歴書。", w: "w-[90%]" },
            ].map(({ text, w }, index) => (
              <div
                key={`header-text-${index}`}
                className={`border border-[#A3A3A3] bg-white px-4 py-2 ${w}
                  text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[34px]
                  whitespace-nowrap overflow-hidden`}
              >
                {text}
              </div>
            ))}

          </div>
          <div className="md:w-full md:h-full relative hidden md:block">
            <ImageCardWithBg
              right={3}
              top={1}
              borderRadius={12}
              src={"/images/header-girl-01.png"}
              width={60}
            />
          </div>
          <div className="w-full h-full relative hidden md:block">
            <ImageCardWithBg
              left={15}
              top={1}
              borderRadius={8}
              src={"/images/header-girl-02.png"}
              width={38}
            />
            <ImageCardWithBg
              right={1}
              bottom={-15}
              borderRadius={8}
              src={"/images/header-man-04.png"}
              width={38}
            />
            <ImageCardWithBg
              left={5}
              bottom={-25}
              borderRadius={0}
              src={"/images/header-man-03.png"}
              width={30}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center z-50">
          <ButtonWithBadge
            href="/auth/register"
            label="Webで簡単！添削サービスに申し込む" 
            variant="primary" 
            rounded={true} 
            badge="今なら100% キャッシュバック"
            className="py-3"
          />
        </div>
      </div>
    </section>    
  )
}

const section_testimonials: any[] = [
  {
    caseId: "01",
    tags: ["＃30代女性", "＃正社員未経験"],
    requirements: ["正社員経験なしの", "子育てママが…"],
    sayings: ["経歴を魅力的にすることで、", "憧れだった正社員に！"],
    avatar: "/images/testimonial_1.png",
    title: "職務経歴書の添削がまさか面接でも役に立つとは",
    shortDesc: (
      <>
        正社員経験のない、かつ
        <span className="text-[#FF733E]">
          子持ちで条件の多い私のサポートをするのは非常に難しく
        </span>
        、エージェントとしては全くうまみの無いタイプの求職者であることに自覚がありました。大手のエージェントでは、そもそものサポートを断られたり、最初の面談以降にほとんど連絡のないまま放置されることが多かったです。御社は、最初からこのような立場の私でも
        <span className="text-[#FF733E]">
          非常に親身になってくださり、職務経歴書の添削を丁寧にしてくださいました。
        </span>
        その添削以降、書類に通過することも増えたように思います。添削では、
        <span className="text-[#FF733E]">
          自分では気づかない深いところまで突っ込んで聞いてくださったおかげで、内容にとても説得力が生まれました。
        </span>
        そして、自分の中でも今までの仕事に対してしっかり振り返れたことで、その後の面接などで面接官にいろいろ聞かれても自信をもって答えられました。
        <span className="text-[#FF733E]">
          職務経歴書の添削が面接でも役に立つとは
        </span>
        思っておらず、非常に感謝しております。
      </>
    ),
    hasLongDesc: false,
    longDesc: null,
    commentTitle: "職務経歴書アドバイザーからのメッセージ",
    commentDesc: (<>転職活動では<b>「自分に価値があるのか？」「本当に採用されるのか？」と不安を感じる方が多いです。</b>特に、正社員経験がない方やブランクがある方は、エージェントに相談しても十分なサポートが受けられないことが少なくありません。私たちは、どんなご経歴の方でも一人ひとりの強みを引き出し、書類選考を通過しやすい職務経歴書へとブラッシュアップします。</>)
  },
  {
    caseId: "02",
    tags: ["＃30代女性", "＃新業種への挑戦"],
    requirements: ["転職迷子、", "方向性が定められない…"],
    sayings: ["方向性が明確化し、", "新たな業種で転職成功！"],
    avatar: "/images/testimonial_2.png",
    title: "最初から最後までしっかりとしたサポートを受けられたと感じています",
    shortDesc: (
      <>
        はじめにオンライン面談でヒアリングしていただき、
        <span className="text-[#FF733E]">
          今後のキャリアプランの立て方や転職先の方向性を一緒に考えていただく
        </span>
        ところから始まり、書類選考を突破するための職務経歴書の添削、面接対策として企業の志望理由の確認も行っていただき、最初から最後までしっかりとしたサポートを
      </>
    ),
    hasLongDesc: true,
    longDesc: (
      <>
        はじめにオンライン面談でヒアリングしていただき、
        <span className="text-[#FF733E]">
          今後のキャリアプランの立て方や転職先の方向性を一緒に考えていただく
        </span>
        ところから始まり、書類選考を突破するための職務経歴書の添削、面接対策として企業の志望理由の確認も行っていただき、最初から最後までしっかりとしたサポートを
      </>
    ),
    commentTitle: "職務経歴書アドバイザーからのメッセージ",
    commentDesc: (<>この方のサポートを通じて改めて感じたのは、<b>「転職は、書類や面接対策だけでなく、キャリアの可能性を広げるプロセス</b>でもある」ということです。最初のヒアリングでは、ご自身で考えていた転職の方向性が明確になりきれていない部分もありましたが、<b>じっくり対話を重ねることで、新たな選択肢が見えてきました。</b>結果として、ご自身では思いつかなかった業種への転職が成功し、私たちも大変嬉しく思っています。</>)    
  },
];

