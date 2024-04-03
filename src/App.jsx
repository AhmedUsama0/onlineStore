import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
const App = () => {
  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  return (
    <PayPalScriptProvider
      options={{ clientId: paypalClientId, currency: "USD" }}
    >
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </PayPalScriptProvider>
  );
};

export default App;
