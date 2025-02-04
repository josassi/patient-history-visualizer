import { PatientOverview } from "@/components/PatientOverview";
import { MedicalHistoryTable } from "@/components/MedicalHistoryTable";
import { ClinicalNotes } from "@/components/ClinicalNotes";

const medicalConditions = [
  {
    name: "emphysema",
    full_name: "Pathological accumulation of air in tissues",
    assertion: null,
    date: "2012-03-22",
    patient: 123456,
    snomed_id: "49158009"
  },
  {
    name: "usual interstitial pneumonia",
    full_name: "Usual Interstitial Pneumonia",
    assertion: "negative",
    date: "2012-03-22",
    patient: 123456,
    snomed_id: ""
  },
  {
    name: "UIP",
    full_name: "Usual Interstitial Pneumonia",
    assertion: "negative",
    date: "2012-03-22",
    patient: 123456,
    snomed_id: ""
  },
  {
    name: "Langerhans cell histiocytosis",
    full_name: "Histiocytosis, Langerhans-Cell",
    assertion: null,
    date: "2012-03-22",
    patient: 123456,
    snomed_id: "65399007"
  }
];

const summary = "The patient, a now 51-year-old male, presented in 2012 with acute left-sided chest pain with characteristics consistent with a potential cardiac or pulmonary condition, with a background of significant smoking history and a family history of premature cardiac disease. Diagnoses at the time leaned towards pulmonary conditions like emphysema and the possibility of Langerhans cell histiocytosis, though with some ambiguities. Current follow-ups and evaluations since are important to ascertain his status as of now, in 2025, and whether proactive interventions or management strategies were implemented, particularly focused on cardiovascular and pulmonary health.";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <PatientOverview
          name="John Doe"
          age={51}
          gender="Male"
          smokingHistory={true}
          familyHistory="Premature cardiac disease"
          lastFollowUp="2025"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-medical-text">Medical History</h2>
            <MedicalHistoryTable conditions={medicalConditions} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-medical-text">Clinical Notes</h2>
            <ClinicalNotes summary={summary} rawNotes="*xxx*" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;