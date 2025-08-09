import './globals.css'
import Layout from '@/components/layout'

export const metadata = {
  title: '経理実務シミュレーター',
  description: '簿記と実務のギャップを埋める体験型トレーニング',
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="ja">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
