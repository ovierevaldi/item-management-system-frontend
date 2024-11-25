const currency = () => {
    function convertToRupiah(value){
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)
    };

    function covertTanggal(dateInput){
        const date = new Date(dateInput);
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          };

        return new Intl.DateTimeFormat('id-ID', options).format(date)
    }

    return { convertToRupiah, covertTanggal }
}
export default currency