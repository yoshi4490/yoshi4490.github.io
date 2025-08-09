export default function Layout({children}:{children:React.ReactNode}){
  return (
    <div className="max-w-5xl mx-auto px-4">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold">経理実務シミュレーター</div>
          <nav className="text-sm text-gray-600 flex gap-4">
            <a href="/" className="hover:underline">ホーム</a>
            <a href="/daily" className="hover:underline">日常業務</a>
            <a href="/monthly" className="hover:underline">月次決算</a>
            <a href="/report" className="hover:underline">レポート</a>
          </nav>
        </div>
      </header>
      <main className="py-6">{children}</main>
    </div>
  )
}
