const Footer = () => {

    return(
        <>
               <footer className="bg-[#FFF8F4] text-[#4B4B4B] text-sm border-t border-gray-200">
                <div className="max-w-7xl flex flex-col mx-auto px-4 py-10">
                    {/* Logo + Left Nav */}
                    <div className="flex justify-between">
                        <div className="mb-4">                           
                            <img src="/logo/logo_top.png" alt="Xrosspoint" className="h-6 mr-2" />                          
                        </div>
                        <div className="flex gap-4">
                        <button className="bg-[#FF733E] text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-[#e9632e] transition">
                        会員登録する
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-400 rounded-full text-black hover:bg-gray-100 transition">
                            ログイン
                        </button>
                        </div>
                    </div>

               

                    <div className="flex justify-between mt-10">
                            <div className="space-y-2">
                                <p className="font-bold">職務経歴書に関するアドバイス</p>
                                <ul className="ml-4 space-y-1">
                                <li>職務経歴書の添削</li>
                                <li>印刷</li>
                                </ul>
                            </div>

                            {/* 面接アドバイス */}
                            <div>
                            <p className="font-bold mb-2">面接に関するアドバイス</p>
                            <ul className="space-y-1">
                                <li>転職理由（志望理由）</li>
                                <li>職務経歴書に関する質問</li>
                                <li>自己PRに関係する質問</li>
                                <li>面接対策</li>
                            </ul>
                            </div>

                            {/* スカウト確認 */}
                            <div>
                            <p className="font-bold mb-2">企業からのスカウト確認</p>
                            <ul className="space-y-1">
                                <li>企業からのスカウト状況</li>
                                <li>スカウト企業への志望理由作成補助</li>
                            </ul>
                            </div>

                            {/* マイページ */}
                            <div>
                            <p className="font-bold mb-2">マイページ</p>
                            <ul className="space-y-1">
                                <li>TOP</li>
                                <li>基本情報の確認・変更</li>
                                <li>パスワードの変更</li>
                                <li>支払い情報登録・変更</li>
                                <li>有料プラン</li>
                            </ul>
                            </div>
                        

                        {/* 下部バー */}
                    </div>
            </div>
            <div className="bg-[#3E2E2B] text-white text-xs py-3">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex space-x-4">
                     <a href="#" className="hover:underline">個人情報利用許諾</a>
                     <a href="#" className="hover:underline">利用規約</a>
                     <a href="#" className="hover:underline">特定商取引法</a>
                     <a href="#" className="hover:underline">お問い合わせ</a>
                </div>
                <div className="text-right ml-auto">
                    © 2025 Xrosspoint Inc. All rights reserved.
                </div>
                </div>
            </div>
        </footer>

        </>
    )
}

export default Footer;