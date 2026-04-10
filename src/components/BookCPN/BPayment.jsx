import { useEffect, useState } from 'react'
import QRPayment from '../../assets/QRPayment.png'
import useBookingStore from '../../stores/bookingStore'
import { InfoIcon } from '../../icons'
import { formatPrice } from '../../utils/formatNum'

function BPayment() {
    const paymentMethod = useBookingStore(st=>st.paymentMethod)
    const setPaymentMethod = useBookingStore(st=>st.setPaymentMethod)
    console.log('paymentMethod', paymentMethod)
    const totalPrice = useBookingStore(st=>st.totalPrice)

    const hdlChange = (name) => {
        setPaymentMethod(name)
    }

const inputStyle = "w-full h-[60px] px-4 border border-neutral/50 rounded-[4px] text-[17px] outline-none focus:border-blue-500 transition-all placeholder:text-neutral placeholder:font-[Whitney-Book]";
  return (
    <div className='bg-base-200 w-[40vw] h-fit rounded-[12px] p-6 flex flex-col'>
        <h1 className="text-[24px]">Payment</h1>
        <div className="flex flex-col">
            <div className="flex gap-3">
                <input className='accent-primary' autoComplete="off"
                 type="checkbox" name='CREDIT_CARD' checked={paymentMethod === 'CREDIT_CARD'} onChange={()=> hdlChange('CREDIT_CARD')} />
                <p>CREDIT/DEBIT CARD</p>
            </div>            
            {paymentMethod === 'CREDIT_CARD' && (
                <div className="flex flex-col gap-4 w-full max-w-[700px] p-6">
                    
                    {/* 1. Bank card no. */}
                    <div className="w-full">
                        <input 
                        type="text" 
                        placeholder="Bank card no." 
                        className={inputStyle} 
                        />
                    </div>

                    {/* 2. Cardholder name */}
                    <div className="w-full">
                        <input 
                        type="text" 
                        placeholder="Cardholder name" 
                        className={inputStyle} 
                        />
                    </div>

                    {/* 3. Bottom Row (Exp Date & CVV) */}
                    <div className="flex gap-4 w-full relative">
                        <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Expiration date" 
                            className={inputStyle} 
                        />
                        </div>
                        
                        <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="CVV/CVC" 
                            className={inputStyle} 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <InfoIcon className="w-5"/>
                        </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
        <div className="flex flex-col">
            <div className="flex gap-3">
                <input className='accent-primary' autoComplete="off"
                 type="checkbox" name='BANK_TRANSFER' checked={paymentMethod === 'BANK_TRANSFER'} onChange={()=> hdlChange('BANK_TRANSFER')} />
                <p>BANK TRANSFER</p>
            </div> 
            {paymentMethod === 'BANK_TRANSFER' && (
                <div className="flex flex-col gap-4 w-full max-w-[700px] p-6">
                    
                    {/* 1. Bank card no. */}
                    <div className="w-full">
                        <input 
                        type="text" 
                        placeholder="Account no." 
                        className={inputStyle} 
                        />
                    </div>

                    {/* 2. Cardholder name */}
                    <div className="w-full">
                        <input 
                        type="text" 
                        placeholder="Account name" 
                        className={inputStyle} 
                        />
                    </div>

                    {/* 3. Bottom Row (Exp Date & CVV) */}
                    <div className="flex gap-4 w-full relative">
                        <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Bank name" 
                            className={inputStyle} 
                        />
                        </div>
                        
                        <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder={formatPrice(totalPrice,2)} 
                            className={inputStyle} 
                        />
                        </div>
                    </div>

                </div>
            )}         
        </div>
        <div className="flex flex-col">
            <div className="flex gap-3">
                <input className='accent-primary' autoComplete="off"
                 type="checkbox" name='QR_PAYMENT' checked={paymentMethod === 'QR_PAYMENT'} onChange={()=> hdlChange('QR_PAYMENT')} />
                <p>QR PAYMENT</p>
            </div>
            {paymentMethod === 'QR_PAYMENT' && ( 
                <div className="pl-8 pt-4">
                    <img src={QRPayment} alt="QRPayment" className='h-100 w-fit' />
                </div>
            )}
        </div>

    </div>
  )
}

export default BPayment