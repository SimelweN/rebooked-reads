import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  BURSARIES,
  BURSARY_FIELDS_OF_STUDY,
} from "@/constants/enhancedBursaries";
import { PROVINCES } from "@/constants/bursaries";
import { BursaryFilters } from "@/types/university";

const BursaryListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<BursaryFilters>({});
  const [expandedBursary, setExpandedBursary] = useState<string | null>(null);

  const filteredBursaries = useMemo(() => {
    return BURSARIES.filter((bursary) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        bursary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bursary.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bursary.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Field of study filter
      const matchesField =
        !filters.fieldOfStudy ||
        bursary.fieldsOfStudy.includes("All fields") ||
        bursary.fieldsOfStudy.includes(filters.fieldOfStudy);

      // Province filter
      const matchesProvince =
        !filters.province ||
        bursary.provinces.includes("All provinces") ||
        bursary.provinces.includes(filters.province);

      // Financial need filter
      const matchesFinancialNeed =
        filters.financialNeed === undefined ||
        bursary.requirements.financialNeed === filters.financialNeed;

      // Study level filter
      const matchesStudyLevel =
        !filters.studyLevel ||
        filters.studyLevel === "any" ||
        (filters.studyLevel === "grade-11" &&
          bursary.studyLevel?.includes("grade-11")) ||
        (filters.studyLevel === "matric" &&
          bursary.studyLevel?.includes("matric")) ||
        (filters.studyLevel === "undergraduate" &&
          (bursary.fieldsOfStudy.some((field) =>
            field.toLowerCase().includes("undergraduate"),
          ) ||
            !bursary.fieldsOfStudy.some((field) =>
              field.toLowerCase().includes("postgraduate"),
            ))) ||
        (filters.studyLevel === "postgraduate" &&
          bursary.fieldsOfStudy.some((field) =>
            field.toLowerCase().includes("postgraduate"),
          ));

      // Minimum marks filter
      const matchesMinMarks = (() => {
        if (!filters.minMarks) return true;

        // Check structured requirements first
        if (bursary.requirements.minimumMarks !== undefined) {
          return bursary.requirements.minimumMarks <= filters.minMarks;
        }

        // Parse marks from eligibility criteria text and academic requirements
        const academicTexts = [
          ...(bursary.requirements?.academicRequirement
            ? [bursary.requirements.academicRequirement]
            : []),
          ...bursary.eligibilityCriteria.filter(
            (criteria) =>
              criteria.toLowerCase().includes("%") ||
              criteria.toLowerCase().includes("average") ||
              criteria.toLowerCase().includes("minimum") ||
              criteria.toLowerCase().includes("academic"),
          ),
        ];

        for (const text of academicTexts) {
          // Extract percentage like "Minimum 70% average" or "Academic average ≥ 75%"
          const marksMatch = text.match(/(\d+)%/);
          if (marksMatch) {
            const extractedMarks = parseInt(marksMatch[1]);
            return extractedMarks <= filters.minMarks;
          }
        }

        return true; // If no marks requirement found, don't filter out
      })();

      // Maximum household income filter
      const matchesHouseholdIncome = (() => {
        if (!filters.maxHouseholdIncome) return true;

        // Check structured requirements first
        if (bursary.requirements.maxHouseholdIncome !== undefined) {
          return (
            bursary.requirements.maxHouseholdIncome >=
            filters.maxHouseholdIncome
          );
        }

        // Parse income from eligibility criteria text
        const incomeText = bursary.eligibilityCriteria.find(
          (criteria) =>
            criteria.toLowerCase().includes("income") ||
            criteria.toLowerCase().includes("household") ||
            criteria.toLowerCase().includes("r"),
        );

        if (incomeText) {
          // Extract number from text like "Combined household income ≤ R200,000"
          const incomeMatch = incomeText.match(/R?[\s]*(\d[\d,\s]*)/);
          if (incomeMatch) {
            const extractedIncome = parseInt(
              incomeMatch[1].replace(/[,\s]/g, ""),
            );
            return extractedIncome >= filters.maxHouseholdIncome;
          }
        }

        return true; // If no income requirement found, don't filter out
      })();

      // Gender filter
      const matchesGender =
        !filters.genderSpecific ||
        filters.genderSpecific === "any" ||
        !bursary.requirements.genderSpecific ||
        bursary.requirements.genderSpecific === filters.genderSpecific;

      // Race filter
      const matchesRace =
        !filters.raceSpecific ||
        filters.raceSpecific === "any" ||
        !bursary.requirements.raceSpecific ||
        bursary.requirements.raceSpecific === filters.raceSpecific;

      // Special criteria filters
      const matchesDisabilitySupport =
        !filters.disabilitySupport ||
        bursary.requirements.disabilitySupport === true;

      const matchesRuralBackground =
        !filters.ruralBackground ||
        bursary.requirements.ruralBackground === true;

      const matchesFirstGeneration =
        !filters.firstGeneration ||
        bursary.requirements.firstGeneration === true;

      return (
        matchesSearch &&
        matchesField &&
        matchesProvince &&
        matchesFinancialNeed &&
        matchesStudyLevel &&
        matchesMinMarks &&
        matchesHouseholdIncome &&
        matchesGender &&
        matchesRace &&
        matchesDisabilitySupport &&
        matchesRuralBackground &&
        matchesFirstGeneration
      );
    });
  }, [searchTerm, filters]);

  const updateFilter = (
    key: keyof BursaryFilters,
    value: string | boolean | undefined,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
  };

  const getApplicationStatus = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return { status: "closed", message: "Application closed", color: "red" };
    } else if (daysDiff <= 30) {
      return {
        status: "closing",
        message: `${daysDiff} days left`,
        color: "orange",
      };
    } else {
      return { status: "open", message: "Application open", color: "green" };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-book-800">
          Bursary Opportunities
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
          Find financial assistance for your studies with comprehensive bursary
          listings from government, corporate sponsors, and educational
          institutions.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <CardTitle className="text-lg sm:text-xl">
                Find Your Perfect Bursary
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Use the filters below to find bursaries that match your needs
                and eligibility.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 min-h-[44px] w-full sm:w-auto"
                >
                  <Info className="h-4 w-4" />
                  <span className="text-sm">Info</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Understanding Bursaries & Scholarships
                  </DialogTitle>
                  <DialogDescription>
                    Everything you need to know about financial aid for your
                    education
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What are Bursaries?</h4>
                    <p>
                      Bursaries are financial assistance programs that help
                      students pay for their education. Unlike loans, bursaries
                      typically don't need to be repaid, making them an
                      excellent form of financial aid.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Types of Bursaries:</h4>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>
                        <strong>Government Bursaries:</strong> Funded by
                        government departments (e.g., NSFAS, Department of
                        Education)
                      </li>
                      <li>
                        <strong>Corporate Bursaries:</strong> Offered by private
                        companies, often requiring work-back agreements
                      </li>
                      <li>
                        <strong>Merit-based:</strong> Awarded based on academic
                        excellence or special talents
                      </li>
                      <li>
                        <strong>Need-based:</strong> Given to students with
                        demonstrated financial need
                      </li>
                      <li>
                        <strong>Field-specific:</strong> For students pursuing
                        particular careers (e.g., teaching, engineering)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      Public vs Private Bursaries:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded">
                        <h5 className="font-medium text-blue-800">
                          Public Bursaries
                        </h5>
                        <ul className="text-blue-700 text-xs mt-1 space-y-1">
                          <li>• Government-funded (NSFAS, Funza Lushaka)</li>
                          <li>• Often covers full tuition + living costs</li>
                          <li>• Based on household income limits</li>
                          <li>• May require community service</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <h5 className="font-medium text-green-800">
                          Private Bursaries
                        </h5>
                        <ul className="text-green-700 text-xs mt-1 space-y-1">
                          <li>• Company/foundation-funded</li>
                          <li>• Often require work-back periods</li>
                          <li>• May focus on specific fields</li>
                          <li>• Competitive selection process</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Application Tips:</h4>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>
                        Apply early - most bursaries have strict deadlines
                      </li>
                      <li>
                        Read requirements carefully and ensure you qualify
                      </li>
                      <li>Prepare all required documents in advance</li>
                      <li>Write compelling motivation letters</li>
                      <li>
                        Apply for multiple bursaries to increase your chances
                      </li>
                      <li>
                        Keep track of application deadlines and requirements
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Important Note:
                    </h4>
                    <p className="text-yellow-700 text-xs">
                      Always verify bursary information directly with the
                      provider. Requirements and deadlines may change. Be wary
                      of scams - legitimate bursaries never ask for upfront
                      payments.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bursaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 min-h-[44px] text-sm sm:text-base"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Select
              value={filters.fieldOfStudy || "all"}
              onValueChange={(value) =>
                updateFilter(
                  "fieldOfStudy",
                  value === "all" ? undefined : value,
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Field of study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All fields</SelectItem>
                {BURSARY_FIELDS_OF_STUDY.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.province || "all"}
              onValueChange={(value) =>
                updateFilter("province", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All provinces</SelectItem>
                {PROVINCES.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Study Level Filter */}
            <Select
              value={filters.studyLevel || "any"}
              onValueChange={(value) =>
                updateFilter("studyLevel", value === "any" ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Study Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Level</SelectItem>
                <SelectItem value="grade-11">Grade 11</SelectItem>
                <SelectItem value="matric">Matric (Grade 12)</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="postgraduate">Postgraduate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {/* Minimum Marks */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Min. Academic Marks (%)
              </label>
              <Input
                type="number"
                placeholder="e.g. 65"
                min="0"
                max="100"
                value={filters.minMarks || ""}
                onChange={(e) =>
                  updateFilter(
                    "minMarks",
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            </div>

            {/* Max Household Income */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Max. Household Income (R)
              </label>
              <Input
                type="number"
                placeholder="e.g. 350000"
                min="0"
                value={filters.maxHouseholdIncome || ""}
                onChange={(e) =>
                  updateFilter(
                    "maxHouseholdIncome",
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            </div>

            {/* Gender Specific */}
            <Select
              value={filters.genderSpecific || "any"}
              onValueChange={(value) =>
                updateFilter(
                  "genderSpecific",
                  value === "any" ? undefined : value,
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Gender</SelectItem>
                <SelectItem value="female">Female Only</SelectItem>
                <SelectItem value="male">Male Only</SelectItem>
              </SelectContent>
            </Select>

            {/* Race Specific */}
            <Select
              value={filters.raceSpecific || "any"}
              onValueChange={(value) =>
                updateFilter(
                  "raceSpecific",
                  value === "any" ? undefined : value,
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Race" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Race</SelectItem>
                <SelectItem value="african">African</SelectItem>
                <SelectItem value="coloured">Coloured</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearFilters} className="w-full min-h-[44px] text-sm sm:text-base">
              Clear All Filters
            </Button>
          </div>

          {/* Special Criteria Checkboxes removed as per requirements */}
        </CardContent>
      </Card>

      {/* High School Alert */}
      {(filters.studyLevel === "grade-11" ||
        filters.studyLevel === "matric") && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>High School Students:</strong> Showing bursaries
            specifically for Grade 11 and Matric students. Look for highlighted
            academic requirements and household income limits in the eligibility
            criteria below.
          </AlertDescription>
        </Alert>
      )}

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-0">
        <span className="text-sm sm:text-base text-gray-600">
          Found <strong>{filteredBursaries.length}</strong> bursaries matching
          your criteria
          {(filters.studyLevel === "grade-11" ||
            filters.studyLevel === "matric") &&
            ` (including ${filteredBursaries.filter((b) => b.studyLevel?.includes("grade-11") || b.studyLevel?.includes("matric")).length} high school bursaries)`}
        </span>
        {filteredBursaries.length > 0 && (
          <Badge variant="outline">
            {
              filteredBursaries.filter((b) => b.requirements?.financialNeed)
                .length
            }{" "}
            need-based
          </Badge>
        )}
      </div>

      {/* Bursary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredBursaries.map((bursary) => {
          const applicationStatus = getApplicationStatus(
            bursary.applicationDeadline,
          );
          const isExpanded = expandedBursary === bursary.id;

          return (
            <Card
              key={bursary.id}
              className={`hover:shadow-lg transition-shadow ${
                bursary.studyLevel?.includes("grade-11") ||
                bursary.studyLevel?.includes("matric")
                  ? "border-blue-300 bg-blue-50/50"
                  : ""
              }`}
            >
              <CardHeader className="pb-3 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg font-semibold text-book-800 leading-tight">
                      {bursary.name}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                      {bursary.provider}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(bursary.studyLevel?.includes("grade-11") ||
                      bursary.studyLevel?.includes("matric")) && (
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-700 border-blue-300"
                      >
                        🎓 High School
                      </Badge>
                    )}
                    <Badge
                      variant={
                        applicationStatus.status === "open"
                          ? "default"
                          : applicationStatus.status === "closing"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {applicationStatus.message}
                    </Badge>
                  </div>
                </div>

                {/* Amount / Benefits */}
                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 text-green-800 px-3 py-2 flex items-center gap-2 text-sm sm:text-base font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span className="leading-snug">{bursary.amount}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{bursary.description}</p>

                {/* Key Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium">
                      {bursary.applicationDeadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Provinces:</span>
                    <span className="font-medium">
                      {bursary.provinces.includes("All provinces")
                        ? "All"
                        : bursary.provinces.slice(0, 2).join(", ")}
                      {bursary.provinces.length > 2 &&
                        !bursary.provinces.includes("All provinces") &&
                        "..."}
                    </span>
                  </div>
                </div>

                {/* Fields of Study */}
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    Fields of Study:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {bursary.fieldsOfStudy.slice(0, 3).map((field, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {field}
                      </Badge>
                    ))}
                    {bursary.fieldsOfStudy.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{bursary.fieldsOfStudy.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setExpandedBursary(isExpanded ? null : bursary.id)
                  }
                  className="w-full min-h-[44px] text-sm sm:text-base"
                >
                  {isExpanded ? "Show Less" : "View Details & Requirements"}
                </Button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                    {/* Eligibility Criteria */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Eligibility Criteria:
                      </h4>

                      {/* High School Special Requirements */}
                      {(bursary.studyLevel?.includes("grade-11") ||
                        bursary.studyLevel?.includes("matric")) && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-3 border border-blue-200">
                          <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                            🎓 High School Student Requirements:
                          </h5>
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            {bursary.requirements?.academicRequirement && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-700">
                                  Academic:
                                </span>
                                <span className="text-blue-600">
                                  {bursary.requirements.academicRequirement}
                                </span>
                              </div>
                            )}
                            {bursary.eligibilityCriteria.find(
                              (c) =>
                                c.toLowerCase().includes("income") ||
                                c.toLowerCase().includes("r"),
                            ) && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-700">
                                  Income:
                                </span>
                                <span className="text-blue-600">
                                  {bursary.eligibilityCriteria.find(
                                    (c) =>
                                      c.toLowerCase().includes("income") ||
                                      c.toLowerCase().includes("r"),
                                  )}
                                </span>
                              </div>
                            )}
                            {bursary.studyLevel?.includes("grade-11") &&
                            bursary.studyLevel?.includes("matric") ? (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-700">
                                  Study Level:
                                </span>
                                <span className="text-blue-600">
                                  Grade 11 & Matric Students
                                </span>
                              </div>
                            ) : bursary.studyLevel?.includes("grade-11") ? (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-700">
                                  Study Level:
                                </span>
                                <span className="text-blue-600">
                                  Grade 11 Students
                                </span>
                              </div>
                            ) : bursary.studyLevel?.includes("matric") ? (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-blue-700">
                                  Study Level:
                                </span>
                                <span className="text-blue-600">
                                  Matric/Grade 12 Students
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}

                      <ul className="space-y-1">
                        {bursary.eligibilityCriteria.map((criteria, index) => (
                          <li
                            key={index}
                            className={`text-sm flex items-start gap-2 ${
                              criteria.toLowerCase().includes("grade") ||
                              criteria.toLowerCase().includes("matric") ||
                              criteria.toLowerCase().includes("%") ||
                              criteria.toLowerCase().includes("average") ||
                              criteria.toLowerCase().includes("income")
                                ? "text-blue-700 font-medium bg-blue-50 p-2 rounded"
                                : "text-gray-600"
                            }`}
                          >
                            <span
                              className={
                                criteria.toLowerCase().includes("grade") ||
                                criteria.toLowerCase().includes("matric") ||
                                criteria.toLowerCase().includes("%") ||
                                criteria.toLowerCase().includes("average") ||
                                criteria.toLowerCase().includes("income")
                                  ? "text-blue-600 mt-1"
                                  : "text-green-600 mt-1"
                              }
                            >
                              •
                            </span>
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Process */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        Application Process:
                      </h4>
                      <p className="text-sm text-gray-600">
                        {bursary.applicationProcess}
                      </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Contact Information:
                      </h4>
                      <p className="text-sm text-blue-700">
                        {bursary.contactInfo}
                      </p>
                      {bursary.website && (
                        <a
                          href={bursary.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBursaries.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="text-gray-400 mb-4">
            <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No bursaries found
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Try adjusting your search terms or filters to find more bursaries.
          </p>
          <Button variant="outline" onClick={clearFilters} className="min-h-[44px]">
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Important Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Application deadlines and requirements may
          change. Always verify information directly with the bursary provider
          before applying. Start your applications early to avoid missing
          deadlines.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BursaryListing;
