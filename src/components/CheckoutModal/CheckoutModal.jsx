import { motion, useAnimate } from "framer-motion";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { modalVariants } from "../../motion-variants/variants";
import { useCart } from "../../hooks";
const CheckoutModal = ({ setShowCheckout, details, setPurchaseMessage }) => {
  const [scope, animate] = useAnimate();
  const { cart } = useCart();

  const { subTotal, shippingFee, tax, totalCost } = details;
  const filteredCart = cart.filter((item) => item.quantity !== 0);

  const hideCheckout = async () => {
    await animate(scope.current, { scale: 0 });
    setShowCheckout(false);
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
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalCost,
                      breakdown: {
                        item_total: { value: subTotal, currency_code: "USD" },
                        shipping: {
                          value: shippingFee,
                          currency_code: "USD",
                        },
                        tax_total: { value: tax, currency_code: "USD" },
                      },
                    },
                    items: filteredCart.map((item) => {
                      return {
                        name: item.title,
                        unit_amount: {
                          currency_code: "USD",
                          value: item.price,
                        },
                        quantity: item.quantity,
                        category: "PHYSICAL_GOODS",
                      };
                    }),
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              setShowCheckout(false);
              setPurchaseMessage("purchase completed successfully");
              console.log(order);
            }}
            onError={(err) => {
              console.log(err);
              setPurchaseMessage("purchase not completed");
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
