import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PersonalInfo } from "@shared/schema";

interface DrivingInfoFormProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
}

const DrivingInfoForm = ({ personalInfo, setPersonalInfo }: DrivingInfoFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Informazioni di Mobilità
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="driving-license">Patente di guida</Label>
            <Input
              id="driving-license"
              placeholder="Es. B, A, C..."
              value={personalInfo.drivingLicense || ''}
              onChange={(e) => 
                setPersonalInfo({ ...personalInfo, drivingLicense: e.target.value })
              }
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="has-car"
              checked={personalInfo.hasCar}
              onCheckedChange={(checked) => 
                setPersonalInfo({ ...personalInfo, hasCar: checked })
              }
            />
            <Label htmlFor="has-car" className="cursor-pointer">Automunito</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrivingInfoForm;