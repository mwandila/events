import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import logo from "../../../public/images/quick.png"
import Heade from '../ui/Header/Header'
const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface HeaderProps {
  label: string
}

export function Header({ label }: HeaderProps) {
  return (<>
  <div className="flex w-full flex-col gap-4 items-center justify-center">

    <h1 className={cn('text-3xl font-semibold', font.className)}>
      <Image src={logo} alt="" width={100} height={100} />
    </h1>
    <p className="text-muted-foreground">
      {label}
    </p>
  </div></>
  )
}