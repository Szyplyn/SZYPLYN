 const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { qty } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: "Szypłyn 5L",
            },
            unit_amount: 1800,
          },
          quantity: qty,
        },
      ],
      mode: "payment",
      success_url: "https://szypln.vercel.app/success",
      cancel_url: "https://szypln.vercel.app/cancel",
    });

    res.status(200).json({ id: session.id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
