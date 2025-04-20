import { useEffect, useState, useContext } from "react";
import WeatherContext from "../../contexts/WeatherContext";
import { gsap } from "gsap";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_KEY,
});

const WeatherActivities = () => {
  const { cityData } = useContext(WeatherContext)!;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Prompt generator based on weather
  const getWeatherPrompt = (condition: string, city: string) => {
    return `Suggest exactly 4 fun, modern, and practical things a young adult can do in ${city} on a ${condition.toLowerCase()} day. 
  Keep each suggestion short, under 20 words. Out of these 3 suggestion one should be mentioning the given weather condition.
  Avoid sounding like a tourist guide. No titles, intros, or extra text — just the list. Only return the list. No title, intro, or extra text.`;
  };

  const fetchActivities = async (condition: string, city: string) => {
    const prompt = getWeatherPrompt(condition, city);

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      const text = result.text;

      const activities = text
        ?.split("\n")
        ?.map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 4);
      if (activities) {
        setSuggestions(activities);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      setSuggestions(["Could not fetch suggestions."]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger on weather update
  useEffect(() => {
    if (cityData) {
      const condition = cityData.weather[0].main;
      const city = cityData.name;
      fetchActivities(condition, city);
    }
  }, [cityData]);

  // Animate for suggestions load
  useEffect(() => {
    if (suggestions.length > 0) {
      gsap.fromTo(
        ".activity-suggestion",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 1 }
      );
    }
  }, [suggestions]);

  return (
    <div className="w-full rounded-3xl p-4 glass col-span-1 sm:col-span-2 md:col-span-3">
      <h2 className="text-xl font-semibold mb-4">Fun Activities</h2>
      {loading ? (
        <p className="text-center">Loading activities...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {suggestions.map((activity, index) => (
            <div
              key={index}
              className="activity-suggestion p-4 bg-[#1d439b] rounded-lg text-white"
            >
              <p>• {activity.replace(/^\*\s*/, "")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherActivities;
