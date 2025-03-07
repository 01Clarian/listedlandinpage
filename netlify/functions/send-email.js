const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async function (event) {
  console.log("✅ Function triggered!");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error("❌ JSON Parse Error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" }),
    };
  }

  const { name, email, message } = data;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  console.log("📩 Email Data:", { name, email, message });

  try {
    // ✅ Ensure `from` is a verified domain in Resend
    const emailResponse = await resend.emails.send({
      from: "gunita@listedbookings.com", // ✅ Must be verified in Resend
      to: "gunita@listedbookings.com", // ✅ Always sends to Gunita
      reply_to: email, // ✅ So she can reply directly to the sender
      subject: `New Inquiry from ${name}`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`,
    });

    console.log("📨 Email Response:", emailResponse);

    if (emailResponse.error) {
      console.error("❌ Email Sending Error:", emailResponse.error);
      return {
        statusCode: 403,
        body: JSON.stringify({ error: emailResponse.error.message || "Email sending failed." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("❌ Server Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
