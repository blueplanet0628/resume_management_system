'use client';
import { useCallback, useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { CheckInputConditions } from "@/components/check";
import toast from "react-hot-toast";
import BusinessCard from "@/components/card";
import { prefecturesJa } from "@/app/content/prefectures";
import BusinessDetailModal from "@/components/modal/business-detail";
import { useMessageToUser } from "@/app/queries/mutation";


const mockScoutData = [
 {
   companyName: "テックソリューション",
   user: {
     work_location: "13", // 東京都
     messagesSent: [{ message: "ぜひ一度お話させてください！" }],
   },
 },
 {
   companyName: "未来産業",
   user: {
     work_location: "27", // 大阪府
     messagesSent: [{ message: "ご応募お待ちしています。" }],
   },
 },
 {
   companyName: "デジタルクリエイト",
   user: {
     work_location: "14", // 神奈川県
     messagesSent: [{ message: "新規プロジェクトでの人材募集です。" }],
   },
 },
 {
   companyName: "グローバルリンク",
   user: {
     work_location: "1", // 北海道
     messagesSent: [{ message: "興味があればご連絡ください。" }],
   },
 },
 {
   companyName: "ネクストチャレンジ",
   user: {
     work_location: "40", // 福岡県
     messagesSent: [],
   },
 },
];
const searchScoutBusinesses = async (data: any) => {
  
  // const _res = await fetch("/api/seeker/search/scout", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //   },
  // });

  // if (!_res.ok) {
  //   const errorData = await _res.json().catch(() => null);
  //   throw new Error(errorData.message);
  // }
  // return _res.json().catch(() => ({}));
};

const emptyHandler = () => {};

const useSearchScoutBusinesses = (
  onSuccess?: (_data: any) => void,
  onError?: () => void
) =>
  useMutation({
    mutationFn: searchScoutBusinesses,
    onSuccess: onSuccess ?? emptyHandler,
    onError: onError ?? emptyHandler,
  });
  

const prefecturesOptions = prefecturesJa.map((_pref, index) => ({
    label: _pref,
    value: (index + 1).toString()
}));

const industries = [
  {
      id: 1,
      category: 1,
      name: "自動車製造",
      value: "automobile",
  },
  {
      id: 2,
      category: 1,
      name: "航空機製造",
      value: "aircraft",
  },
  {
      id: 3,
      category: 1,
      name: "造船業",
      value: "ship"
  },
  {
      id: 4,
      category: 1,
      name: "電子機器・半導体製造",
      value: "electronic",
  },
  {
      id: 5,
      category: 1,
      name: "精密機器製造",
      value: "precision",
  },
  {
      id: 6,
      category: 1,
      name: "化学製造（医薬品・化粧品・化学繊維）",
      value: "chemical"
  },
  {
      id: 7,
      category: 1,
      name: "食品製造・加工",
      value: "food"
  },
  {
      id: 8,
      category: 1,
      name: "金属加工・鉄鋼業",
      value: "metal"
  },
  {
      id: 9,
      category: 1,
      name: "製紙業",
      value: "paper"
  },
  {
      id: 10,
      category: 1,
      name: "ガラス・セラミックス製造",
      value: "glass"
  },
  {
      id: 11,
      category: 2,
      name: "ソフトウェア開発",
      value: "software",
  },
  {
      id: 12,
      category: 2,
      name: "Web開発",
      value: "web",
  },
  {
      id: 13,
      category: 2,
      name: "AI・データサイエンス",
      value: "AI",
  },
  {
      id: 14,
      category: 2,
      name: "ゲーム開発",
      value: "game",
  },
  {
      id: 15,
      category: 2,
      name: "ITコンサルティング",
      value: "consulting",
  },
  {
      id: 16,
      category: 2,
      name: "システムインテグレーション",
      value: "system",
  },
  {
      id: 17,
      category: 2,
      name: "通信インフラ（通信キャリア・ネットワーク構築）",
      value: "telecommunication",
  },
  {
      id: 18,
      category: 2,
      name: "クラウドサービス",
      value: "cloud",
  },
  {
      id: 19,
      category: 2,
      name: "セキュリティサービス",
      value: "security",
  },
  {
      id: 20,
      category: 2,
      name: "IoT開発",
      value: "IoT",
  },
  {
      id: 21,
      category: 3,
      name: "百貨店・スーパー",
      value: "department",
  },
  {
      id: 22,
      category: 3,
      name: "コンビニエンスストア",
      value: "Convenience ",
  },
  {
      id: 23,
      category: 3,
      name: "EC・ネットショップ",
      value: "Ecommerce",
  },
  {
      id: 24,
      category: 3,
      name: "家電量販店",
      value: "electronics",
  },
  {
      id: 25,
      category: 3,
      name: "アパレル販売",
      value: "Apparel",
  },
  {
      id: 26,
      category: 3,
      name: "自動車販売",
      value: "automobile",
  },
  {
      id: 27,
      category: 3,
      name: "飲食料品販売",
      value: "food",
  },
  {
      id: 28,
      category: 3,
      name: "楽器・音響機器販売",
      value: "musical",
  },
  {
      id: 29,
      category: 3,
      name: "ホビー・雑貨販売",
      value: "hobby",
  },
  {
      id: 30,
      category: 3,
      name: "化粧品・ドラッグストア",
      value: "cosmetics",
  },
  {
      id: 31,
      category: 4,
      name: "レストラン",
      value: "Restaurants",
  },
  {
      id: 32,
      category: 4,
      name: "カフェ・喫茶店",
      value: "cafe",
  },
  {
      id: 33,
      category: 4,
      name: "居酒屋・バー",
      value: "tavern",
  },
  {
      id: 34,
      category: 4,
      name: "ファーストフード",
      value: "fastfood",
  },
  {
      id: 35,
      category: 4,
      name: "ベーカリー・製菓",
      value: "bakery",
  },
  {
      id: 36,
      category: 4,
      name: "ケータリング・デリバリー",
      value: "catering",
  },
  {
      id: 37,
      category: 4,
      name: "高級レストラン",
      value: "finedining",
  },
  {
      id: 38,
      category: 4,
      name: "食品加工・仕出し",    
      value: "foodprocessing",
  },
  {
      id: 39,
      category: 5,
      name: "病院・クリニック",
      value: "Hospital",
  },
  {
      id: 40,
      category: 5,
      name: "歯科医院",
      value: "Dental",
  },
  {
      id: 41,
      category: 5,
      name: "介護施設・訪問介護",
      value: "Nursing",
  },
  {
      id: 42,
      category: 5,
      name: "保育・児童福祉",
      value: "Childcare",
  },
  {
      id: 43,
      category: 5,
      name: "獣医・ペットクリニック",
      value: "Veterinary",
  },
  {
      id: 44,
      category: 5,
      name: "鍼灸・整体・マッサージ",
      value: "Acupuncture",
  },
  {
      id: 45,
      category: 5,
      name: "精神医療・カウンセリング",
      value: "Psychiatry",
  },
  {
      id: 46,
      category: 5,
      name: "製薬・バイオテクノロジー",
      value: "Pharmaceutical",
  },
  {
      id: 47,
      category: 6,
      name: "幼稚園・保育園",
      value: "kindergarten",
  },
  {
      id: 48,
      category: 6,
      name: "小学校・中学校・高校",
      value: "Elementary",
  },
  {
      id: 49,
      category: 6,
      name: "大学・専門学校",
      value: "university",
  },
  {
      id: 50,
      category: 6,
      name: "企業研修・コンサルティング",
      value: "corporate",
  },
  {
      id: 51,
      category: 6,
      name: "予備校・塾・家庭教師",
      value: "tutoring",
  },
  {
      id: 52,
      category: 6,
      name: "オンライン教育（eラーニング）",
      value: "online",
  },
  {
      id: 53,
      category: 6,
      name: "科学研究・技術開発",
      value: "research",
  },
  {
      id: 54,
      category: 7,
      name: "銀行・信用金庫",
      value: "bank",
  },
  {
      id: 55,
      category: 7,
      name: "証券会社",
      value: "security",
  },
  {
      id: 56,
      category: 7,
      name: "保険業（生命保険・損害保険）",
      value: "insurance",
  },
  {
      id: 57,
      category: 7,
      name: "投資ファンド・ベンチャーキャピタル",
      value: "investment",
  },
  {
      id: 58,
      category: 7,
      name: "クレジットカード・フィンテック",
      value: "creditcard",
  },
  {
      id: 59,
      category: 8,
      name: "建設業（住宅・商業施設・公共施設）",
      value: "construction",
  },
  {
      id: 60,
      category: 8,
      name: "土木工事（道路・橋・トンネル）",
      value: "road",
  },
  {
      id: 61,
      category: 8,
      name: "設計・建築デザイン",
      value: "design",
  },
  {
      id: 62,
      category: 8,
      name: "不動産売買・仲介",
      value: "realestatesales",
  },
  {
      id: 63,
      category: 8,
      name: "不動産管理・賃貸業",
      value: "realestatemanage",
  },
  {
      id: 64,
      category: 8,
      name: "住宅リフォーム・インテリア",
      value: "interiordesign",
  },
    {
      id: 65,
      category: 9,
      name: "陸運（トラック・鉄道輸送）",
      value: "truck-rail",
  },
  {
      id: 66,
      category: 9,
      name: "海運（貨物船・フェリー）",
      value: "ship",
  },
  {
      id: 67,
      category: 9,
      name: "空運（航空貨物・旅客輸送）",
      value: "air",
  },
  {
      id: 68,
      category: 9,
      name: "倉庫・物流センター",
      value: "warehouse",
  },
  {
      id: 69,
      category: 9,
      name: "宅配・郵便サービス",
      value: "delivery",
  },
  {
      id: 70,
      category: 10,
      name: "新聞・出版",
      value: "newspaper",
  },
  {
      id: 71,
      category: 10,
      name: "テレビ・ラジオ放送",
      value: "tv",
  },
  {
      id: 72,
      category: 10,
      name: "広告代理店",
      value: "ad",
  },
  {
      id: 73,
      category: 10,
      name: "PR・マーケティング",
      value: "pr",
  },
  {
      id: 74,
      category: 10,
      name: "映画・動画制作",
      value: "film",
  },
  {
      id: 75,
      category: 10,
      name: "音楽・レコード業界",
      value: "music",
  },
  {
      id: 76,
      category: 10,
      name: "Webメディア・ブログ",
      value: "blog",
  },
  {
      id: 77,
      category: 11,
      name: "スポーツ（プロスポーツ・フィットネス）",
      value: "sport",
  },
  {
      id: 78,
      category: 11,
      name: "ゲーム・アニメ制作",
      value: "game",
  },
  {
      id: 79,
      category: 11,
      name: "映画・舞台・演劇",
      value: "movies",
  },
  {
      id: 80,
      category: 11,
      name: "観光業・旅行業",
      value: "tourism",
  },
  {
      id: 81,
      category: 11,
      name: "テーマパーク・遊園地",
      value: "part",
  },
  {
      id: 82,
      category: 11,
      name: "ギャンブル（カジノ・競馬・パチンコ）",
      value: "gambling",
  },
  {
      id: 83,
      category: 12,
      name: "国・地方自治体",
      value: "government",
  },
  {
      id: 84,
      category: 12,
      name: "警察・消防・防衛",
      value: "police",
  },
  {
      id: 85,
      category: 12,
      name: "図書館・博物館・美術館",
      value: "libraries",
  },
  {
      id: 86,
      category: 12,
      name: "環境保護・NPO・NGO",
      value: "env-protect",
  },
  {
      id: 87,
      category: 12,
      name: "国際機関（国連・JICAなど）",
      value: "international",
  },
  {
      id: 88,
      category: 13,
      name: "農業（米・野菜・果物）",
      value: "agriculture",
  },
  {
      id: 89,
      category: 13,
      name: "畜産業（牛・豚・鶏）",
      value: "cattle",
  },
  {
      id: 90,
      category: 13,
      name: "漁業・養殖業",
      value: "fishing",
  },
  {
      id: 91,
      category: 13,
      name: "林業・木材加工",
      value: "wood",
  },
  {
      id: 92,
      category: 14,
      name: "人材派遣・人材紹介",
      value: "hr",
  },
  {
      id: 93,
      category: 14,
      name: "経営コンサルティング",
      value: "management",
  },
  {
      id: 94,
      category: 14,
      name: "ITコンサルティング",
      value: "it",
  },
  {
      id: 95,
      category: 14,
      name: "キャリアカウンセリング",
      value: "career",
  },
  {
      id: 96,
      category: 15,
      name: "弁護士",
      value: "lawyer",
  },
  {
      id: 97,
      category: 15,
      name: "司法書士・行政書士",
      value: "administrative",
  },
  {
      id: 98,
      category: 15,
      name: "税理士・公認会計士",
      value: "accountant",
  },
  {
      id: 99,
      category: 15,
      name: "社会保険労務士",
      value: "social-security",
  },
  {
      id: 100,
      category: 16,
      name: "クリーニング・リネンサービス",
      value: "cleaning",
  },
  {
      id: 101,
      category: 16,
      name: "便利屋・代行業",
      value: "agency",
  },
  {
      id: 102,
      category: 16,
      name: "結婚相談所",
      value: "marriage",
  },
  {
      id: 103,
      category: 16,
      name: "ペット関連（ペットホテル・トリミング）",
      value: "pet",
  },
];

const scout_filter_list = [
  {
    index: 0,
    label: "職種",
    type: "occupation",
    list: [
      {
        label: "営業・販売",
        value: "sales-marketing",
      },
      {
        label: "事務・受付",
        value: "office-reception",
      },
      {
        label: "飲食・サービス",
        value: "food-beverage",
      },
      {
        label: "保育士・教員",
        value: "child-care",
      },
      {
        label: "介護・福祉",
        value: "welfare",
      },
      {
        label: "医師・看護師",
        value: "doctor-nurse",
      },
      {
        label: "クリエイター",
        value: "creator",
      },
      {
        label: "IT・WEB",
        value: "it",
      },
      {
        label: "エンジニア",
        value: "engineers",
      },
      {
        label: "製造・工場",
        value: "manufacture",
      },
      {
        label: "物流",
        value: "logistics",
      },
      {
        label: "金融",
        value: "finance",
      },
    ],
  },
  {
    index: 1,
    label: "勤務地",
    type: "work_location",
    list: prefecturesOptions,
  },
  {
    index: 2,
    label: "業種",
    type: "industry",
    list: industries.map((industry) => ({
      label: industry.name,
      value: industry.id.toString(),
    })),
  },
  {
    index: 3,
    label: "応募状況",
    type: "apply_status",
    list: [
      {
        label: "応募済み",
        value: "applied",
      },
      {
        label: "未応募",
        value: "not_applied",
      },
    ],
  },
];

export default function Rightpage() {
  const { mutate: sendMessage, isPending: sendingMessage } = useMessageToUser();

  const filterRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<any>();
  const [openFilter, setOpenFilter] = useState<string>();
  const [resultList, setResultList] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    occupation: string[];
    work_location: string[];
    industry: string[];
    apply_status: string[];
  }>({
    occupation: [],
    work_location: [],
    industry: [],
    apply_status: [],
  });

  const getFilterDisplayText = useCallback(
    (filterType: string) => {
      const filters =
        selectedFilters[filterType as keyof typeof selectedFilters] || [];
      if (filters.length === 0) return "指定なし";
      if (filters.length === 1) {
        const filterItem = scout_filter_list
          .find((item) => item.type === filterType)
          ?.list.find((item) => item.value === filters[0]);
        return filterItem?.label || "指定なし";
      }
      return `${filters.length}件選択`;
    },
    [selectedFilters]
  );

  const onSearchResponse = useCallback((_data: any) => {
    console.log("search response", _data);
    try {
      const { list, count } = _data;
      setResultList(list);
    } catch (err) {
      console.log("Error", err);
    }
  }, []);

  const { isPending: isSearching, mutate: searchScoutBusinesses } =
  useSearchScoutBusinesses(onSearchResponse);

  const onSearch = useCallback(() => {
    setOpenFilter(undefined);
    searchScoutBusinesses(selectedFilters);
  }, [searchScoutBusinesses, selectedFilters]);


  const onToggleFilter = useCallback(
    (filterType: string, filterValue: string) => () => {
      setSelectedFilters((prev) => {
        const currentFilters = prev[filterType as keyof typeof prev] || [];
        const isSelected = currentFilters.includes(filterValue);

        if (isSelected) {
          return {
            ...prev,
            [filterType]: currentFilters.filter((v) => v !== filterValue),
          };
        } else {
          return {
            ...prev,
            [filterType]: [...currentFilters, filterValue],
          };
        }
      });
    },
    []
  );

  const onClearAllFilters = useCallback(() => {
    setSelectedFilters({
      occupation: [],
      work_location: [],
      industry: [],
      apply_status: [],
    });
  }, []);

  const sendApplication = async (data: any) => {
    const _res = await fetch("/api/seeker/apply", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  
    if (!_res.ok) {
      const errorData = await _res.json().catch(() => null);
      throw new Error(errorData?.message || "Application failed");
    }
  
    const res = await _res.json();
  
    if (res.success) {
      toast.success("成功");
    }
  
    return res;
  };

  const useApplyToBusiness = (
    onSuccess?: (_data: any) => void,
    onError?: () => void
  ) =>
    useMutation({
      mutationFn: sendApplication,
      onSuccess: onSuccess ?? emptyHandler,
      onError: onError ?? emptyHandler,
    });


    const onApplyResponse = useCallback((_data: any) => {
      const isUnApplied = _data?.isUnApplied;
      const appliedData = _data?.apply;
  
      if (!appliedData) {
        console.warn("Apply response data is missing or invalid:", _data);
        return;
      }  
      setResultList((oldList: any[]) => {
        return oldList.map((_item: any) =>
          _item.user.id == appliedData.receiverId
            ? {
                ..._item,
                applys: isUnApplied ? [] : [appliedData],
              }
            : _item
        );
      });
    }, []);

  const { mutate: applyToBusiness, isPending: isApplying } =
  useApplyToBusiness(onApplyResponse);
const onApply = useCallback(
  (_id: number) => () => {
    if (_id == 0) return;
    applyToBusiness({
      id: _id,
    });
    setCurrentUser(undefined);
  },
  [applyToBusiness]
);

const onDetail = useCallback((_seeker: any) => {
  setCurrentUser(_seeker);
}, []);
const onToggleDetailModal = useCallback(() => {
  setCurrentUser(undefined);
}, []);

  return (
    <>
      <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800">企業からのスカウト状況</h1>
      <h2 className="text-lg text-gray-600 mt-2 mb-6">
        採用を行なっている企業からのオファーが確認できます。
      </h2>

      <section
        className="w-full flex flex-row items-center relative bg-[#FF733E] rounded-full shadow-sm"
        ref={filterRef}
      >
        <div className="flex-1 grid grid-cols-4 gap-2">
          {scout_filter_list.map((_item) => {
            const isSelected = openFilter === _item.type;

            return (
              <div
                key={`scout-filter-item-${_item.type}`}
                onClick={() => setOpenFilter(_item.type)}
                className={`relative cursor-pointer rounded-full px-3 py-2 text-center transition-all duration-200
                  ${isSelected ? 'bg-white text-black shadow-md' : 'bg-[#FF733E] text-white hover:bg-gray-200'}
                `}
              >
                <div className="text-sm font-semibold">{_item.label}</div>
                <div className="text-xs">{getFilterDisplayText(_item.type)}</div>
              </div>
            );
          })}
        </div>

        <div
          onClick={onSearch}
          className="w-[55px] h-[55px] flex items-center justify-center hover:opacity-80 cursor-pointer"
        >
          <FaSearch className="w-[24px] h-[24px] text-white" />
        </div>

        {/* フィルター選択肢一覧（展開） */}
        {!!openFilter && (
          <div className="absolute top-[90px] left-0 right-0 px-8 py-6 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-4 gap-y-3 gap-x-4">
              {scout_filter_list
                .find((_item) => _item.type === openFilter)
                ?.list.map((_filterItem) => (
                  <CheckInputConditions
                    key={`check-filter-${openFilter}-${_filterItem.value}`}
                    checked={
                      selectedFilters[
                        openFilter as keyof typeof selectedFilters
                      ]?.includes(_filterItem.value) || false
                    }
                    label={_filterItem.label}
                    onClick={onToggleFilter(openFilter, _filterItem.value)}
                  />
                ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={onClearAllFilters}
                className="text-gray-500 text-sm hover:underline"
              >
                全てクリア
              </button>
              <button
                onClick={onSearch}
                className="px-6 py-2 bg-[#FF733E] text-gray-500 rounded-full hover:opacity-80"
              >
                この条件で検索する
              </button>
            </div>
          </div>
        )}
      </section>
      {mockScoutData.map((detail, index) => (
        <BusinessCard
          key={index}
          detail={detail}
          isApplying={false}
          isApplied={false}
          onDetail={() => onDetail(detail)}
          onApply={() => alert(`応募する: ${detail.companyName}`)}
        />
      ))}

        <BusinessDetailModal
            detail={currentUser}
            isOpen={!!currentUser}
            isSendingMessage={sendingMessage}
            closeLabel="キャンセル"
            confirmLabel="登録する"
            onClose={onToggleDetailModal}
            sendMessage={sendMessage}
            onConfirm={onApply(currentUser?.user.id ?? 0)}
          />
    </div>
    </>
    
  );
}
