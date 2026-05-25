import { useEffect, useState } from 'react'
import QRPayment from '../../assets/QRPayment.png'
import useBookingStore from '../../stores/bookingStore'
import { InfoIcon } from '../../icons'
import { useFormatPrice } from '../../utils/formatNum'
import { CardElement } from '@stripe/react-stripe-js' 
import { PaymentElement } from '@stripe/react-stripe-js'

function BPayment() {
    const formatPrice = useFormatPrice()
    const paymentMethod = useBookingStore(st=>st.paymentMethod)
    const setPaymentMethod = useBookingStore(st=>st.setPaymentMethod)
    // console.log('paymentMethod', paymentMethod)
    const totalPrice = useBookingStore(st=>st.totalPrice)

    const hdlChange = (name) => {
        setPaymentMethod(name)
    }

const inputStyle = "w-full h-[45px] px-4 border border-neutral/50 rounded-[4px] text-[17px] outline-none focus:border-blue-500 transition-all placeholder:text-neutral placeholder:font-[Whitney-Book]";
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
                <div className="my-4 p-6 bg-white rounded-xl border border-neutral/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="mb-4 flex items-center gap-2 text-neutral/60">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <span className="text-[12px] uppercase tracking-wider font-bold">Secure Card Entry</span>
                    </div>
                    <PaymentElement options={{ layout: 'tabs' }} />
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
                <div className="flex flex-col gap-4 w-full max-w-[700px] my-4 p-6 bg-white rounded-xl border border-neutral/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    
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
                <div className="pl-8 my-4">
                    <img src={QRPayment} alt="QRPayment" className='h-100 w-fit' />
                </div>
            )}
        </div>

    </div>
  )
}

export default BPayment