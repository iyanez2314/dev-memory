"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, Check, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export function MeetingUploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [summary, setSummary] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setProcessing(true)

          // Simulate AI processing
          setTimeout(() => {
            setProcessing(false)
            setSummary(
              "The team has decided to switch from MongoDB to PostgreSQL due to the need for better transaction support and relational data modeling. This change will affect the user service, product catalog, and order processing systems. The migration will be done in phases, starting with the least critical services.",
            )
          }, 3000)

          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleClearFile = () => {
    setFile(null)
    setProgress(0)
    setUploading(false)
    setProcessing(false)
    setSummary("")
  }

  const handleSaveSummary = () => {
    // Mock saving the summary
    alert("Summary saved successfully!")
    handleClearFile()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Meeting Recording</CardTitle>
        <CardDescription>
          Upload an audio recording of your meeting to extract technical decisions. Supported formats: .mp3, .wav, .m4a
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file && !summary ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12">
            <Upload className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop your audio file here, or click to browse</p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".mp3,.wav,.m4a"
              onChange={handleFileChange}
            />
            <Button asChild variant="secondary">
              <label htmlFor="file-upload">Select File</label>
            </Button>
          </div>
        ) : summary ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">AI-Generated Summary</h3>
              <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[150px]" />
              <p className="text-sm text-muted-foreground mt-2">You can edit the summary before saving it.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-muted p-2">
                  <Upload className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClearFile} disabled={uploading || processing}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {(uploading || processing) && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{uploading ? "Uploading..." : "Processing with AI..."}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!summary ? (
          <>
            <Button variant="ghost" onClick={handleClearFile} disabled={!file || uploading || processing}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!file || uploading || processing}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </>
              ) : processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Upload & Process"
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={handleClearFile}>
              Cancel
            </Button>
            <Button onClick={handleSaveSummary}>
              <Check className="mr-2 h-4 w-4" />
              Save Decision
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

