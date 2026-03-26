import os
import sys
import json
import subprocess
import argparse
from google.cloud import speech

def transcribe_file(file_path, language_code="sv-SE"):
    """Transcribe the given audio/video file and return word-level timestamps."""
    client = speech.SpeechClient.from_service_account_json("/home/chris/panglossia/google-credentials.json")

    # Extract audio if it's not already a simple format
    audio_path = "/tmp/transcribe_temp.wav"
    subprocess.run([
        "ffmpeg", "-y", "-i", file_path, "-vn", 
        "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", 
        audio_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with open(audio_path, "rb") as f:
        content = f.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code=language_code,
        enable_word_time_offsets=True,
    )

    print(f"Starting transcription for {file_path}...")
    response = client.recognize(config=config, audio=audio)

    transcript_data = []
    for result in response.results:
        alternative = result.alternatives[0]
        for word_info in alternative.words:
            word = word_info.word
            start_time = word_info.start_time
            end_time = word_info.end_time

            transcript_data.append({
                "word": word,
                "start_ms": start_time.total_seconds() * 1000,
                "end_ms": end_time.total_seconds() * 1000
            })

    os.remove(audio_path)
    return transcript_data

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("file", help="Media file path")
    parser.add_argument("--lang", default="sv-SE", help="Language code")
    parser.add_argument("--out", help="Output JSON path")
    args = parser.parse_args()

    try:
        data = transcribe_file(args.file, args.lang)
        if args.out:
            with open(args.out, "w") as f:
                json.dump(data, f, indent=2)
            print(f"Success: {args.out}")
        else:
            print(json.dumps(data, indent=2))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
