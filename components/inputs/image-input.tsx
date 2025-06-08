'use client'

import React, { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageInputProps {
  onImageChange?: (imageData: string | null) => void
}

export function ImageInput({ onImageChange }: ImageInputProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  async function uploadToImgbbFile(file: File, apiKey: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.success) return data.data.url;
    throw new Error(data.error?.message || 'Upload failed');
  }

  async function ensureMinSize(file: File, minSize = 1024): Promise<File> {
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          if (img.width >= minSize && img.height >= minSize) {
            resolve(file);
          } else {
            const scale = minSize / Math.min(img.width, img.height);
            const newW = Math.round(img.width * scale);
            const newH = Math.round(img.height * scale);
            const canvas = document.createElement('canvas');
            canvas.width = newW;
            canvas.height = newH;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve(file);
            ctx.drawImage(img, 0, 0, newW, newH);
            canvas.toBlob((blob) => {
              if (!blob) return resolve(file);
              const newFile = new File([blob], file.name, { type: file.type });
              resolve(newFile);
            }, file.type, 0.95);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  const handleFile = async (file: File) => {
    if (file.type.startsWith('image/')) {
      try {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '';
        if (!apiKey) {
          alert('缺少 imgbb API Key');
          return;
        }
        const fileToUpload = await ensureMinSize(file, 1024);
        const url = await uploadToImgbbFile(fileToUpload, apiKey);
        setUploadedImage(url);
        onImageChange?.(url);
      } catch (err) {
        alert('图片上传失败，请重试');
      }
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    onImageChange?.(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {uploadedImage ? (
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded clothing"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your clothing image here, or
          </p>
          <Button
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            Browse Files
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Supported formats: JPG, PNG, WebP. Max size: 20MB, 4096x4096px<br />
        <span className="text-primary">建议上传主体居中、清晰的原图，分辨率越高效果越好。</span>
      </p>
    </div>
  )
} 