import axios from "axios";

export const verifyPaystackPayment = async (reference: string) => {
  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRIVATE_PAYSTACK_KEY}`,
        },
      }
    );
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
