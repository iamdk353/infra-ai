import DomainCard from "@/components/ui/DomainCard";
const Domains = [
  {
    title: "Smart Irrigation",
    link: "app/domain/irrigation",
    desc: "AI-based irrigation system to optimize water usage in farming.",
  },
  {
    title: "Crop Health Monitoring",
    link: "app/domain/monitoring",
    desc: "Computer vision system for detecting plant diseases early.",
  },
  {
    title: "Telemedicine Platform",
    link: "app/domain/platform",
    desc: "Remote healthcare consultation system for rural areas.",
  },
  {
    title: "Wearable Health Tracker",
    link: "app/domain/tracker",
    desc: "IoT-enabled device for continuous patient monitoring.",
  },
  {
    title: "E-Learning Hub",
    link: "app/domain/hub",
    desc: "Interactive learning platform with personalized AI tutors.",
  },
  {
    title: "Skill Development Portal",
    link: "app/domain/portal",
    desc: "Platform connecting learners with industry mentors and resources.",
  },
  {
    title: "Renewable Energy Dashboard",
    link: "app/domain/dashboard",
    desc: "Real-time monitoring system for solar and wind power plants.",
  },
  {
    title: "Smart Grid Management",
    link: "app/domain/management",
    desc: "AI-driven energy distribution system for efficient power usage.",
  },
  {
    title: "Waste Management System",
    link: "app/domain/system",
    desc: "IoT-based smart bins and tracking system for waste collection.",
  },
  {
    title: "Water Quality Analyzer",
    link: "app/domain/analyzer",
    desc: "IoT sensors to monitor and report water quality in real time.",
  },
];
const page = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="grid grid-cols-3 md:gap-6 md:py-6">
        {Domains.map(({ title, link, desc }, i) => (
          <DomainCard key={i} title={title} link={link} desc={desc} />
        ))}
      </div>
    </div>
  );
};
export default page;
