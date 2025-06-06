import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Updated import for useParams
import AccountInfo from "../../components/TopUp/AccountInfo";
import Nominal from "../../components/TopUp/Nominal";
import Payment from "../../components/TopUp/Payment"; // Included for completeness, though not currently used in renderStep
import Confirmation from "../../components/TopUp/Confirmation";

export const TopUp = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);

  // State to store ALL form data from all steps
  const [formData, setFormData] = useState({
    id: '',
    server: '',
    nickname: '',
    selectedItem: null, // This will store the selected item from Nominal.js
    paymentMethod: '',
  });
  
  // State to hold data from the backend
  const [gameData, setGameData] = useState(null); // Use null as a better initial value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to advance to the next step
  const nextStep = () => setStep(prev => prev + 1);
  // Function to go back to the previous step
  const prevStep = () => setStep(prev => prev - 1);
  
  useEffect(() => {
    // Don't fetch if there's no slug
    if (!slug) {
        setLoading(false);
        setError("Game slug not found in URL.");
        return;
    }

    const fetchData = async () => {
      setLoading(true); // Start loading every time we fetch
      setError(null); // Clear any previous errors
      try {
        // PERBAIKAN: Menggunakan slug untuk fetching data spesifik game
        const res = await fetch(`https://77-top-up-be.vercel.app/77topup/${slug}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch data from server.");
        }

        const json = await res.json();
        setGameData(json);
        console.log("Game data:", json);

        // Initialize the first item as default when data is successfully obtained
        if (json.packages && json.packages.length > 0) {
            setFormData(prev => ({ ...prev, selectedItem: json.packages[0] }));
        }

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        // Stop loading whether successful or failed
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // DEPENDENCY FIX: Add slug as a dependency so it refetches when slug changes
  
  // Function to display the component based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountInfo
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
            // Pass gameData to display game image/name if needed
            gameData={gameData}
          />
        );
      case 2:
        return (
          <Nominal
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
            // CORRECTED: Correct prop syntax
            gameData={gameData}
          />
        );
      // case 3: // This step (Payment) is commented out in your provided 'topup_baru' code
      //  return (
      //    <Payment
      //      nextStep={nextStep}
      //      prevStep={prevStep}
      //      formData={formData}
      //      setFormData={setFormData}
      //    />
      //  );
      case 3: // Assuming Confirmation is step 3 based on your 'topup_baru'
        return (
          <Confirmation
            prevStep={prevStep}
            formData={formData}
          />
        );
      default:
        // Fallback if there is an error in the 'step' state
        return <AccountInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
  };

  // Display Loading or Error UI before rendering the form
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading game details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Call renderStep only after loading is complete and there are no errors */}
      {renderStep()}
    </div>
  );
};
