"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { authService } from "@/services/auth";

interface ContentSection {
  title?: string;
  description?: string;
  [key: string]: any;
}

interface LocaleContent {
  pages: {
    home: {
      hero: ContentSection;
    };
    about: ContentSection;
    services: ContentSection;
    contact: ContentSection;
  };
  [key: string]: any;
}

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const lang = params.lang as string;

  const [enContent, setEnContent] = useState<LocaleContent | null>(null);
  const [arContent, setArContent] = useState<LocaleContent | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("home");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setError(null);

        if (!authService.isAuthenticated()) {
          router.push(`/${lang}/admin/login`);
          return;
        }

        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [enResponse, arResponse] = await Promise.all([
          fetch("/api/content?lang=en", { headers }),
          fetch("/api/content?lang=ar", { headers }),
        ]);

        if (!enResponse.ok || !arResponse.ok) {
          if (enResponse.status === 401 || arResponse.status === 401) {
            router.push(`/${lang}/admin/login`);
            return;
          }
          throw new Error("Failed to fetch content");
        }

        const [enData, arData] = await Promise.all([
          enResponse.json(),
          arResponse.json(),
        ]);

        setEnContent(enData);
        setArContent(arData);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content. Please try again.");
      }
    };

    fetchContent();
  }, [lang, router]);

  const handleContentChange = (
    language: "en" | "ar",
    path: string[],
    value: string
  ) => {
    const updateContent = language === "en" ? setEnContent : setArContent;
    const content = language === "en" ? enContent : arContent;

    if (!content) return;

    const newContent = { ...content };
    let current = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    updateContent(newContent);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push(`/${lang}/admin/login`);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const responses = await Promise.all([
        fetch("/api/content", {
          method: "POST",
          headers,
          body: JSON.stringify({
            lang: "en",
            content: enContent,
          }),
        }),
        fetch("/api/content", {
          method: "POST",
          headers,
          body: JSON.stringify({
            lang: "ar",
            content: arContent,
          }),
        }),
      ]);

      if (!responses.every((res) => res.ok)) {
        const response = responses.find((res) => !res.ok);
        if (response?.status === 401) {
          router.push(`/${lang}/admin/login`);
          return;
        }
        throw new Error("Failed to save content");
      }

      setSaveStatus("success");
    } catch (error) {
      console.error("Error saving content:", error);
      setSaveStatus("error");
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push(`/${lang}/admin/login`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 rounded-lg bg-red-50 text-red-800 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-sm font-medium text-red-800 hover:text-red-900 underline focus:outline-none"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!enContent || !arContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const sections = ["home", "about", "services", "contact"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Content Management
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSaving
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              saveStatus === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {saveStatus === "success" ? (
                <svg
                  className="w-5 h-5 text-green-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {saveStatus === "success"
                ? "Changes saved successfully!"
                : "Failed to save changes. Please try again."}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Sections">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedSection === section
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderContentEditor(selectedSection, enContent, "en")}
              {renderContentEditor(selectedSection, arContent, "ar")}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  function renderContentEditor(
    section: string,
    content: any,
    language: "en" | "ar"
  ) {
    const sectionContent = content.pages[section];
    if (!sectionContent) return null;

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
          {language === "en" ? "English Content" : "Arabic Content"}
        </h3>
        <div className="space-y-4">
          {Object.entries(sectionContent).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <textarea
                value={value as string}
                onChange={(e) =>
                  handleContentChange(
                    language,
                    ["pages", section, key],
                    e.target.value
                  )
                }
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
