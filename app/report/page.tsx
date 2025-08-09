'use client'
import { Card } from '@/components/ui'
import { useEffect, useState } from 'react'

export default function Report(){
  const [score, setScore] = useState<{d:number, m:number, total:number}>({d:0,m:0,total:0})
  useEffect(()=>{
    const s = localStorage.getItem('sim_score');
    if(s){ setScore(JSON.parse(s)); }
  },[])
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">成績レポート（ローカル）</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><div className="text-xs text-gray-500">日常業務 正答</div><div className="font-mono">{score.d}/3</div></Card>
        <Card><div className="text-xs text-gray-500">月次決算 正答</div><div className="font-mono">{score.m}/2</div></Card>
        <Card><div className="text-xs text-gray-500">総合スコア</div><div className="font-mono">{score.total}%</div></Card>
      </div>
      <div className="text-xs text-gray-500">※ 実サービスではユーザー別にDB保存し、企業共有レポート/PDFを発行します。</div>
    </div>
  )
}
