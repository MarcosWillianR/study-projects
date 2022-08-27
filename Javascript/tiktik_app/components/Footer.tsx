import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ data, mt = true }: { data: string[], mt?: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
      {data.map(item => (
        <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
          {item}
        </p>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <div className="mt-6 hidden xl:block">
      <List data={footerList1} mt={false} />
      <List data={footerList2} />
      <List data={footerList3} />
      <p className="text-gray-400 text-small mt-5">2022 TikTik</p>
    </div>
  )
}