const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async function (event) {
  try {
    console.log("✅ Function triggered!");

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    console.log("✅ Received Event:", event.body);

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

    // ✅ Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "noreply@yourdomain.com", // ✅ Replace with your verified sender email
      to: "clarionnorth@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`,
    });

    console.log("📨 Email Response:", emailResponse);

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
