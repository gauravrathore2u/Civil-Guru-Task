import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onCheckoutPage = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <p className="text-2xl w-100 flex justify-center font-semibold">
        Home Page
      </p>
      <p>
        Please go to checkout page and return to any page. After 2 minutes You
        will get Notifications until you click on make payment button.
      </p>
      <button
        onClick={onCheckoutPage}
        className="mt-5 ml-2 bg-slate-500 border-slate-600 text-white px-4 py-2 rounded-lg"
      >
        Checkout page
      </button>
    </div>
  );
};

export default Home;
