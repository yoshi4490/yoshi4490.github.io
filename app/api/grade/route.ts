import { NextRequest, NextResponse } from 'next/server'
import { gradeInvoice, gradeReceipt, gradeExpense, gradeMonthlyText } from '@/lib/grader'

export async function POST(req: NextRequest){
  const body = await req.json()
  if(body.type==='invoice') return NextResponse.json(gradeInvoice(body.payload))
  if(body.type==='receipt') return NextResponse.json(gradeReceipt(body.payload))
  if(body.type==='expense') return NextResponse.json(gradeExpense(body.payload))
  if(body.type==='monthly') return NextResponse.json(gradeMonthlyText(body.payload))
  return NextResponse.json({error:'unknown type'},{status:400})
}
