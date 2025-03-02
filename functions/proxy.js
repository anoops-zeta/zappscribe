const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "g-67aadf09ceb88191b906bdd695bf90f6-zappscribe",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
