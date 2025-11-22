import { NextResponse } from "next/server";
import PushNotifications from "@pusher/push-notifications-server";

const beamsClient = new PushNotifications({
  instanceId: process.env.BEAMS_INSTANCE_ID!,
  secretKey: process.env.BEAMS_SECRET_KEY!,
});

export async function POST() {
  try {
    await beamsClient.publishToInterests(
      ["hello"],
      notifications[Math.floor(Math.random() * notifications.length)]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}

const notifications = [
  {
    web: {
      notification: {
        title: "Infra-AI Reminder",
        body: "Revisit Infra-AI today — your AI-powered productivity boost awaits.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Boost Your Company",
        body: "Infra-AI can help your company improve instantly. Come back and try it now.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Need Efficiency?",
        body: "Infra-AI automates workflows and insights. Revisit and experience the upgrade.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Your Smart Assistant",
        body: "Infra-AI is ready with smarter suggestions. Return and explore new features.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Transform Your Ops",
        body: "Let Infra-AI optimize your operations. Come back and unlock improvements.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Discover Insights",
        body: "Infra-AI generates actionable insights for your team. Revisit to see more.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Welcome Back?",
        body: "Infra-AI has new improvements waiting. Return and boost your efficiency.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Improve Your Workflow",
        body: "Your AI tool Infra-AI can streamline tasks. Revisit and enhance performance.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "AI Upgrade Available",
        body: "Infra-AI is evolving — come back to experience upgraded AI insights.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Your AI Partner",
        body: "Infra-AI is ready to help improve your company processes. Return anytime.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Stay Ahead",
        body: "Use Infra-AI to stay ahead with real-time intelligent recommendations. Revisit now.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Optimize Today",
        body: "Infra-AI can help optimize your daily operations. Visit again to continue.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Improve Team Output",
        body: "Encourage your team with AI-powered tools from Infra-AI. Come back and explore.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Your AI Dashboard Awaits",
        body: "Return to Infra-AI to view new insights and performance metrics.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Smart Tools Ready",
        body: "Infra-AI tools are ready to help boost efficiency across your company. Revisit now.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "AI That Works for You",
        body: "Let Infra-AI handle repetitive work. Return to continue improving operations.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Level Up Productivity",
        body: "Your company can achieve more with Infra-AI. Revisit and unlock AI-powered insights.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Your Daily AI Boost",
        body: "Start your day with smarter tools — revisit Infra-AI now.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "AI Improvements Waiting",
        body: "Infra-AI has new optimizations ready for you. Come back and check them out.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
  {
    web: {
      notification: {
        title: "Enhance Your Strategy",
        body: "Use Infra-AI to improve company strategy through intelligent insights. Revisit today.",
      },
      data: { url: "https://infra-ai-dun.vercel.app/app" },
    },
  },
];
