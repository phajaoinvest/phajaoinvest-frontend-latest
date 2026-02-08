"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
   Globe,
   User,
   CheckCircle,
   ArrowRight,
   ArrowLeft,
   MapPin,
   Building,
   FileText,
   PlusIcon,
   Loader,
   Send,
} from "lucide-react";

// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/app/utils/toast";
import { useTranslation } from "@/lib/i18n";
import { postAPI, queryData } from "@/app/api/api";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileToBunnyCDN } from "@/app/utils/upload";
import { useCustomerStore } from "@/app/store/useCustomerStore";
import { ICountriesResponse, IDistrictsResponse, IProvincesResponse } from "@/interfaces/location";

export default function InternationalAccountPage() {
   const { t } = useTranslation();
   const customer = useCustomerStore((state) => state.customer)
   const { errorMessage, successMessage } = useToast();

   const steps = [
      { step: 1, title: t("app.step_personal"), icon: User },
      { step: 2, title: t("app.step_contact"), icon: MapPin },
      { step: 3, title: t("app.step_employment"), icon: Building },
      { step: 4, title: t("app.step_review"), icon: CheckCircle },
   ];
   const [countryId, setCountryId] = useState<string>("");
   const [provinceId, setProvinceId] = useState<string>("");
   const [currentStep, setCurrentStep] = useState<number>(1);
   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
   const [countries, setCountries] = useState<ICountriesResponse[] | null>(null);
   const [provinces, setProvinces] = useState<IProvincesResponse[] | null>(null);
   const [districts, setDistricts] = useState<IDistrictsResponse[] | null>(null);

   const fetchCountries = async () => {
      try {
         const res = await queryData({
            url: "/countries",
         });
         if (res.length > 1) {
            setCountries(res);
         }
      } catch (error: any) {
         console.log("Fetch countries failed!", error)
      }
   };

   useEffect(() => {
      fetchCountries();
   }, []);

   const fetchProvinces = async (countryId: string) => {
      try {
         const res = await queryData({
            url: `/provinces?country_id=${countryId}`,
         });
         if (res.length > 0) {
            setProvinces(res);
         }
      } catch (error) {
         console.log("Fetch provinces failed!", error);
      }
   };

   useEffect(() => {
      if (countryId) {
         fetchProvinces(countryId);
      }
   }, [countryId]);

   const fetchDistricts = async (provinceId: string) => {
      try {
         const res = await queryData({
            url: `/districts?province_id=${provinceId}`,
         });
         if (res.length > 0) {
            setDistricts(res);
         }
      } catch (error) {
         console.log("Fetch districts failed!", error);
      }
   };

   useEffect(() => {
      if (provinceId) {
         fetchDistricts(provinceId);
      }
   }, [provinceId]);

   const handleFileUpload = (field: string, file: File | null) => {
      formik.setFieldValue(field, file);
   };

   const nextStep = () => {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
   };

   const prevStep = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
   };

   // const hasServices =
   //    customer?.services.some(service =>
   //       ["international_stock_account", "guaranteed_returns"].includes(service.service_type)
   //    );

   const hasServices =
      customer?.services?.find(
         service => service.service_type === "international_stock_account"
      )?.status ?? "not";


   const getValidationSchema = (hasServices: boolean) => {
      if (hasServices) {
         return Yup.object({
            service_type: Yup.string().required("Account type is required"),
            identity_front: Yup.mixed<File>()
               .required("Identity front is required")
               .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
                  if (!value) return false;
                  return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
               }),
            identity_back: Yup.mixed<File>()
               .required("Identity back is required")
               .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
                  if (!value) return false;
                  return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
               }),
         });
      }

      return Yup.object({
         service_type: Yup.string().required("Account type is required"),
         first_name: Yup.string().required("First name is required"),
         last_name: Yup.string().required("Last name is required"),
         dob: Yup.string().required("Date of birth is required"),
         nationality: Yup.string().required("Nationality is required"),
         tax_id: Yup.string().required("Tax ID is required"),
         marital_status: Yup.string().required("Marital status is required"),
         identity_front: Yup.mixed<File>()
            .required("Identity front is required")
            .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
               if (!value) return false;
               return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
            }),
         identity_back: Yup.mixed<File>()
            .required("Identity back is required")
            .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
               if (!value) return false;
               return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
            }),
         email: Yup.string().email("Invalid email").required("Email is required"),
         phone: Yup.string().required("Phone number is required"),
         address: Yup.string().required("Address is required"),
         city: Yup.string().required("City is required"),
         state: Yup.string().required("State is required"),
         postalCode: Yup.string().required("Postal code is required"),
         country: Yup.string().required("Country is required"),
         employmentStatus: Yup.string().required("Employment status is required"),
         employer: Yup.string().required("Employer is required"),
         occupation: Yup.string().required("Occupation is required"),
         annualIncome: Yup.string().required("Annual income is required"),
         investment_experience: Yup.string().required("Investment experience count is required"),
         termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms").required(),
         privacyAccepted: Yup.boolean().oneOf([true], "You must accept the privacy").required(),
      });
   };

   const formik = useFormik({
      initialValues: {
         service_type: "guaranteed_returns",

         // Personal Info
         first_name: "",
         last_name: "",
         dob: "",
         nationality: "",
         tax_id: "",

         // Contact Info
         email: customer?.email || "",
         phone: customer?.phone_number || "",
         address: "",
         city: "",
         state: "",
         postalCode: "",
         country: "",
         village: "",

         // Employment Info
         employmentStatus: "",
         employer: "",
         occupation: "",
         annualIncome: "",

         // Additional Info
         marital_status: "",
         investment_experience: 0,

         // Documents
         identity_front: null as File | null,
         identity_back: null as File | null,

         // Agreements
         termsAccepted: false,
         privacyAccepted: false,
      },
      validationSchema: getValidationSchema(hasServices === "not" ? false : true),

      validateOnMount: true,

      onSubmit: async (values, { resetForm, setSubmitting }) => {
         try {
            const identifyFront = values.identity_front;
            const identifyBack = values.identity_back;

            if (!(identifyFront instanceof File) || !(identifyBack instanceof File)) {
               throw new Error("Files are not valid");
            }

            const buffer = Buffer.from(await identifyFront.arrayBuffer());
            const url = await uploadFileToBunnyCDN(buffer, identifyFront.name, identifyFront.type);

            const buffer1 = Buffer.from(await identifyBack.arrayBuffer());
            const url1 = await uploadFileToBunnyCDN(buffer1, identifyBack.name, identifyBack.type);

            const documents = [
               { doc_type: "identity_front", storage_ref: url },
               { doc_type: "identity_back", storage_ref: url1 },
            ];

            let formattedData;
            if (hasServices === "pending") {
               formattedData = {
                  service_type: "guaranteed_returns",
                  documents,
               };
            } else {
               formattedData = {
                  service_type: "guaranteed_returns",
                  documents,
                  kyc: {
                     dob: values.dob,
                     nationality: values.nationality,
                     marital_status: values.marital_status,
                     employment_status: values.employmentStatus,
                     annual_income: values.annualIncome,
                     employer_name: values.employer,
                     occupation: values.occupation,
                     investment_experience: values.investment_experience,
                     tax_id: values.tax_id,
                     fatca_status: "non_us_person",
                  },
                  address: {
                     country_id: values.country,
                     province_id: values.state,
                     district_id: values.city,
                     village: values.village,
                     address_line: values.address,
                     postal_code: values.postalCode,
                  },
               };
            }
            const res = await postAPI({
               url: "/customers/services/apply",
               body: formattedData,
            });

            if (res?.status_code === 201 || 200) {
               successMessage(t("app.submit_success"), 2000);
               resetForm();
               setCurrentStep(1);
               setSubmitSuccess(true);
            } else {
               errorMessage(t("app.submit_error"), 2000);
            }
         } catch (err) {
            errorMessage(t("app.submit_failed"), 2000);
         } finally {
            setSubmitting(false);
         }
      },
   });

   if (submitSuccess) {
      return (
         <div className="h-auto flex items-center justify-center p-4">
            <div className="max-w-2xl w-full border rounded-lg">
               <div className="rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-4">
                  <div className="flex justify-center">
                     <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full opacity-20"></div>
                        <div className="relative bg-green-500 rounded-full p-4">
                           <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                     </div>
                  </div>

                  <h1 className="text-md font-bold">
                     {t("app.success_title")}
                  </h1>

                  <p className="text-sm max-w-lg mx-auto">
                     {t("app.success_invest_des")}
                  </p>

                  <div className="border rounded-lg p-6 text-left">
                     <h3 className="text-sm font-semibold mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        {t("app.what_next")}
                     </h3>
                     <ul className="text-xs space-y-2">
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>{t("app.next_verify")}</span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>{t("app.next_email")}</span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>{t("app.next_track")}</span>
                        </li>
                     </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        variant="outline"
                        onClick={prevStep}
                        className="text-xs flex items-center gap-2 bg-primary hover:bg-primary"
                     >
                        <ArrowLeft />
                        {t("app.return_dashboard")}
                     </Button>
                  </div>
                  <hr />
                  <div>
                     <p className="text-sm">
                        {t("app.need_help")}{' '}&nbsp;
                        <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                           support@example.com
                        </a>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      )
   }


   return (
      <div className="space-y-2">
         <div className="text-center py-8 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-3">
               <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-primary" />
               </div>
               <h1 className="text-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-foreground">
                  {t("app.page_title")}
               </h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
               {t("app.invest_des")}
            </p>
         </div>

         {/* {customer?.services?.length > 0 && customer?.services[0].service_type === "guaranteed_returns" ? */}
         {/* {hasServices && customer?.services[0].service_type === "international_stock_account" ? */}
         {hasServices !== "not" ?
            <div className="space-y-8">
               <Card>
                  <CardContent className="space-y-6">
                     <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="space-y-4 pt-6 border-t">
                           <h3 className="text-md font-semibold flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              {t("app.required_docs")}
                           </h3>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <Label htmlFor="identity_front">
                                    {t("app.identity_front_label")} <span className="text-rose-500">*</span>
                                 </Label>
                                 <Input
                                    id="identity_front"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                       handleFileUpload(
                                          "identity_front",
                                          e.target.files?.[0] || null
                                       )
                                    }
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    {t("app.identity_front_hint")}
                                 </p>
                                 {formik.errors.identity_front && (
                                    <label className="text-xs text-red-500">{formik.errors.identity_front}</label>
                                 )}
                              </div>

                              <div className="space-y-1">
                                 <Label htmlFor="identity_back">
                                    {t("app.identity_back_label")}
                                    <span className="text-rose-500">*</span>
                                 </Label>
                                 <Input
                                    id="identity_back"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                       handleFileUpload(
                                          "identity_back",
                                          e.target.files?.[0] || null
                                       )
                                    }
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    {t("app.identity_back_hint")}
                                 </p>
                                 {formik.errors.identity_back && (
                                    <label className="text-xs text-red-500">{formik.errors.identity_back}</label>
                                 )}
                              </div>
                           </div>
                        </div>
                        <div className="flex items-end justify-end">
                           <Button
                              type="submit"
                              disabled={formik.isSubmitting}
                              className="flex items-center gap-2"
                              onClick={() => console.log("Button clicked", formik.errors)}
                           >
                              {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <PlusIcon className="h-4 w-4" />}
                              {formik.isSubmitting ? t("app.submitting") : t("app.submit")}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
            :
            <div className="max-w-4xl mx-auto space-y-4">
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     {steps.map((item) => (
                        <div key={item.step} className="flex items-center">
                           <div className="flex flex-col items-center">
                              <div
                                 className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= item.step
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                              >
                                 {item.icon && <item.icon className="h-4 w-4" />}
                              </div>
                              <span className="text-sm mt-2 text-center">{item.title}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  <Progress
                     value={(currentStep / steps.length) * 100}
                     className="mb-4"
                  />
               </div>

               <div className="space-y-8">
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                           {(() => {
                              const IconComponent = steps[currentStep - 1].icon;
                              return IconComponent ? (
                                 <IconComponent className="h-4 w-4 text-primary" />
                              ) : null;
                           })()}
                           {t("app.step_label")} {currentStep}: {steps[currentStep - 1].title}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <form onSubmit={formik.handleSubmit}>
                           {currentStep === 1 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="first_name">
                                          {t("app.first_name")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="first_name"
                                          name="first_name"
                                          value={formik.values.first_name}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.first_name_placeholder")}
                                       />
                                       <Input
                                          type="hidden"
                                          name="service_type"
                                          value="guaranteed_returns"
                                       />
                                       {formik.errors.first_name && (
                                          <label className="text-xs text-red-500">{formik.errors.first_name}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="last_name">
                                          {t("app.last_name")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="last_name"
                                          value={formik.values.last_name}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.last_name_placeholder")}
                                       />
                                       {formik.errors.last_name && (
                                          <label className="text-xs text-red-500">{formik.errors.last_name}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="dob">
                                          {t("app.dob")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="dob"
                                          name="dob"
                                          type="date"
                                          value={formik.values.dob}
                                          onChange={formik.handleChange}
                                       />
                                       {formik.errors.dob && (
                                          <label className="text-xs text-red-500">{formik.errors.dob}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="nationality">
                                          {t("app.nationality")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="nationality"
                                          value={formik.values.nationality}
                                          onValueChange={(value) => formik.setFieldValue("nationality", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.nationality_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="us">{t("app.nationality_us")}</SelectItem>
                                             <SelectItem value="la">{t("app.nationality_la")}</SelectItem>
                                             <SelectItem value="th">{t("app.nationality_th")}</SelectItem>
                                             <SelectItem value="vn">{t("app.nationality_vn")}</SelectItem>
                                             <SelectItem value="other">{t("app.nationality_other")}</SelectItem>
                                          </SelectContent>
                                       </Select>

                                       {formik.errors.nationality && (
                                          <label className="text-xs text-red-500">{formik.errors.nationality}</label>
                                       )}
                                    </div>

                                 </div>

                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="tax_id">
                                          {t("app.tax_id")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="tax_id"
                                          value={formik.values.tax_id}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.tax_id_placeholder")}
                                       />
                                       {formik.errors.tax_id && (
                                          <label className="text-xs text-red-500">{formik.errors.tax_id}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="marital_status">{t("app.marital_status")} <span className="text-rose-500">*</span></Label>
                                       <Select
                                          name="marital_status"
                                          value={formik.values.marital_status}
                                          onValueChange={(value) => formik.setFieldValue("marital_status", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.marital_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="single">{t("app.marital_single")}</SelectItem>
                                             <SelectItem value="married">{t("app.marital_married")}</SelectItem>
                                             <SelectItem value="divorced">{t("app.marital_divorced")}</SelectItem>
                                             <SelectItem value="widowed">{t("app.marital_widowed")}</SelectItem>
                                             <SelectItem value="other">{t("app.marital_other")}</SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.marital_status && (
                                          <label className="text-xs text-red-500">{formik.errors.marital_status}</label>
                                       )}
                                    </div>
                                 </div>

                                 {/* Documents */}
                                 <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-md font-semibold flex items-center gap-2">
                                       <FileText className="h-4 w-4 text-primary" />
                                       {t("app.required_docs")}
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                       <div className="space-y-1">
                                          <Label htmlFor="identity_front">
                                             {t("app.identity_front_label")} <span className="text-rose-500">*</span>
                                          </Label>
                                          <Input
                                             id="identity_front"
                                             type="file"
                                             accept=".pdf,.jpg,.jpeg,.png"
                                             onChange={(e) =>
                                                handleFileUpload(
                                                   "identity_front",
                                                   e.target.files?.[0] || null
                                                )
                                             }
                                             className="cursor-pointer"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                             {t("app.identity_front_hint")}
                                          </p>
                                          {formik.errors.identity_front && (
                                             <label className="text-xs text-red-500">{formik.errors.identity_front}</label>
                                          )}
                                       </div>

                                       <div className="space-y-1">
                                          <Label htmlFor="identity_back">
                                             {t("app.identity_back_label")}
                                             <span className="text-rose-500">*</span>
                                          </Label>
                                          <Input
                                             id="identity_back"
                                             type="file"
                                             accept=".pdf,.jpg,.jpeg,.png"
                                             onChange={(e) =>
                                                handleFileUpload(
                                                   "identity_back",
                                                   e.target.files?.[0] || null
                                                )
                                             }
                                             className="cursor-pointer"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                             {t("app.identity_back_hint")}
                                          </p>
                                          {formik.errors.identity_back && (
                                             <label className="text-xs text-red-500">{formik.errors.identity_back}</label>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Step 2: Contact Information */}
                           {currentStep === 2 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="email">
                                          {t("app.email")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="email"
                                          type="email"
                                          name="email"
                                          value={formik.values.email}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.email_placeholder")}
                                       />
                                       {formik.errors.email && (
                                          <label className="text-xs text-red-500">{formik.errors.email}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="phone">
                                          {t("app.phone")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="phone"
                                          name="phone"
                                          value={formik.values.phone}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.phone_placeholder")}
                                       />
                                       {formik.errors.phone && (
                                          <label className="text-xs text-red-500">{formik.errors.phone}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="country">
                                          {t("app.country")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="country"
                                          value={formik.values.country}
                                          onValueChange={(value) => {
                                             formik.setFieldValue("country", value);
                                             setCountryId(value);
                                          }}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.country_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {countries?.map((country) => (
                                                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.country && (
                                          <label className="text-xs text-red-500">{formik.errors.country}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="state">
                                          {t("app.state")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="state"
                                          value={formik.values.state}
                                          onValueChange={(value) => {
                                             formik.setFieldValue("state", value);
                                             setProvinceId(value);
                                          }}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.state_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {provinces && provinces?.map((province) => (
                                                <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.state && (
                                          <label className="text-xs text-red-500">{formik.errors.state}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="state">
                                          {t("app.city")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="state"
                                          value={formik.values.city}
                                          onValueChange={(value) => formik.setFieldValue("city", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.city_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {districts && districts?.map((district) => (
                                                <SelectItem key={district.id} value={district.id}>{district.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.city && (
                                          <label className="text-xs text-red-500">{formik.errors.city}</label>
                                       )}
                                    </div>
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="village">
                                          {t("app.village")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="village"
                                          name="village"
                                          value={formik.values.village}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.village_placeholder")}
                                       />
                                       {formik.errors.village && (
                                          <label className="text-xs text-red-500">{formik.errors.village}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="postalCode">
                                          {t("app.postal_code")} <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="postalCode"
                                          name="postalCode"
                                          value={formik.values.postalCode}
                                          onChange={formik.handleChange}
                                          placeholder={t("app.postal_placeholder")}
                                       />
                                       {formik.errors.postalCode && (
                                          <label className="text-xs text-red-500">{formik.errors.postalCode}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="address">
                                       {t("app.address")} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Textarea
                                       id="address"
                                       name="address"
                                       value={formik.values.address}
                                       onChange={formik.handleChange}
                                       placeholder={t("app.address_placeholder")}
                                    />
                                    {formik.errors.address && (
                                       <label className="text-xs text-red-500">{formik.errors.address}</label>
                                    )}
                                 </div>
                              </div>
                           )}

                           {/* Step 3: Employment Information */}
                           {currentStep === 3 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="employmentStatus">
                                          {t("app.employment_status")}{" "}
                                          <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="employmentStatus"
                                          value={formik.values.employmentStatus}
                                          onValueChange={(value) => formik.setFieldValue("employmentStatus", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.employment_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="employed">{t("app.employed")}</SelectItem>
                                             <SelectItem value="self-employed">
                                                {t("app.self_employed")}
                                             </SelectItem>
                                             <SelectItem value="unemployed">{t("app.unemployed")}</SelectItem>
                                             <SelectItem value="retired">{t("app.retired")}</SelectItem>
                                             <SelectItem value="student">{t("app.student")}</SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.employmentStatus && (
                                          <label className="text-xs text-red-500">{formik.errors.employmentStatus}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="annualIncome">
                                          {t("app.annual_income")}{" "}
                                          <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="annualIncome"
                                          value={formik.values.annualIncome}
                                          onValueChange={(value) => formik.setFieldValue("annualIncome", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder={t("app.income_placeholder")} />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="under-25k">
                                                {t("app.income_under_25k")}
                                             </SelectItem>
                                             <SelectItem value="25k-50k">
                                                {t("app.income_25k_50k")}
                                             </SelectItem>
                                             <SelectItem value="50k-100k">
                                                {t("app.income_50k_100k")}
                                             </SelectItem>
                                             <SelectItem value="100k-250k">
                                                {t("app.income_100k_250k")}
                                             </SelectItem>
                                             <SelectItem value="over-250k">
                                                {t("app.income_over_250k")}
                                             </SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.annualIncome && (
                                          <label className="text-xs text-red-500">{formik.errors.annualIncome}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="employer">
                                       {t("app.employer_name")} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                       required
                                       name="employer"
                                       id="employer"
                                       value={formik.values.employer}
                                       onChange={formik.handleChange}
                                       placeholder={t("app.employer_placeholder")}
                                    />
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="occupation">
                                       {t("app.occupation")} <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                       required
                                       id="occupation"
                                       name="occupation"
                                       value={formik.values.occupation}
                                       onChange={formik.handleChange}
                                       placeholder={t("app.occupation_placeholder")}
                                    />
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="investment_experience">
                                       {t("app.investment_experience")}{" "}
                                       <span className="text-rose-500">*</span>
                                    </Label>
                                    <Select
                                       required
                                       name="investment_experience"
                                       value={String(formik.values.investment_experience ?? "")}
                                       onValueChange={(value) => formik.setFieldValue("investment_experience", Number(value))}
                                    >
                                       <SelectTrigger>
                                          <SelectValue placeholder={t("app.experience_placeholder")} />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {[...Array(11).keys()].slice(1).map((num) => (
                                             <SelectItem key={num} value={String(num)}>
                                                {num} {t("app.years")}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 </div>
                              </div>
                           )}

                           {/* Step 4: Review & Submit */}
                           {currentStep === 4 && (
                              <div className="space-y-6">
                                 <div>
                                    <h3 className="text-md font-semibold mb-4">
                                       {t("app.review_title")}
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                                       <div>
                                          <h4 className="text-sm font-medium mb-2">
                                             {t("app.personal_info")}
                                          </h4>
                                          <p>
                                             {t("app.name_label")} {formik.values.first_name} {formik.values.last_name}
                                          </p>
                                          <p>{t("app.dob_label")} {formik.values.dob}</p>
                                          <p>{t("app.nationality_label")} {formik.values.nationality}</p>
                                          <p>{t("app.tax_id_label")} {formik.values.tax_id}</p>
                                       </div>
                                       <div>
                                          <h4 className="text-sm font-medium mb-2">
                                             {t("app.contact_info")}
                                          </h4>
                                          <p>{t("app.email_label")} {formik.values.email}</p>
                                          <p>{t("app.phone_label")} {formik.values.phone}</p>
                                          <p>
                                             {t("app.address_label")} {formik.values.address}, {formik.values.city}
                                          </p>
                                          <p>{t("app.country_label")} {formik.values.country}</p>
                                       </div>
                                    </div>

                                    {/* Document Review Section */}
                                    <div className="mt-6">
                                       <h4 className="text-md font-medium mb-2">
                                          {t("app.docs_uploaded")}
                                       </h4>
                                       <div className="space-y-2 text-sm">
                                          <p className="text-sm flex items-center gap-2">
                                             <FileText className="h-4 w-4" />
                                             {t("app.identity_front_doc")}{" "}
                                             {formik.values.identity_front
                                                ? formik.values.identity_front.name
                                                : t("app.not_uploaded")}
                                          </p>
                                          <p className="text-sm flex items-center gap-2">
                                             <FileText className="h-4 w-4" />
                                             {t("app.identity_back_doc")}{" "}
                                             {formik.values.identity_back
                                                ? formik.values.identity_back.name
                                                : t("app.not_uploaded")}
                                          </p>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                       <Checkbox
                                          id="terms"
                                          name="termsAccepted"
                                          checked={formik.values.termsAccepted}
                                          onCheckedChange={(checked) => {
                                             console.log("Terms checked:", checked);
                                             formik.setFieldValue("termsAccepted", checked);
                                          }}
                                       />
                                       <Label htmlFor="terms" className="text-xs">
                                          {t("app.terms_agree")}
                                       </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                       <Checkbox
                                          id="privacy"
                                          name="privacyAccepted"
                                          checked={formik.values.privacyAccepted}
                                          onCheckedChange={(checked) => formik.setFieldValue("privacyAccepted", checked)}
                                       />
                                       <Label htmlFor="privacy" className="text-xs">
                                          {t("app.privacy_agree")}
                                       </Label>
                                    </div>
                                 </div>


                                 <div className="bg-muted p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                       {t("app.submit_disclaimer")}
                                    </p>
                                 </div>
                              </div>
                           )}

                           <div className="flex justify-between pt-6">
                              <Button
                                 variant="outline"
                                 onClick={prevStep}
                                 disabled={currentStep === 1}
                                 className="flex items-center gap-2 bg-transparent"
                              >
                                 <ArrowLeft className="h-4 w-4" />
                                 {t("app.previous")}
                              </Button>

                              {currentStep < 4 ? (
                                 currentStep === 1 ? (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       className="flex items-center gap-2"
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.identity_front || !formik.values.identity_back
                                       }
                                    >
                                       {t("app.next")}
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 ) : currentStep === 2 ? (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.identity_front || !formik.values.identity_back
                                          || !formik.values.email || !formik.values.phone || !formik.values.address || !formik.values.city
                                          || !formik.values.state || !formik.values.country || !formik.values.postalCode
                                       }
                                       className="flex items-center gap-2"
                                    >
                                       {t("app.next")}
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 ) : (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       className="flex items-center gap-2"
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.identity_front || !formik.values.identity_back
                                          || !formik.values.email || !formik.values.phone || !formik.values.address || !formik.values.city
                                          || !formik.values.state || !formik.values.country || !formik.values.postalCode
                                          || !formik.values.employmentStatus || !formik.values.employer || !formik.values.occupation
                                          || !formik.values.investment_experience || !formik.values.annualIncome
                                       }
                                    >
                                       {t("app.next")}
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 )
                              ) : (
                                 <Button
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.values.privacyAccepted || !formik.values.termsAccepted}
                                    className="flex items-center gap-2"
                                    onClick={() => console.log("Button clicked", formik.errors)}
                                 >
                                    {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                    {formik.isSubmitting ? t("app.submitting") : t("app.submit")}
                                 </Button>
                              )}
                           </div>
                        </form>
                     </CardContent>
                  </Card>
               </div>
            </div>
         }
      </div >
   );
}
