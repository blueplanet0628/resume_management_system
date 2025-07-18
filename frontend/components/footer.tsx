const Footer = () => {

    return(
        <>
            <div className="flex p-8 flex-col justify-center items-center">
                <div className="flex items-center">
                    <img src="/logo/Rectangle 289.png" alt="Logo" className="h-10 w-10 mr-3" />
                    <p className="text-2xl font-semibold">Trumee</p>
                </div>
                <div className="flex flex-col md:flex-row gap-9 mt-6 text-[14px]">
                    <a href="">マイページ</a>
                    <a href="">利用規約</a>
                    <a href="">お問い合わせ</a>
                </div>
                <div className="flex gap-9 mt-6 text-[10px]">
                    <a href="">個人情報利用許諾</a>
                    <a href="">特定商取引法</a>
                </div>
            </div>
            <div className="flex w-full bg-[#32291F] items-center justify-center pt-[17px] pb-[15px] ">
              <p className="text-[12px] m-0,auto text-white">© 2025 Xrosspoint Inc. All rights reserved.</p>
            </div>

        </>
    )
}

export default Footer;