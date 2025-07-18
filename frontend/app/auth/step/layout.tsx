export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="header flex justify-between items-center px-4 bg-white mb-6">
            <img
                src="/logo/logo_top.png"
                className="w-[208px] h-[39px]"
                alt="logo"
            />
            <h1>職務経歴書登録</h1>
        </div>
        <div className='bg-[#FCF9F4] flex'>
      
        <div className="w-full">
          {children}
        </div>
      
      </div>
      </div>
    );
  }

  