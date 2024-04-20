import { motion, useAnimate } from "framer-motion";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { modalVariants } from "../../motion-variants/variants";
import { useCart } from "../../hooks";
const CheckoutModal = ({ setShowCheckout, totalCost, setPurchaseMessage }) => {
  const [scope, animate] = useAnimate();
  const { cart } = useCart();
  const filteredCart = cart.filter((item) => item.quantity !== 0);

  const hideCheckout = async () => {
    await animate(scope.current, { scale: 0 });
    setShowCheckout(false);
  };

  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: filteredCart.map((item) => {
            return {
              id: item.id,
              quantity: item.quantity,
            };
          }),
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (json.message) {
          throw new Error(json.message);
        }
      }
      return json.id;
    } catch (error) {
      let msg;
      if (error instanceof TypeError) {
        msg = "<p class='fs-6 mt-2'>check your network connection</p>";
      } else if (error instanceof SyntaxError) {
        msg =
          "<p class='fs-6 mt-2'>unexpected error occured. please contact the support.</p>";
      } else {
        msg = `<p class='fs-6 mt-2'>${error.message}</p>`;
      }
      setPurchaseMessage(msg);
    }
  };
  const sendConfirmationMail = async (order) => {
    const purchaseMessage = "purchase completed successfully<br>";
    const fullName =
      order.payer.name.given_name + " " + order.payer.name.surname;
    const payerEmail = order.payer.email_address;
    const items = order.purchase_units[0].items;
    try {
      const response = await fetch(
        "http://localhost:5000/product/confirm-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            payerEmail,
            items,
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        if (json.message) {
          throw new Error(json.message);
        }
      }
      setPurchaseMessage(
        purchaseMessage + `<p class='fs-6 mt-2'>${json.message}</p>`
      );
    } catch (error) {
      let msg;
      if (error instanceof TypeError) {
        msg =
          "<p class='text-danger fs-6 mt-2 text-center px-3'>check your internet connection. a confirmation email is not sent</p>";
      } else if (error instanceof SyntaxError) {
        msg =
          "<p class='text-danger fs-6 mt-2 text-center px-3'>unexpected error occured please contact the support. a confirmation email is not sent</p>";
      } else {
        msg = `<p class='text-danger fs-6 mt-2 text-center px-3'>${error.message}</p>`;
      }
      setPurchaseMessage(purchaseMessage + msg);
    }
  };
  return (
    <div
      className="modal-background position-fixed top-0 start-0 w-100 h-100"
      style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-container h-100 d-flex justify-content-center align-items-center">
        <motion.div
          ref={scope}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          className="p-3 col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 bg-light col-xxl-3 rounded-2 d-flex flex-column"
          style={{
            minHeight: "300px",
            boxShadow: "var(--main-box-shadow)",
          }}
        >
          <PayPalButtons
            key={totalCost}
            style={{ color: "blue", label: "checkout" }}
            createOrder={async () => {
              return await createOrder();
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              await sendConfirmationMail(order);
            }}
            onError={(err) => {
              setPurchaseMessage((err) => "purchase not completed" + err);
            }}
          />
          <button
            type="button"
            className="btn btn-outline-secondary m-auto mb-0 d-block text-capitalize col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-10"
            onClick={hideCheckout}
          >
            cancel
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutModal;
