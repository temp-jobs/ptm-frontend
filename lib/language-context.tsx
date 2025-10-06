"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.findJobs": "Find Jobs",
    "nav.dashboard": "Dashboard",
    "nav.postJob": "Post a Job",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",
    "nav.myAccount": "My Account",
    "nav.browseJobs": "Browse Jobs",
    "nav.manageJobs": "Manage Jobs",
    "nav.postings": "My Postings",
    "nav.applications": "Applications",

    // Footer
    "footer.tagline": "Connecting talented individuals with flexible part-time opportunities across India.",
    "footer.forJobSeekers": "For Job Seekers",
    "footer.browseJobs": "Browse Jobs",
    "footer.myApplications": "My Applications",
    "footer.profile": "Profile",
    "footer.forEmployers": "For Employers",
    "footer.postJob": "Post a Job",
    "footer.pricing": "Pricing",
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "All rights reserved.",

    // Jobs Page
    "jobs.title": "Find Your Perfect Job",
    "jobs.subtitle": "part-time opportunities across India",
    "jobs.search": "Search by job title, company, or keywords...",
    "jobs.filters": "Filters",
    "jobs.clear": "Clear",
    "jobs.category": "Category",
    "jobs.location": "Location",
    "jobs.type": "Job Type",
    "jobs.payRange": "Pay Range",
    "jobs.hours": "Hours per Week",
    "jobs.skills": "Skills",
    "jobs.sortBy": "Sort By",
    "jobs.newest": "Newest First",
    "jobs.nearest": "Nearest",
    "jobs.highestPay": "Highest Pay",
    "jobs.showing": "Showing",
    "jobs.of": "of",
    "jobs.noJobs": "No jobs found matching your criteria",
    "jobs.clearFilters": "Clear Filters",
    "jobs.apply": "Apply Now",
    "jobs.save": "Save",
    "jobs.saved": "Saved",
    "jobs.viewDetails": "View Details",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.appliedJobs": "Applied Jobs",
    "dashboard.favoriteJobs": "Favorite Jobs",
    "dashboard.notifications": "Notifications",
    "dashboard.editProfile": "Edit Profile",
    "dashboard.recentlyViewed": "Recently Viewed",
    "dashboard.recommended": "Recommended for You",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",

    // Badges
    "badge.hot": "Hot",
    "badge.recommended": "Recommended",
    "badge.bestFit": "Best Fit",
    "badge.verified": "Verified Employer",
    "badge.urgent": "Urgent",
    "badge.new": "New",

    // Employer Dashboard
    "employer.dashboard": "Employer Dashboard",
    "employer.manageJobs": "Manage your job postings and applicants",
    "employer.postNewJob": "Post New Job",
    "employer.activeJobs": "Active Jobs",
    "employer.totalApplicants": "Total Applicants",
    "employer.totalViews": "Total Views",
    "employer.jobsFilled": "Jobs Filled",
    "employer.myJobs": "My Jobs",
    "employer.applicants": "Applicants",
    "employer.postedJobs": "Posted Jobs",
    "employer.recentApplicants": "Recent Applicants",
    "employer.noJobs": "You haven't posted any jobs yet",
    "employer.noApplicants": "No applicants yet",
    "employer.viewApplicants": "View Applicants",
    "employer.editJob": "Edit Job",
    "employer.deleteJob": "Delete Job",
    "employer.closeJob": "Close Job",
    "employer.reopenJob": "Reopen Job",
    "employer.applicantsFor": "Applicants for",
    "employer.approve": "Approve",
    "employer.reject": "Reject",
    "employer.viewProfile": "View Profile",
    "employer.appliedOn": "Applied on",
    "employer.experience": "Experience",
    "employer.skills": "Skills",
    "employer.contact": "Contact",
    "employer.status": "Status",
    "employer.notifications": "Notifications",
    "employer.markAllRead": "Mark All Read",
    "employer.noNotifications": "No notifications",
    "employer.filters": "Filters",
    "employer.sortBy": "Sort By",
    "employer.searchJobs": "Search jobs...",
    "employer.searchApplicants": "Search applicants...",
    "employer.allJobs": "All Jobs",
    "employer.activeOnly": "Active Only",
    "employer.closedOnly": "Closed Only",
    "employer.newestFirst": "Newest First",
    "employer.mostApplicants": "Most Applicants",
    "employer.mostViews": "Most Views",
    "employer.jobTitle": "Job Title",
    "employer.company": "Company Name",
    "employer.category": "Category",
    "employer.jobType": "Job Type",
    "employer.location": "Location",
    "employer.salary": "Salary Range",
    "employer.description": "Job Description",
    "employer.requirements": "Requirements",
    "employer.hoursPerWeek": "Hours per Week",
    "employer.contactEmail": "Contact Email",
    "employer.postJob": "Post Job",
    "employer.updateJob": "Update Job",
    "employer.posting": "Posting...",
    "employer.updating": "Updating...",
    "employer.jobPosted": "Job Posted Successfully!",
    "employer.jobUpdated": "Job Updated Successfully!",
    "employer.jobDeleted": "Job Deleted Successfully!",
    "employer.applicantApproved": "Applicant Approved!",
    "employer.applicantRejected": "Applicant Rejected!",
    "employer.confirmDelete": "Are you sure you want to delete this job?",
    "employer.confirmClose": "Are you sure you want to close this job?",
    "employer.analytics": "Analytics",
    "employer.thisWeek": "This Week",
    "employer.thisMonth": "This Month",

    // Status Badges
    "status.active": "Active",
    "status.closed": "Closed",
    "status.draft": "Draft",
    "status.applied": "Applied",
    "status.accepted": "Accepted",
    "status.rejected": "Rejected",
    "status.pending": "Pending",
    "status.reviewing": "Reviewing",
    "status.shortlisted": "Shortlisted",

    // Job Badges
    "badge.topJob": "Top Job",
    "badge.highDemand": "High Demand",
  },
  hi: {
    // Navigation
    "nav.findJobs": "नौकरी खोजें",
    "nav.dashboard": "डैशबोर्ड",
    "nav.postJob": "नौकरी पोस्ट करें",
    "nav.about": "हमारे बारे में",
    "nav.login": "लॉगिन",
    "nav.signup": "साइन अप",
    "nav.logout": "लॉगआउट",
    "nav.myAccount": "मेरा खाता",
    "nav.browseJobs": "नौकरियां ब्राउज़ करें",
    "nav.manageJobs": "नौकरियां प्रबंधित करें",
    "nav.postings": "मेरी पोस्टिंग",
    "nav.applications": "आवेदन",

    // Footer
    "footer.tagline": "भारत भर में लचीले अंशकालिक अवसरों के साथ प्रतिभाशाली व्यक्तियों को जोड़ना।",
    "footer.forJobSeekers": "नौकरी चाहने वालों के लिए",
    "footer.browseJobs": "नौकरियां ब्राउज़ करें",
    "footer.myApplications": "मेरे आवेदन",
    "footer.profile": "प्रोफ़ाइल",
    "footer.forEmployers": "नियोक्ताओं के लिए",
    "footer.postJob": "नौकरी पोस्ट करें",
    "footer.pricing": "मूल्य निर्धारण",
    "footer.company": "कंपनी",
    "footer.aboutUs": "हमारे बारे में",
    "footer.contact": "संपर्क करें",
    "footer.privacy": "गोपनीयता नीति",
    "footer.rights": "सर्वाधिकार सुरक्षित।",

    // Jobs Page
    "jobs.title": "अपनी परफेक्ट नौकरी खोजें",
    "jobs.subtitle": "भारत भर में अंशकालिक अवसर",
    "jobs.search": "नौकरी का शीर्षक, कंपनी या कीवर्ड से खोजें...",
    "jobs.filters": "फ़िल्टर",
    "jobs.clear": "साफ़ करें",
    "jobs.category": "श्रेणी",
    "jobs.location": "स्थान",
    "jobs.type": "नौकरी का प्रकार",
    "jobs.payRange": "वेतन सीमा",
    "jobs.hours": "प्रति सप्ताह घंटे",
    "jobs.skills": "कौशल",
    "jobs.sortBy": "इसके अनुसार क्रमबद्ध करें",
    "jobs.newest": "नवीनतम पहले",
    "jobs.nearest": "निकटतम",
    "jobs.highestPay": "उच्चतम वेतन",
    "jobs.showing": "दिखा रहे हैं",
    "jobs.of": "में से",
    "jobs.noJobs": "आपके मानदंडों से मेल खाने वाली कोई नौकरी नहीं मिली",
    "jobs.clearFilters": "फ़िल्टर साफ़ करें",
    "jobs.apply": "अभी आवेदन करें",
    "jobs.save": "सहेजें",
    "jobs.saved": "सहेजा गया",
    "jobs.viewDetails": "विवरण देखें",

    // Dashboard
    "dashboard.welcome": "वापसी पर स्वागत है",
    "dashboard.appliedJobs": "आवेदित नौकरियां",
    "dashboard.favoriteJobs": "पसंदीदा नौकरियां",
    "dashboard.notifications": "सूचनाएं",
    "dashboard.editProfile": "प्रोफ़ाइल संपादित करें",
    "dashboard.recentlyViewed": "हाल ही में देखा गया",
    "dashboard.recommended": "आपके लिए अनुशंसित",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.submit": "जमा करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.close": "बंद करें",
    "common.back": "वापस",
    "common.next": "अगला",
    "common.previous": "पिछला",

    // Badges
    "badge.hot": "हॉट",
    "badge.recommended": "अनुशंसित",
    "badge.bestFit": "सर्वश्रेष्ठ फिट",
    "badge.verified": "सत्यापित नियोक्ता",
    "badge.urgent": "तत्काल",
    "badge.new": "नया",

    // Employer Dashboard
    "employer.dashboard": "नियोक्ता डैशबोर्ड",
    "employer.manageJobs": "अपनी नौकरी पोस्टिंग और आवेदकों को प्रबंधित करें",
    "employer.postNewJob": "नई नौकरी पोस्ट करें",
    "employer.activeJobs": "सक्रिय नौकरियां",
    "employer.totalApplicants": "कुल आवेदक",
    "employer.totalViews": "कुल दृश्य",
    "employer.jobsFilled": "भरी गई नौकरियां",
    "employer.myJobs": "मेरी नौकरियां",
    "employer.applicants": "आवेदक",
    "employer.postedJobs": "पोस्ट की गई नौकरियां",
    "employer.recentApplicants": "हाल के आवेदक",
    "employer.noJobs": "आपने अभी तक कोई नौकरी पोस्ट नहीं की है",
    "employer.noApplicants": "अभी तक कोई आवेदक नहीं",
    "employer.viewApplicants": "आवेदक देखें",
    "employer.editJob": "नौकरी संपादित करें",
    "employer.deleteJob": "नौकरी हटाएं",
    "employer.closeJob": "नौकरी बंद करें",
    "employer.reopenJob": "नौकरी फिर से खोलें",
    "employer.applicantsFor": "के लिए आवेदक",
    "employer.approve": "स्वीकृत करें",
    "employer.reject": "अस्वीकार करें",
    "employer.viewProfile": "प्रोफ़ाइल देखें",
    "employer.appliedOn": "आवेदन किया",
    "employer.experience": "अनुभव",
    "employer.skills": "कौशल",
    "employer.contact": "संपर्क",
    "employer.status": "स्थिति",
    "employer.notifications": "सूचनाएं",
    "employer.markAllRead": "सभी को पढ़ा हुआ चिह्नित करें",
    "employer.noNotifications": "कोई सूचना नहीं",
    "employer.filters": "फ़िल्टर",
    "employer.sortBy": "इसके अनुसार क्रमबद्ध करें",
    "employer.searchJobs": "नौकरियां खोजें...",
    "employer.searchApplicants": "आवेदक खोजें...",
    "employer.allJobs": "सभी नौकरियां",
    "employer.activeOnly": "केवल सक्रिय",
    "employer.closedOnly": "केवल बंद",
    "employer.newestFirst": "नवीनतम पहले",
    "employer.mostApplicants": "सबसे अधिक आवेदक",
    "employer.mostViews": "सबसे अधिक दृश्य",
    "employer.jobTitle": "नौकरी का शीर्षक",
    "employer.company": "कंपनी का नाम",
    "employer.category": "श्रेणी",
    "employer.jobType": "नौकरी का प्रकार",
    "employer.location": "स्थान",
    "employer.salary": "वेतन सीमा",
    "employer.description": "नौकरी का विवरण",
    "employer.requirements": "आवश्यकताएं",
    "employer.hoursPerWeek": "प्रति सप्ताह घंटे",
    "employer.contactEmail": "संपर्क ईमेल",
    "employer.postJob": "नौकरी पोस्ट करें",
    "employer.updateJob": "नौकरी अपडेट करें",
    "employer.posting": "पोस्ट हो रहा है...",
    "employer.updating": "अपडेट हो रहा है...",
    "employer.jobPosted": "नौकरी सफलतापूर्वक पोस्ट की गई!",
    "employer.jobUpdated": "नौकरी सफलतापूर्वक अपडेट की गई!",
    "employer.jobDeleted": "नौकरी सफलतापूर्वक हटाई गई!",
    "employer.applicantApproved": "आवेदक स्वीकृत!",
    "employer.applicantRejected": "आवेदक अस्वीकृत!",
    "employer.confirmDelete": "क्या आप वाकई इस नौकरी को हटाना चाहते हैं?",
    "employer.confirmClose": "क्या आप वाकई इस नौकरी को बंद करना चाहते हैं?",
    "employer.analytics": "विश्लेषण",
    "employer.thisWeek": "इस सप्ताह",
    "employer.thisMonth": "इस महीने",

    // Status Badges
    "status.active": "सक्रिय",
    "status.closed": "बंद",
    "status.draft": "ड्राफ्ट",
    "status.applied": "आवेदन किया",
    "status.accepted": "स्वीकृत",
    "status.rejected": "अस्वीकृत",
    "status.pending": "लंबित",
    "status.reviewing": "समीक्षा में",
    "status.shortlisted": "शॉर्टलिस्ट किया गया",

    // Job Badges
    "badge.topJob": "शीर्ष नौकरी",
    "badge.highDemand": "उच्च मांग",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("parttimematch_language") as Language
    if (stored && (stored === "en" || stored === "hi")) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("parttimematch_language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
