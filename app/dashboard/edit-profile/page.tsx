"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Upload, Camera, X, Plus, FileText, FileCheck, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Combined form state
  const [form, setForm] = useState({
    phone: user?.phone || "",
    location: user?.location || "",
    about: user?.about || "",
    availability: user?.availability || "",
    skills: user?.skills || [] as string[],
    photoUrl: user?.photoUrl || "",
    resumeUrl: user?.resumeUrl || "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [documents, setDocuments] = useState<File[]>([])

  // Refs for file inputs
  const photoInputRef = useRef<HTMLInputElement>(null)
  const resumeInputRef = useRef<HTMLInputElement>(null)
  const documentsInputRef = useRef<HTMLInputElement>(null)

  const token = localStorage.getItem("parttimematch_token");

  // ---------- Helpers ----------
  const validateFile = (file: File, maxSizeMB: number) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `${file.name} must be less than ${maxSizeMB}MB`,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file, 5)) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setForm(prev => ({ ...prev, photoUrl: reader.result as string }))
      reader.readAsDataURL(file)
    }
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file, 10)) {
      setResumeFile(file)
      setForm(prev => ({ ...prev, resumeUrl: file.name }))
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(f => validateFile(f, 10))
    setDocuments([...documents, ...validFiles])
  }

  const removeDocument = (index: number) => setDocuments(documents.filter((_, i) => i !== index))

  const addSkill = () => {
    const skill = skillInput.trim()
    if (skill && !form.skills.includes(skill)) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skill] }))
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate file upload
      await new Promise(res => setTimeout(res, 1000))

      const newDocuments = documents.map((doc, index) => ({
        id: crypto.randomUUID(),
        name: doc.name,
        type: doc.type,
        url: "#",
        verified: false,
        uploadedAt: new Date().toISOString(),
      }))

      const payload = {
        ...form,
        documents: [...(user?.documents || []), ...newDocuments]
      }

      // Call backend API with Bearer token

    const res = await fetch("http://localhost:4000/api/v1/user/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.error || "Failed to create profile")
    }

    const data = await res.json()

    // Update frontend auth context after backend success
    updateProfile(data.user)

    toast({
      title: "Profile created successfully!",
      description: "Your profile is now complete and ready for job matching",
    })

    router.push("/dashboard");
    } catch {
      toast({ title: "Error updating profile", description: "Please try again", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  // ---------- Render ----------
  return (
    <ProtectedRoute requiredRole="job_seeker">
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-3xl mx-auto relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Saving...</span>
              </div>
            )}

            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your profile information</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Keep your profile up to date for better job matches</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Profile Photo */}
                  <div className="space-y-2">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {form.photoUrl ? (
                          <img src={form.photoUrl} alt="Profile Photo Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <Input ref={photoInputRef} id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        <Button type="button" variant="outline" onClick={() => photoInputRef.current?.click()}>
                          <Upload className="w-4 h-4 mr-2" /> Change Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">Max 5MB, JPG or PNG</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          type="text"
                          placeholder="Mumbai, Maharashtra"
                          value={form.location}
                          onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <Label htmlFor="about">About You</Label>
                    <Textarea
                      id="about"
                      placeholder="Tell us about yourself..."
                      value={form.about}
                      onChange={e => setForm(prev => ({ ...prev, about: e.target.value }))}
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        type="text"
                        placeholder="Add a skill"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyPress={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        disabled={isLoading}
                      />
                      <Button type="button" onClick={addSkill} variant="outline" disabled={isLoading}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <button type="button" aria-label={`Remove skill ${skill}`} onClick={() => removeSkill(skill)} className="ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      type="text"
                      placeholder="Weekdays 4-8 PM, Weekends Flexible"
                      value={form.availability}
                      onChange={e => setForm(prev => ({ ...prev, availability: e.target.value }))}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Resume */}
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume/CV</Label>
                    <div className="border-2 border-dashed rounded-lg p-4">
                      <Input ref={resumeInputRef} id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
                      {resumeFile || form.resumeUrl ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium">{resumeFile?.name || form.resumeUrl}</span>
                          </div>
                          <Button type="button" variant="outline" size="sm" onClick={() => resumeInputRef.current?.click()}>
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                          <Button type="button" variant="outline" onClick={() => resumeInputRef.current?.click()}>
                            Upload Resume
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">PDF, DOC, or DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Documents */}
                  <div className="space-y-2">
                    <Label htmlFor="documents">Add Verification Documents</Label>
                    <div className="border-2 border-dashed rounded-lg p-4">
                      <Input ref={documentsInputRef} id="documents" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={handleDocumentChange} className="hidden" />
                      <div className="text-center">
                        <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <Button type="button" variant="outline" onClick={() => documentsInputRef.current?.click()}>
                          <Plus className="w-4 h-4 mr-2" /> Add Documents
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PDF, JPG, or PNG (Max 10MB each)</p>
                      </div>
                    </div>

                    {/* Existing Documents */}
                    {user?.documents?.length ? (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Existing Documents</p>
                        {user?.documents?.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{doc.name}</span>
                              {doc.verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* New Documents */}
                    {documents.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">New Documents</p>
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{doc.name}</span>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} className="flex-1" disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      Save Changes
                    </Button>
                  </div>

                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
