export async function POST(req) {
    try {
      const { name, email, message } = await req.json();
  
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "All fields are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      console.log("📩 Email Data:", { name, email, message });
  
      return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  