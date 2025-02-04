import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc } from "lucide-react";

interface MedicalCondition {
  name: string;
  full_name: string;
  assertion: string | null;
  date: string;
  patient: number;
  snomed_id: string | number;
}

interface MedicalHistoryTableProps {
  conditions: MedicalCondition[];
}

export const MedicalHistoryTable = ({ conditions }: MedicalHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MedicalCondition;
    direction: "asc" | "desc";
  }>({ key: "date", direction: "desc" });
  const [assertionFilter, setAssertionFilter] = useState<string>("all");

  const filteredAndSortedConditions = conditions
    .filter((condition) => {
      const matchesSearch =
        condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        condition.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(condition.snomed_id)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesAssertion =
        assertionFilter === "all" ||
        condition.assertion === assertionFilter ||
        (assertionFilter === "null" && condition.assertion === null);
      return matchesSearch && matchesAssertion;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (key: keyof MedicalCondition) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-medical-muted" />
          <Input
            placeholder="Search conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={assertionFilter}
          onValueChange={(value) => setAssertionFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by assertion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All assertions</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
            <SelectItem value="null">Unspecified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Condition
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Assertion</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>SNOMED ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedConditions.map((condition, index) => (
              <TableRow
                key={index}
                className={
                  condition.assertion === "positive"
                    ? "bg-red-50"
                    : condition.assertion === "negative"
                    ? "bg-green-50"
                    : ""
                }
              >
                <TableCell className="font-medium">{condition.name}</TableCell>
                <TableCell>{condition.full_name}</TableCell>
                <TableCell>
                  {condition.assertion === null ? "Unspecified" : condition.assertion}
                </TableCell>
                <TableCell>{new Date(condition.date).toLocaleDateString()}</TableCell>
                <TableCell>{condition.snomed_id || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};