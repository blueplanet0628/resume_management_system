const seeker_menu_list = [
    {
        label: "職務経歴書に関するアドバイス",
        href: "/resume-advice",
        submenu: [
            {
                label: "職務経歴書の添削",
                href: "/resume-advice"
            },
            {
                label: "印刷",
                href: "/resume-advice/print"
            }
        ]
    },
    {
        label: "面接に関するアドバイス",
        href: "/interview-advice/applying-reasons",
        submenu: [
            {
                label: "転職理由(志望理由)",
                href: "/interview-advice/applying-reasons"
            },
            {
                label: "職務経歴書に関する質問",
                href: "/interview-advice/resume-questions"
            },
            {
                label: "自己PRに関係する質問",
                href: "/interview-advice/pr-questions"
            },
            {
                label: "面接対策",
                href: "/interview-advice/prepare-interview"
            },
        ]
    },
    {
        label: "企業からのスカウト確認",
        href: "/confirm-scout/status",
        submenu: [
            {
                label: "企業からのスカウト状況",
                href: "/confirm-scout/status"
            },
            {
                label: "スカウト企業への志望理由作成補助",
                href: "/confirm-scout/applying-reasons-assist"
            }
        ]
    },
    {
        label: "マイページ",
        href: "/account",
        submenu: [
            {
                label: "TOP",
                href: "/account/top"
            },
            {
                label: "基本情報の確認・変更",
                href: "/account"
            },
            {
                label: "パスワードの変更",
                href: "/account/password"
            },
            {
                label: "支払い情報登録・変更",
                href: "/account/payment"
            },
            {
                label: "有料プラン",
                href: "/account/paid-plan"
            },
        ]
    },

];

const business_footer_menu_list = [
    [
        {
            label: "求職者の検索",
            href: "/business/search"
        },
        {
            label: "マイページ",
            href: "/business/account"
        },
    ],
    [
        {
            label: "個人情報利用許諾",
            href: ""
        },
        {
            label: "利用規約",
            href: ""
        },
        {
            label: "特定商取引法",
            href: ""
        },
        {
            label: "お問い合わせ",
            href: ""
        },
    ],
]

const seeker_footer_link_list = [
    {
        label: "個人情報利用許諾",
        href: "account/personal-info-license",
    },
    {
        label: "利用規約",
        href: "/terms-of-use",
    },
    {
        label: "特定商取引法",
        href: "https://laws.e-gov.go.jp/law/351AC0000000057",
    },
    {
        label: "お問い合わせ",
        href: "/contact-us",
    },
]

export {
    seeker_menu_list,
    seeker_footer_link_list,
    business_footer_menu_list,
};