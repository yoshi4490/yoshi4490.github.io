'use client'
import { useState } from 'react'
import { Card, Button, Label } from '@/components/ui'

async function postGrade(type:string, payload:any){
  const res = await fetch('/api/grade', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type, payload}) })
  return await res.json()
}

export default function Monthly(){
  const [result, setResult] = useState<{ok1:boolean, ok2:boolean}|null>(null)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">月次決算（4月）</h1>
      <Card>
        <p className="text-sm text-gray-600 mb-3">必要仕訳を複数行で入力し、チェックを押してください。</p>
        <Label>仕訳（1行ずつ）</Label>
        <textarea id="journal" rows={6} className="w-full border border-gray-200 rounded-2xl p-3 text-sm" placeholder={`（1）売掛金 110,000 / 売上高 100,000, 仮受消費税 10,000
（2）通信費 22,000 / 未払費用 22,000`}></textarea>
        <div className="mt-3 flex gap-2">
          <Button onClick={async ()=>{
            const text = (document.getElementById('journal') as HTMLTextAreaElement).value;
            const r = await postGrade('monthly', text); setResult(r);
          }}>採点</Button>
          <Button variant='ghost' onClick={()=>{
            (document.getElementById('journal') as HTMLTextAreaElement).value = `（1）売掛金 110,000 / 売上高 100,000, 仮受消費税 10,000
（2）通信費 22,000 / 未払費用 22,000`;
          }}>例を入れる</Button>
        </div>
        <div className="mt-3 text-sm">
          {result && (<div>
            <div>{result.ok1 ? '✔' : '✖'} 売掛計上（売掛金 / 売上高 + 仮受消費税）</div>
            <div>{result.ok2 ? '✔' : '✖'} 未払計上（通信費 / 未払費用 22,000）</div>
            <div className="text-gray-500 mt-2">※ 本実装では税区分や締日、消込や承認フローを厳密検証予定。</div>
          </div>)}
        </div>
      </Card>
    </div>
  )
}
