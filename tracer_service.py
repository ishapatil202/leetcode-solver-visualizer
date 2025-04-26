
from flask import Flask, request, jsonify
import sys
import json

app = Flask(__name__)
trace_output = []

def tracer(frame, event, arg):
    if event == "line":
        safe_locals = {}

        for k, v in frame.f_locals.items():
            try:
                json.dumps(v)  # Try serializing
                safe_locals[k] = v  # If OK, use it
            except (TypeError, OverflowError):
                safe_locals[k] = str(v)  # Fallback to string

        trace_output.append({
            "line": frame.f_lineno,
            "locals": safe_locals
        })

    return tracer
@app.route('/trace', methods=['POST'])
def trace_code():
    global trace_output
    trace_output = []

    code = request.json.get("code", "")
    if not code:
        return jsonify({ "error": "No code provided" }), 400

    print("📦 Received code to trace:\n", code)

    try:
        sys.settrace(tracer)
        exec(code, {"__name__": "__main__"})
    except Exception as e:
        print("❌ Error during execution:", str(e))  # 💥 this line
        return jsonify({ "error": str(e) }), 500
    finally:
        sys.settrace(None)

    return jsonify({ "trace": trace_output })

if __name__ == '__main__':
    app.run(port=8000)

