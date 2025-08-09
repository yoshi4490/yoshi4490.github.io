export type DailyAnswers = {
  invoice: { dKamoku:string; dAmt:number; c1Kamoku:string; c1Amt:number; c2Kamoku?:string; c2Amt?:number };
  receipt: { dKamoku:string; dAmt:number; cKamoku:string; cAmt:number };
  expense: { dKamoku:string; dAmt:number; cKamoku:string; cAmt:number };
}

export function gradeInvoice(a: DailyAnswers['invoice']){
  const ok = a.dKamoku==='売掛金' && a.dAmt===110000 &&
    ((a.c1Kamoku==='売上高' && a.c1Amt===100000 && a.c2Kamoku==='仮受消費税' && (a.c2Amt||0)===10000) ||
     (a.c1Kamoku==='売上高' && a.c1Amt===110000 && !a.c2Kamoku));
  return { ok, message: ok ? '正解：売掛金 110,000 / 売上高 100,000, 仮受消費税 10,000（内税も可）' :
    '不正解：売掛金 110,000 / 売上高 100,000, 仮受消費税 10,000 が基本（内税110,000でも可）' }
}

export function gradeReceipt(a: DailyAnswers['receipt']){
  const ok = ['当座預金','普通預金','現金'].includes(a.dKamoku) && a.dAmt===110000 && a.cKamoku==='売掛金' && a.cAmt===110000;
  return { ok, message: ok ? '正解：当座/普通/現金 110,000 / 売掛金 110,000' :
    '不正解：入金は当座/普通/現金、消込は売掛金へ。金額は110,000' }
}

export function gradeExpense(a: DailyAnswers['expense']){
  const ok = a.dKamoku==='通信費' && a.cKamoku==='未払費用' && a.dAmt===22000 && a.cAmt===22000;
  return { ok, message: ok ? '正解：通信費 22,000 / 未払費用 22,000（税抜方式等の会社方針は実務で調整）' :
    '不正解：4月分は未払計上。通信費 / 未払費用 22,000' }
}

export function gradeMonthlyText(text: string){
  const lines = text.split('\n').map(s=>s.trim()).filter(Boolean);
  let ok1=false, ok2=false;
  for(const l of lines){
    if(/売掛金/.test(l) && /110,?000/.test(l) && /売上高/.test(l)) ok1 = true;
    if(/通信費/.test(l) && /22,?000/.test(l) && (/(未払費用|未払金)/.test(l))) ok2 = true;
  }
  return { ok1, ok2 };
}
