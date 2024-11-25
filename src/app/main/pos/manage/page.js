import CreateTransactionForm from '@/app/components/main/pos/CreateTransactionForm';

export default function ManagePOS() {
  const onSuccessCreateTransaction = () => {

  }

  return (
    <div className='flex flex-col items-center max-w-md  mx-auto p-4 space-y-4 border shadow-md'>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 ">Create Transaction</h2>
        <CreateTransactionForm />
    </div>
  )
}
