import { PayPalButtons } from "@paypal/react-paypal-js";
const PayPalButton = ({ totalCost }) => {
  return (
    <PayPalButtons
      style={{ color: "blue", label: "checkout" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalCost,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(function (details) {
          // alert("Transaction completed by " + details.payer.name.given_name);
          console.log(details);
          // Call your server to save the transaction
        });
      }}
    />
  );
};

export default PayPalButton;
