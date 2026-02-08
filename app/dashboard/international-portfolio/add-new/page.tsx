"use client"

import { useState } from "react"
import { Globe, User, CheckCircle, ArrowRight, ArrowLeft, MapPin, Building, FileText } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InternationalAccountPage() {
   const [currentStep, setCurrentStep] = useState(1)
   const [formData, setFormData] = useState({
      // Personal Information
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      citizenship: "",
      taxId: "",

      // Contact Information
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",

      // Employment Information
      employmentStatus: "",
      employer: "",
      occupation: "",
      annualIncome: "",

      // Additional Information
      maritalStatus: "",
      dependents: "",

      // Document Uploads
      passport: null as File | null,
      bankStatement: null as File | null,

      // Agreements
      termsAccepted: false,
      privacyAccepted: false,
   })

   const handleInputChange = (field: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
   }

   const handleFileUpload = (field: string, file: File | null) => {
      setFormData((prev) => ({ ...prev, [field]: file }))
   }

   const nextStep = () => {
      if (currentStep < 4) setCurrentStep(currentStep + 1)
   }

   const prevStep = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1)
   }

   const handleSubmit = () => {
      // Handle form submission
      console.log("Form submitted:", formData)
      alert(
         "Application submitted successfully! We will review your information and contact you within 2-3 business days.",
      )
   }

   const steps = [
      { step: 1, title: "Personal Info", icon: User },
      { step: 2, title: "Contact Details", icon: MapPin },
      { step: 3, title: "Employment", icon: Building },
      { step: 4, title: "Review & Submit", icon: CheckCircle },
   ]

   return (
      <div className="space-y-6">
         <div className="text-center py-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
            <div className="flex items-center justify-center gap-3 mb-6">
               <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
               </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-foreground">
               IBKR Account Application
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Complete your personal information to open an Interactive Brokers international trading account
            </p>
         </div>

         <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-12">
               {steps.map((item, index) => (
                  <div key={item.step} className="flex items-center">
                     <div className="flex flex-col items-center">
                        <div
                           className={`h-12 w-12 rounded-full flex items-center justify-center ${currentStep >= item.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}
                        >
                           {item.icon && <item.icon className="h-6 w-6" />}
                        </div>
                        <span className="text-sm font-medium mt-2 text-center">{item.title}</span>
                     </div>
                     {index < steps.length - 1 && (
                        <ArrowRight className="h-6 w-6 text-muted-foreground mx-4 hidden md:block" />
                     )}
                  </div>
               ))}
            </div>

            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     {(() => {
                        const IconComponent = steps[currentStep - 1].icon
                        return IconComponent ? <IconComponent className="h-5 w-5 text-primary" /> : null
                     })()}
                     Step {currentStep}: {steps[currentStep - 1].title}
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                     <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                 id="firstName"
                                 value={formData.firstName}
                                 onChange={(e) => handleInputChange("firstName", e.target.value)}
                                 placeholder="Enter your first name"
                              />
                           </div>
                           <div>
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                 id="lastName"
                                 value={formData.lastName}
                                 onChange={(e) => handleInputChange("lastName", e.target.value)}
                                 placeholder="Enter your last name"
                              />
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                              <Input
                                 id="dateOfBirth"
                                 type="date"
                                 value={formData.dateOfBirth}
                                 onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                              />
                           </div>
                           <div>
                              <Label htmlFor="citizenship">Citizenship *</Label>
                              <Select onValueChange={(value) => handleInputChange("citizenship", value)}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select citizenship" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="la">Laos</SelectItem>
                                    <SelectItem value="th">Thailand</SelectItem>
                                    <SelectItem value="vn">Vietnam</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="taxId">Tax ID / SSN *</Label>
                              <Input
                                 id="taxId"
                                 value={formData.taxId}
                                 onChange={(e) => handleInputChange("taxId", e.target.value)}
                                 placeholder="Enter your tax identification number"
                              />
                           </div>
                           <div>
                              <Label htmlFor="maritalStatus">Marital Status</Label>
                              <Select onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select marital status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        {/* Document Upload Section */}
                        <div className="space-y-4 pt-6 border-t">
                           <h3 className="text-lg font-semibold flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              Required Documents
                           </h3>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                 <Label htmlFor="passport">Passport Copy *</Label>
                                 <Input
                                    id="passport"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload("passport", e.target.files?.[0] || null)}
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Upload a clear copy of your passport (PDF, JPG, PNG)
                                 </p>
                              </div>

                              <div>
                                 <Label htmlFor="bankStatement">Bank Statement *</Label>
                                 <Input
                                    id="bankStatement"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload("bankStatement", e.target.files?.[0] || null)}
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Bank statement from last 2 months (in English)
                                 </p>
                              </div>
                           </div>

                           <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                 <strong>Document Requirements:</strong>
                                 <br />• Passport: Clear, readable copy of your valid passport
                                 <br />• Bank Statement: Must be from the last 2 months and translated to English if originally in
                                 another language
                              </p>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Step 2: Contact Information */}
                  {currentStep === 2 && (
                     <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="email">Email Address *</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => handleInputChange("email", e.target.value)}
                                 placeholder="Enter your email address"
                              />
                           </div>
                           <div>
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input
                                 id="phone"
                                 value={formData.phone}
                                 onChange={(e) => handleInputChange("phone", e.target.value)}
                                 placeholder="Enter your phone number"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="address">Street Address *</Label>
                           <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              placeholder="Enter your street address"
                           />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                           <div>
                              <Label htmlFor="city">City *</Label>
                              <Input
                                 id="city"
                                 value={formData.city}
                                 onChange={(e) => handleInputChange("city", e.target.value)}
                                 placeholder="Enter your city"
                              />
                           </div>
                           <div>
                              <Label htmlFor="state">State/Province</Label>
                              <Input
                                 id="state"
                                 value={formData.state}
                                 onChange={(e) => handleInputChange("state", e.target.value)}
                                 placeholder="Enter your state"
                              />
                           </div>
                           <div>
                              <Label htmlFor="postalCode">Postal Code *</Label>
                              <Input
                                 id="postalCode"
                                 value={formData.postalCode}
                                 onChange={(e) => handleInputChange("postalCode", e.target.value)}
                                 placeholder="Enter postal code"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="country">Country *</Label>
                           <Select onValueChange={(value) => handleInputChange("country", value)}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="us">United States</SelectItem>
                                 <SelectItem value="la">Laos</SelectItem>
                                 <SelectItem value="th">Thailand</SelectItem>
                                 <SelectItem value="vn">Vietnam</SelectItem>
                                 <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  )}

                  {/* Step 3: Employment Information */}
                  {currentStep === 3 && (
                     <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="employmentStatus">Employment Status *</Label>
                              <Select onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select employment status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="employed">Employed</SelectItem>
                                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                                    <SelectItem value="unemployed">Unemployed</SelectItem>
                                    <SelectItem value="retired">Retired</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div>
                              <Label htmlFor="annualIncome">Annual Income (USD) *</Label>
                              <Select onValueChange={(value) => handleInputChange("annualIncome", value)}>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select income range" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="under-25k">Under $25,000</SelectItem>
                                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                                    <SelectItem value="over-250k">Over $250,000</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="employer">Employer Name</Label>
                           <Input
                              id="employer"
                              value={formData.employer}
                              onChange={(e) => handleInputChange("employer", e.target.value)}
                              placeholder="Enter your employer name"
                           />
                        </div>

                        <div>
                           <Label htmlFor="occupation">Occupation</Label>
                           <Input
                              id="occupation"
                              value={formData.occupation}
                              onChange={(e) => handleInputChange("occupation", e.target.value)}
                              placeholder="Enter your occupation"
                           />
                        </div>

                        <div>
                           <Label htmlFor="dependents">Number of Dependents</Label>
                           <Select onValueChange={(value) => handleInputChange("dependents", value)}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select number of dependents" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="0">0</SelectItem>
                                 <SelectItem value="1">1</SelectItem>
                                 <SelectItem value="2">2</SelectItem>
                                 <SelectItem value="3">3</SelectItem>
                                 <SelectItem value="4+">4 or more</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
                           <div className="grid md:grid-cols-2 gap-6 text-sm">
                              <div>
                                 <h4 className="font-medium mb-2">Personal Information</h4>
                                 <p>
                                    Name: {formData.firstName} {formData.lastName}
                                 </p>
                                 <p>Date of Birth: {formData.dateOfBirth}</p>
                                 <p>Citizenship: {formData.citizenship}</p>
                                 <p>Tax ID: {formData.taxId}</p>
                              </div>
                              <div>
                                 <h4 className="font-medium mb-2">Contact Information</h4>
                                 <p>Email: {formData.email}</p>
                                 <p>Phone: {formData.phone}</p>
                                 <p>
                                    Address: {formData.address}, {formData.city}
                                 </p>
                                 <p>Country: {formData.country}</p>
                              </div>
                           </div>

                           {/* Document Review Section */}
                           <div className="mt-6">
                              <h4 className="font-medium mb-2">Documents Uploaded</h4>
                              <div className="space-y-2 text-sm">
                                 <p className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Passport: {formData.passport ? formData.passport.name : "Not uploaded"}
                                 </p>
                                 <p className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Bank Statement: {formData.bankStatement ? formData.bankStatement.name : "Not uploaded"}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="flex items-center space-x-2">
                              <Checkbox
                                 id="terms"
                                 checked={formData.termsAccepted}
                                 onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                              />
                              <Label htmlFor="terms" className="text-sm">
                                 I agree to the Terms of Service and Account Agreement *
                              </Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <Checkbox
                                 id="privacy"
                                 checked={formData.privacyAccepted}
                                 onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked)}
                              />
                              <Label htmlFor="privacy" className="text-sm">
                                 I agree to the Privacy Policy and data processing *
                              </Label>
                           </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                           <p className="text-sm text-muted-foreground">
                              By submitting this application, you acknowledge that all information provided is accurate and
                              complete. IBKR will review your application and may request additional documentation. Account
                              approval typically takes 2-3 business days.
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                     <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 bg-transparent"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                     </Button>

                     {currentStep < 4 ? (
                        <Button onClick={nextStep} className="flex items-center gap-2">
                           Next
                           <ArrowRight className="h-4 w-4" />
                        </Button>
                     ) : (
                        <Button
                           onClick={handleSubmit}
                           disabled={!formData.termsAccepted || !formData.privacyAccepted}
                           className="flex items-center gap-2"
                        >
                           <CheckCircle className="h-4 w-4" />
                           Submit Application
                        </Button>
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
