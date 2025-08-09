import { Card, Button } from '@/components/ui'

export default function Page(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">ようこそ</h1>
      <p className="text-gray-600">未経験からでも「月次決算まで一人称で回せる」状態へ。日常業務と月次決算の両輪で鍛えます。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-2">日常業務トレーニング</h2>
          <p className="text-sm text-gray-600 mb-3">請求・入金消込・経費精算など、現場の入口を徹底反復。</p>
          <Button onClick={()=>location.assign('/daily')}>はじめる</Button>
        </Card>
        <Card>
          <h2 className="font-semibold mb-2">月次決算シミュレーター</h2>
          <p className="text-sm text-gray-600 mb-3">未払・減価償却・税区分…締めの一連をシミュレート。</p>
          <Button onClick={()=>location.assign('/monthly')}>はじめる</Button>
        </Card>
      </div>
    </div>
  )
}
