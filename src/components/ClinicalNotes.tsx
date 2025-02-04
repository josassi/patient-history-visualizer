import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ClinicalNotesProps {
  summary: string;
  rawNotes: string;
}

export const ClinicalNotes = ({ summary, rawNotes }: ClinicalNotesProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="w-full">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="raw">Raw Notes</TabsTrigger>
        </TabsList>
        <CardContent className="pt-4">
          <div className="mb-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-medical-muted" />
            <Input
              placeholder="Search in notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <TabsContent value="summary" className="mt-0">
            <div className="prose max-w-none">
              <p className="text-medical-text whitespace-pre-line">
                {highlightText(summary)}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="raw" className="mt-0">
            <div className="prose max-w-none">
              <p className="text-medical-text whitespace-pre-line">
                {highlightText(rawNotes || "*No raw notes available*")}
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};