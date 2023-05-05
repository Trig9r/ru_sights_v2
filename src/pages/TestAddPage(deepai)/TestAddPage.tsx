import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '43b71b85-8fc5-4d72-99b6-19e969e1d739';

export const TestAddPageDeepai: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
      const previews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        previews.push(URL.createObjectURL(files[i]));
      }
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFiles) {
      return;
    }
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('image', selectedFiles[i]);
      }
      const response = await axios.post('https://api.deepai.org/api/nsfw-detector', formData, {
        headers: { 'Api-Key': API_KEY },
      });
      const data = response.data;
      console.log(data);

      // if (data.output) {
      //   setResults(data.output.map((result: any) => result.value));
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>NSFW Image Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        {imagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt="Preview" width="300" />
        ))}
        <button type="submit">Detect</button>
      </form>
      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <h2 key={index}>
              Result {index + 1}: {result}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};
