import emailjs from "emailjs-com";

export const sendOtpEmail = async (email, otp) => {
  try {
    const response = await emailjs.send(
      "service_we1jnmp",
      "template_wezchnc",
      {
        otp : otp,
        email : email
      },
      "BnnXtyZTUUwqQVGsh"
    );
    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};