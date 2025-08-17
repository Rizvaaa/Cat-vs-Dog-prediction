import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");  // clear previous result
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Error connecting to backend.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🐾 Cat vs Dog Classifier</h2>

      <div className="card p-4 shadow-lg">
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="text-center mb-3">
            <img
              src={preview}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: "250px" }}
            />
          </div>
        )}

        <button className="btn btn-primary w-100" onClick={handleUpload}>
          Predict
        </button>

        {result && (
          <div className="alert alert-info text-center mt-3">
            Prediction: <strong>{result}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
