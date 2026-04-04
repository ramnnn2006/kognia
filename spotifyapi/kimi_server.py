"""
kimi_server.py
Run this first: python kimi_server.py
Then open history.html in your browser.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Allow requests from the browser

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="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"
)

@app.route("/analyze", methods=["POST"])
def analyze():
    tracks = request.json.get("tracks", [])
    if not tracks:
        return jsonify({"error": "No tracks provided"}), 400

    track_prompt = "\n".join([
        f"{i+1}. {t['name']} by {t['artist']}"
        for i, t in enumerate(tracks)
    ])

    prompt = (
        f"You are a music analyst. Analyze these {len(tracks)} songs COMPARATIVELY — "
        "each song's scores should be relative to the others in the list, not absolute.\n\n"
        f"Songs:\n{track_prompt}\n\n"
        "Return ONLY a valid JSON array of objects. Each object must have:\n"
        '- "valence": float 0.0–1.0 (how happy/positive)\n'
        '- "energy": float 0.0–1.0 (how intense/active)\n'
        '- "insight": string, max 8 words describing the mood simply\n\n'
        "No extra text, just the JSON array."
    )

    try:
        completion = client.chat.completions.create(
            model="moonshotai/kimi-k2-instruct",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.6,
            top_p=0.9,
            max_tokens=4096,
            stream=True
        )

        full_content = ""
        for chunk in completion:
            if not getattr(chunk, "choices", None):
                continue
            if chunk.choices and chunk.choices[0].delta.content is not None:
                full_content += chunk.choices[0].delta.content

        start = full_content.find('[')
        end = full_content.rfind(']') + 1
        data = json.loads(full_content[start:end])
        return jsonify(data)

    except Exception as e:
        print(f"Kimi error: {e}")
        # Fallback so the UI doesn't die
        fallback = [{"valence": 0.5, "energy": 0.5, "insight": "AI unavailable"} for _ in tracks]
        return jsonify(fallback)

if __name__ == "__main__":
    print("Kimi server running at http://localhost:5050")
    print("Open history.html in your browser.")
    app.run(port=5050, debug=False)
