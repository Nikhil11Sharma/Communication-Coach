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
    // ===== SQL QUESTIONS (asked first) =====
    {
      id: 43,
      question: "What is SQL and why is it important for data analytics?",
      tip: "Explain SQL as Structured Query Language used to query databases. Mention it's the most essential skill for any data analyst.",
      followUp: "What SQL databases have you worked with?",
      sampleAnswer: "SQL stands for Structured Query Language. It is used to communicate with relational databases to retrieve, manipulate, and analyze data. It's important for data analytics because most business data is stored in databases, and SQL allows us to extract exactly the data we need, filter it, aggregate it, and join multiple tables together for analysis."
    },
    {
      id: 44,
      question: "Explain the difference between WHERE and HAVING clauses in SQL.",
      tip: "WHERE filters rows before grouping. HAVING filters groups after GROUP BY. Give an example query for each.",
      followUp: "Can you write an example query using both WHERE and HAVING?",
      sampleAnswer: "WHERE filters individual rows before any grouping happens. For example, WHERE salary > 50000 filters rows first. HAVING filters groups after GROUP BY. For example, SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5. So WHERE works on raw data, HAVING works on aggregated results."
    },
    {
      id: 45,
      question: "What are SQL joins? Explain INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with examples.",
      tip: "Use a simple example like employees and departments tables. Explain what each join returns.",
      followUp: "When would you use a LEFT JOIN instead of an INNER JOIN in a real scenario?",
      sampleAnswer: "INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right table, with NULL for non-matches. RIGHT JOIN is the opposite — all rows from the right table. FULL OUTER JOIN returns all rows from both tables. For example, if I LEFT JOIN employees with departments, I get all employees including those not assigned to any department."
    },
    {
      id: 46,
      question: "What is the difference between GROUP BY and ORDER BY in SQL?",
      tip: "GROUP BY groups rows for aggregation. ORDER BY sorts the final result. They serve completely different purposes.",
      followUp: "Can you use GROUP BY and ORDER BY in the same query? Give an example.",
      sampleAnswer: "GROUP BY groups rows that have the same values into summary rows, used with aggregate functions like COUNT, SUM, AVG. For example, GROUP BY department gives one row per department. ORDER BY sorts the result set in ascending or descending order. For example, ORDER BY salary DESC sorts by salary highest first. Yes, you can use both: SELECT department, AVG(salary) FROM employees GROUP BY department ORDER BY AVG(salary) DESC."
    },
    {
      id: 47,
      question: "What are window functions in SQL? Explain ROW_NUMBER, RANK, and DENSE_RANK.",
      tip: "Window functions perform calculations across a set of rows related to the current row. Explain the difference in how they handle ties.",
      followUp: "When would you use a window function instead of GROUP BY?",
      sampleAnswer: "Window functions perform calculations across a set of rows without collapsing them into groups. ROW_NUMBER assigns a unique sequential number to each row. RANK assigns the same rank to ties but skips numbers, so ranks could be 1,2,2,4. DENSE_RANK also handles ties but doesn't skip numbers, so it would be 1,2,2,3. I use them when I need to rank, running totals, or compare rows without losing detail."
    },
    {
      id: 48,
      question: "What is the difference between UNION and UNION ALL in SQL?",
      tip: "UNION removes duplicate rows, UNION ALL keeps all rows including duplicates. UNION ALL is faster because it skips the deduplication step.",
      followUp: "When would you prefer UNION ALL over UNION?",
      sampleAnswer: "UNION combines results from two SELECT statements and removes duplicate rows. UNION ALL also combines results but keeps all rows, including duplicates. UNION ALL is faster because it doesn't need to check for duplicates. I use UNION ALL when I know there are no duplicates or when I want to keep all records, like combining sales data from different regions."
    },
    {
      id: 49,
      question: "How do you find duplicate records in a SQL table?",
      tip: "Use GROUP BY with HAVING COUNT(*) > 1, or use ROW_NUMBER window function to identify duplicates.",
      followUp: "How would you delete duplicates while keeping one copy?",
      sampleAnswer: "I use GROUP BY with HAVING COUNT greater than 1. For example: SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1. This shows which emails appear more than once. Another approach is using ROW_NUMBER: WITH ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) as rn FROM users) SELECT * FROM ranked WHERE rn > 1. This identifies the exact duplicate rows."
    },
    // ===== PYTHON / PANDAS QUESTIONS =====
    {
      id: 50,
      question: "What is Pandas in Python and why is it used in data analytics?",
      tip: "Pandas is a Python library for data manipulation and analysis. Mention DataFrames, Series, and common operations.",
      followUp: "What other Python libraries do you use alongside Pandas?",
      sampleAnswer: "Pandas is a Python library that provides data structures like DataFrame and Series for efficient data manipulation and analysis. A DataFrame is like a table with rows and columns. I use Pandas to read CSV and Excel files, clean data, filter rows, group and aggregate data, merge datasets, and handle missing values. It's essential because it makes data manipulation in Python fast and intuitive, similar to working with spreadsheets but much more powerful."
    },
    {
      id: 51,
      question: "How do you handle missing values in Pandas? Explain different methods.",
      tip: "Cover isnull(), dropna(), fillna() with different strategies like mean, median, forward fill.",
      followUp: "When would you drop missing values versus filling them?",
      sampleAnswer: "First, I detect missing values using df.isnull().sum() to see how many nulls each column has. Then I decide: if very few rows have missing data, I use df.dropna() to remove them. For numerical columns, I use df.fillna(df.mean()) or df.fillna(df.median()) to fill with average values. For categorical data, I use df.fillna(df.mode()[0]) or fillna('Unknown'). I can also use forward fill with df.fillna(method='ffill') for time series data. The choice depends on how much data is missing and the business context."
    },
    {
      id: 52,
      question: "What is the difference between loc and iloc in Pandas?",
      tip: "loc uses label-based indexing, iloc uses integer position-based indexing. Give clear examples.",
      followUp: "How would you select specific rows and columns using loc?",
      sampleAnswer: "loc is label-based indexing — it selects data by row and column names. For example, df.loc[0:5, 'Name':'Salary'] selects rows 0 to 5 and columns from Name to Salary by their labels. iloc is integer position-based — it uses numerical positions. For example, df.iloc[0:5, 0:3] selects first 5 rows and first 3 columns by position. The key difference is loc includes the end point, while iloc excludes it, like Python slicing."
    },
    {
      id: 53,
      question: "How do you merge two DataFrames in Pandas? What are the different types of merges?",
      tip: "Compare pd.merge() with SQL joins. Cover inner, left, right, outer merges and the on parameter.",
      followUp: "What is the difference between merge and concat in Pandas?",
      sampleAnswer: "I use pd.merge() to combine two DataFrames based on common columns, similar to SQL joins. The types are: inner merge keeps only matching rows, left merge keeps all rows from the left DataFrame, right merge keeps all from the right, and outer merge keeps everything. For example: pd.merge(orders, customers, on='customer_id', how='left'). The difference with concat is that merge joins on column values like SQL, while concat simply stacks DataFrames vertically or horizontally."
    },
    {
      id: 54,
      question: "Explain groupby in Pandas. How do you use it for data aggregation?",
      tip: "groupby splits data into groups, applies a function, and combines results. Cover agg() for multiple aggregations.",
      followUp: "How do you apply multiple aggregation functions to different columns?",
      sampleAnswer: "groupby splits the DataFrame into groups based on column values, applies aggregate functions, and combines results. For example, df.groupby('department')['salary'].mean() gives average salary per department. For multiple aggregations, I use agg(): df.groupby('department').agg({'salary': ['mean', 'max'], 'age': 'mean'}). I can also use transform() when I want to keep the original DataFrame shape, or apply() for custom functions."
    },
    {
      id: 55,
      question: "How do you read and write different file formats in Pandas like CSV, Excel, and JSON?",
      tip: "Cover pd.read_csv(), pd.read_excel(), pd.read_json() and their to_ equivalents. Mention useful parameters.",
      followUp: "What parameters do you commonly use when reading a CSV file?",
      sampleAnswer: "For CSV: pd.read_csv('file.csv') to read and df.to_csv('output.csv', index=False) to write. For Excel: pd.read_excel('file.xlsx', sheet_name='Sheet1') and df.to_excel('output.xlsx'). For JSON: pd.read_json('file.json'). Common parameters I use with read_csv include: sep for delimiter, header for column names row, usecols to select specific columns, dtype to set data types, parse_dates to convert date columns, and na_values to specify what counts as missing."
    },
    // ===== EXCEL / POWER BI QUESTIONS =====
    {
      id: 56,
      question: "What are VLOOKUP and XLOOKUP in Excel? How do they differ?",
      tip: "VLOOKUP searches vertically in the first column. XLOOKUP is newer, more flexible, can search in any direction.",
      followUp: "What are the limitations of VLOOKUP?",
      sampleAnswer: "VLOOKUP searches for a value in the first column of a range and returns a value from a specified column. For example, =VLOOKUP(A2, Sheet2!A:D, 3, FALSE) looks up A2 in Sheet2 and returns the 3rd column value. XLOOKUP is the modern replacement — it can search in any direction, handles errors better, and doesn't need column numbers. For example, =XLOOKUP(A2, Sheet2!A:A, Sheet2!C:C). VLOOKUP's main limitations are: it only searches left to right, uses column numbers that break when columns are added, and is slower on large datasets."
    },
    {
      id: 57,
      question: "What is a Pivot Table in Excel? How do you create and use one?",
      tip: "Pivot tables summarize large data by dragging fields into rows, columns, values, and filters. Great for quick analysis.",
      followUp: "How do you add calculated fields to a Pivot Table?",
      sampleAnswer: "A Pivot Table is a tool that summarizes large datasets by grouping and aggregating data. To create one, I select my data, go to Insert and click Pivot Table. Then I drag fields: for example, I put Product in Rows, Region in Columns, and Sales in Values with SUM aggregation. This instantly shows total sales by product and region. I can add filters, change aggregations to COUNT or AVERAGE, and drill down into details. It's the fastest way to analyze patterns without writing any formulas."
    },
    {
      id: 58,
      question: "What are the key Excel functions every data analyst should know?",
      tip: "Cover SUMIF, COUNTIF, IF, INDEX-MATCH, TEXT functions, and array formulas. Give practical examples.",
      followUp: "When would you use INDEX-MATCH instead of VLOOKUP?",
      sampleAnswer: "The essential functions are: IF for conditional logic, SUMIF and COUNTIF for conditional aggregation, VLOOKUP and INDEX-MATCH for lookups, TEXT and DATE functions for formatting, LEFT RIGHT MID for text extraction, CONCATENATE for joining text, and IFERROR for error handling. INDEX-MATCH is better than VLOOKUP because it can look up in any direction, is faster on large data, and doesn't break when columns are inserted. For example, =INDEX(C:C, MATCH(A2, B:B, 0)) is more flexible than VLOOKUP."
    },
    {
      id: 59,
      question: "What is Power BI? How is it different from Excel for data analysis?",
      tip: "Power BI is a business intelligence tool for interactive dashboards. Compare with Excel on visualization, data size, sharing, and real-time updates.",
      followUp: "What are the main components of Power BI?",
      sampleAnswer: "Power BI is Microsoft's business intelligence tool for creating interactive dashboards and reports. It differs from Excel in several ways: Power BI handles much larger datasets using in-memory compression, offers more advanced and interactive visualizations, supports real-time data refresh, and makes it easy to share dashboards across the organization. The main components are Power BI Desktop for building reports, Power BI Service for publishing and sharing online, and Power BI Mobile for viewing on phones. I use Excel for quick ad-hoc analysis and Power BI for building reusable dashboards."
    },
    {
      id: 60,
      question: "What is DAX in Power BI? Give some common DAX functions you have used.",
      tip: "DAX stands for Data Analysis Expressions. Cover CALCULATE, SUM, AVERAGE, FILTER, ALL, and time intelligence functions.",
      followUp: "What is the difference between a calculated column and a measure in Power BI?",
      sampleAnswer: "DAX stands for Data Analysis Expressions — it's the formula language in Power BI for creating custom calculations. Common functions I use: CALCULATE to modify filter context, SUM and AVERAGE for aggregations, FILTER to apply conditions, ALL to remove filters, DISTINCTCOUNT for unique counts, and time intelligence functions like TOTALYTD and SAMEPERIODLASTYEAR. A calculated column computes a value for each row and is stored in the table, while a measure calculates dynamically based on the current filter context in your report."
    },
    // ===== GENERAL ANALYTICS =====
    {
      id: 61,
      question: "Walk me through how you would approach a new data analysis project from start to finish.",
      tip: "Cover: understand business question, gather data, clean data, explore and analyze, visualize, present findings.",
      followUp: "What's the most challenging part of this process?",
      sampleAnswer: "First, I understand the business question and define what success looks like. Then I gather data from relevant sources like databases, APIs, or files. Next, I clean the data by handling missing values, removing duplicates, and fixing data types. I do exploratory data analysis to understand patterns and distributions. Then I perform deeper analysis using SQL, Python, or statistical methods. I visualize key findings using charts and dashboards. Finally, I present insights to stakeholders with clear recommendations and business impact."
    },
    {
      id: 62,
      question: "What is the difference between descriptive, predictive, and prescriptive analytics?",
      tip: "Descriptive looks at what happened, predictive forecasts what might happen, prescriptive recommends actions.",
      followUp: "Can you give a real-world example of each type?",
      sampleAnswer: "Descriptive analytics answers 'what happened' using historical data — for example, a monthly sales report showing revenue trends. Predictive analytics answers 'what might happen' using statistical models — for example, forecasting next quarter's sales based on historical patterns. Prescriptive analytics answers 'what should we do' by recommending actions — for example, suggesting optimal pricing based on demand forecasting. Most companies start with descriptive, then move to predictive and prescriptive as they mature in analytics."
    }
  ]
};

export default questions;
