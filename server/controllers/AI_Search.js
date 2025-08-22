import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
  try {
    const { subject } = req.body;
    
    // Improved prompt for consistent JSON output
    const prompt = `You are a professional course search engine. I need exactly 6 REAL, currently available online ${subject} courses.

    CRITICAL INSTRUCTIONS:
    🚨 ONLY return courses that you are CERTAIN exist and are currently available
    🚨 NO fictional courses, fake instructors, or made-up links
    🚨 Focus on courses launched or updated in 2023-2024 (avoid old/expired courses)
    🚨 Each course must be from your actual knowledge of real platforms

    SEARCH CRITERIA:
    - Subject: "${subject}"
    - Preference: Recently launched or updated courses (2023-2024)
    - Platforms: Udemy, Coursera, edX, Pluralsight, LinkedIn Learning, Khan Academy
    - Mix of free and paid options
    - Include beginner to advanced levels

    REQUIRED JSON FORMAT (no extra text):
    {
      "courses": [
        {
          "course_name": "[Real exact course title as it appears on platform]",
          "course_description": "[Real course description - max 80 characters]",
          "price_in_INR": [Actual current price in INR, use 0 for free],
          "rating_out_of_5": [Real rating from platform],
          "platform": "[Exact platform name]",
          "instructor": "[Real instructor name - must be actual person]",
          "image_Link": "[Find real course thumbnail/image URL from the platform]",
          "course_Link": "[Real working course URL - must be accessible]"
        }
      ]
    }

    VALIDATION CHECKLIST for each course:
    ✅ Course exists on mentioned platform
    ✅ Instructor is real person who teaches this course  
    ✅ Price is current and accurate
    ✅ Course link follows correct platform URL structure
    ✅ Image link is from course's actual page
    ✅ Course is currently available (not expired/removed)

    QUALITY REQUIREMENTS:
    - Prioritize highly-rated courses (4.0+ rating)
    - Include variety: different skill levels and approaches
    - Ensure all links are working and accessible
    - Use actual course images from platforms
    - Verify instructor names are real educators

    If you cannot find 6 REAL courses that meet these criteria, return fewer courses rather than including fictional data.

    Subject to search: ${subject}

    Response (valid JSON only):`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: {
        temperature: 0.1, // Lower temperature for more factual responses
      }
     });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text
    let cleanText = text.trim();
    // Remove markdown code blocks if present
    cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  
    const finalResponse = JSON.parse(cleanText);
    
    // Validate response structure
    if (!finalResponse.courses || !Array.isArray(finalResponse.courses)) {
      throw new Error("Invalid response structure from AI");
    }
    
    res.json(finalResponse);
    
  } catch (error) {
    console.error("Error in chatController:", error);
    res.status(500).json({ 
      error: error.message,
      fallback: "Please try again with a different search term"
    });
  }
};