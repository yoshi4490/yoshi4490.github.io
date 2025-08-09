'use client'
import { useState } from 'react'
import { Card, Button, Input, Label, Select } from '@/components/ui'

async function postGrade(type:string, payload:any){
  const res = await fetch('/api/grade', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type, payload}) })
  return await res.json()
}

export default function Daily(){
  const [invMsg, setInvMsg] = useState(''); const [rcvMsg, setRcvMsg] = useState(''); const [expMsg, setExpMsg] = useState('');
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">日常業務トレーニング</h1>

      <Card>
        <h3 className="font-semibold mb-1">① 請求書の計上</h3>
        <p className="text-sm text-gray-600 mb-3">税抜100,000円（消費税10%）を4/30計上、入金予定5/31。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><Label>借方科目</Label><Select id="inv_d_k"><option value="">選択</option><option>売掛金</option><option>当座預金</option><option>現金</option></Select></div>
          <div><Label>借方金額</Label><Input id="inv_d_a" placeholder="110000"/></div>
          <div><Label>貸方科目（1）</Label><Select id="inv_c1_k"><option value="">選択</option><option>売上高</option><option>仮受消費税</option><option>前受金</option></Select></div>
          <div><Label>貸方金額（1）</Label><Input id="inv_c1_a" placeholder="100000"/></div>
          <div><Label>貸方科目（2 任意）</Label><Select id="inv_c2_k"><option value="">（なし）</option><option>仮受消費税</option><option>売上高</option></Select></div>
          <div><Label>貸方金額（2 任意）</Label><Input id="inv_c2_a" placeholder="10000"/></div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={async ()=>{
            const payload = {
              dKamoku:(document.getElementById('inv_d_k') as HTMLSelectElement).value,
              dAmt:Number((document.getElementById('inv_d_a') as HTMLInputElement).value),
              c1Kamoku:(document.getElementById('inv_c1_k') as HTMLSelectElement).value,
              c1Amt:Number((document.getElementById('inv_c1_a') as HTMLInputElement).value),
              c2Kamoku:(document.getElementById('inv_c2_k') as HTMLSelectElement).value,
              c2Amt:Number((document.getElementById('inv_c2_a') as HTMLInputElement).value || 0),
            };
            const r = await postGrade('invoice', payload); setInvMsg(r.message)
          }}>採点</Button>
          <span className="text-sm">{invMsg}</span>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-1">② 入金消込</h3>
        <p className="text-sm text-gray-600 mb-3">5/31 入金 110,000円。対応する売掛金を消し込み。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><Label>借方科目</Label><Select id="rcv_d_k"><option value="">選択</option><option>当座預金</option><option>普通預金</option><option>現金</option></Select></div>
          <div><Label>借方金額</Label><Input id="rcv_d_a" placeholder="110000"/></div>
          <div><Label>貸方科目</Label><Select id="rcv_c_k"><option value="">選択</option><option>売掛金</option><option>売上高</option><option>前受金</option></Select></div>
          <div><Label>貸方金額</Label><Input id="rcv_c_a" placeholder="110000"/></div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={async ()=>{
            const payload = {
              dKamoku:(document.getElementById('rcv_d_k') as HTMLSelectElement).value,
              dAmt:Number((document.getElementById('rcv_d_a') as HTMLInputElement).value),
              cKamoku:(document.getElementById('rc_c_k') as HTMLSelectElement)?.value || (document.getElementById('rcv_c_k') as HTMLSelectElement).value,
              cAmt:Number((document.getElementById('rcv_c_a') as HTMLInputElement).value),
            };
            const r = await postGrade('receipt', payload); setRcvMsg(r.message)
          }}>採点</Button>
          <span className="text-sm">{rcvMsg}</span>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-1">③ 経費精算チェック</h3>
        <p className="text-sm text-gray-600 mb-3">通信費 22,000円（税込）。月次締めで未払計上。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><Label>借方科目</Label><Select id="exp_d_k"><option value="">選択</option><option>通信費</option><option>水道光熱費</option><option>旅費交通費</option></Select></div>
          <div><Label>借方金額</Label><Input id="exp_d_a" placeholder="22000"/></div>
          <div><Label>貸方科目</Label><Select id="exp_c_k"><option value="">選択</option><option>未払費用</option><option>未払金</option><option>買掛金</option></Select></div>
          <div><Label>貸方金額</Label><Input id="exp_c_a" placeholder="22000"/></div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={async ()=>{
            const payload = {
              dKamoku:(document.getElementById('exp_d_k') as HTMLSelectElement).value,
              dAmt:Number((document.getElementById('exp_d_a') as HTMLInputElement).value),
              cKamoku:(document.getElementById('exp_c_k') as HTMLSelectElement).value,
              cAmt:Number((document.getElementById('exp_c_a') as HTMLInputElement).value),
            };
            const r = await postGrade('expense', payload); setExpMsg(r.message)
          }}>採点</Button>
          <span className="text-sm">{expMsg}</span>
        </div>
      </Card>
    </div>
  )
}
