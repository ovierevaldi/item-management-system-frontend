import ItemTable from '@/app/components/main/items/ItemTable'

export default function ItemPage() {
  return (
    <div className=''>
        <p className='text-2xl font-semibold text-center mb-8'>List Item</p>
        
        <div className='flex justify-center'>
          <div className='overflow-auto w-full'>
            <ItemTable />
          </div>
        </div>
    </div>
  )
}
