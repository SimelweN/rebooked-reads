import { Bursary } from "@/types/university";

export const EXTRA_BURSARIES: Bursary[] = [
  // Government, Agencies & Municipalities
  {
    id: "sanral-2025",
    name: "SANRAL Bursary",
    provider: "South African National Roads Agency (SANRAL)",
    description: "Bursary supporting studies in civil engineering and transport infrastructure aligned fields.",
    amount: "Full tuition + accommodation + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying civil engineering or related infrastructure field",
      "Strong academic performance",
      "Willingness to complete vacation work/internships"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply online at www.nra.co.za/bursaries",
    contactInfo: "012 844 8000 | info@nra.co.za",
    website: "https://www.nra.co.za/bursaries/",
    fieldsOfStudy: ["Civil Engineering", "Transport", "Construction Management"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "sarb-2025",
    name: "South African Reserve Bank (SARB) Bursary",
    provider: "South African Reserve Bank",
    description: "Bursary for economics, finance, actuarial science and related studies.",
    amount: "Full tuition + allowances + mentorship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying economics, finance, actuarial science, mathematics or related",
      "Strong academic performance"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply online at www.resbank.co.za",
    contactInfo: "bursaries@resbank.co.za",
    website: "https://www.resbank.co.za/en/home/careers/bursaries/",
    fieldsOfStudy: ["Economics", "Finance", "Actuarial Science", "Mathematics"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: true },
    isActive: true,
    priority: "high"
  },
  {
    id: "idc-2025",
    name: "IDC Bursary Programme",
    provider: "Industrial Development Corporation",
    description: "Comprehensive bursary for engineering, science and commerce fields supporting industrial growth.",
    amount: "Full tuition + accommodation + stipend + books",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, science or commerce fields",
      "Academic excellence",
      "Financial need"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply online at www.idc.co.za",
    contactInfo: "bursary@idc.co.za",
    website: "https://www.idc.co.za/bursary-programme/",
    fieldsOfStudy: ["Engineering", "Sciences", "Commerce"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: true },
    isActive: true,
    priority: "high"
  },
  {
    id: "sanbi-2025",
    name: "SANBI Bursary",
    provider: "South African National Biodiversity Institute",
    description: "Funding for biodiversity, conservation biology and environmental sciences.",
    amount: "Tuition + research support + stipend",
    eligibilityCriteria: [
      "South African citizen",
      "Studying biodiversity, conservation, environmental science or related",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via SANBI opportunities page",
    contactInfo: "info@sanbi.org.za",
    website: "https://www.sanbi.org/opportunities/",
    fieldsOfStudy: ["Environmental Science", "Conservation Biology", "Biodiversity"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "sanparks-2025",
    name: "SANParks Bursary",
    provider: "South African National Parks",
    description: "Support for conservation, tourism and environmental management studies.",
    amount: "Tuition + allowances + experiential training",
    eligibilityCriteria: [
      "South African citizen",
      "Studying conservation, tourism, environmental management",
      "Academic merit",
      "Willingness to complete in-park training"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply via SANParks careers",
    contactInfo: "communications@sanparks.org",
    website: "https://www.sanparks.org/about/careers/",
    fieldsOfStudy: ["Conservation", "Tourism", "Environmental Management"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "dws-2025",
    name: "Department of Water and Sanitation Bursary",
    provider: "Department of Water and Sanitation",
    description: "Bursary for civil, hydrology and water-related engineering disciplines.",
    amount: "Full tuition + accommodation + stipend",
    eligibilityCriteria: [
      "South African citizen",
      "Studying civil engineering, hydrology or water sciences",
      "Academic merit",
      "Financial need"
    ],
    applicationDeadline: "31 October annually",
    applicationProcess: "Apply via DWS bursaries page",
    contactInfo: "info@dws.gov.za",
    website: "https://www.dws.gov.za/careers/bursaries.aspx",
    fieldsOfStudy: ["Civil Engineering", "Hydrology", "Water Science"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 60% average", financialNeed: true },
    isActive: true,
    priority: "high"
  },
  {
    id: "rand-water-2025",
    name: "Rand Water Bursary",
    provider: "Rand Water",
    description: "Bursary for engineering, science and water sector studies.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering or science relevant to water sector",
      "Academic merit"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply at www.randwater.co.za",
    contactInfo: "info@randwater.co.za",
    website: "https://www.randwater.co.za/Pages/Careers.aspx",
    fieldsOfStudy: ["Chemical Engineering", "Civil Engineering", "Environmental Science"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "umgeni-water-2025",
    name: "Umgeni Water Bursary",
    provider: "Umgeni Water",
    description: "Funding for engineering, environmental and water sciences studies.",
    amount: "Tuition + allowances + experiential training",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, environmental or water sciences",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via Umgeni Water careers",
    contactInfo: "recruitment@umgeni.co.za",
    website: "https://www.umgeni.co.za/careers/",
    fieldsOfStudy: ["Civil Engineering", "Environmental Science", "Hydrology"],
    provinces: ["KwaZulu-Natal", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "tcta-2025",
    name: "TCTA Bursary",
    provider: "Trans-Caledon Tunnel Authority (TCTA)",
    description: "Bursary for civil engineering and water resource management.",
    amount: "Tuition + allowance + internship opportunities",
    eligibilityCriteria: [
      "South African citizen",
      "Studying civil engineering, project management, water resources",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via TCTA vacancies/bursaries",
    contactInfo: "info@tcta.co.za",
    website: "https://www.tcta.co.za/",
    fieldsOfStudy: ["Civil Engineering", "Project Management", "Water Resources"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "acsa-2025",
    name: "ACSA Bursary",
    provider: "Airports Company South Africa",
    description: "Bursary for engineering, aviation and business studies.",
    amount: "Full tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, aviation or business-related fields",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via ACSA careers",
    contactInfo: "careers@airports.co.za",
    website: "https://www.airports.co.za/careers",
    fieldsOfStudy: ["Electrical Engineering", "Mechanical Engineering", "Aviation Management", "Finance"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "atns-2025",
    name: "ATNS Bursary",
    provider: "Air Traffic and Navigation Services",
    description: "Funding for air traffic services, engineering and related studies.",
    amount: "Tuition + stipend + training",
    eligibilityCriteria: [
      "South African citizen",
      "Studying air traffic management, engineering or IT",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply at www.atns.com",
    contactInfo: "recruitment@atns.co.za",
    website: "https://www.atns.com/careers",
    fieldsOfStudy: ["Air Traffic Management", "Electrical Engineering", "IT"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "prasa-2025",
    name: "PRASA Bursary",
    provider: "Passenger Rail Agency of South Africa",
    description: "Bursary for engineering, logistics and rail-related studies.",
    amount: "Tuition + allowances + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, logistics, supply chain or related",
      "Academic merit"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply via PRASA careers/bursaries",
    contactInfo: "info@prasa.com",
    website: "https://www.prasa.com/",
    fieldsOfStudy: ["Mechanical Engineering", "Electrical Engineering", "Logistics", "Supply Chain"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "medium"
  },

  // Mining & Resources
  {
    id: "exxaro-2025",
    name: "Exxaro Bursary Programme",
    provider: "Exxaro Resources",
    description: "Comprehensive bursary for mining-related engineering and geology.",
    amount: "Full tuition + accommodation + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying mining engineering, metallurgy, geology or related",
      "Academic excellence"
    ],
    applicationDeadline: "31 May annually",
    applicationProcess: "Apply online at www.exxaro.com",
    contactInfo: "careers@exxaro.com",
    website: "https://www.exxaro.com/careers/bursaries/",
    fieldsOfStudy: ["Mining Engineering", "Metallurgy", "Geology", "Mechanical Engineering"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "glencore-2025",
    name: "Glencore Bursary",
    provider: "Glencore South Africa",
    description: "Bursaries for engineering and mining disciplines across operations.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, metallurgy, geology or related",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply at www.glencore.com/careers",
    contactInfo: "careers.za@glencore.com",
    website: "https://www.glencore.com/careers/students-and-graduates",
    fieldsOfStudy: ["Electrical Engineering", "Mechanical Engineering", "Mining", "Metallurgy", "Geology"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "debeers-2025",
    name: "De Beers Bursary",
    provider: "De Beers Group",
    description: "Support for engineering and earth sciences related to diamond mining.",
    amount: "Tuition + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, geology, metallurgy or related",
      "Academic excellence"
    ],
    applicationDeadline: "31 May annually",
    applicationProcess: "Apply at www.debeersgroup.com/careers",
    contactInfo: "careers@debeersgroup.com",
    website: "https://www.debeersgroup.com/careers",
    fieldsOfStudy: ["Mining Engineering", "Geology", "Metallurgy", "Mechanical Engineering"],
    provinces: ["Northern Cape", "Limpopo", "All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "kumba-iron-ore-2025",
    name: "Kumba Iron Ore Bursary",
    provider: "Anglo American Kumba Iron Ore",
    description: "Bursary for mining engineering and related technical disciplines.",
    amount: "Full tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying mining engineering or related",
      "Academic excellence"
    ],
    applicationDeadline: "31 May annually",
    applicationProcess: "Apply online via Anglo American bursaries",
    contactInfo: "careers@angloamerican.com",
    website: "https://www.angloamerican.com/careers/students-and-graduates",
    fieldsOfStudy: ["Mining Engineering", "Metallurgy", "Geology", "Electrical Engineering"],
    provinces: ["Northern Cape", "Limpopo", "All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "seriti-2025",
    name: "Seriti Bursary",
    provider: "Seriti Coal",
    description: "Bursary for engineering and mining disciplines in coal operations.",
    amount: "Tuition + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering or mining disciplines",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Seriti careers",
    contactInfo: "careers@seritiza.com",
    website: "https://www.seritiza.com/careers/",
    fieldsOfStudy: ["Mining Engineering", "Mechanical Engineering", "Electrical Engineering", "Geology"],
    provinces: ["Mpumalanga", "Free State", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "petra-diamonds-2025",
    name: "Petra Diamonds Bursary",
    provider: "Petra Diamonds",
    description: "Support for engineering, geology and mining studies.",
    amount: "Tuition + allowances + practical training",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, geology or mining",
      "Academic merit"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply via Petra Diamonds careers",
    contactInfo: "bursaries@petradiamonds.com",
    website: "https://www.petradiamonds.com/careers/training-and-development/",
    fieldsOfStudy: ["Mining Engineering", "Geology", "Mechanical Engineering", "Electrical Engineering"],
    provinces: ["Northern Cape", "Gauteng", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "northam-2025",
    name: "Northam Platinum Bursary",
    provider: "Northam Platinum",
    description: "Bursary for engineering disciplines within platinum mining.",
    amount: "Tuition + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying mining-related engineering",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Northam careers",
    contactInfo: "careers@northam.co.za",
    website: "https://www.northam.co.za/careers",
    fieldsOfStudy: ["Mining Engineering", "Mechanical Engineering", "Electrical Engineering"],
    provinces: ["Limpopo", "North West", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },

  // Corporate & Industry
  {
    id: "arcelormittal-2025",
    name: "ArcelorMittal South Africa Bursary",
    provider: "ArcelorMittal South Africa",
    description: "Bursary for metallurgical, mechanical, electrical and chemical engineering.",
    amount: "Full tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying relevant engineering disciplines",
      "Academic excellence"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via ArcelorMittal SA careers",
    contactInfo: "recruitment@arcelormittalsa.com",
    website: "https://www.arcelormittalsa.com/careers/bursaries/",
    fieldsOfStudy: ["Metallurgical Engineering", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering"],
    provinces: ["Gauteng", "KwaZulu-Natal", "All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "denel-2025",
    name: "Denel Bursary",
    provider: "Denel SOC Ltd",
    description: "Bursary for aerospace, defence engineering and technology studies.",
    amount: "Tuition + allowances + experiential training",
    eligibilityCriteria: [
      "South African citizen",
      "Studying aerospace, mechanical, electrical engineering or IT",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via Denel careers",
    contactInfo: "careers@denel.co.za",
    website: "https://www.denel.co.za/careers.php",
    fieldsOfStudy: ["Aerospace Engineering", "Mechanical Engineering", "Electrical Engineering", "Information Technology"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "toyota-2025",
    name: "Toyota South Africa Motors Bursary",
    provider: "Toyota South Africa Motors",
    description: "Bursary for engineering, IT and commerce fields within automotive industry.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, IT or commerce",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply at www.toyota.co.za/careers",
    contactInfo: "careers@toyota.co.za",
    website: "https://www.toyota.co.za/careers",
    fieldsOfStudy: ["Mechanical Engineering", "Industrial Engineering", "Information Technology", "Finance"],
    provinces: ["KwaZulu-Natal", "Gauteng", "All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: false },
    isActive: true,
    priority: "medium"
  },
  {
    id: "ford-2025",
    name: "Ford Motor Company of Southern Africa Bursary",
    provider: "Ford Motor Company of Southern Africa",
    description: "Support for engineering and IT studies in the automotive sector.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering or IT",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via Ford careers South Africa",
    contactInfo: "careers@ford.com",
    website: "https://corporate.ford.com/careers/locations/south-africa.html",
    fieldsOfStudy: ["Mechanical Engineering", "Industrial Engineering", "Information Technology"],
    provinces: ["Gauteng", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "vwsa-2025",
    name: "Volkswagen Group South Africa Bursary",
    provider: "Volkswagen Group South Africa",
    description: "Bursary for engineering, IT and commerce disciplines.",
    amount: "Tuition + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, IT or commerce",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via VW South Africa careers",
    contactInfo: "careers@vwsa.co.za",
    website: "https://www.vwsa.co.za/en/careers.html",
    fieldsOfStudy: ["Mechanical Engineering", "Industrial Engineering", "Information Technology", "Finance"],
    provinces: ["Eastern Cape", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "nissan-2025",
    name: "Nissan South Africa Bursary",
    provider: "Nissan South Africa",
    description: "Support for engineering and technology studies in automotive industry.",
    amount: "Tuition + allowances + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering or technology",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Nissan SA careers",
    contactInfo: "careers@nissan.co.za",
    website: "https://www.nissan.co.za/experience-nissan/careers.html",
    fieldsOfStudy: ["Mechanical Engineering", "Electrical Engineering", "Information Technology"],
    provinces: ["Gauteng", "All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "bp-2025",
    name: "BP South Africa Bursary",
    provider: "BP South Africa",
    description: "Bursary for engineering, geosciences and commercial disciplines.",
    amount: "Tuition + allowances + mentorship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, geosciences or commerce",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via BP careers",
    contactInfo: "careers@bp.com",
    website: "https://www.bp.com/en/global/corporate/careers.html",
    fieldsOfStudy: ["Chemical Engineering", "Mechanical Engineering", "Geology", "Finance"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "totalenergies-2025",
    name: "TotalEnergies South Africa Bursary",
    provider: "TotalEnergies South Africa",
    description: "Support for engineering, commerce and logistics studies.",
    amount: "Tuition + stipend + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, logistics or commerce",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via TotalEnergies careers",
    contactInfo: "recruitment@totalenergies.com",
    website: "https://totalenergies.co.za/careers",
    fieldsOfStudy: ["Chemical Engineering", "Mechanical Engineering", "Logistics", "Finance"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "engen-2025",
    name: "Engen Bursary",
    provider: "Engen Petroleum",
    description: "Bursary for engineering, logistics and finance studies in the energy sector.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying engineering, logistics or finance",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via Engen careers",
    contactInfo: "careers@engen.co.za",
    website: "https://www.engen.co.za/careers/",
    fieldsOfStudy: ["Chemical Engineering", "Mechanical Engineering", "Logistics", "Finance"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "low"
  },

  // Professional Services & Finance
  {
    id: "pwc-2025",
    name: "PwC Bursary",
    provider: "PricewaterhouseCoopers",
    description: "Bursary for accounting and CA(SA) stream students.",
    amount: "Tuition + allowances + SAICA traineeship pathway",
    eligibilityCriteria: [
      "South African citizen",
      "Studying accounting (CTA/CA stream)",
      "Academic excellence"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply at www.pwc.co.za/careers",
    contactInfo: "graduates.za@pwc.com",
    website: "https://www.pwc.co.za/en/careers/students/graduate-opportunities.html",
    fieldsOfStudy: ["Accounting", "Auditing"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "High academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "deloitte-2025",
    name: "Deloitte Bursary",
    provider: "Deloitte South Africa",
    description: "Bursary for accounting (CA) and related fields.",
    amount: "Tuition + allowances + SAICA traineeship pathway",
    eligibilityCriteria: [
      "South African citizen",
      "Studying accounting (CA stream)",
      "Academic excellence"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply via Deloitte careers",
    contactInfo: "gradrecruitment@deloitte.co.za",
    website: "https://www2.deloitte.com/za/en/careers/students.html",
    fieldsOfStudy: ["Accounting", "Auditing"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "High academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "kpmg-2025",
    name: "KPMG Bursary",
    provider: "KPMG South Africa",
    description: "Bursary for accounting and CA(SA) students.",
    amount: "Tuition + allowances + traineeship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying accounting (CA stream)",
      "Academic merit"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply via KPMG careers",
    contactInfo: "graduates@kpmg.co.za",
    website: "https://home.kpmg/za/en/home/careers/graduates.html",
    fieldsOfStudy: ["Accounting", "Auditing"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "High academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "ey-2025",
    name: "EY Bursary",
    provider: "Ernst & Young South Africa",
    description: "Bursary for accounting and CA-stream students.",
    amount: "Tuition + allowances + SAICA traineeship pathway",
    eligibilityCriteria: [
      "South African citizen",
      "Studying accounting (CA stream)",
      "Academic excellence"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply via EY careers",
    contactInfo: "student.recruitment@za.ey.com",
    website: "https://www.ey.com/en_za/careers/students",
    fieldsOfStudy: ["Accounting", "Auditing"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "High academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "saica-thuthuka-2025",
    name: "SAICA Thuthuka Bursary",
    provider: "South African Institute of Chartered Accountants",
    description: "Transformational bursary funding the CA(SA) pipeline for disadvantaged students.",
    amount: "Full tuition + accommodation + allowances + academic support",
    eligibilityCriteria: [
      "South African citizen",
      "Studying towards CA(SA)",
      "Financial need",
      "Academic excellence"
    ],
    applicationDeadline: "30 September annually",
    applicationProcess: "Apply at www.thuthukabursaryfund.co.za",
    contactInfo: "info@saica.co.za",
    website: "https://www.thuthukabursaryfund.co.za/",
    fieldsOfStudy: ["Accounting", "Auditing"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Minimum 65% average", financialNeed: true },
    isActive: true,
    priority: "high"
  },
  {
    id: "old-mutual-2025",
    name: "Old Mutual Bursary Programme",
    provider: "Old Mutual",
    description: "Prestigious bursary for actuarial science and data science students.",
    amount: "Full tuition + accommodation + stipend + guaranteed employment",
    eligibilityCriteria: [
      "South African citizen",
      "Studying actuarial science or data science",
      "Academic excellence (high maths marks)"
    ],
    applicationDeadline: "31 May annually",
    applicationProcess: "Apply at www.oldmutual.co.za/careers",
    contactInfo: "actuarialbursaries@oldmutual.com",
    website: "https://www.oldmutual.co.za/careers/bursaries/",
    fieldsOfStudy: ["Actuarial Science", "Data Science", "Statistics"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Excellent academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "sanlam-2025",
    name: "Sanlam Bursary Programme",
    provider: "Sanlam",
    description: "Comprehensive bursaries for actuarial science and analytics.",
    amount: "Full tuition + allowances + mentorship + employment pathway",
    eligibilityCriteria: [
      "South African citizen",
      "Studying actuarial science / analytics",
      "Academic excellence"
    ],
    applicationDeadline: "30 June annually",
    applicationProcess: "Apply at www.sanlam.co.za/careers",
    contactInfo: "careers@sanlam.co.za",
    website: "https://www.sanlam.co.za/careers/earlycareers/Pages/actuarial-bursaries.aspx",
    fieldsOfStudy: ["Actuarial Science", "Statistics", "Data Science"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Excellent academic performance", financialNeed: false },
    isActive: true,
    priority: "high"
  },
  {
    id: "momentum-metropolitan-2025",
    name: "Momentum Metropolitan Bursary",
    provider: "Momentum Metropolitan Holdings",
    description: "Bursary for actuarial science, finance and analytics students.",
    amount: "Tuition + stipend + mentorship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying actuarial science, finance or analytics",
      "Academic excellence"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Momentum Metropolitan careers",
    contactInfo: "careers@momentummetropolitan.co.za",
    website: "https://www.momentummetropolitan.co.za/en/careers",
    fieldsOfStudy: ["Actuarial Science", "Finance", "Analytics"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "High academic performance", financialNeed: false },
    isActive: true,
    priority: "medium"
  },

  // Retail & Healthcare
  {
    id: "dis-chem-2025",
    name: "Dis-Chem Foundation Bursary",
    provider: "Dis-Chem Pharmacies",
    description: "Bursary for pharmacy and health sciences students.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Studying pharmacy or health sciences",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Dis-Chem careers",
    contactInfo: "careers@dischem.co.za",
    website: "https://careers.dischem.co.za/",
    fieldsOfStudy: ["Pharmacy", "Health Sciences"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "woolworths-2025",
    name: "Woolworths Bursary Programme",
    provider: "Woolworths Holdings Limited",
    description: "Bursary for data science, IT, supply chain and retail-related studies.",
    amount: "Tuition + stipend + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying IT, data science, supply chain or commerce",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Woolworths careers",
    contactInfo: "careers@woolworths.co.za",
    website: "https://www.whlcareers.co.za/",
    fieldsOfStudy: ["Information Technology", "Data Science", "Supply Chain", "Commerce"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "mr-price-2025",
    name: "Mr Price Group Bursary",
    provider: "Mr Price Group",
    description: "Support for retail, fashion, IT and supply chain studies.",
    amount: "Tuition + stipend + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying retail, fashion, IT or supply chain",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Mr Price careers",
    contactInfo: "careers@mrpricegroup.com",
    website: "https://www.mrpricegroupcareers.com/",
    fieldsOfStudy: ["Retail Management", "Fashion", "Information Technology", "Supply Chain"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "picknpay-2025",
    name: "Pick n Pay Bursary",
    provider: "Pick n Pay Stores",
    description: "Bursary for commerce, IT and supply chain within retail sector.",
    amount: "Tuition + stipend + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying commerce, IT or supply chain",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via Pick n Pay careers",
    contactInfo: "careers@pnp.co.za",
    website: "https://www.pnp.co.za/corporate/careers",
    fieldsOfStudy: ["Commerce", "Information Technology", "Supply Chain"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },
  {
    id: "spar-2025",
    name: "SPAR Group Bursary",
    provider: "The SPAR Group",
    description: "Support for supply chain, logistics and IT studies in retail.",
    amount: "Tuition + stipend + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Studying logistics, supply chain or IT",
      "Academic merit"
    ],
    applicationDeadline: "31 July annually",
    applicationProcess: "Apply via SPAR careers",
    contactInfo: "careers@spar.co.za",
    website: "https://spar.co.za/careers",
    fieldsOfStudy: ["Supply Chain", "Logistics", "Information Technology"],
    provinces: ["All provinces"],
    requirements: { academicRequirement: "Good academic performance", financialNeed: false },
    isActive: true,
    priority: "low"
  },

  // Municipal bursaries
  {
    id: "city-of-cape-town-2025",
    name: "City of Cape Town Bursary",
    provider: "City of Cape Town",
    description: "Bursary for scarce skills including engineering, finance and IT.",
    amount: "Tuition + allowances + vacation work",
    eligibilityCriteria: [
      "South African citizen",
      "Western Cape resident",
      "Studying scarce skills fields",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via City of Cape Town careers",
    contactInfo: "bursaries@capetown.gov.za",
    website: "https://www.capetown.gov.za/City-Connect/Find-a-job-or-opportunity/Study-and-research-opportunities/City-of-Cape-Town-bursary-programme",
    fieldsOfStudy: ["Engineering", "Finance", "Information Technology"],
    provinces: ["Western Cape"],
    requirements: { academicRequirement: "Minimum 60% average", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "city-of-johannesburg-2025",
    name: "City of Johannesburg Bursary",
    provider: "City of Johannesburg",
    description: "Funding for critical skills including engineering, health and finance.",
    amount: "Tuition + stipend + internship",
    eligibilityCriteria: [
      "South African citizen",
      "Gauteng resident",
      "Studying scarce skills fields",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via City of Johannesburg website",
    contactInfo: "bursaries@joburg.org.za",
    website: "https://www.joburg.org.za/",
    fieldsOfStudy: ["Engineering", "Health Sciences", "Finance", "Information Technology"],
    provinces: ["Gauteng"],
    requirements: { academicRequirement: "Minimum 60% average", financialNeed: true },
    isActive: true,
    priority: "medium"
  },
  {
    id: "ethekwini-2025",
    name: "eThekwini Municipality Bursary",
    provider: "eThekwini Municipality",
    description: "Bursary for engineering, built environment, finance and IT.",
    amount: "Tuition + allowances + vacation employment",
    eligibilityCriteria: [
      "South African citizen",
      "KwaZulu-Natal resident",
      "Studying specified scarce skills",
      "Academic merit"
    ],
    applicationDeadline: "31 August annually",
    applicationProcess: "Apply via eThekwini Municipality website",
    contactInfo: "bursaries@durban.gov.za",
    website: "https://www.durban.gov.za/",
    fieldsOfStudy: ["Civil Engineering", "Electrical Engineering", "Finance", "Information Technology"],
    provinces: ["KwaZulu-Natal"],
    requirements: { academicRequirement: "Minimum 60% average", financialNeed: true },
    isActive: true,
    priority: "medium"
  }
];
