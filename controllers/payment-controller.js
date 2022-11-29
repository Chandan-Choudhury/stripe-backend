const stripe = require("stripe")("sk_test_tR3PYbcVNZZ796tH88S4VQ2u");
// sk_test_tR3PYbcVNZZ796tH88S4VQ2u is only for demo purpose. Please use your own key.

const createPaymentIntent = async (req, res, next) => {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-11-15" }
  );
  const { amount, currency } = req.body;
  console.log("amount: ", amount);
  console.log("currency: ", currency);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3",
  });
};

exports.createPaymentIntent = createPaymentIntent;
