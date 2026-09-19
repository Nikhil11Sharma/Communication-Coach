const questions = {
  hr: [
    {
      id: 1,
      question: "Tell me about yourself.",
      tip: "Keep it professional. Talk about your education, experience, and what motivates you. Aim for 1-2 minutes.",
      followUp: "What motivated you to choose this career path?"
    },
    {
      id: 2,
      question: "Why do you want to work for our company?",
      tip: "Show you've researched the company. Mention specific values, projects, or culture aspects.",
      followUp: "What do you know about our recent projects?"
    },
    {
      id: 3,
      question: "What are your greatest strengths?",
      tip: "Pick 2-3 strengths relevant to the job. Give brief examples.",
      followUp: "Can you give me a specific example of how you used that strength?"
    },
    {
      id: 4,
      question: "What is your biggest weakness?",
      tip: "Be honest but show self-awareness. Explain what you're doing to improve.",
      followUp: "How are you working to overcome this weakness?"
    },
    {
      id: 5,
      question: "Where do you see yourself in five years?",
      tip: "Show ambition aligned with the company's growth. Be realistic.",
      followUp: "How does this role help you achieve those goals?"
    },
    {
      id: 6,
      question: "Why are you leaving your current job?",
      tip: "Stay positive. Focus on growth opportunities rather than complaints.",
      followUp: "What did you learn from your previous role?"
    },
    {
      id: 7,
      question: "What are your salary expectations?",
      tip: "Research market rates beforehand. Give a range and show flexibility.",
      followUp: "Is salary the most important factor for you?"
    },
    {
      id: 8,
      question: "How do you handle stress and pressure?",
      tip: "Give specific examples. Show you have healthy coping strategies.",
      followUp: "Tell me about a stressful situation you managed well."
    },
    {
      id: 9,
      question: "Do you prefer working alone or in a team?",
      tip: "Show flexibility. Give examples of thriving in both settings.",
      followUp: "What role do you usually take in a team?"
    },
    {
      id: 10,
      question: "What makes you unique compared to other candidates?",
      tip: "Highlight a combination of skills and experiences that set you apart.",
      followUp: "How would your previous colleagues describe you?"
    },
    {
      id: 11,
      question: "Describe your ideal work environment.",
      tip: "Align your answer with the company culture. Be honest but flexible.",
      followUp: "How do you adapt when the environment isn't ideal?"
    },
    {
      id: 12,
      question: "What are your hobbies and interests outside of work?",
      tip: "Show you're well-rounded. Connect hobbies to transferable skills if possible.",
      followUp: "Has any hobby taught you something useful for work?"
    }
  ],
  behavioral: [
    {
      id: 13,
      question: "Tell me about a time you faced a difficult challenge at work. How did you handle it?",
      tip: "Use the STAR method: Situation, Task, Action, Result. Be specific.",
      followUp: "What would you do differently if you faced the same situation again?"
    },
    {
      id: 14,
      question: "Describe a situation where you had to work with a difficult colleague.",
      tip: "Focus on how you communicated and found common ground. Stay professional.",
      followUp: "What did you learn about working with different personalities?"
    },
    {
      id: 15,
      question: "Give an example of a time you showed leadership.",
      tip: "Leadership isn't just about titles. Show initiative, decision-making, and influence.",
      followUp: "How did the team respond to your leadership?"
    },
    {
      id: 16,
      question: "Tell me about a time you failed. What did you learn?",
      tip: "Be genuine. Show self-reflection and growth from the experience.",
      followUp: "How has that failure shaped your approach to work?"
    },
    {
      id: 17,
      question: "Describe a situation where you had to meet a tight deadline.",
      tip: "Explain your prioritization strategy and time management skills.",
      followUp: "How do you typically prioritize when everything seems urgent?"
    },
    {
      id: 18,
      question: "Tell me about a time you went above and beyond for a customer or client.",
      tip: "Show empathy, initiative, and dedication to service excellence.",
      followUp: "How do you balance going the extra mile with your regular responsibilities?"
    },
    {
      id: 19,
      question: "Give an example of when you had to adapt to a significant change.",
      tip: "Show flexibility, positive attitude, and quick learning ability.",
      followUp: "How do you generally feel about unexpected changes?"
    },
    {
      id: 20,
      question: "Describe a time you resolved a conflict within your team.",
      tip: "Show diplomacy, active listening, and problem-solving skills.",
      followUp: "What conflict resolution strategies work best for you?"
    },
    {
      id: 21,
      question: "Tell me about a time you had to persuade someone to see your point of view.",
      tip: "Show communication skills and respect for differing opinions.",
      followUp: "What do you do when someone still disagrees after your explanation?"
    },
    {
      id: 22,
      question: "Give an example of a goal you set and how you achieved it.",
      tip: "Show planning, persistence, and measurable results.",
      followUp: "What keeps you motivated when working toward long-term goals?"
    }
  ],
  technical: [
    {
      id: 23,
      question: "Explain the concept of Object-Oriented Programming in simple terms.",
      tip: "Use analogies. Cover the four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction.",
      followUp: "Can you give a real-world example of inheritance?"
    },
    {
      id: 24,
      question: "What is the difference between a stack and a queue?",
      tip: "Stack is LIFO (Last In, First Out), Queue is FIFO (First In, First Out). Give real examples.",
      followUp: "Where would you use a stack versus a queue in a real application?"
    },
    {
      id: 25,
      question: "How would you explain an API to a non-technical person?",
      tip: "Use a restaurant analogy: the waiter (API) takes your order to the kitchen and brings back food.",
      followUp: "What's the difference between a REST API and a GraphQL API?"
    },
    {
      id: 26,
      question: "What is version control and why is it important?",
      tip: "Explain Git basics: tracking changes, collaboration, branching, and rollback capability.",
      followUp: "Describe your typical Git workflow."
    },
    {
      id: 27,
      question: "Explain the difference between SQL and NoSQL databases.",
      tip: "SQL is structured, relational, table-based. NoSQL is flexible, document or key-value based.",
      followUp: "When would you choose NoSQL over SQL?"
    },
    {
      id: 28,
      question: "What is cloud computing and what are its benefits?",
      tip: "Cover scalability, cost-effectiveness, accessibility, and major providers like AWS, Azure, GCP.",
      followUp: "What cloud services have you worked with?"
    },
    {
      id: 29,
      question: "How do you approach debugging a difficult problem?",
      tip: "Show a systematic approach: reproduce, isolate, read logs, test hypotheses, fix, and verify.",
      followUp: "Tell me about the most challenging bug you've fixed."
    },
    {
      id: 30,
      question: "What is responsive design and why does it matter?",
      tip: "Websites adapting to different screen sizes. Cover media queries, flexible grids, mobile-first.",
      followUp: "What tools or frameworks do you use for responsive design?"
    },
    {
      id: 31,
      question: "Explain the concept of an algorithm and give an example.",
      tip: "A step-by-step procedure to solve a problem. Give a simple example like sorting or searching.",
      followUp: "How do you evaluate the efficiency of an algorithm?"
    },
    {
      id: 32,
      question: "What is the difference between frontend and backend development?",
      tip: "Frontend: user-facing interface (HTML, CSS, JS). Backend: server logic, database, APIs.",
      followUp: "Which do you prefer and why?"
    }
  ],
  free: [
    {
      id: 33,
      question: "What did you do last weekend? Tell me about it in detail.",
      tip: "Practice using past tense correctly. Add descriptive details.",
      followUp: "What's your favorite way to spend a weekend?"
    },
    {
      id: 34,
      question: "If you could travel anywhere in the world, where would you go and why?",
      tip: "Practice conditional sentences (would/could). Use descriptive language.",
      followUp: "Have you traveled internationally before?"
    },
    {
      id: 35,
      question: "Describe your daily routine from morning to evening.",
      tip: "Practice sequencing words: first, then, after that, finally. Use present simple tense.",
      followUp: "Is there anything you'd like to change about your routine?"
    },
    {
      id: 36,
      question: "What is your favorite book or movie? Why do you like it?",
      tip: "Practice expressing opinions: I think, I believe, In my opinion. Give reasons.",
      followUp: "Would you recommend it to others? Why or why not?"
    },
    {
      id: 37,
      question: "Tell me about a person who has inspired you in your life.",
      tip: "Practice talking about people: describe their qualities, actions, and impact on you.",
      followUp: "What specific lesson did you learn from them?"
    },
    {
      id: 38,
      question: "What are the advantages and disadvantages of working from home?",
      tip: "Practice comparing and contrasting. Use linking words: however, on the other hand, although.",
      followUp: "Do you prefer working from home or from an office?"
    },
    {
      id: 39,
      question: "How has technology changed education in recent years?",
      tip: "Practice discussing change: has changed, has become, has led to. Give examples.",
      followUp: "What's one technology you think every student should use?"
    },
    {
      id: 40,
      question: "Describe your hometown. What makes it special?",
      tip: "Practice descriptive vocabulary: landscape, culture, atmosphere, population.",
      followUp: "Would you like to live there forever or move somewhere else?"
    },
    {
      id: 41,
      question: "What skills do you think are most important for success in today's world?",
      tip: "Practice giving structured opinions with supporting reasons and examples.",
      followUp: "How are you developing these skills yourself?"
    },
    {
      id: 42,
      question: "Tell me about a memorable meal you've had. What made it special?",
      tip: "Practice sensory language: taste, smell, texture, atmosphere. Use adjectives.",
      followUp: "Do you enjoy cooking? What's your signature dish?"
    }
  ],
  analytics: [
    {
      id: 43,
      question: "What is the difference between descriptive, predictive, and prescriptive analytics?",
      tip: "Descriptive = what happened (reports, dashboards). Predictive = what might happen (forecasting, ML). Prescriptive = what should we do (optimization, recommendations).",
      followUp: "Can you give a real-world example of each type?"
    },
    {
      id: 44,
      question: "Explain the difference between SQL joins. When would you use an INNER JOIN versus a LEFT JOIN?",
      tip: "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table plus matches. Use LEFT JOIN when you need to include records even without a match.",
      followUp: "How would you handle NULL values that result from a LEFT JOIN?"
    },
    {
      id: 45,
      question: "How do you handle missing data in a dataset?",
      tip: "Common approaches: remove rows, impute with mean/median/mode, use forward/backward fill, or use algorithms that handle missing values. The choice depends on the context and amount of missing data.",
      followUp: "When would you choose to drop missing values versus imputing them?"
    },
    {
      id: 46,
      question: "What is the difference between a p-value and confidence interval?",
      tip: "P-value tells you the probability of observing your results by chance. Confidence interval gives a range where the true value likely falls. Both help assess statistical significance.",
      followUp: "What p-value threshold do you typically use and why?"
    },
    {
      id: 47,
      question: "Explain what an A/B test is and how you would design one.",
      tip: "A/B test compares two versions to see which performs better. Cover: hypothesis, sample size, randomization, control vs treatment, success metric, and statistical significance.",
      followUp: "How would you determine the required sample size for an A/B test?"
    },
    {
      id: 48,
      question: "What data visualization tools have you used? How do you choose the right chart for your data?",
      tip: "Mention tools like Tableau, Power BI, Python (matplotlib, seaborn), Excel. Chart selection: bar for comparisons, line for trends, scatter for relationships, pie for proportions.",
      followUp: "Can you describe a dashboard you built and the business impact it had?"
    },
    {
      id: 49,
      question: "What is the difference between correlation and causation? Give an example.",
      tip: "Correlation means two variables move together. Causation means one actually causes the other. Classic example: ice cream sales and drowning both increase in summer, but one doesn't cause the other.",
      followUp: "How would you test for causation in a business context?"
    },
    {
      id: 50,
      question: "Explain what a pivot table is and when you would use one.",
      tip: "A pivot table summarizes and aggregates data by categories. Great for quickly analyzing patterns, comparing groups, and creating summary reports from large datasets.",
      followUp: "What are the limitations of pivot tables compared to SQL queries?"
    },
    {
      id: 51,
      question: "How would you explain a complex data analysis to a non-technical stakeholder?",
      tip: "Focus on the business impact, not the technical details. Use visualizations, simple analogies, and lead with the key insight. Avoid jargon.",
      followUp: "Can you give an example of when you successfully communicated data insights to a business team?"
    },
    {
      id: 52,
      question: "What is the difference between structured and unstructured data? Give examples of each.",
      tip: "Structured: organized in rows/columns like databases, spreadsheets. Unstructured: text, images, videos, social media posts. Semi-structured: JSON, XML.",
      followUp: "What tools or techniques would you use to analyze unstructured data?"
    },
    {
      id: 53,
      question: "Walk me through how you would approach a new data analysis project from start to finish.",
      tip: "Cover: understand the business question, gather data, clean and explore data (EDA), analyze, build models if needed, visualize results, present findings, iterate.",
      followUp: "What's the most challenging part of this process for you?"
    },
    {
      id: 54,
      question: "What are KPIs? How do you decide which metrics matter for a business?",
      tip: "KPIs are Key Performance Indicators — measurable values that track business goals. Choose metrics that are actionable, relevant to objectives, and clearly defined. Avoid vanity metrics.",
      followUp: "Can you give an example of a vanity metric versus an actionable metric?"
    },
    {
      id: 55,
      question: "Explain the concept of data normalization. Why is it important?",
      tip: "Normalization scales data to a standard range so features with different units can be compared fairly. Common methods: Min-Max scaling, Z-score standardization. Important for ML algorithms.",
      followUp: "When would you not normalize your data?"
    },
    {
      id: 56,
      question: "What is the difference between Python and R for data analysis? Which do you prefer and why?",
      tip: "Python: general purpose, great libraries (pandas, numpy, scikit-learn), better for production. R: built for statistics, excellent for statistical modeling and visualization. Both are valid choices.",
      followUp: "What Python libraries do you use most frequently for data analysis?"
    },
    {
      id: 57,
      question: "How do you detect and handle outliers in a dataset?",
      tip: "Detection: box plots, Z-score, IQR method, scatter plots. Handling: remove, cap/floor, transform, or keep if they represent valid data points. Context matters.",
      followUp: "When should you keep outliers in your analysis rather than removing them?"
    }
  ]
};

export default questions;
