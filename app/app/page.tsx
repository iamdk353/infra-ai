"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import DomainCard from "@/components/ui/DomainCard";
import { Loader2 } from "lucide-react";

const Domains = {
  Agriculture: [
    {
      title: "Farming & Crops",
      link: "app/domain/farming-crops",
      desc: "Techniques and technology for growing crops efficiently. Covers irrigation, pest management, and yield optimization.",
      img: "/2.jpg"
    },
    {
      title: "Animal Husbandry",
      link: "app/domain/animal-husbandry",
      desc: "Science of breeding, raising, and caring for livestock. Focuses on farm animal health and productivity.",
      img: "/1.jpg"
    },
    {
      title: "Poultry & Dairy",
      link: "app/domain/poultry-dairy",
      desc: "Best practices for raising poultry and managing dairy farms. Includes milk production and egg-laying systems.",
      img: "/3.jpg"
    },
    {
      title: "Fishery & Aquaculture",
      link: "app/domain/fishery-aquaculture",
      desc: "Cultivation and management of fish and aquatic species. Covers sustainable practices and water environment monitoring.",
      img: "/5.jpg"
    },
    {
      title: "Agro-Supply Chain",
      link: "app/domain/agro-supply-chain",
      desc: "Logistics and distribution for farm produce. Focuses on transport, storage, and market access improvement.",
      img: "/12.jpg"
    },
  ],
  Finance: [
    {
      title: "Banking & Credit",
      link: "app/domain/banking-credit",
      desc: "Financial services enabling deposits and loans for individuals and businesses. Covers digital banking and credit analysis.",
      img: "/4.jpg"
    },
    {
      title: "Insurance & Risk Management",
      link: "app/domain/insurance-risk-management",
      desc: "Protection from financial loss through insurance products. Focuses on assessing, analyzing and mitigating risk.",
      img: "/7.jpg"
    },
    {
      title: "Investments & Trading",
      link: "app/domain/investments-trading",
      desc: "Managing financial assets and trading in markets. Includes stocks, bonds, portfolio management, and returns.",
      img: "/9.jpg"
    },
    {
      title: "Taxation & Compliance",
      link: "app/domain/taxation-compliance",
      desc: "Processes for managing taxes and regulatory requirements. Ensures legal compliance and financial reporting accuracy.",
      img: "/62.jpg"
    },
    {
      title: "Fraud Detection & Security",
      link: "app/domain/fraud-detection-security",
      desc: "Systems to prevent and identify fraudulent activities. Focuses on cybersecurity and financial transaction monitoring.",
      img: "/8.jpg"
    },
  ],
  Healthcare: [
    {
      title: "Physical Health",
      link: "app/domain/physical-health",
      desc: "Maintaining body wellness through preventive and curative measures. Includes exercise, hygiene, and medical treatment.",
      img: "/10.jpg"
    },
    {
      title: "Mental Health",
      link: "app/domain/mental-health",
      desc: "Improvement of psychological well-being and emotional stability. Covers therapy, counseling, and stress management.",
      img: "/11.jpg"
    },
    {
      title: "Nutrition & Lifestyle",
      link: "app/domain/nutrition-lifestyle",
      desc: "Promoting healthy eating and living habits for disease prevention. Focuses on diet, activity, and holistic wellness.",
      img: "/12.jpg"
    },
    {
      title: "Medical Research & Drug Discovery",
      link: "app/domain/medical-research-drug-discovery",
      desc: "Innovations in diagnosis, treatment, and disease understanding. Involves clinical trials and pharmaceutical advancement.",
      img: "/14.jpg"
    },
    {
      title: "Telemedicine & Remote Care",
      link: "app/domain/telemedicine-remote-care",
      desc: "Providing healthcare services via online technology. Enables remote consultations and patient monitoring.",
      img: "/13.jpg"
    },
  ],
  Education: [
    {
      title: "Academic Learning",
      link: "app/domain/academic-learning",
      desc: "Formal, curriculum-based education in schools and colleges. Covers pedagogical strategies and student development.",
      img: "/15.jpg"
    },
    {
      title: "Non-Curricular Learning (arts, skills)",
      link: "app/domain/non-curricular-learning",
      desc: "Artistic and skill-based learning outside traditional curriculum. Encourages creativity and personal growth.",
      img: "/16.jpg"
    },
    {
      title: "Career & Counseling",
      link: "app/domain/career-counseling",
      desc: "Guidance and advice for professional development. Includes resume building, interviews, and career planning.",
      img: "/17.jpg"
    },
    {
      title: "Research & Knowledge Discovery",
      link: "app/domain/research-knowledge-discovery",
      desc: "Generating new insights through research and innovation. Covers academic research methods and exploration.",
      img: "/18.jpg"
    },
    {
      title: "Student Performance & Analytics",
      link: "app/domain/student-performance-analytics",
      desc: "Analyzing and improving student outcomes using data. Focuses on metrics, dashboards, and academic success.",
      img: "/19.jpg"
    },
  ],
  Manufacturing: [
    {
      title: "Production & Assembly",
      link: "app/domain/production-assembly",
      desc: "Factories and assembly lines for making products. Covers automation, efficiency, and process optimization.",
      img: "/20.jpg"
    },
    {
      title: "Predictive Maintenance",
      link: "app/domain/predictive-maintenance",
      desc: "Using data to avoid equipment failure before it happens. Reduces downtime and prolongs machine life.",
      img: "/22.jpg"
    },
    {
      title: "Supply Chain & Logistics",
      link: "app/domain/supply-chain-logistics",
      desc: "Moving goods efficiently from source to consumer. Covers warehousing, shipping, and real-time tracking.",
      img: "/23.jpg"
    },
    {
      title: "Quality Control",
      link: "app/domain/quality-control",
      desc: "Ensuring products meet set standards and specifications. Focuses on inspection, testing, and certification.",
      img: "/24.jpg"
    },
    {
      title: "Industrial Safety",
      link: "app/domain/industrial-safety",
      desc: "Protecting employees and facilities in industrial settings. Prevents accidents through strict safety protocols.",
      img: "/21.jpg"
    },
  ],
  "Transportation & Logistics": [
    {
      title: "Road Transport",
      link: "app/domain/road-transport",
      desc: "Vehicles and systems for transporting goods and people by road. Includes highway management and fleet operations.",
      img: "/25.jpg"
    },
    {
      title: "Railways",
      link: "app/domain/railways",
      desc: "Trains and railway networks for mass transit and freight. Focuses on routes, scheduling, and infrastructure.",
      img: "/26.jpg"
    },
    {
      title: "Aviation",
      link: "app/domain/aviation",
      desc: "Airplanes and airlines connecting destinations worldwide. Covers airport operations, air safety, and management.",
      img: "/27.jpg"
    },
    {
      title: "Maritime & Shipping",
      link: "app/domain/maritime-shipping",
      desc: "Ships and shipping routes for transporting goods by sea. Includes port logistics and marine safety.",
      img: "/28.jpg"
    },
    {
      title: "Fleet & Route Optimization",
      link: "app/domain/fleet-route-optimization",
      desc: "Improving delivery times with efficient vehicle routing. Uses analytics for minimizing costs and transit times.",
      img: "/29.jpg"
    },
  ],
  "Retail & E-Commerce": [
    {
      title: "Personalized Shopping",
      link: "app/domain/personalized-shopping",
      desc: "Tailoring products and services for individual customers. Utilizes data for recommendations and upselling.",
      img: "/30.jpg"
    },
    {
      title: "Inventory & Stock Management",
      link: "app/domain/inventory-stock-management",
      desc: "Maintaining optimal stock levels in warehouses and stores. Prevents shortages and reduces surplus.",
      img: "/31.jpg"
    },
    {
      title: "Customer Service & Chatbots",
      link: "app/domain/customer-service-chatbots",
      desc: "Providing support via humans and automated chatbots. Handles queries, complaints, and information delivery.",
      img: "/32.jpg"
    },
    {
      title: "Pricing & Promotions",
      link: "app/domain/pricing-promotions",
      desc: "Setting and adjusting prices dynamically across products. Manages offers, deals, and competitive pricing.",
      img: "/33.jpg"
    },
    {
      title: "Fraud & Return Management",
      link: "app/domain/fraud-return-management",
      desc: "Preventing scams and handling customer returns efficiently. Protects business reputation and inventory.",
      img: "/34.jpg"
    },
  ],
  "Energy & Environment": [
    {
      title: "Renewable Energy",
      link: "app/domain/renewable-energy",
      desc: "Harnessing solar, wind, and other sustainable resources. Focuses on green technology and eco-friendly solutions.",
      img: "/35.jpg"
    },
    {
      title: "Smart Grid Systems",
      link: "app/domain/smart-grid-systems",
      desc: "Digitally managed electricity networks for efficient distribution. Integrates renewables and monitors consumption.",
      img: "/36.jpg"
    },
    {
      title: "Climate & Weather Analysis",
      link: "app/domain/climate-weather-analysis",
      desc: "Studying ongoing changes in climate and weather patterns. Utilizes forecasting models and historical data.",
      img: "/37.jpg"
    },
    {
      title: "Water Resource Management",
      link: "app/domain/water-resource-management",
      desc: "Strategizing for sustainable water usage and conservation. Protects against scarcity and contamination.",
      img: "/38.jpg"
    },
    {
      title: "Environmental Conservation",
      link: "app/domain/environmental-conservation",
      desc: "Initiatives to preserve biodiversity and natural habitats. Involves education, advocacy, and restoration.",
      img: "/49.jpg"
    },
  ],
  "Government & Public Sector": [
    {
      title: "Smart City Planning",
      link: "app/domain/smart-city-planning",
      desc: "Urban development using advanced tech for citizen welfare. Covers infrastructure, sustainability, and transport.",
      img: "/41.jpg"
    },
    {
      title: "Public Safety & Security",
      link: "app/domain/public-safety-security",
      desc: "Protecting citizens and public spaces from threats. Uses surveillance, emergency protocols, and policing.",
      img: "/42.jpg"
    },
    {
      title: "Policy & Governance Analytics",
      link: "app/domain/policy-governance-analytics",
      desc: "Data-driven support for policy-making and governance. Enhances public programs and resource allocation.",
      img: "/43.jpg"
    },
    {
      title: "Disaster Response & Management",
      link: "app/domain/disaster-response-management",
      desc: "Strategies for managing emergencies and natural disasters. Focuses on prevention, rescue, and recovery.",
      img: "/45.jpg"
    },
    {
      title: "Citizen Services",
      link: "app/domain/citizen-services",
      desc: "Public services supporting everyday citizen needs. Includes applications, feedback, and service delivery.",
      img: "/46.jpg"
    },
  ],
  "Media & Entertainment": [
    {
      title: "Movies, Music & Games",
      link: "app/domain/movies-music-games",
      desc: "Creation and distribution of multimedia entertainment. Covers film, audio, gaming, and immersive experiences.",
      img: "/47.jpg"
    },
    {
      title: "Content Creation & Editing",
      link: "app/domain/content-creation-editing",
      desc: "Producing and refining media content for various platforms. Encompasses video editing, writing, and publishing.",
      img: "/48.jpg"
    },
    {
      title: "Sports & Performance Analytics",
      link: "app/domain/sports-performance-analytics",
      desc: "Analyzing sports performances and game strategies. Enhances coaching, athlete development, and fan engagement.",
      img: "/49.jpg"
    },
    {
      title: "Audience Engagement",
      link: "app/domain/audience-engagement",
      desc: "Interacting with and growing consumer audiences. Focuses on loyalty programs, community building, and outreach.",
      img: "/50.jpg"
    },
    {
      title: "Content Moderation & Fake News Detection",
      link: "app/domain/content-moderation-fake-news-detection",
      desc: "Filtering inappropriate/false content for quality assurance. Uses AI for flagging misinformation and enforcing standards.",
      img: "/51.jpg"
    },
  ],
  "Waste Management": [
    {
      title: "Household Waste",
      link: "app/domain/household-waste",
      desc: "Handling trash and recyclables from residences. Promotes sustainable disposal and recycling methods.",
      img: "/52.jpg"
    },
    {
      title: "Industrial Waste",
      link: "app/domain/industrial-waste",
      desc: "Managing byproducts and hazardous materials from factories. Includes containment and disposal regulations.",
      img: "/53.jpg"
    },
    {
      title: "Biomedical Waste",
      link: "app/domain/biomedical-waste",
      desc: "Disposal of medical and laboratory waste safely. Prevents infection and environmental contamination.",
      img: "/54.jpg"
    },
    {
      title: "E-Waste & Recycling",
      link: "app/domain/e-waste-recycling",
      desc: "Processing and recycling electronic waste responsibly. Reduces landfill and recovers valuable materials.",
      img: "/55.jpg"
    },
    {
      title: "Waste-to-Energy Solutions",
      link: "app/domain/waste-to-energy-solutions",
      desc: "Converting waste into usable energy with modern techniques. Helps reduce landfill and generate electricity.",
      img: "/56.jpg"
    },
  ],
  "Personal Life & Lifestyle": [
    {
      title: "Time & Productivity",
      link: "app/domain/time-productivity",
      desc: "Tools and tips for managing time effectively. Boosts daily planning, task tracking, and goal setting.",
      img: "/57.jpg"
    },
    {
      title: "Financial Wellness",
      link: "app/domain/financial-wellness",
      desc: "Practices for personal financial stability and planning. Includes budgeting, investing, and retirement strategies.",
      img: "/58.jpg"
    },
    {
      title: "Health & Wellness",
      link: "app/domain/health-wellness",
      desc: "Maintaining a healthy mind and body through habits. Covers regular exercise, nutrition, and stress reduction.",
      img: "/59.jpg"
    },
    {
      title: "Recreation & Travel",
      link: "app/domain/recreation-travel",
      desc: "Leisure activities and exploring new destinations. Enhances relaxation, adventure, and cultural experiences.",
      img: "/60.jpg"
    },
    {
      title: "Culture & Hobbies",
      link: "app/domain/culture-hobbies",
      desc: "Participating in cultural practices and personal interests. Inspires creativity and lifelong learning.",
      img: "/61.jpg"
    },
  ],
};


type Subdomain = {
  title: string;
  link: string;
  desc: string;
  img:string;
};

type DomainsType = {
  [key: string]: Subdomain[];
};
function filterDomains(
  domainKeys: string[],
  Domains: DomainsType
): Subdomain[] {
  return domainKeys.reduce<Subdomain[]>((acc, domain) => {
    if (Domains[domain]) {
      acc.push(...Domains[domain]);
    }
    return acc;
  }, []);
}

const Page = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const fetchDomain = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const resp = await axios.get("/api/getdomain", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(resp.data.data);
      setLoad(false);
    };

    fetchDomain();
  }, []);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      {load ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 md:py-6">
          {filterDomains(data as string[], Domains).map((i, id) => {
            return (
              <DomainCard
                desc={i.desc}
                link={i.link}
                title={i.title}
                img={i.img} 
                key={id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
