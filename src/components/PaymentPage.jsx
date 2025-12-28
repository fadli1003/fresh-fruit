// fresh-fruit/src/components/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle,  MapPin,  Truck, Award, CreditCard as CreditCardIcon } from "lucide-react";
import { fetchCart, checkout } from "../utils/api";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);

  const [checkoutStep, setCheckoutStep] = useState("shipping");

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Load cart from backend
  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        if (data.length === 0) {
          navigate("/cart");
          return;
        }
        setCartItems(data);
      } catch (err) {
        console.error("Failed to load cart:", err);
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [navigate]);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (paymentInfo.cvv.length < 3) {
      alert("CVV must be at least 3 digits");
      return;
    }

    try {
      // 🔹 SIMPAN DATA ORDER SEBELUM KIRIM
      const summaryData = {
        items: [...cartItems],
        total: parseFloat(getTotalPrice()),
        shippingInfo: { ...shippingInfo },
      };
      setOrderSummary(summaryData); // ← simpan untuk ditampilkan nanti

      const orderData = {
        shippingInfo,
        paymentInfo: {
          ...paymentInfo,
          cardNumber: paymentInfo.cardNumber.replace(/\s/g, ""),
        },
        items: cartItems,
        total: parseFloat(getTotalPrice()),
      };

      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result = await response.json();

      if (result.success) {
        setCheckoutStep("confirmation");
        setCartItems([]); // boleh dikosongkan karena sudah disimpan di orderSummary
      } else {
        throw new Error(result.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed: " + (err.message || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">Loading payment page...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-800">Checkout</h1>
        <button
          onClick={() => navigate("/cart")}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          ← Back to Cart
        </button>
      </div>

      {checkoutStep === "confirmation" && orderSummary && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Thank you for your order. Your fruits will be delivered soon!
          </p>
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <p className="font-semibold text-green-800">Order Summary</p>
            <p className="text-gray-600">
              Total: ${orderSummary.total.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Items:{" "}
              {orderSummary.items.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )} 
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {checkoutStep === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={shippingInfo.fullName}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    required
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {checkoutStep === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    required
                    value={paymentInfo.cardholderName}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cardholderName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={paymentInfo.cardNumber}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      v = v.replace(/(.{4})/g, "$1 ").trim();
                      setPaymentInfo({ ...paymentInfo, cardNumber: v });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={paymentInfo.expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                      setPaymentInfo({ ...paymentInfo, expiry: v });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    required
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("shipping")}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-full font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold flex items-center justify-center"
                  >
                    <CreditCardIcon className="w-4 h-4 mr-2" />
                    Complete Order
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            {checkoutStep === "shipping" && (
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Delivery to your address</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>30-day satisfaction guarantee</span>
                </div>
              </div>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default PaymentPage;
