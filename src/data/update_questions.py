import re
import json

existing_path = r"c:\my website\interview-coach\src\data\questions.js"

with open(existing_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the end of the `questions` object, right before `};`
# The file ends with:
#   ]
# };
# 
# export default questions;

new_categories = """  ],
  python: [
    {
      id: 63,
      question: "What are Python's key features? Why choose Python?",
      tip: "Highlight readability, dynamic typing, interpreted nature, and extensive libraries.",
      followUp: "In what scenarios would you choose another language over Python?",
      sampleAnswer: "Python is an interpreted, high-level language with dynamic typing and garbage collection. Its syntax is highly readable, making it easy to learn and write. It has a vast standard library and third-party ecosystem for tasks ranging from web development to data science. I choose Python for its rapid development cycle and rich community support."
    },
    {
      id: 64,
      question: "What is the difference between a list and a tuple?",
      tip: "Focus on mutability and syntax.",
      followUp: "When would you use a tuple instead of a list?",
      sampleAnswer: "The primary difference is that lists are mutable, meaning their contents can be changed after creation, while tuples are immutable. Lists are defined using square brackets [], whereas tuples use parentheses (). Tuples are generally faster and are used for fixed data structures, like returning multiple values from a function."
    },
    {
      id: 65,
      question: "Explain Python decorators with an example",
      tip: "Explain decorators as wrappers that modify the behavior of a function.",
      followUp: "Have you created a custom decorator in a project?",
      sampleAnswer: "A decorator is a function that takes another function and extends its behavior without explicitly modifying it. It's often used for logging, access control, or caching. In code, it's applied using the @decorator_name syntax above the function definition. For example, a @login_required decorator can check if a user is authenticated before running a view."
    },
    {
      id: 66,
      question: "What are *args and **kwargs?",
      tip: "Mention variable-length arguments in function definitions.",
      followUp: "Can you use *args and **kwargs in the same function?",
      sampleAnswer: "*args allows a function to accept any number of positional arguments, which are packed into a tuple. **kwargs allows a function to accept any number of keyword arguments, packed into a dictionary. They are essential for writing flexible functions or wrappers that don't know the exact arguments they will receive."
    },
    {
      id: 67,
      question: "What is the difference between shallow copy and deep copy?",
      tip: "Explain how they handle nested objects.",
      followUp: "Which module do you use to perform a deep copy in Python?",
      sampleAnswer: "A shallow copy creates a new object but inserts references to the nested objects found in the original. If you modify a nested object, both copies are affected. A deep copy creates a new object and recursively creates copies of all nested objects. Modifications to nested objects in a deep copy do not affect the original."
    },
    {
      id: 68,
      question: "Explain list comprehension with examples",
      tip: "Describe it as a concise way to create lists.",
      followUp: "Can list comprehensions replace all map() and filter() calls?",
      sampleAnswer: "List comprehension provides a concise syntax to create a new list by applying an expression to each item in an iterable, optionally filtering elements. For example, [x**2 for x in range(10) if x % 2 == 0] creates a list of squares of even numbers. It is generally more readable and slightly faster than using traditional for-loops."
    },
    {
      id: 69,
      question: "What is the difference between __init__ and __new__ in Python?",
      tip: "Distinguish between object creation and object initialization.",
      followUp: "When would you override __new__?",
      sampleAnswer: "__new__ is a static method that is called to create a new instance of a class. It returns the new object. __init__ is an instance method called after the object is created to initialize its attributes. __new__ is rarely overridden except when subclassing immutable types like tuple or implementing the Singleton pattern."
    },
    {
      id: 70,
      question: "What are Python generators? How do they differ from regular functions?",
      tip: "Mention the yield keyword and memory efficiency.",
      followUp: "What is the advantage of using a generator over a list?",
      sampleAnswer: "Generators are functions that return an iterator and yield values one at a time using the yield keyword, rather than returning all values at once. When a generator yields a value, its state is suspended until the next value is requested. This makes generators highly memory-efficient for processing large streams of data compared to building a huge list in memory."
    },
    {
      id: 71,
      question: "Explain exception handling in Python (try, except, finally)",
      tip: "Explain the flow of error catching and cleanup.",
      followUp: "Can you have an else block in a try-except structure?",
      sampleAnswer: "In Python, we use try blocks to wrap code that might throw an error. If an error occurs, it is caught and handled in the except block, preventing the program from crashing. The finally block executes regardless of whether an exception was raised or not, making it ideal for cleanup tasks like closing files or database connections."
    },
    {
      id: 72,
      question: "What is the difference between multi-threading and multi-processing in Python?",
      tip: "Mention the Global Interpreter Lock (GIL) and CPU vs I/O bound tasks.",
      followUp: "How does the GIL affect multi-threading?",
      sampleAnswer: "Multi-threading runs multiple threads concurrently in a single process, sharing the same memory space, but it's limited by Python's Global Interpreter Lock (GIL), making it better for I/O-bound tasks. Multi-processing creates separate processes, each with its own Python interpreter and memory, bypassing the GIL. This makes multi-processing the right choice for CPU-bound tasks that require true parallelism."
    },
    {
      id: 73,
      question: "What is a virtual environment and why is it important?",
      tip: "Focus on dependency management and isolation.",
      followUp: "What tools do you use to manage virtual environments?",
      sampleAnswer: "A virtual environment is an isolated Python environment that allows a project to have its own dependencies, independent of the global Python installation. It prevents dependency conflicts between different projects that might require different versions of the same library. Using virtual environments ensures reproducibility and a clean global setup."
    },
    {
      id: 74,
      question: "Explain the difference between == and is operators",
      tip: "Differentiate between value equality and object identity.",
      followUp: "Why does Python sometimes return True for 'is' on small integers?",
      sampleAnswer: "The == operator compares the values of two objects to check if they are equal. The 'is' operator compares the memory addresses (identity) of the objects to see if they are the exact same object in memory. Two different lists with the same elements will return True for == but False for 'is'."
    }
  ],
  java: [
    {
      id: 75,
      question: "What are the main features of Java? Why is it platform independent?",
      tip: "Mention object-oriented, secure, robust, and WORA (Write Once, Run Anywhere).",
      followUp: "What is the role of the JVM in platform independence?",
      sampleAnswer: "Java is an object-oriented, robust, secure, and multi-threaded programming language. It is platform-independent because Java source code is compiled into bytecode by the Java compiler. This bytecode is not specific to any physical machine; instead, it is interpreted and executed by the Java Virtual Machine (JVM) on any platform, enabling the 'Write Once, Run Anywhere' capability."
    },
    {
      id: 76,
      question: "Explain OOP concepts in Java: Encapsulation, Inheritance, Polymorphism, Abstraction",
      tip: "Define all four briefly.",
      followUp: "Can you implement multiple inheritance in Java?",
      sampleAnswer: "Encapsulation hides data by using private variables and public getters/setters. Inheritance allows a new class to inherit properties and methods from an existing class. Polymorphism lets objects be treated as instances of their parent class, achieved via method overriding and overloading. Abstraction hides implementation details and shows only functionality using abstract classes and interfaces."
    },
    {
      id: 77,
      question: "What is the difference between Abstract class and Interface?",
      tip: "Mention multiple inheritance and method implementations.",
      followUp: "Since Java 8, can interfaces have method implementations?",
      sampleAnswer: "An abstract class can have both abstract and non-abstract methods, and can hold state using instance variables, but a class can only extend one abstract class. An interface traditionally only had abstract methods and constants, and a class can implement multiple interfaces. Since Java 8, interfaces can have default and static methods, but they still cannot hold instance state."
    },
    {
      id: 78,
      question: "What is the difference between ArrayList and LinkedList?",
      tip: "Contrast internal data structures and performance for different operations.",
      followUp: "Which one would you use if you do a lot of random access?",
      sampleAnswer: "ArrayList is backed by a dynamic array, providing fast O(1) random access but slower insertions and deletions in the middle due to shifting elements. LinkedList is implemented as a doubly-linked list, offering fast O(1) insertions and deletions but slower O(n) element access because it requires traversal. ArrayList is generally preferred for read-heavy operations."
    },
    {
      id: 79,
      question: "Explain the concept of multithreading in Java",
      tip: "Mention the Thread class, Runnable interface, and concurrency.",
      followUp: "What is thread synchronization?",
      sampleAnswer: "Multithreading is a feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. In Java, threads can be created by extending the Thread class or implementing the Runnable interface. It is heavily used in server-side applications and background tasks to keep applications responsive."
    },
    {
      id: 80,
      question: "What is the Java Collections Framework? Name the main interfaces",
      tip: "Mention List, Set, Queue, and Map.",
      followUp: "Is Map a part of the Collection interface?",
      sampleAnswer: "The Java Collections Framework is a unified architecture for representing and manipulating collections of objects. It provides standard interfaces and classes to handle groups of objects. The root interface is Collection, with primary sub-interfaces being List, Set, and Queue. Map is also a core part of the framework, though it does not inherit from the Collection interface."
    },
    {
      id: 81,
      question: "What is exception handling in Java? Difference between checked and unchecked exceptions?",
      tip: "Differentiate compile-time vs runtime exceptions.",
      followUp: "Can you give an example of an unchecked exception?",
      sampleAnswer: "Exception handling is a mechanism to handle runtime errors and maintain normal application flow using try-catch blocks. Checked exceptions are checked at compile-time and must be declared or caught, like IOException. Unchecked exceptions extend RuntimeException, are not checked at compile-time, and typically represent programming errors, like NullPointerException."
    },
    {
      id: 82,
      question: "What is the difference between == and .equals() in Java?",
      tip: "Identity vs equality in objects.",
      followUp: "How does String pooling affect the == operator?",
      sampleAnswer: "The == operator compares the memory addresses of two object references to see if they point to the exact same object. The .equals() method is intended to compare the actual logical content or state of the objects. For primitives, == compares values, but for objects like Strings, you should always use .equals() to check if their contents are identical."
    },
    {
      id: 83,
      question: "What is garbage collection in Java? How does it work?",
      tip: "Mention automatic memory management.",
      followUp: "Can you force garbage collection in Java?",
      sampleAnswer: "Garbage collection is Java's automatic memory management process. The JVM tracks objects in memory and automatically reclaims the memory occupied by objects that are no longer reachable or referenced by the application. This prevents memory leaks and removes the burden of manual memory deallocation from the developer."
    },
    {
      id: 84,
      question: "Explain the SOLID principles in Java",
      tip: "Briefly define the five object-oriented design principles.",
      followUp: "Which SOLID principle is violated by a 'God object'?",
      sampleAnswer: "SOLID is an acronym for five design principles. Single Responsibility means a class should have one reason to change. Open/Closed means software entities should be open for extension but closed for modification. Liskov Substitution states derived classes must be substitutable for their base classes. Interface Segregation means many client-specific interfaces are better than one general-purpose interface. Dependency Inversion means depending on abstractions, not concretions."
    },
    {
      id: 85,
      question: "What is the difference between String, StringBuilder, and StringBuffer?",
      tip: "Focus on mutability and thread safety.",
      followUp: "When should you use StringBuilder instead of StringBuffer?",
      sampleAnswer: "String objects are immutable, so every modification creates a new object. StringBuilder and StringBuffer are mutable and allow string manipulation without creating new objects. StringBuffer is thread-safe as its methods are synchronized, making it slower. StringBuilder is not thread-safe but is faster, making it the preferred choice for single-threaded string concatenation."
    },
    {
      id: 86,
      question: "What are Java Streams? How do you use them?",
      tip: "Mention declarative data processing and functional operations.",
      followUp: "What is the difference between intermediate and terminal operations?",
      sampleAnswer: "Java Streams, introduced in Java 8, provide a functional, declarative approach to processing collections of objects. They allow complex data manipulation like filtering, mapping, and reducing with minimal code. You create a stream from a collection, chain intermediate operations like filter() or map(), and finish with a terminal operation like collect() to produce a result."
    }
  ],
  pharmacy: [
    {
      id: 87,
      question: "What is pharmacokinetics and pharmacodynamics? Explain the difference",
      tip: "Remember 'what the body does to the drug' vs 'what the drug does to the body'.",
      followUp: "Can you give an example of a pharmacokinetic phase?",
      sampleAnswer: "Pharmacokinetics refers to what the body does to a drug, involving Absorption, Distribution, Metabolism, and Excretion (ADME). Pharmacodynamics refers to what the drug does to the body, including its mechanism of action, receptor binding, and physiological effects. Understanding both is essential for determining proper dosing and predicting therapeutic outcomes."
    },
    {
      id: 88,
      question: "How do you handle a prescription error?",
      tip: "Focus on patient safety, immediate action, and documentation.",
      followUp: "How do you communicate the error to the patient?",
      sampleAnswer: "When a prescription error occurs, patient safety is the immediate priority. I would verify the error, contact the prescribing physician for clarification or correction, and correct the prescription in the system. If the medication was dispensed, I would immediately contact the patient to safely retrieve it. Finally, I would document the error and analyze the root cause to prevent future occurrences."
    },
    {
      id: 89,
      question: "What is drug-drug interaction? Give an example",
      tip: "Explain how one drug affects another.",
      followUp: "How do you prevent drug interactions in a pharmacy setting?",
      sampleAnswer: "A drug-drug interaction occurs when one drug affects the activity, metabolism, or toxicity of another drug when taken together. This can increase or decrease therapeutic effects or cause adverse reactions. A common example is the interaction between warfarin (a blood thinner) and NSAIDs like ibuprofen, which can significantly increase the risk of bleeding."
    },
    {
      id: 90,
      question: "Explain the difference between generic and branded drugs",
      tip: "Discuss active ingredients, bioequivalence, and cost.",
      followUp: "Are generic drugs as safe as branded ones?",
      sampleAnswer: "Branded drugs are developed and marketed by the original manufacturer under a patent, making them more expensive. Generic drugs are manufactured after the patent expires; they contain the exact same active ingredients, dosage form, and strength. Generics must prove bioequivalence to the branded drug, meaning they act identically in the body, but they are generally much more affordable."
    },
    {
      id: 91,
      question: "What is bioavailability and why is it important?",
      tip: "Define it as the fraction of an administered dose that reaches circulation.",
      followUp: "Which route of administration provides 100% bioavailability?",
      sampleAnswer: "Bioavailability is the proportion of an administered drug that successfully reaches systemic circulation and is available to have an active effect. Intravenous administration provides 100% bioavailability, whereas oral administration has less due to incomplete absorption and first-pass metabolism in the liver. It's critical for determining the correct dosage for different routes of administration."
    },
    {
      id: 92,
      question: "How do you counsel a patient about a new medication?",
      tip: "Cover what the drug is, how to take it, and side effects.",
      followUp: "What if a patient is resistant to taking their medication?",
      sampleAnswer: "I start by confirming the patient's identity and assessing their prior knowledge. I then explain the medication's name, purpose, dosage, and optimal administration times. I highlight common side effects, what to do if they occur, and any necessary lifestyle or dietary precautions. Finally, I ask open-ended questions using the 'teach-back' method to ensure they fully understand."
    },
    {
      id: 93,
      question: "What are the different routes of drug administration?",
      tip: "List the common routes like oral, IV, IM, topical, etc.",
      followUp: "What factors influence the choice of administration route?",
      sampleAnswer: "The main routes include oral, parenteral (intravenous, intramuscular, subcutaneous), topical, inhalation, sublingual, and rectal. The choice depends on the drug's properties, desired onset of action, and patient circumstances. For instance, IV is chosen for immediate effect in emergencies, while oral is preferred for ease of self-administration in chronic care."
    },
    {
      id: 94,
      question: "What is the role of a pharmacist in patient care?",
      tip: "Move beyond dispensing to clinical roles.",
      followUp: "How do pharmacists collaborate with other healthcare professionals?",
      sampleAnswer: "The role goes far beyond safely dispensing medication. Pharmacists act as medication experts, ensuring drug safety, optimizing therapy, and minimizing adverse effects. We provide patient education, conduct medication therapy management, administer vaccines, and collaborate with physicians to resolve complex therapeutic challenges, ultimately improving overall patient outcomes."
    },
    {
      id: 95,
      question: "Explain the concept of therapeutic drug monitoring",
      tip: "Mention narrow therapeutic indices.",
      followUp: "Can you name a drug that requires therapeutic monitoring?",
      sampleAnswer: "Therapeutic drug monitoring involves measuring drug concentrations in the blood to optimize dosing. It is particularly important for drugs with a narrow therapeutic index, where the difference between an effective dose and a toxic dose is very small. By monitoring blood levels of drugs like vancomycin or digoxin, we ensure efficacy while minimizing the risk of severe toxicity."
    },
    {
      id: 96,
      question: "What are controlled substances? How do you handle them?",
      tip: "Mention schedules and strict regulatory compliance.",
      followUp: "What steps do you take if you suspect a forged prescription?",
      sampleAnswer: "Controlled substances are drugs with a potential for abuse or dependence, categorized into specific schedules by regulatory agencies like the DEA. Handling them requires strict compliance with laws. This includes keeping them in locked storage, maintaining meticulous inventory records, verifying prescriptions thoroughly to prevent diversion, and following precise protocols for dispensing and disposal."
    },
    {
      id: 97,
      question: "What is adverse drug reaction? How do you report it?",
      tip: "Define ADR and mention standard reporting systems.",
      followUp: "What is the difference between a side effect and an adverse reaction?",
      sampleAnswer: "An adverse drug reaction (ADR) is a harmful, unintended response to a medication occurring at normal therapeutic doses. When an ADR happens, the pharmacist must assess the severity and advise the patient on immediate steps. Reporting involves documenting the event in internal systems and submitting a report to national pharmacovigilance programs like the FDA MedWatch system."
    },
    {
      id: 98,
      question: "How do you stay updated with new drugs and pharmaceutical developments?",
      tip: "Mention continuous education and professional resources.",
      followUp: "What journals or databases do you rely on?",
      sampleAnswer: "I engage in continuous education by completing CE credits and attending pharmacy conferences. I regularly read peer-reviewed journals like the Journal of the American Pharmacists Association. Additionally, I use clinical databases like Lexicomp and UpToDate to stay informed about new FDA approvals, updated clinical guidelines, and emerging therapeutic trends."
    }
  ],
  mechanical: [
    {
      id: 99,
      question: "What is the difference between stress and strain?",
      tip: "Define both and mention how they are related.",
      followUp: "What is Hooke's Law?",
      sampleAnswer: "Stress is the internal resisting force per unit area within a material when an external load is applied. Strain is the physical deformation or change in dimensions of the material in response to that stress. In simpler terms, stress is the cause (force) and strain is the effect (deformation). They are related proportionally in the elastic region by Hooke's Law."
    },
    {
      id: 100,
      question: "Explain the laws of thermodynamics",
      tip: "Summarize the zeroth, first, second, and third laws.",
      followUp: "How does the second law apply to an engine's efficiency?",
      sampleAnswer: "The Zeroth Law establishes thermal equilibrium. The First Law (conservation of energy) states energy cannot be created or destroyed, only transformed. The Second Law states that the total entropy of an isolated system always increases, dictating that heat flows from hot to cold, meaning no engine is 100% efficient. The Third Law states entropy approaches a constant minimum as temperature approaches absolute zero."
    },
    {
      id: 101,
      question: "What is the difference between a 2-stroke and 4-stroke engine?",
      tip: "Focus on the power cycle and efficiency.",
      followUp: "Which engine type has a higher power-to-weight ratio?",
      sampleAnswer: "A 4-stroke engine completes a power cycle in four strokes of the piston (intake, compression, power, exhaust) requiring two crankshaft revolutions, offering better fuel efficiency and lower emissions. A 2-stroke engine completes the cycle in just two strokes and one revolution. 2-strokes are simpler, lighter, and deliver more power per revolution, but are less fuel-efficient and produce more pollution."
    },
    {
      id: 102,
      question: "What is CNC machining? What are its advantages?",
      tip: "Explain Computer Numerical Control.",
      followUp: "What programming language is primarily used in CNC?",
      sampleAnswer: "CNC (Computer Numerical Control) machining is a manufacturing process where pre-programmed computer software dictates the movement of factory tools and machinery. Its main advantages are extreme precision, the ability to produce complex shapes repeatedly with minimal variation, high production speed, and reduced manual labor compared to traditional machining."
    },
    {
      id: 103,
      question: "Explain the concept of heat transfer: conduction, convection, and radiation",
      tip: "Give a brief definition and example for each.",
      followUp: "Which mode of heat transfer occurs in a vacuum?",
      sampleAnswer: "Conduction is the transfer of heat through direct contact within a solid, like a metal spoon getting hot in soup. Convection is heat transfer by the macroscopic movement of a fluid (liquid or gas), such as warm air rising in a room. Radiation is the transfer of heat through electromagnetic waves without needing a medium, like the sun warming the earth."
    },
    {
      id: 104,
      question: "What is the difference between ferrous and non-ferrous metals?",
      tip: "Mention iron content and typical properties.",
      followUp: "Give an example of a non-ferrous metal commonly used in aerospace.",
      sampleAnswer: "Ferrous metals contain iron, making them generally magnetic and prone to rust, but they offer high tensile strength, with steel and cast iron being common examples. Non-ferrous metals do not contain iron, are not magnetic, and have high resistance to corrosion. Examples include aluminum, copper, and titanium, which are often preferred for their lighter weight and conductivity."
    },
    {
      id: 105,
      question: "What is CAD/CAM? What software have you used?",
      tip: "Define both acronyms and how they work together.",
      followUp: "How does CAD improve the design process?",
      sampleAnswer: "CAD (Computer-Aided Design) involves using software to create, modify, and optimize 2D or 3D engineering designs. CAM (Computer-Aided Manufacturing) uses software to convert those CAD models into instructions for CNC machinery to manufacture the part. I am proficient in software like SolidWorks and AutoCAD for design, and Mastercam for generating toolpaths."
    },
    {
      id: 106,
      question: "Explain the concept of refrigeration cycle",
      tip: "Mention the four main components: compressor, condenser, expansion valve, evaporator.",
      followUp: "What is the role of the expansion valve?",
      sampleAnswer: "The vapor-compression refrigeration cycle removes heat from a cold space and rejects it to a warmer one. The refrigerant is compressed into a high-pressure, hot gas by the compressor. It cools and condenses into a liquid in the condenser. The expansion valve rapidly drops its pressure, turning it into a cold mixture. Finally, it absorbs heat in the evaporator, turning back into a gas to repeat the cycle."
    },
    {
      id: 107,
      question: "What is the difference between casting, forging, and welding?",
      tip: "Differentiate the manufacturing processes.",
      followUp: "Which process typically yields the strongest component?",
      sampleAnswer: "Casting involves pouring molten metal into a mold to achieve complex shapes. Forging uses compressive forces, like hammering, to shape solid metal, realigning the grain structure to create extremely strong components. Welding is a fabrication process that joins materials by melting the workpieces and adding a filler material to form a strong bond upon cooling."
    },
    {
      id: 108,
      question: "What are the types of fits in engineering: clearance, interference, and transition?",
      tip: "Explain the relationship between the hole and the shaft.",
      followUp: "Give an example application for an interference fit.",
      sampleAnswer: "Fits define the tolerance relationship between mating parts like a shaft and a hole. A clearance fit means the hole is always larger than the shaft, allowing free movement. An interference fit means the shaft is larger than the hole, requiring force or thermal expansion to assemble, creating a permanent joint. A transition fit can result in either clearance or interference, used for precise location."
    },
    {
      id: 109,
      question: "What is quality control in manufacturing?",
      tip: "Mention inspection, standards, and continuous improvement.",
      followUp: "What is Six Sigma?",
      sampleAnswer: "Quality control is a systemic process ensuring that manufactured products meet specific engineering tolerances and quality standards. It involves regular inspections, statistical process control, and testing throughout production. The goal is to identify defects early, minimize variation, and ensure final products are reliable and safe for the end user."
    },
    {
      id: 110,
      question: "Explain the concept of fatigue failure in materials",
      tip: "Mention cyclic loading and stress concentrations.",
      followUp: "How can you design a part to resist fatigue?",
      sampleAnswer: "Fatigue failure occurs when a material breaks under repeated or cyclic loading, even if the stress levels are well below the material's ultimate tensile strength. It typically begins with microscopic cracks at stress concentrators like sharp corners or flaws. Over time, these cracks propagate until the remaining material can no longer support the load, leading to sudden, catastrophic failure."
    }
  ],
  techsupport: [
    {
      id: 111,
      question: "How do you troubleshoot a computer that won't start?",
      tip: "Explain a systematic, step-by-step approach starting with the basics.",
      followUp: "What if it powers on but there's no display?",
      sampleAnswer: "I start with the physical layer: checking power cables, the wall outlet, and the power supply switch. If it has power but won't boot, I listen for beep codes or check diagnostic LEDs on the motherboard. I then strip it down to minimum components—disconnecting peripherals and reseating RAM and the GPU—to isolate the hardware fault."
    },
    {
      id: 112,
      question: "What is the difference between hardware and software issues?",
      tip: "Provide clear definitions and examples.",
      followUp: "How do you handle an issue where software is causing a hardware crash?",
      sampleAnswer: "Hardware issues involve physical components failing, like a dead hard drive, overheating CPU, or faulty RAM, usually resulting in complete failure or system freezing. Software issues involve corrupted files, driver conflicts, or OS bugs, typically resulting in application crashes, error messages, or slow performance. Diagnosing requires determining if the physical machine or the code running on it is at fault."
    },
    {
      id: 113,
      question: "Explain the OSI model and its layers",
      tip: "Briefly name the layers and why the model is useful for troubleshooting.",
      followUp: "At which OSI layer does a router operate?",
      sampleAnswer: "The OSI model is a conceptual framework to understand network communication. It has seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. It's crucial for troubleshooting because it allows support to isolate network issues logically—for instance, checking the physical cable (Layer 1) before investigating IP routing (Layer 3) or application settings (Layer 7)."
    },
    {
      id: 114,
      question: "How do you handle a frustrated or angry customer?",
      tip: "Focus on empathy, active listening, and de-escalation.",
      followUp: "What do you do if you cannot solve their issue immediately?",
      sampleAnswer: "I remain calm and use active listening to let them vent without interrupting. I acknowledge their frustration with empathy, saying something like, 'I understand how impactful this issue is for your work.' I then focus on taking ownership of the problem, explaining exactly what steps I will take to resolve it, and keeping them updated on the progress to rebuild trust."
    },
    {
      id: 115,
      question: "What is DNS and how does it work?",
      tip: "Explain it as the phonebook of the internet.",
      followUp: "What command do you use to clear the DNS cache?",
      sampleAnswer: "DNS stands for Domain Name System. It translates human-readable domain names like google.com into IP addresses that computers use to identify each other on the network. When a user types a URL, their computer queries a DNS server to find the corresponding IP. Without DNS, we would have to memorize complex numerical IP addresses for every website."
    },
    {
      id: 116,
      question: "How do you troubleshoot network connectivity issues?",
      tip: "Start from the bottom up.",
      followUp: "What does the tracert command do?",
      sampleAnswer: "I follow a bottom-up approach, first checking physical connections like ethernet cables and Wi-Fi switches. Then I verify the IP configuration using ipconfig/ifconfig to ensure a valid IP and gateway. I use 'ping' to test connectivity to the local router, then to an external DNS like 8.8.8.8 to verify internet access, and finally check for firewall or proxy issues blocking specific traffic."
    },
    {
      id: 117,
      question: "What is the difference between TCP and UDP?",
      tip: "Contrast reliability vs speed.",
      followUp: "Give an example of an application that uses UDP.",
      sampleAnswer: "TCP is a connection-oriented protocol that ensures reliable, ordered delivery of data by requiring acknowledgments for received packets; it's used for web browsing and file transfers. UDP is connectionless and sends packets without checking if they arrive, prioritizing speed over reliability. UDP is typically used for real-time applications like video streaming and online gaming where minor data loss is acceptable."
    },
    {
      id: 118,
      question: "Explain Active Directory and its importance",
      tip: "Focus on centralized management of users and computers.",
      followUp: "What is a Group Policy Object (GPO)?",
      sampleAnswer: "Active Directory is a Microsoft directory service used to manage network resources in a Windows domain. It allows administrators to centrally manage users, groups, and computers, handling authentication and authorization. It is vital for enterprise security because it enforces policies across the entire organization, simplifying user access control and device management."
    },
    {
      id: 119,
      question: "How do you prioritize multiple support tickets?",
      tip: "Discuss impact and urgency.",
      followUp: "How do you handle a VIP user with a low-priority issue?",
      sampleAnswer: "I prioritize tickets based on a combination of urgency and impact. A server outage affecting the entire company is critical and handled first. A single user unable to print is low priority. If multiple tickets have similar priority, I handle them chronologically. I also ensure I meet SLA targets and communicate clearly with users if their lower-priority ticket will take longer."
    },
    {
      id: 120,
      question: "What is remote desktop and how do you use it for troubleshooting?",
      tip: "Mention efficiency and specific tools.",
      followUp: "What security considerations are there for remote desktop?",
      sampleAnswer: "Remote desktop software allows a technician to view and control a user's computer over the network as if they were sitting in front of it. It is incredibly efficient for tech support because it eliminates travel time and allows me to see exactly what the user is experiencing. I commonly use tools like RDP, TeamViewer, or AnyDesk to resolve software configuration issues quickly."
    },
    {
      id: 121,
      question: "What is the difference between a virus, malware, and ransomware?",
      tip: "Explain malware as the umbrella term.",
      followUp: "What are the best practices for preventing ransomware?",
      sampleAnswer: "Malware is the broad umbrella term for any malicious software. A virus is a specific type of malware that attaches itself to clean files and self-replicates. Ransomware is a specialized, highly destructive malware that encrypts a user's files or locks their system, demanding a financial payment to restore access. They require different remediation strategies, though prevention relies heavily on good endpoint protection."
    },
    {
      id: 122,
      question: "How do you document and escalate technical issues?",
      tip: "Emphasize clear notes and following procedures.",
      followUp: "Why is detailed documentation important for future support?",
      sampleAnswer: "I document every step taken in the ticketing system clearly, including error codes, troubleshooting performed, and the user's environment. If an issue requires escalation, I ensure all basic troubleshooting is exhausted and logged. I then assign the ticket to the appropriate Tier 2 or specialized team, summarizing the problem concisely so they don't have to duplicate my efforts."
    }
  ],
  marketing: [
    {
      id: 123,
      question: "What is SEO? Explain on-page and off-page SEO",
      tip: "Define Search Engine Optimization and divide its two main aspects.",
      followUp: "What is an example of technical SEO?",
      sampleAnswer: "SEO stands for Search Engine Optimization, the practice of increasing organic traffic to a website. On-page SEO involves optimizing elements on your website, like utilizing keywords in content, meta tags, and ensuring a good user experience. Off-page SEO refers to actions taken outside your website to impact rankings, primarily building high-quality backlinks from reputable sites."
    },
    {
      id: 124,
      question: "What is the difference between organic and paid marketing?",
      tip: "Contrast time/effort with immediate financial cost.",
      followUp: "When would you prioritize paid over organic?",
      sampleAnswer: "Organic marketing involves building an audience naturally over time through SEO, content creation, and unpaid social media posts; it takes longer but builds sustainable, long-term authority. Paid marketing involves spending money on ads like Google Ads or sponsored social posts; it delivers immediate visibility and targeted traffic but stops as soon as the budget runs out."
    },
    {
      id: 125,
      question: "How do you measure the success of a digital marketing campaign?",
      tip: "Mention KPIs and aligning with business goals.",
      followUp: "What metric is most important for an e-commerce campaign?",
      sampleAnswer: "Success is measured by defining clear Key Performance Indicators (KPIs) tied to business goals before the campaign starts. I look at metrics such as Conversion Rate, Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), and overall website traffic. By analyzing this data in tools like Google Analytics, I determine if the campaign generated a positive ROI."
    },
    {
      id: 126,
      question: "What is Google Analytics? What metrics do you track?",
      tip: "Describe its purpose as a web analytics service.",
      followUp: "What is the difference between a session and a pageview?",
      sampleAnswer: "Google Analytics is a powerful tool used to track and report website traffic and user behavior. I regularly track metrics like bounce rate, average session duration, traffic sources (organic, direct, referral), and conversion goals. These metrics help me understand how users interact with the site, which marketing channels are most effective, and where the funnel is leaking."
    },
    {
      id: 127,
      question: "Explain the concept of conversion rate optimization",
      tip: "Mention A/B testing and user experience.",
      followUp: "What elements of a landing page would you test first?",
      sampleAnswer: "Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors who take a desired action, like filling out a form or making a purchase. It involves analyzing user behavior, identifying friction points, and running A/B tests on elements like headlines, call-to-action buttons, or page layouts to iteratively improve performance based on data."
    },
    {
      id: 128,
      question: "What are the different types of social media marketing strategies?",
      tip: "Differentiate between brand awareness, engagement, and conversion.",
      followUp: "How does a B2B strategy differ from B2C on social media?",
      sampleAnswer: "Strategies vary based on goals. A brand awareness strategy focuses on maximizing reach and impressions through shareable content and influencer partnerships. An engagement strategy focuses on community building by fostering conversations and responding to comments. A direct response strategy relies on targeted, paid ads with strong CTAs designed to drive immediate sales or lead generation."
    },
    {
      id: 129,
      question: "What is content marketing and why is it important?",
      tip: "Focus on providing value rather than direct selling.",
      followUp: "How do you ensure your content reaches the right audience?",
      sampleAnswer: "Content marketing involves creating and distributing valuable, relevant, and consistent content—like blogs, videos, and ebooks—to attract and retain a defined audience. It's important because it builds trust and authority, establishing the brand as an industry leader. Rather than pitching products directly, it solves customer problems, ultimately driving profitable customer action."
    },
    {
      id: 130,
      question: "How do you perform keyword research for SEO?",
      tip: "Explain the process and tools used.",
      followUp: "What are long-tail keywords?",
      sampleAnswer: "I start by understanding the buyer persona and brainstorming seed topics. Then, I use tools like SEMrush, Ahrefs, or Google Keyword Planner to find relevant keywords. I analyze search volume, keyword difficulty, and search intent. I prioritize long-tail keywords—phrases with 3+ words that have lower competition and higher conversion intent—to build my content strategy."
    },
    {
      id: 131,
      question: "What is PPC advertising? How does Google Ads work?",
      tip: "Explain the auction model and Pay-Per-Click.",
      followUp: "What is Quality Score in Google Ads?",
      sampleAnswer: "PPC (Pay-Per-Click) is a model where advertisers pay a fee each time their ad is clicked. Google Ads operates on an auction system. Advertisers bid on keywords relevant to their business. When a user searches that keyword, Google evaluates the bid amount alongside the ad's Quality Score (relevance and landing page experience) to determine the ad rank and placement on the results page."
    },
    {
      id: 132,
      question: "What is email marketing? How do you improve open rates?",
      tip: "Mention personalization, subject lines, and list hygiene.",
      followUp: "What is a good strategy for re-engaging inactive subscribers?",
      sampleAnswer: "Email marketing involves sending targeted messages to a database of subscribers to nurture leads and drive sales. To improve open rates, I focus on crafting compelling, A/B tested subject lines and preview text. I also segment the audience to ensure the content is highly relevant and personalized, and regularly clean the list to remove inactive subscribers, ensuring good deliverability."
    }
  ],
  finance: [
    {
      id: 133,
      question: "What are the three main financial statements?",
      tip: "Name them and briefly state their purpose.",
      followUp: "How do the three statements link together?",
      sampleAnswer: "The three main statements are the Income Statement, Balance Sheet, and Cash Flow Statement. The Income Statement shows profitability over a period by listing revenues and expenses. The Balance Sheet provides a snapshot of the company's financial position (assets, liabilities, equity) at a specific point in time. The Cash Flow Statement tracks the actual cash entering and leaving the business."
    },
    {
      id: 134,
      question: "Explain the difference between accounts payable and accounts receivable",
      tip: "Define them in terms of money owed to vs money owed by the company.",
      followUp: "How do they impact the working capital?",
      sampleAnswer: "Accounts Receivable represents money owed to the company by its customers for goods or services delivered on credit; it is an asset. Accounts Payable represents money the company owes to its suppliers for purchases made on credit; it is a liability. Efficiently managing both is crucial for maintaining healthy cash flow."
    },
    {
      id: 135,
      question: "What is working capital and why is it important?",
      tip: "Give the formula and its significance for daily operations.",
      followUp: "What does negative working capital signify?",
      sampleAnswer: "Working capital is calculated as Current Assets minus Current Liabilities. It represents the operational liquidity available to a business. It is vital because it indicates whether a company can meet its short-term obligations and fund day-to-day operations. Positive working capital is essential for a company's survival and growth."
    },
    {
      id: 136,
      question: "What is the difference between FIFO and LIFO inventory methods?",
      tip: "Explain First-In-First-Out vs Last-In-First-Out.",
      followUp: "How does inflation affect profit under LIFO?",
      sampleAnswer: "FIFO assumes the oldest inventory items are sold first, while LIFO assumes the newest items are sold first. During periods of inflation, FIFO results in a higher net income and higher inventory valuation on the balance sheet because cheaper goods are recorded as Cost of Goods Sold. Conversely, LIFO results in lower net income and lower taxes."
    },
    {
      id: 137,
      question: "Explain the concept of depreciation and its methods",
      tip: "Define it as allocating the cost of an asset over its useful life.",
      followUp: "When would you use an accelerated depreciation method?",
      sampleAnswer: "Depreciation is an accounting method of allocating the cost of a tangible asset over its useful life. It reflects wear and tear. The most common method is Straight-Line, which expenses an equal amount each year. Other methods include Double-Declining Balance, which accelerates depreciation, charging higher expenses in the early years of the asset's life."
    },
    {
      id: 138,
      question: "What is a balance sheet? Walk me through its components",
      tip: "State the fundamental accounting equation.",
      followUp: "What is an example of an intangible asset?",
      sampleAnswer: "A balance sheet is a financial snapshot at a specific point in time. It is based on the equation: Assets = Liabilities + Shareholders' Equity. Assets are what the company owns, divided into current (cash, inventory) and non-current (property, equipment). Liabilities are what it owes (loans, accounts payable). Equity represents the owners' residual claim on the business."
    },
    {
      id: 139,
      question: "What is the difference between cash accounting and accrual accounting?",
      tip: "Focus on the timing of recognizing revenue and expenses.",
      followUp: "Which method is required by GAAP for large corporations?",
      sampleAnswer: "Cash accounting recognizes revenue and expenses only when money actually changes hands. Accrual accounting recognizes revenue when it is earned and expenses when they are incurred, regardless of when cash is exchanged. Accrual accounting provides a more accurate picture of a company's financial health and is standard for mid-to-large businesses."
    },
    {
      id: 140,
      question: "What is budgeting? How do you prepare a budget?",
      tip: "Describe budgeting as financial planning and variance analysis.",
      followUp: "What is zero-based budgeting?",
      sampleAnswer: "Budgeting is the process of creating a financial plan for future periods. To prepare a budget, I start by reviewing historical performance and collaborating with department heads to forecast revenues and estimate costs. I then align these figures with the company's strategic goals. Once set, I track actual results against the budget to analyze variances and adjust."
    },
    {
      id: 141,
      question: "Explain the concept of ROI (Return on Investment)",
      tip: "Give the formula and its practical use.",
      followUp: "What are the limitations of relying solely on ROI?",
      sampleAnswer: "ROI is a performance measure used to evaluate the efficiency or profitability of an investment. It is calculated by dividing the net profit of the investment by the initial cost of the investment, expressed as a percentage. It is a simple, universal metric used by businesses to compare the attractiveness of different potential projects or expenditures."
    },
    {
      id: 142,
      question: "What is financial forecasting and why is it important?",
      tip: "Differentiate it from budgeting.",
      followUp: "What historical data is most important for a revenue forecast?",
      sampleAnswer: "Financial forecasting estimates a company's future financial outcomes based on historical data, market trends, and economic indicators. Unlike a static budget, a forecast is regularly updated. It is crucial because it helps management make informed decisions regarding hiring, resource allocation, and capital raising by predicting cash flow crunches or growth opportunities."
    }
  ]
};

export default questions;
"""

# Let's replace the last closing bracket and export with the new ones.
# Find the last `  ]\n};`

# regex to find the end of the file
pattern = r"  \]\n\};\n\nexport default questions;\n?$"

new_content = re.sub(pattern, new_categories, content)

with open(existing_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
