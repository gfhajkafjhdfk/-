async function next() {
      const input = document.getElementById("playerInput").value;
      const storyDiv = document.getElementById("story");

      storyDiv.textContent += `\n\n▶ あなた: ${input}`;

      // AIにリクエストを送る（OpenAI APIの例）
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer あなたのAPIキー"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 軽いモデルでもOK
          messages: [
            { role: "system", content: "あなたは物語の語り部です。プレイヤーの入力に応じて物語を進めてください。" },
            { role: "user", content: input }
          ]
        })
      });

      const data = await res.json();
      const reply = data.choices[0].message.content;

      storyDiv.textContent += `\n\n◆ 物語: ${reply}`;
      document.getElementById("playerInput").value = "";
    }
