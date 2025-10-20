import { useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Shield, Mail, RefreshCw, Package, Undo2, Gavel, ShoppingCart } from "lucide-react";

const Policies = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <Layout>
      <SEO
        title="Policies & Terms | ReBooked Solutions"
        description="Complete policy documentation for ReBooked Solutions - Privacy Policy and Terms and Conditions."
        keywords="policies, terms, privacy, POPIA, consumer protection, ReBooked Solutions"
      />

      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-7xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Platform Policies
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Complete policy documentation for ReBooked Solutions
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mt-6 max-w-5xl mx-auto shadow-sm">
            <div className="text-blue-900 text-xs sm:text-sm leading-snug">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="whitespace-nowrap"><strong>Effective Date:</strong> 10 June 2025</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap"><strong>Platform:</strong> rebookedsolutions.co.za</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1">
                <span className="whitespace-nowrap"><strong>Operator:</strong> ReBooked Solutions (Pty) Ltd</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap break-all"><strong>Support:</strong> legal@rebookedsolutions.co.za</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1">
                <span className="whitespace-nowrap"><strong>Jurisdiction:</strong> Republic of South Africa</span>
              </div>
              <div className="mt-1 text-center">
                <span className="block sm:inline break-words max-w-[62ch] mx-auto">
                  <strong>Regulatory Compliance:</strong> Consumer Protection Act (Act 68 of 2008) • Electronic Communications and Transactions Act (Act 25 of 2002) • Protection of Personal Information Act (Act 4 of 2013)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-8 sm:mb-12">
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl">All Policies & Terms</CardTitle>
                <p className="text-gray-600 text-sm">Select a policy to view details</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  <Button
                    onClick={() => setActiveTab("privacy")}
                    variant={activeTab === "privacy" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Privacy Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("terms")}
                    variant={activeTab === "terms" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Terms & Conditions</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("refunds")}
                    variant={activeTab === "refunds" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Refund Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("cancellation")}
                    variant={activeTab === "cancellation" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Gavel className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Cancellation Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("shipping")}
                    variant={activeTab === "shipping" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Shipping & Delivery</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("returns")}
                    variant={activeTab === "returns" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Undo2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Return Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("sellers")}
                    variant={activeTab === "sellers" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <Gavel className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Seller’s Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("buyers")}
                    variant={activeTab === "buyers" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Buyer’s Policy</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("disputes")}
                    variant={activeTab === "disputes" ? "default" : "outline"}
                    size="lg"
                    className="w-full justify-start font-medium px-3 py-2 whitespace-normal break-words text-sm leading-tight min-h-[44px]"
                  >
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-left">Dispute Resolution</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6 sm:space-y-8">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Shield className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Privacy Policy</span>
                  </CardTitle>
                  <div className="text-gray-600 text-xs sm:text-sm space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span>
                        <strong>Effective Date:</strong> 10 June 2025
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        <strong>Platform:</strong>{" "}
                        <span className="break-all">
                          www.rebookedsolutions.co.za
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span>
                        <strong>Operator:</strong> ReBooked Solutions (Pty) Ltd
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        <strong>Contact:</strong>{" "}
                        <span className="break-all">
                          legal@rebookedsolutions.co.za
                        </span>
                      </span>
                    </div>
                    <strong>Jurisdiction:</strong>
                    <div>
                      <span> Republic of South Africa</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        1. Introduction
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions (Pty) Ltd ("ReBooked", "we", "our",
                        or "us") is committed to protecting your privacy. This
                        Privacy Policy outlines how we collect, use, store,
                        share, and protect your personal information in
                        accordance with the Protection of Personal Information
                        Act (POPIA) and applicable South African law.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        By accessing or using any part of the ReBooked platform,
                        including ReBooked Campus, you consent to the collection
                        and processing of your personal information as outlined
                        in this Policy. If you do not agree, please refrain from
                        using the platform.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        2. Scope of the Policy
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        This Privacy Policy applies to all visitors, users, and
                        account holders of ReBooked Solutions. It covers
                        information collected through our main marketplace,
                        ReBooked Campus, our communication tools, analytics
                        systems, and any third-party integrations we use.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3. What Information We Collect
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We collect personal information that is necessary to
                        provide our services and ensure platform security. This
                        includes, but is not limited to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          Identification and contact information: full name,
                          email address, phone number, and optionally your
                          school or university.
                        </li>
                        <li>
                          Account credentials: hashed passwords and login
                          activity.
                        </li>
                        <li>
                          Listing and transaction data: books or items listed,
                          viewed, sold, or purchased.
                        </li>
                        <li>
                          Delivery information: shipping address, courier
                          tracking data, and delivery preferences.
                        </li>
                        <li>
                          Payment-related information: banking details and payment
                          references, collected and processed securely through
                          trusted third-party providers like Paystack.
                        </li>
                        <li>
                          Educational data: input used in APS calculators, study
                          tips submitted, bursary tools used, and program
                          searches within ReBooked Campus.
                        </li>
                        <li>
                          Technical and usage data: IP address, browser type,
                          device info, time on page, actions performed, and
                          referral source.
                        </li>
                        <li>
                          Communication data: messages sent to our support
                          email, helpdesk forms, or via any integrated chat or
                          contact system.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4. How We Collect Your Information
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We collect personal information directly from you when
                        you create an account, submit forms, list items, browse
                        educational resources, or communicate with us.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We also collect certain data automatically through
                        cookies, server logs, analytics tools, and browser-based
                        tracking, which help us improve the platform and detect
                        suspicious activity.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Where applicable, we may collect information from
                        third-party services you interact with through our
                        platform, such as payment providers or delivery
                        companies.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5. How We Use Your Information
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We use your information for the following lawful
                        purposes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>To register and manage your account.</li>
                        <li>
                          To facilitate the listing, browsing, and sale of books
                          and other goods.
                        </li>
                        <li>
                          To enable communication between buyers and sellers.
                        </li>
                        <li>
                          To coordinate with courier services for deliveries.
                        </li>
                        <li>
                          To display and improve ReBooked Campus resources,
                          including APS tools, bursary data, and university
                          programs.
                        </li>
                        <li>
                          To send important notifications, alerts, and updates
                          related to your account, listings, or educational
                          tools.
                        </li>
                        <li>
                          To respond to user queries and provide customer
                          support.
                        </li>
                        <li>
                          To analyse user behaviour and improve platform
                          performance, reliability, and security.
                        </li>
                        <li>
                          To enforce our terms and conditions and protect
                          against fraud, abuse, or policy violations.
                        </li>
                        <li>
                          To comply with South African legal obligations, such
                          as tax, consumer protection, or data protection laws.
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        We will only use your personal information for the
                        purpose it was collected, unless we reasonably believe
                        another purpose is compatible or we obtain your further
                        consent.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        6. Sharing of Information
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We do not sell, lease, or rent your personal information
                        to any third parties. However, we may share your
                        personal data under strict conditions with:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          Third-party service providers who help operate the
                          platform, such as our database host (Supabase), web
                          host (Vercel), or analytics partners.
                        </li>
                        <li>
                          Courier companies for fulfilling delivery instructions
                          and providing tracking updates.
                        </li>
                        <li>
                          Payment processors like Paystack for secure handling
                          of funds, subject to their own privacy and security
                          frameworks.
                        </li>
                        <li>
                          Legal or regulatory authorities if required by law,
                          court order, subpoena, or in the defence of legal
                          claims.
                        </li>
                        <li>
                          Technical advisors or consultants strictly for
                          internal compliance, audits, or security reviews.
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        All third parties are contractually required to treat
                        your data with confidentiality and to use it only for
                        the intended service delivery purpose.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        7. Cookies and Tracking
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions uses cookies and similar technologies
                        to improve user experience, maintain security, and
                        analyse platform usage.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        These cookies may track session duration, device
                        information, login behaviour, and referral sources. You
                        can disable cookies in your browser settings, but this
                        may limit some functionality on our website.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        8. Bank Account Details and Payouts
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        To receive payouts from ReBooked Solutions (e.g. for successful textbook sales or reimbursements), users must submit valid and accurate banking details via the platform.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        By providing your banking information, you confirm that you are the rightful owner of the account or are authorized to use it.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        It is your sole responsibility to ensure that all banking details you provide are complete, correct, and up to date. ReBooked Solutions will process payments using the exact information you submit. If a payment is made to the account number you provided, it will be deemed successful and completed.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        If you later claim that you did not receive payment, we will provide you with proof of payment, including transaction receipts, the bank account number the funds were sent to, and the exact details you entered at the time of submission.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions is not liable for any losses or delays resulting from incorrect, incomplete, or fraudulent banking information provided by the user.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        We reserve the right to verify any banking details you submit and to withhold or cancel payouts if suspicious activity is detected.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        9. Data Security
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We implement industry-standard technical and
                        organisational measures to protect your personal data.
                        These include secure password hashing, role-based access
                        control, encrypted storage, audit logging, and real-time
                        threat monitoring.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        While we make every effort to safeguard your data, no
                        method of digital transmission or storage is completely
                        secure. Use of the platform is at your own risk, and you
                        acknowledge that absolute security cannot be guaranteed.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        10. Data Retention
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We retain personal information only as long as necessary
                        to fulfil the purposes outlined in this Policy or as
                        required by law. When your information is no longer
                        required, it is securely deleted or anonymised.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        You may request deletion of your data by contacting
                        legal@rebookedsolutions.co.za. However, we may retain
                        certain information if required for legal compliance,
                        fraud prevention, dispute resolution, or transaction
                        history.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        11. User Rights Under POPIA
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Under South African data protection law, you have the
                        following rights:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          The right to be informed about how your personal data
                          is collected and used.
                        </li>
                        <li>
                          The right to access the personal data we hold about
                          you.
                        </li>
                        <li>
                          The right to request correction or deletion of your
                          personal information.
                        </li>
                        <li>
                          The right to object to processing or withdraw consent
                          where applicable.
                        </li>
                        <li>
                          The right to lodge a complaint with the Information
                          Regulator.
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        To exercise any of these rights, please contact
                        legal@rebookedsolutions.co.za. We may require proof of
                        identity before processing any request.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        12. Children's Privacy
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Our platform is not intended for users under the age of
                        16 without parental or guardian consent. If we learn
                        that we have collected information from a child without
                        proper authorisation, we will take steps to delete it
                        promptly.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        13. Third-Party Links
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Our site may contain links to third-party websites,
                        services, or bursary programs. Once you leave our
                        domain, we are not responsible for the privacy
                        practices, content, or accuracy of those third-party
                        sites. You access them at your own risk.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        14. International Transfers
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Although we are based in South Africa, some of our
                        service providers (e.g., hosting or email services) may
                        process data in foreign jurisdictions. We take
                        reasonable steps to ensure that all data transfers are
                        compliant with South African data protection laws and
                        subject to adequate safeguards.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        15. Policy Updates
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        We reserve the right to update this Privacy Policy at
                        any time. Material changes will be announced on the
                        platform. Continued use after such changes implies your
                        acceptance of the revised terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        16. Contact Us
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                        If you have any questions, requests, or concerns
                        regarding your personal information or this Privacy
                        Policy, please contact:
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                        <p className="text-blue-800 text-sm sm:text-base">
                          <strong>ReBooked Solutions (Pty) Ltd</strong>
                          <br />
                          Email:{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                          <br />
                          Based in the Republic of South Africa
                        </p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Terms & Conditions Tab */}
          {activeTab === "terms" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Scale className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Terms and Conditions of Use</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mt-3">
                    <div className="text-amber-800 text-xs sm:text-sm">
                      <p className="font-semibold mb-2">Governing Laws:</p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Consumer Protection Act (CPA) No. 68 of 2008</li>
                        <li>
                          • Electronic Communications and Transactions Act
                          (ECTA) No. 25 of 2002
                        </li>
                        <li>
                          • Protection of Personal Information Act (POPIA) No. 4
                          of 2013
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        1. INTRODUCTION
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Welcome to ReBooked Solutions. These Terms and
                        Conditions ("Terms") are a legally binding agreement
                        between you and ReBooked Solutions (Pty) Ltd
                        ("ReBooked", "we", "us", or "our"). They govern your
                        access to and use of our platform, services, and
                        content. If you do not agree to these Terms, you must
                        cease all use of our services immediately.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        By using the Platform, you confirm that you understand
                        and agree to these Terms, our policies (including but
                        not limited to Refund, Return, Shipping, and Dispute
                        policies), and our Privacy Policy. You accept all risks
                        associated with using a peer-to-peer resale platform and
                        accept that ReBooked Solutions is not a party to any
                        sale of goods between users.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        2. DEFINITIONS
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          "Platform" refers to the website
                          www.rebookedsolutions.co.za, including all services,
                          features, and content available therein.
                        </li>
                        <li>
                          "User" or "you" refers to any individual or entity who
                          accesses or uses the Platform, whether as a buyer,
                          seller, or visitor.
                        </li>
                        <li>
                          "ReBooked Campus" refers to the informational and
                          educational segment of the Platform offering academic
                          resources, university data, APS tools, bursary
                          listings, blog posts, and study tips.
                        </li>
                        <li>
                          "Content" includes any text, images, documents, posts,
                          data, links, files, or other materials submitted,
                          posted, or displayed by users.
                        </li>
                        <li>
                          "Third Party" refers to any entity or service provider
                          that is not owned or directly controlled by ReBooked
                          Solutions.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3. PLATFORM NATURE & DISCLAIMER OF RESPONSIBILITY
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions is an online marketplace and academic
                        resource platform. We do not buy, own, stock, or sell
                        any books or physical goods listed by users. All
                        transactions are conducted directly between buyers and
                        sellers.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We provide a digital venue and payment integration only.
                        We make no warranties regarding the suitability, safety,
                        legality, or quality of items listed, nor the
                        credibility of sellers or accuracy of ReBooked Campus
                        information. All users transact at their own risk.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        We are not liable for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          Misleading listings or undisclosed book conditions
                        </li>
                        <li>Counterfeit, plagiarised, or illegal goods</li>
                        <li>Non-performance or breach by any user</li>
                        <li>Courier or delivery delays</li>
                        <li>Failed payments or chargebacks</li>
                        <li>Errors in educational or institutional data</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        You acknowledge that ReBooked is not a party to any
                        contract for sale formed between users, nor are we
                        agents of any buyer or seller.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4. USER ELIGIBILITY
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        By using the Platform, you warrant that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          You are 18 years or older, or have consent from a
                          parent/guardian.
                        </li>
                        <li>
                          You are not prohibited under South African law from
                          using online marketplaces.
                        </li>
                        <li>
                          You are providing accurate and lawful personal and
                          payment information.
                        </li>
                        <li>
                          You accept full legal responsibility for all
                          activities under your account.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5. USER ACCOUNT RESPONSIBILITIES
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        5.1 Each user is responsible for maintaining the
                        confidentiality and accuracy of their account
                        information. You must not share your password or allow
                        anyone else to access your account.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        5.2 You are liable for all actions performed through
                        your account, including fraud, unauthorised sales, or
                        misrepresentations. ReBooked disclaims all liability for
                        unauthorised access due to user negligence.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        5.3 ReBooked reserves the right to suspend or
                        permanently terminate any user account at any time for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Violating these Terms</li>
                        <li>Posting harmful, misleading, or illegal content</li>
                        <li>
                          Attempting to circumvent platform systems or fees
                        </li>
                        <li>Using the platform to deceive or defraud others</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        6. TRANSACTIONS, FEES, AND PAYMENTS
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        6.1 All payments are facilitated through trusted
                        third-party payment processors (e.g., Paystack).
                        ReBooked does not store credit card information or
                        process payments internally.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        6.2 ReBooked charges a 10% service fee per successful
                        transaction. This fee is calculated and deducted when
                        processing payments to sellers.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        6.3 We are not liable for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Failed or delayed payments</li>
                        <li>Withdrawal issues due to incorrect bank details</li>
                        <li>Currency conversion or third-party bank fees</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        Sellers are solely responsible for compliance with SARS
                        or tax reporting requirements.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        7. SHIPPING, DELIVERY, RETURNS, AND REFUNDS
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        All buyers and sellers agree to abide by ReBooked's:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Refund Policy</li>
                        <li>Return Policy</li>
                        <li>Shipping Policy</li>
                        <li>Cancellation Policy</li>
                        <li>Dispute Resolution Policy</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        These policies are incorporated by reference and
                        enforceable as part of these Terms.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        You acknowledge that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          ReBooked does not ship or handle physical goods.
                        </li>
                        <li>
                          ReBooked is not liable for lost, stolen, delayed, or
                          damaged packages.
                        </li>
                        <li>
                          Return disputes are handled between buyer and seller,
                          with ReBooked only providing a non-binding mediation
                          role.
                        </li>
                        <li>
                          Refunds are not guaranteed unless supported by clear
                          evidence and governed under our published policies.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        8. REBOOKED CAMPUS TERMS
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        8.1 ReBooked Campus offers informational academic
                        resources such as:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>APS calculation tools</li>
                        <li>Bursary listings</li>
                        <li>University program data</li>
                        <li>Application advice</li>
                        <li>Sponsor or affiliate content</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        8.2 All content in ReBooked Campus is provided "as-is"
                        for informational purposes only. We do not:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          Guarantee data accuracy (APS scores, deadlines, etc.)
                        </li>
                        <li>
                          Represent any university or financial aid provider
                        </li>
                        <li>Guarantee bursary outcomes or funding</li>
                        <li>
                          Accept liability for decisions made based on this
                          information
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        Users must verify all information directly with the
                        official institution or funding body. ReBooked accepts
                        no responsibility for missed deadlines, incorrect
                        submissions, or misinterpreted content.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        9. USER CONTENT AND CONDUCT
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Users must not upload, post, or distribute any content
                        that is:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>False, deceptive, or misleading</li>
                        <li>Offensive, defamatory, racist, or abusive</li>
                        <li>
                          Infringing on intellectual property or copyright
                        </li>
                        <li>
                          Illegal or in violation of applicable academic codes
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        We may remove content and/or suspend users without
                        notice. ReBooked is not liable for third-party or
                        user-generated content hosted on the Platform.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        10. INTELLECTUAL PROPERTY
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        All content, tools, design elements, software, and
                        branding related to ReBooked Solutions are the property
                        of ReBooked Solutions (Pty) Ltd unless otherwise stated.
                        This includes, but is not limited to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>The APS Calculator</li>
                        <li>The ReBooked Campus interface</li>
                        <li>Study materials and guides</li>
                        <li>Custom icons, logos, and user interfaces</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        No part of the Platform may be copied, distributed,
                        sold, modified, reverse-engineered, or reused without
                        express written permission.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        11. DISCLAIMERS AND LIMITATION OF LIABILITY
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        TO THE MAXIMUM EXTENT PERMITTED UNDER SOUTH AFRICAN LAW:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          ReBooked Solutions disclaims all warranties, express
                          or implied, including merchantability, title, fitness
                          for purpose, or non-infringement.
                        </li>
                        <li>
                          We are not liable for any losses (direct or indirect),
                          loss of data, opportunity, profit, goodwill, or
                          personal injury caused by use of the Platform.
                        </li>
                        <li>
                          We are not liable for third-party actions, including
                          users, payment providers, couriers, institutions, or
                          advertisers.
                        </li>
                        <li>
                          Use of ReBooked Campus is at your sole risk, and no
                          guarantees are made regarding academic success or
                          institutional acceptance.
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        ReBooked shall never be liable for damages exceeding the
                        total amount of platform fees earned from the specific
                        transaction in dispute.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        12. INDEMNITY
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        You agree to fully indemnify and hold harmless ReBooked
                        Solutions (Pty) Ltd, its directors, employees, agents,
                        and service providers against any claims, liabilities,
                        damages, losses, fines, legal fees, or costs arising
                        from:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Your use or misuse of the Platform</li>
                        <li>Your breach of these Terms</li>
                        <li>Your violation of any third-party rights</li>
                        <li>Your inaccurate or fraudulent content</li>
                        <li>
                          Disputes arising from your transactions, listings, or
                          communications
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        13. TERMINATION
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked may, at its sole discretion and without notice:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Suspend or permanently ban your account</li>
                        <li>Remove or block content</li>
                        <li>Deny platform access</li>
                        <li>Pursue civil or criminal action</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        Termination does not limit our right to recover unpaid
                        fees or enforce indemnity.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        14. GOVERNING LAW AND JURISDICTION
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        These Terms are governed by the laws of the Republic of
                        South Africa. You agree that:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                          Any dispute shall first be submitted to ReBooked's
                          internal dispute resolution process.
                        </li>
                        <li>
                          Unresolved matters may be referred to the Consumer
                          Goods and Services Ombud (CGSO) or the National
                          Consumer Commission.
                        </li>
                        <li>
                          Jurisdiction lies with the courts of South Africa, and
                          all legal notices must be served to the registered
                          address of ReBooked Solutions (Pty) Ltd.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        15. AMENDMENTS
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        We reserve the right to amend these Terms at any time.
                        Updates will be posted on the Platform, and your
                        continued use after such changes constitutes your
                        acceptance.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        16. CONTACT INFORMATION
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                        For all support, legal, or general inquiries:
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                        <p className="text-blue-800 text-sm sm:text-base">
                          Email:{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                          <br />
                          ReBooked Solutions (Pty) Ltd – Registered in South
                          Africa
                        </p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Seller’s Policy Tab */}
          {activeTab === "sellers" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Gavel className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Seller’s Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">legal@rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection Act (Act 68 of 2008), Electronic Communications and Transactions Act (Act 25 of 2002), Protection of Personal Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">1. Listing Requirements</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Sellers must provide accurate and complete information about each book, including title, author, edition, condition, and any defects.</li>
                        <li>Clear photos must be uploaded to verify the book’s condition.</li>
                        <li>Misleading or false listings are strictly prohibited.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">2. Pricing & Fees</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Sellers set their own prices for books.</li>
                        <li>ReBooked Solutions charges a 10% service fee on every successful sale.</li>
                        <li>A delivery/shipping fee is added at checkout and paid by the buyer.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">3. Order Process & Payouts</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Once an order is placed, the seller must package the book securely for collection.</li>
                        <li>Funds from sales are held for 24–48 hours after successful delivery to allow buyers time to confirm the book matches the listing.</li>
                        <li>If a buyer raises a complaint, funds are held until the case is resolved.</li>
                        <li>If the seller is at fault, the buyer receives a full refund, the seller forfeits the payout, and a fine may apply.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">4. Fine System (Incorrect or Misleading Books)</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-2">To protect buyers and maintain trust, a tiered penalty system applies for sellers who provide incorrect or misleading books:</p>
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-gray-900">First Offense</p>
                          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                            <li>Buyer receives a full refund.</li>
                            <li>Seller receives no payout for the sale.</li>
                            <li>Seller is fined the delivery fee from their address to the buyer’s address.</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Second Offense</p>
                          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                            <li>Buyer receives a full refund.</li>
                            <li>Seller receives no payout for the sale.</li>
                            <li>Seller is fined the delivery fee plus R100 for misuse of ReBooked Solutions’ services.</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Third Offense</p>
                          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                            <li>Buyer receives a full refund.</li>
                            <li>Seller receives no payout for the sale.</li>
                            <li>Seller is fined the delivery fee plus R250.</li>
                            <li>Seller account may be suspended or permanently banned, pending review.</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <p className="font-semibold text-gray-900">Zero-Tolerance Clause</p>
                        <p className="text-gray-700 text-sm sm:text-base">The following are treated as an immediate Level 3 offense:</p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                          <li>Fraudulent or counterfeit book listings.</li>
                          <li>Intentional scams or repeated misrepresentation.</li>
                          <li>Attempts to bypass or abuse ReBooked Solutions’ systems.</li>
                        </ul>
                        <p className="font-semibold text-gray-900">Penalty for Zero-Tolerance Violations:</p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                          <li>Buyer receives a full refund.</li>
                          <li>Seller receives no payout for the sale.</li>
                          <li>Seller is fined the delivery fee plus R250.</li>
                          <li>Seller is permanently banned. Any new accounts created by the seller will also be banned.</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">5. Book Return & Donation Policy in Disputes</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>If the buyer wants the incorrect book returned to the seller, the buyer must cover the return delivery cost.</li>
                        <li>If neither party wants the book back, ReBooked Solutions may donate the book to partner charities that support students in need.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-2">This ensures that even disputes can have a positive impact.</p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">6. Dispute Resolution</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">ReBooked Solutions will act as mediator in disputes and its decision will be final within the platform. Sellers may submit additional evidence if they believe a claim is unfair.</p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">7. Policy Enforcement</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">ReBooked Solutions reserves the right to withhold payouts, apply fines, or suspend seller accounts for any breach of this policy. By selling on ReBooked Solutions, you agree to these rules to help maintain a fair, safe, and socially impactful marketplace.</p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Buyer’s Policy Tab */}
          {activeTab === "buyers" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Buyer’s Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">legal@rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection Act (Act 68 of 2008), Electronic Communications and Transactions Act (Act 25 of 2002), Protection of Personal Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">This Buyer’s Policy outlines the responsibilities and rules all buyers agree to when using ReBooked Solutions. By purchasing on our platform, you agree to comply with this policy.</p>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">1. Accuracy of Information</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Buyers must provide complete and accurate delivery details, including address, phone number, and email.</li>
                        <li>Any failed deliveries resulting from incorrect or incomplete information are the buyer’s responsibility.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">2. Order Process</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Once an order is placed and marked as “Dispatched” by the seller, it cannot be cancelled.</li>
                        <li>Buyers must accept delivery within reasonable timeframes or collect from designated courier pickup points where applicable.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">3. Refunds & Returns</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-2">Buyers may request a refund within 3 calendar days of delivery if:</p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                        <li>The book received is the wrong edition, title, or author.</li>
                        <li>The book has undisclosed major defects (e.g., missing pages, water damage).</li>
                        <li>The book is counterfeit or fraudulent.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-2">All refund requests must include photographic evidence and a clear description of the issue.</p>
                      <div className="mt-3">
                        <p className="font-semibold text-gray-900">Refunds will not be granted for:</p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                          <li>Buyer’s remorse (e.g., “changed mind”).</li>
                          <li>Normal wear and tear of secondhand books.</li>
                          <li>Courier delays beyond the seller’s control.</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">4. Return Responsibilities</h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>If a refund is approved and the buyer chooses to return the book, the buyer is responsible for the return delivery cost.</li>
                        <li>If the buyer does not return the book, ReBooked Solutions may arrange to collect and donate it to charity.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">5. Buyer Misconduct</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">ReBooked Solutions reserves the right to suspend or permanently ban buyers who:</p>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm sm:text-base">
                        <li>Submit fraudulent or false refund claims.</li>
                        <li>Repeatedly fail to accept deliveries.</li>
                        <li>Attempt to abuse the platform’s refund or dispute system.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">6. Dispute Resolution</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">In the event of a disagreement, ReBooked Solutions will mediate based on evidence provided by both buyer and seller. Our decision is final within the platform unless escalated externally (e.g., Ombud, NCC).</p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Refund Policy Tab */}
          {activeTab === "refunds" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <RefreshCw className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Refund Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        1. Scope and Application
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        This Refund Policy applies to all users transacting on www.rebookedsolutions.co.za and governs the circumstances under which refunds may be issued. ReBooked Solutions operates solely as a digital intermediary between independent sellers and buyers and does not own, stock, inspect, or control the inventory sold on the platform.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        In terms of Sections 20 and 56 of the Consumer Protection Act (CPA), consumers are entitled to return defective goods within six months of delivery if the item is unsafe, fails to perform as intended, or does not meet the description. However, since ReBooked Solutions facilitates peer-to-peer resale of secondhand goods, a shorter, platform-specific refund window applies as detailed below.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Refunds will be processed only if one or more of the following conditions are met, and the refund request is submitted within three (3) calendar days of delivery or the estimated delivery date:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>The item has not been received within fourteen (14) business days of dispatch confirmation.</li>
                        <li>
                          The item delivered materially differs from the listing, including but not limited to:
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Incorrect book (wrong edition, title, or author).</li>
                            <li>Undisclosed major defects (e.g., missing pages, mold, water damage).</li>
                          </ul>
                        </li>
                        <li>The item is counterfeit or an illegal reproduction.</li>
                        <li>Fraudulent or deceptive conduct by the seller.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3 mb-3 sm:mb-4">
                        All refund requests must be supported by clear photographic evidence and a formal complaint lodged to legal@rebookedsolutions.co.za within the specified refund period. The buyer must retain proof of delivery, shipping labels, and original packaging where applicable.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        2. Refund Request Procedure
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        To request a refund, the buyer must:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Submit a formal complaint within three (3) calendar days of delivery or estimated delivery date.</li>
                        <li>
                          Send an email to legal@rebookedsolutions.co.za including:
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Photographic evidence of the item received.</li>
                            <li>A detailed description of the issue.</li>
                            <li>Any relevant supporting documents (proof of delivery, shipping labels, original packaging).</li>
                          </ul>
                        </li>
                        <li>Buyers must retain all original packaging and delivery documentation where applicable.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3. Exclusions
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Refunds will not be granted for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Buyer's remorse or change of mind.</li>
                        <li>Normal wear and tear consistent with secondhand goods.</li>
                        <li>Delays caused by third-party couriers.</li>
                        <li>Items damaged due to misuse, negligence, or improper handling by the buyer.</li>
                        <li>Items returned with improper packaging that results in damage during transit.</li>
                        <li>Items not returned in their original condition, packaging, or with missing components.</li>
                        <li>Refund requests made after the specified refund period has expired.</li>
                        <li>Issues arising from incorrect product use.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4. Buyer Responsibility and Verification
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Users must ensure that all delivery and payment information provided is accurate and complete. If payment has been processed to the bank account details supplied by the user, ReBooked Solutions will provide:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Proof of payment transaction,</li>
                        <li>Recipient account information as entered,</li>
                        <li>Relevant timestamps and references.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        If a user disputes receipt of payment, the responsibility lies in verifying the accuracy of submitted details.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5. Dispute Resolution
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        If a seller disputes a refund claim, both parties may be required to submit evidence. ReBooked Solutions' Resolution Team will review all documentation impartially, and their decision will be final and binding.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        6. Refund Timeframes
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Approved refunds will be processed within 7–10 business days, subject to payment processor and banking timelines.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Cancellation Policy Tab */}
          {activeTab === "cancellation" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Gavel className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Cancellation Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        2.1 Buyer Cancellations
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Buyers may only cancel an order if it has not yet been marked as "Dispatched" by the seller on the platform. Once an item is marked as dispatched, the transaction is considered binding, and the buyer must follow the formal return and refund procedures as outlined in Section 4.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        All valid cancellations made prior to dispatch will be refunded in full to the original payment method within 5–10 business days, excluding any delays from third-party payment processors. Buyers are solely responsible for ensuring the accuracy of their payment information.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        <strong>Important:</strong> In terms of the Electronic Communications and Transactions Act (ECTA), Section 44, ReBooked Solutions is an intermediary and not the direct seller of goods. As such, the 7-day cooling-off period does not apply to transactions on this platform unless the specific seller is a registered business and explicitly states otherwise.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        ReBooked Solutions reserves the right to deny abuse-driven cancellation patterns, and repeated cancellations may lead to account review or restriction.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        2.2 Seller Cancellations
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Sellers may cancel an order only under exceptional and justifiable circumstances, including but not limited to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Stock unavailability due to a prior offline sale</li>
                        <li>Material listing errors (e.g. wrong edition or pricing mistake)</li>
                        <li>Account or listing flagged for fraud, duplicate posting, or breach of terms</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        Such cancellations must occur within 48 hours of receiving the order and require notification to the buyer via in-platform messaging and to legal@rebookedsolutions.co.za for tracking and transparency purposes.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Unwarranted or frequent cancellations by sellers may result in the following actions:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Temporary suspension of selling privileges</li>
                        <li>Administrative penalties or listing limitations</li>
                        <li>Permanent account termination in cases of repeated violation or misconduct</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        ReBooked Solutions reserves the right to cancel any order at its discretion, particularly in instances involving:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Suspected fraudulent activity</li>
                        <li>Misuse or manipulation of the platform</li>
                        <li>Breaches of this policy or the platform's Terms of Use</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        All cancellations — whether buyer- or seller-initiated — must be traceable through an Order ID and Transaction Number. For privacy and data protection, parties will not be granted access to each other's contact details unless legally required.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Shipping & Delivery Policy Tab */}
          {activeTab === "shipping" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Package className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Shipping & Delivery Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3.1 Shipping Responsibility
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions arranges all deliveries through third-party couriers, primarily Courier Guy, acting on behalf of the seller. However, sellers are fully responsible for preparing, packaging, and making the parcel available for collection when the courier arrives.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Sellers must ensure parcels are ready for handover within three (3) business days of payment confirmation.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Packaging must be secure and tamper-resistant. Items must match the listed condition.</li>
                        <li>Sellers must respond to courier collection requests in a timely manner.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        If the parcel is not ready at the time of the courier's first collection attempt:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>ReBooked Solutions will cover the first rescheduling fee.</li>
                        <li>
                          Any further failed collection attempts due to seller negligence will:
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Be charged to the seller,</li>
                            <li>Trigger a forced refund to the buyer, and</li>
                            <li>Result in a temporary suspension of the seller's account pending review.</li>
                          </ul>
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3.2 Delivery Timeframes
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Standard delivery timeframes are 2–7 business days from the date of successful collection. Delivery times depend on regional distance and courier capacity.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>ReBooked Solutions cannot guarantee delivery dates but will provide tracking updates via email or dashboard.</li>
                        <li>Buyers are encouraged to monitor delivery status and collect from designated pickup points promptly.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3.3 Delays and CPA Compliance
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        As per the Consumer Protection Act (Section 19(4)), if a parcel is not delivered within the agreed timeframe or within 14 business days, and the delay is not due to the buyer, the buyer may:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Cancel the transaction and receive a full refund, or</li>
                        <li>Allow an extended delivery window at their discretion.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        All courier-related issues (e.g. delays, damage, or misdelivery) will first be investigated by ReBooked Solutions in collaboration with Courier Guy.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        3.4 Failed Deliveries & Redelivery Charges
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        If delivery fails due to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Incorrect or incomplete delivery address,</li>
                        <li>Buyer's unavailability during delivery,</li>
                        <li>Failure to collect from pickup points,</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        Then:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>The buyer will bear any redelivery costs,</li>
                        <li>Refunds will only be issued if the seller is found at fault (e.g. wrong item sent, incorrect packaging),</li>
                        <li>Returned parcels not claimed within 7 calendar days may be subject to cancellation without refund.</li>
                      </ul>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Return Policy Tab */}
          {activeTab === "returns" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <Undo2 className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Return Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4.1 Return Grounds
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Returns are accepted only under the following conditions:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Incorrect item delivered (e.g., different title, author, or edition).</li>
                        <li>Severe damage or defects not disclosed in the listing.</li>
                        <li>Item is confirmed counterfeit or an illegal reproduction.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3 mb-3 sm:mb-4">
                        All returns must be initiated within three (3) calendar days of delivery by contacting legal@rebookedsolutions.co.za for written return authorization. Returns sent without prior approval will be rejected.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Buyers are responsible for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Retaining original packaging and materials.</li>
                        <li>Returning items using a trackable, insured shipping method.</li>
                        <li>Sharing tracking details with ReBooked Solutions once shipped.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        Return shipping costs and any associated courier fees are the buyer's responsibility, except in cases of major seller misconduct, such as confirmed fraud, counterfeit goods, or undisclosed serious defects.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4.2 Return Exclusions
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Returns will not be accepted in the following instances:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Disputes over minor flaws or typical wear associated with secondhand items.</li>
                        <li>Buyer's remorse or dissatisfaction after receiving the item.</li>
                        <li>Damage caused after delivery due to buyer negligence, improper handling, or poor storage.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        ReBooked Solutions will not cover return shipping, packaging, or handling fees for any of the above exclusions.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        4.3 Inspection and Refund Processing
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        All returned items are subject to inspection upon receipt. Refunds will only be issued if:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>The return is approved based on the verified issue.</li>
                        <li>The item is returned in its original condition with all components.</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        If approved, refunds will be processed within 5–10 business days, covering the item's purchase price only. Shipping costs (both original and return) will not be refunded unless a major platform-verified issue is found.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        ReBooked Solutions serves as a neutral mediator in these cases, but reserves final decision-making authority on any return or refund case.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Dispute Resolution Policy Tab */}
          {activeTab === "disputes" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="shadow-md border-gray-200">
                <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl flex items-center gap-3 mb-3 sm:mb-4 text-gray-800">
                    <FileText className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 flex-shrink-0 text-blue-600" />
                    <span>Dispute Resolution Policy</span>
                  </CardTitle>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-sm">
                    <div className="text-blue-800 text-xs sm:text-sm space-y-2">
                      <div className="text-center">
                        <span>
                          <strong>Effective Date:</strong> 10 June 2025
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Platform:</strong>{" "}
                          <span className="break-all">www.rebookedsolutions.co.za</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Platform Operator:</strong> ReBooked Solutions (Pty) Ltd
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          <strong>Support:</strong>{" "}
                          <span className="break-all">
                            legal@rebookedsolutions.co.za
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Jurisdiction:</strong> Republic of South Africa
                        </span>
                      </div>
                      <div className="text-center">
                        <span>
                          <strong>Regulatory Compliance:</strong> Consumer Protection
                          Act (Act 68 of 2008), Electronic Communications and
                          Transactions Act (Act 25 of 2002), Protection of Personal
                          Information Act (Act 4 of 2013)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="prose max-w-none space-y-4 sm:space-y-6">
                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5.1 Initiating a Dispute
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        If a buyer or seller believes that a transaction has resulted in unfair treatment, fraud, or a breach of ReBooked Solutions' policies, a formal dispute must be submitted within seven (7) calendar days of the event by emailing legal@rebookedsolutions.co.za.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        The email must include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Transaction reference number</li>
                        <li>Order ID</li>
                        <li>A detailed description of the dispute</li>
                        <li>All supporting evidence (e.g., photographs, courier tracking, communication history)</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        Incomplete or unsupported disputes may be closed without investigation.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5.2 Dispute Review Process
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        Once a valid dispute is received, ReBooked Solutions will:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Acknowledge receipt within 2 business days</li>
                        <li>Investigate the matter within 7–10 business days</li>
                        <li>Request additional evidence if required</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4 mt-3">
                        Disputes will be assessed based on:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Principles of fairness under the Consumer Protection Act (CPA)</li>
                        <li>Objective review of all submitted documentation</li>
                        <li>Verified transaction history and user conduct</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        ReBooked Solutions will deliver a written decision outlining the resolution. This decision will be final and binding within the platform, unless escalated externally (see 5.4).
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5.3 Platform Liability and Limitation
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions acts solely as a digital intermediary and is not a contracting party to transactions between users. In accordance with Section 56 of the CPA, sellers are responsible for the goods they list.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        ReBooked Solutions accepts no liability for:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>Product condition, accuracy, or authenticity</li>
                        <li>Courier errors or delays</li>
                        <li>Buyer or seller misconduct</li>
                        <li>Indirect, special, or consequential damages</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3 mb-3 sm:mb-4">
                        The platform's maximum liability is limited to the commission earned on the disputed transaction.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        By using the platform, users agree to these limitations and waive any additional claims against ReBooked Solutions.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        5.4 External Escalation
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                        If either party is dissatisfied with the internal outcome, they may escalate to:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>The National Consumer Commission (NCC)</li>
                        <li>The Consumer Goods and Services Ombud (CGSO)</li>
                        <li>Formal legal proceedings under South African law</li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-3">
                        ReBooked Solutions will comply with all lawful investigations but will not cover any legal costs incurred by either party.
                      </p>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <Card className="mt-8 sm:mt-12 shadow-lg border-gray-200">
          <CardHeader className="pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl flex items-center gap-3 text-gray-800">
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-blue-600" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <p className="text-blue-800 mb-4 sm:mb-6 text-base sm:text-lg font-medium">
                All queries, complaints, and policy-related matters must be
                directed to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <p className="text-blue-700 text-sm sm:text-base">
                    <strong>Email:</strong>{" "}
                    <span className="break-all">
                      legal@rebookedsolutions.co.za
                    </span>
                  </p>
                  <p className="text-blue-700 text-sm sm:text-base">
                    <strong>Business Hours:</strong> Monday–Friday, 09:00–17:00
                    (SAST)
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-blue-700 text-sm sm:text-base">
                    <strong>Website:</strong>{" "}
                    <span className="break-all">
                      www.rebookedsolutions.co.za
                    </span>
                  </p>
                  <p className="text-blue-700 text-sm sm:text-base">
                    <strong>Company:</strong> ReBooked Solutions (Pty) Ltd
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Policies;
