const express = require('express');
const Stripe = require('stripe');
const { buyGold } = require('../sqlCommands/BoughtQueries')

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { uid, element, type, amount, grams } = req.body; 
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${grams}g of ${type} ${element}`
            },
            unit_amount: Math.round(Number(amount) * 100), 
          },
          quantity: grams, 
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success?element=${element}&type=${type}&amount=${amount}&grams=${grams}`,
      cancel_url: 'http://localhost:5173/buy/gold',
    });

    await buyGold({id : uid, element, type, grams, spotPrice : amount})

    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session.' });
  }
});

module.exports = router;