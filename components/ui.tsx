import { clsx } from 'clsx'

export function Card({className='', children}:{className?:string, children:React.ReactNode}){
  return <div className={clsx('bg-white border border-gray-200 rounded-2xl p-4', className)}>{children}</div>
}

export function Button({variant='primary', className='', ...props}:{variant?:'primary'|'ghost', className?:string} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  const base = 'px-4 py-2 rounded-xl text-sm';
  const styles = variant==='primary' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200';
  return <button className={clsx(base, styles, className)} {...props} />
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
  return <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" {...props}/>
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>){
  return <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" {...props}/>
}

export function Label({children}:{children:React.ReactNode}){
  return <label className="block text-xs text-gray-700 mb-1">{children}</label>
}
