"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const Test = () => {
  const [file, setFile] = useState<File>();

  const sendFile = () => {
    if (!file) return;
    const data = new FormData();
    data.append("picture", file);
    axios.post("http://localhost:3000/api/users/test", data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <label>File input</label>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button onClick={sendFile}>Send</button>
    </div>
  );
};
