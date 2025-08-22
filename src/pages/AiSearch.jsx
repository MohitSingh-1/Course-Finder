import React, { useState } from "react";
import { aisearch } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCourses = async (searchText) => {
    setLoading(true);
    setError("");
    
    const user = localStorage.getItem("user");
    if (!user) {
      setError("Please log in to search courses");
      setLoading(false);
      return;
    }

    try {
      const subject = searchText;
      const result = await apiConnector("POST", aisearch.AI_SEARCH, {
        subject,
      });

      console.log("API Response:", result);
      
      // Extract courses array from response
      const coursesData = result.courses || result.data?.courses || [];
      setResults(coursesData);
      
      if (coursesData.length === 0) {
        setError("No courses found for this search term");
      }
      
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }
    fetchCourses(query);
  };

  return (
    <div className="min-h-screen p-6 ">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-gray-600 shadow-lg p-4 rounded-xl border"
        >
          <input
            type="text"
            placeholder="Search courses (e.g., React, Python, Data Science)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition  cursor-pointer font-medium"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto mt-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Finding the best courses for you...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course, index) => (
              <div
                key={index}
                className="bg-gray-300 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                {/* Course Image */}
                {course.image_Link && (
                  <img
                    src={course.image_Link}
                    alt={course.course_name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400';
                    }}
                  />
                )}

                {/* Course Name */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {course.course_name}
                </h2>

                {/* Instructor & Platform */}
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-4">
                  <span>📚 {course.platform}</span>
                </p>

                {/* Description */}
                <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">
                  {course.course_description}
                </p>

                {/* Price & Rating */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{course.price_in_INR?.toLocaleString()}
                  </span>
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {course.rating_out_of_5}/5
                  </span>
                </div>

                {/* BUTTON */}
                <a
                  href={course.course_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium transition-colors"
                >
                  View Course →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              No results yet. Try searching for courses!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSearch;