import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Cigarette, Users } from "lucide-react";

interface PatientOverviewProps {
  name: string;
  age: number;
  gender: string;
  smokingHistory: boolean;
  familyHistory: string;
  lastFollowUp: string;
}

export const PatientOverview = ({
  name,
  age,
  gender,
  smokingHistory,
  familyHistory,
  lastFollowUp,
}: PatientOverviewProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-medical-text">
          Patient Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-medical-text">Demographics</h3>
            <p className="text-sm text-medical-muted">
              {name} • {age} years • {gender}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cigarette className="h-4 w-4 text-medical-critical" />
              <span className="text-sm">
                {smokingHistory ? "Positive smoking history" : "No smoking history"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-medical-highlight" />
              <span className="text-sm">{familyHistory}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-medical-muted" />
              <span className="text-sm">Last follow-up: {lastFollowUp}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};