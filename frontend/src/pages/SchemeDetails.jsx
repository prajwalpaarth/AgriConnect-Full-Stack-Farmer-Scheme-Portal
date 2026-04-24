import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Pause, Globe } from "lucide-react";

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schemesData, setSchemesData] = useState(null);
  const [translatedData, setTranslatedData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English', voiceName: 'en-US' },
    { code: 'hi', name: 'हिंदी', voiceName: 'hi-IN' },
    { code: 'te', name: 'తెలుగు', voiceName: 'te-IN' },
    { code: 'ta', name: 'தமிழ்', voiceName: 'ta-IN' }
  ];

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/schemes/${id}`);
        if (response.data.length > 0) {
          setSchemesData(response.data[0]);
          setTranslatedData(response.data[0]); // Initialize with English data
        } else {
          setSchemesData(null);
          setTranslatedData(null);
        }
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };
    if(id) fetchSchemes();
  }, [id]);

  const translateText = async (text, targetLang) => {
    if (targetLang === 'en') return text;
    try {
      const response = await axios.post('http://localhost:5001/translate', {
        text,
        targetLanguage: targetLang
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const translateSchemeData = async (scheme, targetLang) => {
    if (targetLang === 'en') {
      setTranslatedData(schemesData);
      return;
    }

    setIsTranslating(true);
    try {
      const translatedScheme = {
        ...scheme,
        title: await translateText(scheme.title, targetLang),
        state: await translateText(scheme.state, targetLang),
        details: {
          description: await translateText(scheme.details.description, targetLang),
          extra_info: await translateText(scheme.details.extra_info, targetLang),
        },
        eligibility: await Promise.all(
          scheme.eligibility.map(item => translateText(item, targetLang))
        ),
        application_process: {
          type: await translateText(scheme.application_process.type, targetLang),
          steps: await Promise.all(
            scheme.application_process.steps.map(step => translateText(step, targetLang))
          ),
          notes: await Promise.all(
            scheme.application_process.notes.map(note => translateText(note, targetLang))
          ),
        },
        documents_required: await Promise.all(
          scheme.documents_required.map(doc => translateText(doc, targetLang))
        ),
        tags: await Promise.all(
          scheme.tags.map(tag => translateText(tag, targetLang))
        ),
        benefits: await Promise.all(
          scheme.benefits.map(async benefit => ({
            ...benefit,
            class_course: await translateText(benefit.class_course, targetLang)
          }))
        ),
      };

      setTranslatedData(translatedScheme);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedData(scheme); // Fallback to original data
    }
    setIsTranslating(false);
  };

  const generateSpeechText = (scheme) => {
    return `
      ${scheme.title}. This scheme is for ${scheme.state}.
      
      Details: ${scheme.details.description}. ${scheme.details.extra_info}
      
      Eligibility criteria: ${scheme.eligibility.join('. ')}
      
      Application Process: ${scheme.application_process.type}.
      Steps: ${scheme.application_process.steps.join('. ')}
      
      Important notes: ${scheme.application_process.notes.join('. ')}
      
      Required documents: ${scheme.documents_required.join('. ')}
    `;
  };

  const startSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const text = generateSpeechText(translatedData);
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => 
        voice.lang.startsWith(languages.find(l => l.code === selectedLanguage).voiceName)
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = languages.find(l => l.code === selectedLanguage).voiceName;
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeechSynthesis(null);
      };

      window.speechSynthesis.speak(utterance);
      setSpeechSynthesis(utterance);
      setIsSpeaking(true);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech!");
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (speechSynthesis) {
        window.speechSynthesis.resume();
      } else {
        startSpeaking();
      }
      setIsSpeaking(true);
    }
  };

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechSynthesis(null);
    }

    await translateSchemeData(schemesData, newLanguage);
  };

  const scheme = translatedData;
  
  if (!scheme) {
    return <div className="text-center text-gray-500">Scheme not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {isTranslating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg">Translating content...</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{scheme.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-gray-600" />
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1 text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={toggleSpeech}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={isTranslating}
          >
            {isSpeaking ? (
              <>
                <Pause size={20} /> Pause
              </>
            ) : (
              <>
                <Play size={20} /> {speechSynthesis ? 'Resume' : 'Read Aloud'}
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-gray-600">{scheme.state}</p>

      <div className="flex gap-2 mt-2">
        {scheme.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm text-green-700 border border-green-700 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Details</h2>
        <p className="text-gray-700">{scheme.details.description}</p>
        <p className="text-gray-700 mt-2">{scheme.details.extra_info}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Benefits</h2>
        <table className="w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Sl. No.</th>
              <th className="border p-2">Class/Course</th>
              <th className="border p-2">Course Fee Assistance</th>
              <th className="border p-2">Exam Fee Assistance</th>
              <th className="border p-2">Registration Fee Assistance</th>
              <th className="border p-2">Admission Fee Assistance</th>
            </tr>
          </thead>
          <tbody>
            {scheme.benefits.map((benefit) => (
              <tr key={benefit.sl_no}>
                <td className="border p-2 text-center">{benefit.sl_no}</td>
                <td className="border p-2">{benefit.class_course}</td>
                <td className="border p-2">{benefit.course_fee_assistance}</td>
                <td className="border p-2">{benefit.exam_fee_assistance}</td>
                <td className="border p-2">{benefit.registration_fee_assistance}</td>
                <td className="border p-2">{benefit.admission_fee_assistance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Eligibility</h2>
        <ul className="list-disc ml-5">
          {scheme.eligibility.map((point, index) => (
            <li key={index} className="text-gray-700">{point}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Application Process</h2>
        <p className="text-gray-700 font-bold">{scheme.application_process.type}</p>
        <ul className="list-disc ml-5">
          {scheme.application_process.steps.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ul>
        <p className="text-gray-700 mt-2 font-bold">Notes:</p>
        <ul className="list-disc ml-5">
          {scheme.application_process.notes.map((note, index) => (
            <li key={index} className="text-gray-700">{note}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Documents Required</h2>
        <ul className="list-disc ml-5">
          {scheme.documents_required.map((doc, index) => (
            <li key={index} className="text-gray-700">{doc}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate(-1)} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Back
      </button>
    </div>
  );
};

export default SchemeDetails;