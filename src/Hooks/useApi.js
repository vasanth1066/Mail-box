import { useState, useEffect } from "react";

const useApi = (url) => {
  const [emailContent, setEmailContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          const emailData = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setEmailContent(emailData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup code here if necessary
    };
  }, [url]);

  // Return the email content and loading state
  return [emailContent, loading];
};

export default useApi;
