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
    if (data.data.status === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
