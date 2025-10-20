import { useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ExternalLink,
  GraduationCap,
  MapPin,
  TrendingUp,
} from "lucide-react";
import type { PrivateInstitution, Program } from "@/types/privateInstitution";
import { Link } from "react-router-dom";

interface PrivateProgramDetailModalProps {
  program: Program | null;
  institution: PrivateInstitution | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatType = (t?: Program["type"]) => (t ? t.replace(/-/g, " ") : "");

const PrivateProgramDetailModal: React.FC<PrivateProgramDetailModalProps> = ({ program, institution, isOpen, onClose }) => {
  const metaBadges = useMemo(() => {
    if (!program) return [] as Array<{ label: string; icon?: React.ReactNode; className?: string }>;
    const items: Array<{ label: string; icon?: React.ReactNode; className?: string }> = [];
    if (program.duration) items.push({ label: program.duration, icon: <Calendar className="h-3 w-3 mr-1" /> });
    if (program.nqfLevel) items.push({ label: `NQF ${program.nqfLevel}` });
    if (typeof program.credits === "number") items.push({ label: `${program.credits} credits` });
    if (program.mode)
      items.push({ label: Array.isArray(program.mode) ? program.mode.join(" • ") : program.mode, className: "capitalize" });
    return items;
  }, [program]);

  if (!program || !institution) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-[90vw] sm:max-w-2xl lg:max-w-4xl max-h-[85vh] mx-auto my-auto overflow-y-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl mb-2 break-words">
                {program.name}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {institution.name}
                {program.faculty ? ` • ${program.faculty}` : ""}
              </DialogDescription>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
                {metaBadges.map((b, idx) => (
                  <Badge key={idx} variant="secondary" className={`bg-book-100 text-book-700 text-xs sm:text-sm ${b.className || ""}`}>
                    {b.icon}
                    {b.label}
                  </Badge>
                ))}
                {program.type && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm capitalize">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {formatType(program.type)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full mt-6">
          <div className="block sm:hidden">
            <TabsList className="bg-transparent p-1 h-auto w-full flex flex-col space-y-1 rounded-lg">
              <TabsTrigger value="overview" className="w-full rounded-lg py-2 px-3 data-[state=active]:bg-book-50 data-[state=active]:text-book-700 text-sm">Overview</TabsTrigger>
              <TabsTrigger value="structure" className="w-full rounded-lg py-2 px-3 data-[state=active]:bg-book-50 data-[state=active]:text-book-700 text-sm">Program Details</TabsTrigger>
              <TabsTrigger value="accreditation" className="w-full rounded-lg py-2 px-3 data-[state=active]:bg-book-50 data-[state=active]:text-book-700 text-sm">Accreditation</TabsTrigger>
              <TabsTrigger value="resources" className="w-full rounded-lg py-2 px-3 data-[state=active]:bg-book-50 data-[state=active]:text-book-700 text-sm">Resources</TabsTrigger>
            </TabsList>
          </div>

          <div className="hidden sm:block">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="structure">Program Details</TabsTrigger>
              <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-book-500" />
                    Program Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {program.description ? (
                    <p className="text-gray-700 leading-relaxed">{program.description}</p>
                  ) : (
                    <p className="text-gray-600">No description available for this program yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-book-500" />
                    Program Structure & Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Qualification Type</span>
                      <span className="text-book-600 capitalize">{program.qualification || formatType(program.type)}</span>
                    </div>
                    {program.duration && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Duration</span>
                        <span className="text-book-600">{program.duration}</span>
                      </div>
                    )}
                    {program.mode && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Mode</span>
                        <span className="text-book-600 capitalize">{Array.isArray(program.mode) ? program.mode.join(" • ") : program.mode}</span>
                      </div>
                    )}
                    {program.nqfLevel && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">NQF Level</span>
                        <span className="text-book-600">{program.nqfLevel}</span>
                      </div>
                    )}
                    {typeof program.credits === "number" && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Credits</span>
                        <span className="text-book-600">{program.credits}</span>
                      </div>
                    )}
                    {program.campus && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Campus</span>
                        <span className="text-book-600 flex items-center"><MapPin className="h-4 w-4 mr-1" />{program.campus}</span>
                      </div>
                    )}
                    {institution.locations && institution.locations.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium mb-1">Locations</div>
                        <div className="text-book-600 text-sm">
                          {institution.locations.join(" • ")}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accreditation" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-book-500" />
                    Accreditation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {institution.accreditation && institution.accreditation.length > 0 ? (
                    <div className="space-y-3">
                      {institution.accreditation.map((acc, idx) => (
                        <div key={idx} className="flex items-start p-3 bg-book-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-book-500 mr-2 mt-0.5" />
                          <div>
                            <div className="font-medium">{acc.body}</div>
                            {acc.accreditationId && (
                              <div className="text-sm text-gray-600">Accreditation ID: {acc.accreditationId}</div>
                            )}
                            {acc.status && (
                              <div className="text-sm text-gray-600">Status: {acc.status}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Accreditation information for this institution is not available.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-book-500" />
                    Helpful Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {program.website && (
                      <Button variant="outline" asChild>
                        <a href={program.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Program Website
                        </a>
                      </Button>
                    )}
                    {institution.contact?.website && (
                      <Button variant="outline" asChild>
                        <a href={institution.contact.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Institution Website
                        </a>
                      </Button>
                    )}
                    <Button className="bg-book-600 hover:bg-book-700" asChild>
                      <Link to={`/books?search=${encodeURIComponent(institution.abbreviation || institution.name)}`}>
                        <BookOpen className="h-4 w-4 mr-2" /> Find Textbooks
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="block sm:hidden pt-6 border-t space-y-3">
          <div className="flex flex-col gap-3">
            {institution.contact?.website && (
              <Button variant="outline" className="w-full" asChild>
                <a href={institution.contact.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Institution Website
                </a>
              </Button>
            )}
            <Button className="bg-book-600 hover:bg-book-700 w-full" asChild>
              <Link to={`/books?search=${encodeURIComponent(institution.abbreviation || institution.name)}`}>
                <BookOpen className="h-4 w-4 mr-2" /> Find Textbooks
              </Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">Close</Button>
          </div>
        </div>

        <div className="hidden sm:flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <div className="flex gap-3">
            {institution.contact?.website && (
              <Button variant="outline" asChild>
                <a href={institution.contact.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Institution Website
                </a>
              </Button>
            )}
            <Button className="bg-book-600 hover:bg-book-700" asChild>
              <Link to={`/books?search=${encodeURIComponent(institution.abbreviation || institution.name)}`}>
                <BookOpen className="h-4 w-4 mr-2" /> Find Textbooks
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateProgramDetailModal;
