"use client";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import Cookies from "js-cookie";
import { Input, Spinner, Tooltip } from "@nextui-org/react";
import rehypeSanitize from "rehype-sanitize";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

  const [content, setContent] = useState<string>(
    `### **Blog**
    
Blogunuzu yazın.
        
[KONUM](https://www.google.com/)
        
_Çeşitli stiller deneyebilirsiniz._

![image](https://i.imgur.com/BagYK4k.jpeg)
`
  );
  const [thumbnail, setThumbnail] = useState<File>();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const [error, setError] = useState(false);

  const onCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("summary", summary);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    if (!title || !category || !summary || !content || !thumbnail) {
      setError(true);
      return;
    }
    setError(false);
    const pb_auth = Cookies.get("pb_auth");
    const res = await axios.post("/api/blogs", formData, {
      headers: {
        cookie: `pb_auth=${pb_auth}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res.data)
    router.push(`/dashboard/blogs/`);
    router.refresh();
  };
  return (
    <div className="w-full flex flex-col items-center py-12 gap-4">
      <div className="flex flex-col gap-4 items-center sm:w-1/3 w-11/12">
        <h1 className="text-3xl font-bold text-center">Blogunu Yaz!</h1>
        <Input
          isRequired
          label="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
        <Input
          isRequired
          name="thumbnail"
          type="file"
          label="Kapak Fotoğrafı"
          placeholder="Blogun kapak fotoğrafını seçiniz."
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setThumbnail(files[files.length - 1]);
            }
          }}
        />
        <Input
          isRequired
          label="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full"
          endContent={
            <Tooltip content="Kategorileri ','(virgül) ile ayırarak yazın.">
              <Info className="w-8 h-8" />
            </Tooltip>
          }
        />
        <Input
          isRequired
          label="Blog özeti"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full"
          endContent={
            <Tooltip
              content="Çok uzun olmayacak şekilde bir cümle ile blog'un anasayfada gözükecek özetini yazın."
              className="max-w-[350px]"
            >
              <Info className="w-8 h-8" />
            </Tooltip>
          }
        />
      </div>
      <MDEditor
        value={content}
        // preview=""
        className="sm:w-11/12 w-11/12 min-h-[70vh]"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        onChange={(e) => {
          if (e) {
            setContent(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={loading}
        onClick={async (e) => {
          e.preventDefault();
          try {
            setLoading(true);
            await onCreate();
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }}
        className="sm:w-1/3 w-11/12  disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-neutral-900 text-xl mt-2 border-4 font-extrabold p-4 tracking-widest rounded-md border-white transition-all hover:bg-white hover:text-neutral-900"
      >
        {loading ? <Spinner /> : "Blog Oluştur"}
      </button>
    </div>
  );
};

export default Page;
