import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Pi1NbGOlPr1dnI3vaMH6ZTImW6rbWImiLUtjLHV0VlwfvEgbqJ6LeRGHXqSe3cDTffArLIngiFeb421EmK4c81k00PqBfn9RT'
);

export const bookTour = async (tourId) => {
  try {
    // 1. get checkout session from api
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. create checkout form + charge cc
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
