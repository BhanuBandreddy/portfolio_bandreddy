export type ProjectVideo = { src:string; poster?:string; title:string; caption:string; steps:string[] };
export type Project = {
  slug:string; name:string; category:string; market:string; status:string;
  summary:string; challenge:string; response:string; capabilities:string[];
  outcome:string; contribution:string[]; video?:ProjectVideo;
};

export const projects:Project[]=[
  {
    slug:"insurance-distribution",name:"Insurance Distribution Automation",category:"AI-assisted distribution workflow",market:"Insurance",status:"Delivered solution",
    summary:"A working distribution architecture that captures a lead, enriches and evaluates it, completes forms and quality checks, and hands the case to registration and website-automation services.",
    challenge:"A distributor may receive a lead through an app, WhatsApp or conversation, but still needs one controlled case record for data capture, enrichment, eligibility checks, forms, quality review and downstream registration.",
    response:"The delivered design places DOT, the GenAI layer, behind the application login. DOT routes Add Lead to WhatsApp or conversational intake, creates the lead card and assigned form, then invokes enrichment, evaluation, form filling and QC before single- or multiple-user registration and website automation.",
    capabilities:["App login and DOT entry point","App, WhatsApp and conversational lead intake","Lead-card creation and form assignment","Lead enrichment and evaluation","Form filling and quality control","Single/multiple-user registration and website automation"],
    outcome:"The demonstration documents the full hand-off sequence from lead capture to the URN response file, including the enterprise-intelligence and service-agent branches.",
    contribution:["Defined the end-to-end insurance distribution workflow","Structured the GenAI and enterprise-service responsibilities","Mapped the data, automation and human-control hand-offs"],
    video:{src:"/media/insurance-distribution.mp4",title:"Insurance distribution — end-to-end architecture",caption:"30-second system walkthrough showing how DOT coordinates lead intake, enrichment, evaluation, forms, QC, registration and website automation.",steps:["Lead enters from the app, WhatsApp or a conversation","DOT creates the lead card and assigned form","Enrichment, evaluation, form filling and QC run in sequence","Registration and website automation return the URN response file"]}
  },
  {
    slug:"claims-orchestration",name:"Claims & Member Data Orchestration",category:"Claims-service data architecture",market:"Health / Insurance",status:"Delivered solution",
    summary:"A working architecture connecting user identification and query context to organisation, member, insurance, CRM and structured/unstructured data sources.",
    challenge:"A claim or member-service request cannot be answered from one database. The system must identify the user, recognise the request context and retrieve the correct organisation, medical-card, insurance and CRM records without mixing identities or entitlements.",
    response:"DOT receives identity, query/context and fulfilment signals, checks the empanelled organisation, connects to the user and medical-card/insurance records, and coordinates structured, unstructured and on-demand CRM data. A new-user path creates a separate wallet/database record.",
    capabilities:["User identification","Query and context recognition","Fulfilment routing","Empanelled-organisation lookup","Medical-card, insurance and user data","CRM-on-demand and new-user record creation"],
    outcome:"The demonstration makes the identity and data boundaries explicit before a claims or member-service response is produced.",
    contribution:["Mapped the identity-to-data resolution sequence","Separated organisation, member, insurance and CRM sources","Defined fulfilment and new-user data paths"],
    video:{src:"/media/claims-orchestration.mp4",title:"Claims and member-data orchestration",caption:"20-second architecture build showing the data checks required before DOT can fulfil a claim or member query.",steps:["Identify the user and recognise the query context","Resolve the empanelled organisation and entitlement records","Retrieve structured, unstructured and CRM-on-demand data","Create a new user wallet/database only when no record exists"]}
  },
  {
    slug:"multi-agent-service",name:"Multi-Agent Customer Service",category:"Agentic service orchestration",market:"Financial services",status:"Delivered solution",
    summary:"A multi-agent service architecture that authenticates an inbound customer, identifies the request and routes retrieval to specialised data agents.",
    challenge:"An inbound customer may ask for a payment, claim, finance record, statement, receipt, product or relationship detail. One agent should not authenticate the customer, interpret every request and query every source without separation of responsibility.",
    response:"Agent 1 greets and identifies the customer, collects phone, ID and passcode, and uses an API for basic information. Service requests are then delegated to specialised agents that retrieve from vector data, payments/claims/finance records and customer-relationship sources.",
    capabilities:["Inbound greeting and intent capture","Authentication and customer identification","Phone, ID and passcode collection","Basic-information API response","Specialised retrieval agents","Vector, payments, claims, finance and relationship data"],
    outcome:"The demonstration shows where the primary agent stops and when specialised agents take responsibility for each data request.",
    contribution:["Designed the primary-agent and specialist-agent boundaries","Mapped authentication before service fulfilment","Separated request interpretation from controlled data retrieval"],
    video:{src:"/media/multi-agent-service.mp4",title:"Multi-agent customer-service architecture",caption:"30-second walkthrough of authentication, intent handling, API retrieval and specialist-agent delegation.",steps:["Agent 1 greets, authenticates and identifies the customer","The request is classified as information, update or list retrieval","Specialist agents fetch only from their assigned sources","The response is assembled from vector, claims, payments, finance or relationship data"]}
  },
  {
    slug:"salesverse",name:"Salesverse",category:"Enterprise sales CRM and insurance distribution",market:"Africa and Asia",status:"Live across five markets",
    summary:"A single configurable CRM base product shipped across East Africa, Malaysia, Thailand, the Philippines and Vietnam, covering the complete lead-to-policy lifecycle.",
    challenge:"Insurance sales teams often re-enter the same customer and policy information across CRM screens, document tools, quotation journeys and core-policy systems. Operations then review an incomplete case without seeing the communication and decision history in one place.",
    response:"Salesverse uses a shared case record and modular journey. A three-pane workbench keeps the lead queue, editable case information, communications, quality checks and tasks on one page. Product, country and language configuration sit outside the common lead-to-policy sequence.",
    capabilities:["Lead, activity and performance management","Needs analysis and quotation","KYC and document workflows","Payments and submission","Approval and policy issuance","Multilingual, offline and AI-assisted workflows"],
    outcome:"The platform is live across five markets with distinct regulatory and distribution requirements, using a shared base product with country, insurer and product configuration separated from the common journey.",
    contribution:["Architected the multi-market base product and roadmap","Defined the end-to-end insurance journey and shared case model","Led solution direction across UX, integrations, AI and delivery governance"],
  },
  {
    slug:"merchantverse",name:"Merchantverse",category:"Merchant onboarding and activation",market:"Thailand",status:"Solution prototype",
    summary:"A merchant-acquisition workflow for POS, QR and mPOS that covers sales capture, Thai KYB, approval, device issuance, installation and activation.",
    challenge:"Merchant information, documents, juristic verification, MCC selection and device activation are commonly owned by different teams. Without one case, sales cannot see why an application is waiting and operations repeat checks already completed upstream.",
    response:"The prototype provides a guided sales wizard, Thai TIN and juristic-profile verification, category-led MCC selection, a single-page review form, approver controls and an activation path ending in a test transaction.",
    capabilities:["Sales onboarding wizard","Thai KYB and TIN verification","MCC category selection","Single-page application review","Approval and exception handling","Issuance, installation and activation"],
    outcome:"The prototype carries one merchant case from sales entry through verification, approval and device activation, with ownership visible at each stage.",
    contribution:["Product and persona definition","Thailand-specific workflow design","Prototype and solution walkthrough leadership"],
  },
  {
    slug:"brokersuite",name:"BrokerSuite",category:"Insurance broker operating platform",market:"APAC",status:"Product platform",
    summary:"A broker platform joining clients, leads, policies, renewals, claims, collections, accounting, receipts and payments.",
    challenge:"A broker must connect commercial activity to operational and financial events. If client, policy, claim, collection, receipt and ledger records sit in separate applications, teams cannot reconcile the current position of a case or account.",
    response:"BrokerSuite defines shared entities and workflows across sales, operations and accounts, including product configuration, renewal processing, claims, collections, payments and receipts.",
    capabilities:["Clients and leads","Sales and renewals","Product configuration","Claims operations","Collections and accounting","Payments and receipts"],
    outcome:"The platform model links the client and policy lifecycle to the related claim, receipt, payment and accounting events.",
    contribution:["Suite-level product architecture","Cross-functional workflow definition","Requirements, solution mapping and delivery alignment"],
  },
  {
    slug:"academy-2",name:"Academy 2.0",category:"Learning and sales-performance PWA",market:"Vietnam",status:"Client solution design",
    summary:"A bilingual learning platform with distinct experiences for Sales Agents, Bank Managers, Pru Managers and Trainers.",
    challenge:"The four personas act on different information: agents need learning and coaching, bank managers need team intervention, Pru managers need organisational performance, and trainers need content and assignment controls.",
    response:"The solution maps each persona to a separate PWA workspace and connects them to shared authentication, LMS, sales, content, segmentation, recommendation, predictive-analytics and AI-coaching services.",
    capabilities:["Four persona workspaces","AI learning recommendations","Skill-gap analysis","Microlearning","AI sales coaching","Learning-to-sales performance correlation"],
    outcome:"The design produced a four-persona capability map and layered architecture connecting the PWA to LMS, HRMS, content, sales and AI services.",
    contribution:["Persona and capability architecture","AI learning and coaching use-case design","PWA, data and integration solution mapping"],
  },
  {
    slug:"product-configurator",name:"Product Configurator",category:"Insurance product configuration",market:"ASEAN",status:"Product concept and prototype",
    summary:"An API-first configuration experience that converts verified product manuals and master tables into structured products, riders and rules.",
    challenge:"Product rules are distributed across PAS manuals, master tables and specialist knowledge. A language model can help extract and explain them, but it must not invent labels, formulas, rider mappings or eligibility rules.",
    response:"The concept separates AI-assisted extraction and conversation from deterministic templates, source-backed masters, validation and API output for life and non-life product configuration.",
    capabilities:["Manual and master-data extraction","Structured product and rider configuration","Source-linked AI assistance","Deterministic rule validation","Multilingual forms","Standalone configuration API"],
    outcome:"The prototype demonstrates how verified source material can become structured configuration without allowing generated text to become an unapproved business rule.",
    contribution:["Product concept and control model","AI-versus-deterministic responsibility design","Admin workflow and API direction"],
  },
  {
    slug:"bank-x",name:"Bank X / Global Social",category:"Open banking and AI-powered social commerce",market:"UK, Europe and cross-border",status:"Founder-led MVP delivered",
    summary:"Founder-led open-banking and social-commerce products developed through lean prototyping, investor engagement, focus-group validation and live cloud MVP launches.",
    challenge:"Travel discovery, local commerce, fulfilment, identity and payment occur in separate services, leaving the user to coordinate the journey manually.",
    response:"The prototype uses itinerary parsing and an agent orchestrator with TrustPay, GlobeGuides, LocaleLens and PathSync, supported by a Supabase data layer and concepts for peer logistics, identity and escrow.",
    capabilities:["Itinerary parsing","Multi-agent orchestration","Social and local discovery","Peer-logistics workflow","Escrow concept","Identity and trust patterns"],
    outcome:"Global Social was developed using Replit, GitHub, OpenAI and Google AI Studio as a live MVP for itinerary-driven discovery, coordination and transaction workflows.",
    contribution:["Founder, business-model and product strategy","Investor pitching, community building and focus-group validation","Hands-on full-stack, agent and cloud MVP prototyping"],
  }
];

export const strengths=[
  ["Product direction","Define the product boundary, reusable domain model, roadmap and market-specific configuration rather than treating each client request as a separate application."],
  ["Solution architecture","Map personas, journeys, APIs, data, integrations, control points and non-functional constraints into an implementation sequence."],
  ["Applied AI","Separate probabilistic tasks such as interpretation and generation from deterministic rules, approved data and validation."],
  ["Execution leadership","Carry decisions from discovery and estimation into requirements, prototype, development, UAT and release planning."],
];
