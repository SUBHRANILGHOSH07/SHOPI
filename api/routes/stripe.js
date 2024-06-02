const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
//const KEY = process.env.STRIPE_KEY
//const stripe = require("stripe")(KEY);
const KEY = "sk_test_51PCNQJSJ5thDR4RghKeo17u3Yu1szbfCnERzL2UeHDTE5L9XTJKC7xNKt6iqAYEHwmxz8bHNHoRMoMAZaEpoMCAX004w0JWRVZ";
const stripe = require("stripe")(KEY);//this will require the stripe package and use the stripe key to connect to the stripe account

router.post('/payment', async (req, res) => {
  try {
    const { amount } = req.body;//this will get the amount from the request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,//this will set the amount to the amount from the request body
      currency: 'usd',//this will set the currency to usd
      payment_method_types: ['card'],//this will set the payment method to card
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,//this will return the client secret
    });
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the payment is not successful
  }
});

module.exports = router;


