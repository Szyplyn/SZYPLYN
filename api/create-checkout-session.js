import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { qty } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: { name: "Szypłyn 5L" },
          unit_amount: 1800,
        },
        quantity: qty,
      },
    ],
    mode: "payment",
    success_url: "https://twoja-strona.vercel.app/success",
    cancel_url: "https://twoja-strona.vercel.app/cancel",
  });

  res.status(200).json({ id: session.id });
}
