import React, { useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import axios from "axios";
import { email } from "zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type OnboardingQuestion = {
  id: number;
  question: string;
  type: "msq" | "mcq";
  options: string[];
};

const questions: OnboardingQuestion[] = [
  {
    id: 1,
    question: "Which domain(s) are you most interested in exploring?",
    type: "msq",
    options: ["Agriculture", "Healthcare", "Finance", "Education", "Other"],
  },
  {
    id: 2,
    question: "What type of support are you looking for from the AI?",
    type: "msq",
    options: [
      "Expert advice",
      "Problem-solving",
      "Research insights",
      "Quick answers",
    ],
  },
  {
    id: 3,
    question:
      "Do you want the AI to act as a generalist advisor across all domains, or as a specialized expert in one field?",
    type: "mcq",
    options: ["Generalist advisor", "Specialized expert"],
  },
  {
    id: 4,
    question: "What is your current role or background?",
    type: "mcq",
    options: [
      "Student",
      "Researcher",
      "Entrepreneur",
      "Professional",
      "Policymaker",
      "Other",
    ],
  },
  {
    id: 5,
    question: "How do you prefer the AI to respond?",
    type: "msq",
    options: [
      "Concise answers",
      "Detailed explanations",
      "Step-by-step guides",
      "Recommendations",
    ],
  },
  {
    id: 6,
    question:
      "Are you looking for real-time solutions or long-term strategies?",
    type: "mcq",
    options: [
      "Real-time solutions (quick help)",
      "Long-term strategies (deep analysis)",
    ],
  },
  {
    id: 7,
    question:
      "Would you like the AI to suggest new opportunities/ideas beyond your chosen domain?",
    type: "mcq",
    options: ["Yes", "No", "Maybe"],
  },
  {
    id: 8,
    question: "How comfortable are you with technical details?",
    type: "mcq",
    options: ["Basic", "Intermediate", "Advanced"],
  },
  {
    id: 9,
    question:
      "Do you want personalized recommendations based on your usage patterns and goals?",
    type: "mcq",
    options: ["Yes", "No"],
  },
  {
    id: 10,
    question: "How frequently do you plan to use the platform?",
    type: "mcq",
    options: ["Daily", "Weekly", "Occasionally", "Project-based"],
  },
];

type Answers = {
  [qid: number]: string | string[];
};

const OnboardingForm = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [load, setLoad] = useState(false);

  const handleChange = (qid: number, value: string, isMsq: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: isMsq
        ? (Array.isArray(prev[qid]) ? (prev[qid] as string[]) : []).includes(
            value
          )
          ? (prev[qid] as string[]).filter((v: string) => v !== value)
          : [
              ...(Array.isArray(prev[qid]) ? (prev[qid] as string[]) : []),
              value,
            ]
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoad(true);
    e.preventDefault();
    const result = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id],
    }));

    try {
      const resp = await axios.post("/api/ai/summarise", {
        json: result,
        token: localStorage.getItem("token"),
      });
      if (resp.status == 200) {
        const data = await resp.data;
        console.log(data);
        toast.success("Updated Prefrences");
        router.push("/app");
      }
    } catch {
      toast.error("error occured while updatein prefernces");

      setLoad(false);
    }
    setLoad(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-7">
      {questions.map((q) => (
        <div key={q.id} className="p-4 m-5 rounded-3xl bg-accent">
          <Label>
            <strong className="text-2xl m-2">{q.question}</strong>
          </Label>
          <div className="ml-4">
            {q.type === "msq"
              ? q.options.map((option, id) => (
                  <label
                    className="flex items-center cursor-pointer space-x-2"
                    key={id}
                  >
                    <input
                      type="checkbox"
                      className="peer appearance-none w-3 h-3 border border-gray-400  checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none"
                      checked={
                        Array.isArray(answers[q.id])
                          ? (answers[q.id] as string[]).includes(option)
                          : false
                      }
                      onChange={() => handleChange(q.id, option, true)}
                    />
                    <span>{option}</span>
                  </label>
                ))
              : q.options.map((option) => (
                  <Label key={option} className="text-[1rem]">
                    <input
                      type="radio"
                      className="peer appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-primary focus:ring-2 focus:ring-primary focus:outline-none"
                      checked={answers[q.id] === option}
                      onChange={() => handleChange(q.id, option, false)}
                      name={`q_${q.id}`}
                    />{" "}
                    {option}
                  </Label>
                ))}
          </div>
        </div>
      ))}
      <Button type="submit" disabled={load}>
        {load ? <Loader className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
};

export default OnboardingForm;
