import { useEffect, useState } from "react"

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState(() => {
    const savedShipping = localStorage.getItem("shipping")
    return savedShipping ? JSON.parse(savedShipping) : { name: "", address: "" }
  })
  const [payment, setPayment] = useState(() => {
    const savedPayment = localStorage.getItem("payment")
    return savedPayment ? JSON.parse(savedPayment) : { card: "", expiry: "" }
  })

  useEffect(() => {
    const shipping = localStorage.getItem("shipping")
    const payment = localStorage.getItem("payment")
    if (shipping) setShipping(JSON.parse(shipping))
    if (payment) setPayment(JSON.parse(payment))
  }, [])

  useEffect(() => {
    localStorage.setItem("shipping", JSON.stringify(shipping))
  }, [shipping])

  useEffect(() => {
    localStorage.setItem("payment", JSON.stringify(payment))
  }, [payment])

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrev = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleOrder = () => {
    alert("Order confirmed!")
    localStorage.removeItem("shipping")
    localStorage.removeItem("payment")
    setShipping({ name: "", address: "" })
    setPayment({ card: "", expiry: "" })
    setStep(1)
  }

  const isShippingComplete = shipping.name && shipping.address

  const isPaymentComplete = payment.card && payment.expiry

  return (
    <>
      <h1 className="text-center my-3 font-bold text-xl">Checkout</h1>
      <div className="flex items-center justify-between my-4 px-4">
        <h2
          className={` ${step === 1 ? "bg-amber-200  text-black" : "bg-gray-700"} p-2`}
          onClick={() => setStep(1)}
        >
          1) Shipping Details
        </h2>
        <h2
          className={` ${step === 2 ? "bg-amber-200  text-black" : "bg-gray-700"} p-2`}
        >
          2) Payment Details
        </h2>
        <h2
          className={` ${step === 3 ? "bg-amber-200 text-black" : "bg-gray-700"} p-2`}
        >
          3) Order Confirmation
        </h2>
      </div>
      {step === 1 && (
        <>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={shipping.name}
              onChange={(e) =>
                setShipping({ ...shipping, name: e.target.value })
              }
              className="border border-[#ccc] h-10 p-2 rounded-md mb-3"
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
              className="border border-[#ccc] h-10 p-2 rounded-md mb-3"
            />
          </div>
          {/* {error && <p>Shipping details are required</p>} */}
          <div>
            <button
              onClick={handleNextStep}
              className={`p-2 rounded-md ${isShippingComplete ? "bg-green-500" : "bg-gray-700 text-gray-500 cursor-pointer"}`}
              disabled={!isShippingComplete}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label>Card</label>
            <input
              type="text"
              placeholder="Enter Card"
              value={payment.card}
              onChange={(e) => setPayment({ ...payment, card: e.target.value })}
              className="border border-[#ccc] h-10 p-2 rounded-md mb-3"
            />
          </div>
          <div>
            <label>Expiry</label>
            <input
              type="date"
              placeholder="Enter Expiry"
              value={payment.expiry}
              onChange={(e) =>
                setPayment({ ...payment, expiry: e.target.value })
              }
              className="border border-[#ccc] h-10 p-2 rounded-md mb-3"
            />
          </div>
          {/* {error && <p>Payment details are required</p>} */}
          <div className="flex items-center gap-10">
            <button
              onClick={handlePrev}
              className="bg-gray-700 p-2 rounded-md cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className={`p-2 rounded-md ${isPaymentComplete ? "bg-green-500" : "bg-green-100 text-gray-500 cursor-pointer"}`}
              disabled={!isPaymentComplete}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <div>
          <h3>Order Confirmation</h3>
          <p>✅ Thank you, {shipping.name}!</p>
          <p>Your order will be shipped to: {shipping.address}</p>
          <p>Payment processed with card ending in: {payment.card.slice(-4)}</p>
          <div className="flex items-center gap-10">
            <button
              onClick={handlePrev}
              className="bg-gray-700 p-2 rounded-md cursor-pointer"
            >
              Back
            </button>
            <button
              className="bg-blue-700 p-2 rounded-md cursor-pointer"
              onClick={handleOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutPage
