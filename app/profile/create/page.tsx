"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { User, Calendar, MapPin, Phone, FileText, Upload, Camera, CheckCircle2, X, Plus, FileCheck } from "lucide-react"

export default function CreateProfilePage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.profileCompleted) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Form state
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [about, setAbout] = useState("")
  const [availability, setAvailability] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [documents, setDocuments] = useState<File[]>([])

  const token = localStorage.getItem("parttimematch_token");

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photo must be less than 5MB",
          variant: "destructive",
        })
        return
      }
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Resume must be less than 10MB",
          variant: "destructive",
        })
        return
      }
      setResumeFile(file)
    }
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} must be less than 10MB`,
          variant: "destructive",
        })
        return false
      }
      return true
    })
    setDocuments([...documents, ...validFiles])
  }

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate age
    if (!dateOfBirth) {
      toast({
        title: "Date of birth required",
        description: "Please enter your date of birth",
        variant: "destructive",
      })
      return
    }

    const age = calculateAge(dateOfBirth)
    if (age < 15) {
      toast({
        title: "Age requirement not met",
        description: "You must be at least 15 years old to create a profile",
        variant: "destructive",
      })
      return
    }

    setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

   const handleFinalSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const age = calculateAge(dateOfBirth)

    // Prepare documents payload
    const uploadedDocuments = documents.map((doc, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: doc.name,
      type: doc.type,
      url: `#`, // Backend should handle actual URL
      verified: false,
      uploadedAt: new Date().toISOString(),
    }))

    // Build payload
    const payload = {
      dateOfBirth,
      age,
      phone,
      location,
      about,
      availability,
      skills,
      photoUrl: photoPreview || undefined,
      resumeUrl: resumeFile ? resumeFile.name : undefined,
      documents: uploadedDocuments,
      profileCompleted: true,
    }

    // Call backend API with Bearer token

    const res = await fetch("http://localhost:4000/api/v1/user/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // <-- Pass JWT token here
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
  } catch (error: any) {
    console.error(error)
    toast({
      title: "Error creating profile",
      description: error.message || "Please try again",
      variant: "destructive",
    })
  } finally {
    setIsLoading(false)
  }
}



  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Basic Info</span>
              <span>Profile Details</span>
              <span>Documents</span>
              <span>Review</span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Let's start with your basic details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dob">
                      Date of Birth <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="pl-10"
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    {dateOfBirth && (
                      <p className="text-sm text-muted-foreground">
                        Age: {calculateAge(dateOfBirth)} years
                        {calculateAge(dateOfBirth) < 15 && (
                          <span className="text-destructive ml-2">(Must be at least 15 years old)</span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        type="text"
                        placeholder="Mumbai, Maharashtra"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Next Step</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Profile Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Tell us more about yourself</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {photoPreview ? (
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("photo")?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">Max 5MB, JPG or PNG</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about">
                      About You <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="about"
                      placeholder="Tell us about yourself, your interests, and what you're looking for..."
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">
                      Skills <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        type="text"
                        placeholder="Add a skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="gap-1">
                            {skill}
                            <button type="button" onClick={() => removeSkill(skill)} className="ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">
                      Availability <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="availability"
                      type="text"
                      placeholder="e.g., Weekdays 4-8 PM, Weekends Flexible"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={skills.length === 0}>
                      Next Step
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>Upload your resume and verification documents for better job matching</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep3Submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="resume">
                      Resume/CV <span className="text-destructive">*</span>
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                      />
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileCheck className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium">{resumeFile.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setResumeFile(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("resume")?.click()}
                          >
                            Upload Resume
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">PDF, DOC, or DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Verification Documents (Optional)</Label>
                    <p className="text-sm text-muted-foreground">
                      Upload ID proof, educational certificates, or other documents to verify your qualifications
                    </p>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        id="documents"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleDocumentChange}
                        className="hidden"
                      />
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("documents")?.click()}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Documents
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">PDF, JPG, or PNG (Max 10MB each)</p>
                    </div>
                    {documents.length > 0 && (
                      <div className="space-y-2 mt-4">
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

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={!resumeFile}>
                      Next Step
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Profile</CardTitle>
                <CardDescription>Please review your information before submitting</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {photoPreview ? (
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user?.name}</h3>
                        <p className="text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Age</p>
                        <p className="text-base">{calculateAge(dateOfBirth)} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p className="text-base">{phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-base">{location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Availability</p>
                        <p className="text-base">{availability}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">About</p>
                      <p className="text-base leading-relaxed">{about}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Documents</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <FileCheck className="w-4 h-4 text-green-600" />
                          <span>Resume: {resumeFile?.name}</span>
                        </div>
                        {documents.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <FileCheck className="w-4 h-4 text-green-600" />
                            <span>{documents.length} verification document(s) uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating Profile..." : "Complete Profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
