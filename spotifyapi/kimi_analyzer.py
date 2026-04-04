import json
from openai import OpenAI

# Initialize client using your NVIDIA credentials
client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

def analyze_history_comparatively(tracks):
    """
    Takes a list of tracks and performs a comparative analysis
    to allot valence and energy values relative to each other.
    """
    
    # Format the track list for the prompt
    track_prompt = "\n".join([f"{i+1}. {t['name']} by {t['artist']}" for i, t in enumerate(tracks)])
    
    print(f"--- ANALYZING {len(tracks)} SIGNALS COMPARATIVELY ---")
    
    completion = client.chat.completions.create(
      model="moonshotai/kimi-k2-instruct",
      messages=[{
          "role": "user", 
          "content": f"Analyze these tracks COMPARATIVELY. Allot valence, energy, and acousticness (0.00 to 1.00) relative to each other.\n\nTracks:\n{track_prompt}\n\nReturn a clean JSON LIST of objects with: valence, energy, acousticness, insight. Use 2 decimal places."
      }],
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
        content = chunk.choices[0].delta.content
        full_content += content
        # Optional: print live stream
        print(content, end="", flush=True)

    print("\n\n--- ANALYSIS COMPLETE ---")
    
    # Extract JSON part from response
    try:
        start = full_content.find('[')
        end = full_content.rfind(']') + 1
        data = json.loads(full_content[start:end])
        return data
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return None

# EXAMPLE USAGE
if __name__ == "__main__":
    # Example signals (you can replace this with a json file load)
    my_signals = [
        {"name": "Lush Life", "artist": "Zara Larsson"},
        {"name": "Liability", "artist": "Lorde"},
        {"name": "Mr. Saxobeat", "artist": "Alexandra Stan"},
        {"name": "Motion Sickness", "artist": "Phoebe Bridgers"},
        {"name": "Cigarette Daydreams", "artist": "Cage The Elephant"}
    ]
    
    results = analyze_history_comparatively(my_signals)
    
    if results:
        print("\nFINAL REPORT:")
        for i, res in enumerate(results):
            track = my_signals[i]
            print(f"[{track['name']}] Valence: {res['valence']} | Energy: {res['energy']} | Insight: {res['insight']}")
