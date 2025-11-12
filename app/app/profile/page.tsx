import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type UserProfile = {
  _id: string;
  name?: string;
  email: string;
  userDesc: string;
  domains: string[];
};

const dummyUser: UserProfile = {
  _id: "68dbc35b74f6a60d9d5784db",
  email: "iamdk353@gmail.com",
  userDesc:
    "A student interested in Agriculture and Finance seeks expert advice from an AI acting as a generalist advisor, preferring detailed explanations and real-time solutions. They are comfortable with intermediate technical details, do not want suggestions beyond their chosen domains, and desire personalized recommendations based on weekly usage.",
  domains: ["Agriculture", "Finance"],
};

export default function Page() {
  return (
    <Card className="w-full max-w-md mx-auto mt-6 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {dummyUser.name || "User Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{dummyUser.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-sm text-gray-700">{dummyUser.userDesc}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Domains</p>
          <div className="flex gap-2 flex-wrap">
            {dummyUser.domains.map((d, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
