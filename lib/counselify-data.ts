export type Jurisdiction =
  | 'Kenya'
  | 'Uganda'
  | 'Tanzania'
  | 'Rwanda'
  | 'Burundi'
  | 'Ethiopia'
  | 'DRC'
  | 'South Sudan'
  | 'Somalia'
  | 'Malawi'
  | 'Zimbabwe'
  | 'East African Community';

export type IndustrySlug =
  | 'agriculture'
  | 'financial-services'
  | 'technology'
  | 'healthcare'
  | 'energy'
  | 'trade-commerce'
  | 'ngos-public-sector'
  | 'smes';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export const eastAfricanCountries = [
  { code: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: 'UG', flag: '🇺🇬', name: 'Uganda' },
  { code: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
  { code: 'RW', flag: '🇷🇼', name: 'Rwanda' },
  { code: 'BI', flag: '🇧🇮', name: 'Burundi' },
  { code: 'ET', flag: '🇪🇹', name: 'Ethiopia' },
  { code: 'CD', flag: '🇨🇩', name: 'DRC' },
  { code: 'SS', flag: '🇸🇸', name: 'South Sudan' },
  { code: 'SO', flag: '🇸🇴', name: 'Somalia' },
  { code: 'MW', flag: '🇲🇼', name: 'Malawi' },
  { code: 'ZW', flag: '🇿🇼', name: 'Zimbabwe' },
  { code: 'EAC', flag: '🌍', name: 'East African Community' },
] as const;

export const pillars = [
  {
    number: '01',
    title: 'Understand',
    description: 'Read contracts, obligations, filings, and counterpart exposure in one operating layer built for legal teams.',
  },
  {
    number: '02',
    title: 'Predict',
    description: 'Track regulatory movement across East Africa with probability scoring, impact mapping, and action planning.',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Generate documents, assign remediation, and maintain audit-ready evidence without leaving the workspace.',
  },
] as const;

export const productFeatures = [
  {
    title: 'Contract Analysis',
    description: 'Clause extraction, risk scoring, redline suggestions, and jurisdiction-aware missing clause detection.',
    href: '/features#contract-analysis',
    anchor: 'contract-analysis',
  },
  {
    title: 'AI Legal Assistant',
    description: 'An always-available legal copilot trained for East African operating contexts and commercial realities.',
    href: '/features#ai-assistant',
    anchor: 'ai-assistant',
  },
  {
    title: 'Compliance Hub',
    description: 'Industry-specific legal checklists, deadline tracking, and continuous compliance scoring across 12 jurisdictions.',
    href: '/features#compliance-hub',
    anchor: 'compliance-hub',
  },
  {
    title: 'Regulatory Forecaster',
    description: 'Predictive signals for policy shifts, enforcement changes, and upcoming obligations before they become urgent.',
    href: '/features#regulatory-forecaster',
    anchor: 'regulatory-forecaster',
  },
  {
    title: 'Document Generation',
    description: 'Template-driven drafting for operating agreements, procurement paper, HR docs, privacy packs, and more.',
    href: '/features#document-generation',
    anchor: 'document-generation',
  },
  {
    title: 'Reporting & Analytics',
    description: 'Board-ready reporting, legal risk trends, exportable evidence packs, and workspace analytics.',
    href: '/features#reporting',
    anchor: 'reporting',
  },
] as const;

export const featureSections = [
  {
    id: 'contract-analysis',
    eyebrow: 'Contract analysis engine',
    title: 'Review complex agreements with structure, not guesswork.',
    paragraphs: [
      'The Counselify ingests PDF and DOCX contracts, identifies the governing structure of the agreement, and classifies clauses across thirty legal categories including parties, payment, term, liability, data protection, IP ownership, audit rights, dispute resolution, and termination.',
      'Each uploaded contract is evaluated against jurisdiction-aware rule packs tailored to East African commercial practice. That means a Kenyan SaaS agreement is reviewed differently from a Tanzanian distribution contract or a Ugandan outsourcing arrangement.',
      'Risk scores are not generic. They are generated from clause presence, clause balance, drafting quality, counterparty leverage, and known operational gaps such as missing processor terms, weak service credits, or uncapped indemnities.',
      'Legal teams can compare multiple versions of a contract, inspect missing clauses against checklists, and move directly from analysis into suggested redlines with plain-English reasoning that makes review faster without reducing control.',
    ],
    bullets: [
      'PDF & DOCX upload with drag & drop',
      '30-clause category extraction',
      'Risk scoring 0–100 with severity levels',
      'Missing clause detection against jurisdiction checklists',
      'Suggested redlines with plain-English rationale',
      'Multi-contract comparison',
    ],
    visual: {
      title: 'Safaricom Distribution Agreement',
      score: 67,
      items: [
        'Indemnity cap missing',
        'Data transfer annex incomplete',
        'Service credit language recommended',
      ],
    },
  },
  {
    id: 'ai-assistant',
    eyebrow: 'AI legal assistant',
    title: 'Ask for legal reasoning any time, with context grounded in your workspace.',
    paragraphs: [
      'The assistant operates as a jurisdiction-aware legal research and drafting layer available around the clock. It can summarize clauses, explain obligations, generate negotiation positions, and respond using the facts already present in your contracts and compliance records.',
      'Instead of a one-size-fits-all chatbot, The Counselify exposes clear legal work modes. Negotiation mode helps teams prepare fallback language and redline strategy. Strategy mode surfaces commercial risk and board-level implications. Contract review mode stays clause-specific. Drafting mode focuses on first-pass documents. Voice command support is designed for fast capture during internal review calls.',
      'Responses are structured for legal teams, not casual Q&A. The assistant names the issue, states the operational consequence, and recommends a next action that can be tracked in the platform.',
    ],
    bullets: [
      '24/7 jurisdiction-aware responses',
      'Negotiation, Strategy, Review, Drafting, and Voice modes',
      'Plain-English explanations for non-lawyer stakeholders',
      'Context from contracts, checklists, and documents',
      'Persistent memory for organization-specific context',
      'Escalation-ready summaries and action lists',
    ],
    visual: {
      prompt: 'What is the main exposure in the MTN Uganda supply agreement?',
      answer:
        'The highest exposure is uncapped indemnity linked to reseller conduct. Recommend capping liability to trailing 12-month fees and limiting indemnity to direct breach.',
    },
  },
  {
    id: 'compliance-hub',
    eyebrow: 'Compliance hub',
    title: 'Generate the legal operating checklist your sector actually needs.',
    paragraphs: [
      'The compliance hub builds dynamic checklists by industry and jurisdiction, then keeps them current as obligations change. A fintech in Kenya does not receive the same checklist as a health distributor in Rwanda or an NGO operating across Uganda and Tanzania.',
      'Each checklist item includes the legal category, owner, due date, and evidence expectation. Teams can monitor the overall compliance score of a workspace, drill down by country, and spot exactly which controls are open, overdue, or awaiting review.',
      'The system is designed for continuous operations, not annual panic. Deadline tracking, supporting documents, and status history make it easier to stay ready for regulators, investors, internal audits, and board updates.',
    ],
    bullets: [
      'Industry-specific checklist generation',
      '12 East African jurisdictions covered',
      'Compliance score tracking over time',
      'Alerts, deadlines, and assignee ownership',
      'Evidence-driven completion states',
      'Cross-jurisdiction workspace visibility',
    ],
    visual: {
      progress: 84,
      checklist: [
        { label: 'Kenya VAT filing', status: 'Complete' },
        { label: 'Uganda data inventory review', status: 'In progress' },
        { label: 'Tanzania license renewal', status: 'Upcoming' },
      ],
    },
  },
  {
    id: 'regulatory-forecaster',
    eyebrow: 'Regulatory forecaster',
    title: 'See likely legal change before it becomes operational risk.',
    paragraphs: [
      'The regulatory forecaster turns policy monitoring into an actionable pipeline. It combines watchlists, legal source tracking, and internal exposure mapping to estimate the probability, timing, and impact of upcoming regulatory shifts.',
      'Signals are prioritized by relevance to your organization. A telecom operator sees different alerts from an agricultural exporter or a healthcare services provider, even if all of them work across the same countries.',
      'Each forecast includes recommended actions, impacted obligations, and the commercial systems most likely to be affected so legal teams can brief operations before enforcement starts to bite.',
    ],
    bullets: [
      'Probability scoring for pending change',
      'Impact mapping by function and jurisdiction',
      'Recommended action plans',
      'Predictive alerts for legal and operations leads',
      'Timeline view for policy movement',
      'Board-ready summaries for risk committees',
    ],
    visual: {
      timeline: [
        'Kenya data transfer amendment - 78% probability',
        'Uganda tax appeals reform - 65% probability',
        'Rwanda cybersecurity reporting bill - 82% probability',
      ],
    },
  },
  {
    id: 'document-generation',
    eyebrow: 'Document generation',
    title: 'Draft faster with templates shaped for East African legal practice.',
    paragraphs: [
      'The document generator includes more than 250 templates across twenty categories including contracts, employment, procurement, privacy, compliance, finance, healthcare, NGO operations, and board governance.',
      'Templates are jurisdiction-aware. A Kenya employment agreement, a Rwanda data processing agreement, and a Tanzania services contract surface different clause options and guidance based on applicable law and regional practice.',
      'Drafting is guided instead of blank-page driven. Teams answer structured prompts, the system composes the first draft, and the assistant can help tailor language before export to PDF or DOCX.',
    ],
    bullets: [
      '250+ templates across 20 categories',
      'AI-guided drafting flows',
      'Jurisdiction-aware outputs',
      'Version history and re-use',
      'Template customization for enterprise',
      'PDF and DOCX export',
    ],
    visual: {
      templates: [
        'Kenya NDA',
        'Uganda employment contract',
        'Tanzania vendor agreement',
        'Rwanda data processing addendum',
        'Donor funding agreement',
        'Cross-border distribution contract',
      ],
    },
  },
  {
    id: 'reporting',
    eyebrow: 'Reporting & analytics',
    title: 'Turn legal work into something management can understand and act on.',
    paragraphs: [
      'The reporting layer surfaces risk trends, compliance performance, workflow bottlenecks, and jurisdiction exposure over time. Legal teams can move from daily work into monthly reporting without exporting raw data into a spreadsheet maze.',
      'Reports are designed for operations reviews, management meetings, and audit preparation. Teams can schedule exports, share board-ready PDFs, and produce structured CSVs for external reporting or internal analysis.',
      'Because the system ties contracts, compliance, documents, and assistant activity together, reporting reflects the state of the legal operation as a whole instead of a single isolated workflow.',
    ],
    bullets: [
      'Risk trend charts and heatmaps',
      'Compliance scores over time',
      'Audit-ready PDF and CSV export',
      'Scheduled recurring reports',
      'Cross-country reporting for regional teams',
      'Executive summaries for leadership review',
    ],
    visual: {
      chart: [
        { month: 'Nov', score: 71 },
        { month: 'Dec', score: 74 },
        { month: 'Jan', score: 76 },
        { month: 'Feb', score: 79 },
        { month: 'Mar', score: 82 },
        { month: 'Apr', score: 84 },
      ],
    },
  },
] as const;

export const pricingTiers = [
  {
    name: 'Freemium Trial',
    monthlyPrice: '$0',
    annualPrice: '$0',
    cadence: '/ forever',
    description: 'For individuals exploring AI legal tools',
    ctaLabel: 'Start Free',
    ctaHref: '/auth?tab=signup',
    featured: false,
    features: [
      '1 user workspace',
      'Starter contract analysis',
      'Basic assistant access',
      'Limited compliance monitoring',
      'Template library preview',
    ],
  },
  {
    name: 'Professional',
    monthlyPrice: '$149',
    annualPrice: '$119',
    cadence: '/ month',
    description: 'For growing businesses with active legal operations',
    ctaLabel: 'Start Free Trial',
    ctaHref: '/auth?tab=signup',
    featured: true,
    features: [
      'Unlimited contracts',
      'Advanced AI assistant',
      'Full compliance hub',
      'Jurisdiction-aware drafting',
      'Reporting and scheduled exports',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom Pricing',
    annualPrice: 'Custom Pricing',
    cadence: '',
    description: 'For large organizations and government entities',
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
    featured: false,
    features: [
      'Unlimited users and workspaces',
      'Custom templates and controls',
      'Dedicated support and SLA',
      'Advanced security and residency options',
      'Private onboarding and rollout support',
    ],
  },
] as const;

export const pricingComparisonSections = [
  {
    category: 'General',
    rows: [
      ['Account Access', '✓', '✓', '✓'],
      ['Multi-Device Access', '✓', '✓', '✓'],
      ['Support', 'Basic', 'Standard', 'Dedicated'],
      ['SLA', '✗', '✗', '✓'],
    ],
  },
  {
    category: 'Dashboard',
    rows: [
      ['Overview Widgets', '✓', '✓', '✓'],
      ['Risk Visualizations', 'Limited', 'Full', 'Full'],
      ['Compliance Map', 'Limited', 'Full', 'Full + Custom'],
      ['Custom Dashboard', '✗', '✓', '✓'],
    ],
  },
  {
    category: 'Contract Analysis',
    rows: [
      ['Document Upload', 'Limited', 'Unlimited', 'Unlimited'],
      ['Risk Scoring', 'Basic', 'Advanced', 'Advanced + Custom'],
      ['Missing Clauses Detection', 'Limited', '✓', '✓'],
      ['Compliance Gap Detection', '✗', '✓', '✓'],
      ['Key Term Extraction', '✓', '✓', '✓'],
      ['Multi-Contract Comparison', '✗', '✓', '✓'],
      ['Industry Benchmarking', '✗', '✗', '✓'],
      ['Contract History', 'Limited', 'Full', 'Full'],
    ],
  },
  {
    category: 'AI Legal Assistant',
    rows: [
      ['Basic Chat', '✓', '✓', '✓'],
      ['Contextual Responses', 'Limited', '✓', '✓'],
      ['Negotiation Mode', '✗', '✓', '✓'],
      ['Strategy Mode', '✗', '✓', '✓'],
      ['Contract Review', '✗', '✓', '✓'],
      ['Drafting Mode', 'Limited', '✓', '✓'],
      ['Execution Mode', '✗', 'Limited', 'Full'],
      ['Voice Commands', '✗', 'Limited', 'Full'],
      ['Multi-Document Reasoning', '✗', '✓', '✓'],
      ['Persistent Memory', '✗', '✓', '✓'],
    ],
  },
  {
    category: 'Document Generation',
    rows: [
      ['Template Library', 'Limited', 'Full', 'Full + Custom'],
      ['AI Drafting', 'Limited', '✓', '✓'],
      ['Jurisdiction-Specific Docs', '✗', '✓', '✓'],
      ['Versioning', '✗', '✓', '✓'],
      ['Custom Templates', '✗', '✗', '✓'],
    ],
  },
  {
    category: 'Compliance Hub',
    rows: [
      ['Regulatory Database', 'Limited', 'Full', 'Full'],
      ['AI Checklist Generator', 'Limited', '✓', '✓'],
      ['Alerts & Deadlines', 'Basic', 'Advanced', 'Advanced'],
      ['Compliance Score', '✓', '✓', '✓'],
      ['Auto-Compliance Engine', '✗', 'Limited', 'Full'],
    ],
  },
  {
    category: 'Regulatory Forecaster',
    rows: [
      ['Forecast Access', '✗', 'Limited', 'Full'],
      ['Risk Prediction', '✗', '✓', '✓'],
      ['Scenario Simulation', '✗', '✗', '✓'],
      ['Predictive Alerts', '✗', '✓', '✓'],
    ],
  },
  {
    category: 'Reporting',
    rows: [
      ['Standard Reports', '✓', '✓', '✓'],
      ['Custom Dashboards', '✗', '✓', '✓'],
      ['Scheduled Reports', '✗', '✓', '✓'],
      ['Data Export', 'Limited', '✓', '✓'],
      ['Advanced Analytics', '✗', '✗', '✓'],
    ],
  },
  {
    category: 'Team Collaboration',
    rows: [
      ['Users', '1', '5–10', 'Unlimited'],
      ['Shared Workspaces', '✗', '✓', '✓'],
      ['Role-Based Access', '✗', '✓', '✓'],
      ['Audit Logs', '✗', '✓', '✓'],
      ['Activity Tracking', '✗', '✓', '✓'],
    ],
  },
  {
    category: 'Workflow Automation',
    rows: [
      ['Workflow Builder', '✗', 'Limited', 'Full'],
      ['Approval Flows', '✗', '✓', '✓'],
      ['Automated Actions', '✗', 'Limited', 'Full'],
    ],
  },
  {
    category: 'Contract Lifecycle',
    rows: [
      ['Basic Tracking', '✓', '✓', '✓'],
      ['Obligation Tracking', '✗', '✓', '✓'],
      ['Renewal Alerts', '✗', '✓', '✓'],
      ['Contract Health Score', '✗', '✓', '✓'],
    ],
  },
  {
    category: 'Security',
    rows: [
      ['Encryption', '✓', '✓', '✓'],
      ['Access Control', 'Basic', 'Advanced', 'Advanced'],
      ['Audit Logs', '✗', '✓', '✓'],
      ['Data Residency Control', '✗', '✗', '✓'],
      ['Compliance Certifications', '✗', '✗', '✓'],
    ],
  },
  {
    category: 'Integrations',
    rows: [
      ['API Access', '✗', 'Limited', 'Full'],
      ['Third-Party Integrations', '✗', '✓', '✓'],
      ['Webhooks', '✗', '✓', '✓'],
      ['SDK / Embedded AI', '✗', '✗', '✓'],
    ],
  },
  {
    category: 'Autonomous Agents',
    rows: [
      ['Compliance Agent', '✗', 'Limited', 'Full'],
      ['Contract Agent', '✗', 'Limited', 'Full'],
      ['Regulatory Agent', '✗', '✗', 'Full'],
      ['Execution Agent', '✗', '✗', 'Full'],
    ],
  },
  {
    category: 'Advanced Systems',
    rows: [
      ['Legal Knowledge Graph', '✗', '✓', '✓'],
      ['Clause Intelligence', '✗', '✓', '✓'],
      ['Fraud Detection', '✗', '✗', '✓'],
      ['Sandbox Simulation', '✗', '✗', '✓'],
      ['Industry Benchmarking', '✗', '✗', '✓'],
    ],
  },
] as const;

export const pricingFaqs = [
  ['Can I upgrade or downgrade my plan?', 'Yes, from your dashboard under Billing.'],
  ['Is there a contract or commitment?', 'No. Monthly plans cancel anytime.'],
  ['Do you offer discounts for NGOs or startups?', 'Yes — contact us.'],
  ['Is my data secure?', 'AES-256 encryption, RLS, audit logs, zero-trust access.'],
  [
    'Which East African jurisdictions are covered?',
    'Kenya, Uganda, Tanzania, Rwanda, Burundi, Ethiopia, DRC, South Sudan, Somalia, Malawi, Zimbabwe, and East African Community monitoring.',
  ],
] as const;

export const contactInquiryTypes = ['General Inquiry', 'Enterprise Sales', 'Technical Support', 'Partnership', 'Press'] as const;

export const industryCards = [
  {
    slug: 'agriculture',
    name: 'Agriculture',
    tagline: 'Land use, exports, agro-inputs, and rural supply chain controls.',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    tagline: 'AML, KYC, outsourcing, payments, and central bank obligations.',
  },
  {
    slug: 'technology',
    name: 'Technology & ICT',
    tagline: 'Data protection, SaaS terms, cyber risk, and cross-border hosting.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Patient data, licensing, facilities, and supplier oversight.',
  },
  {
    slug: 'energy',
    name: 'Energy & Natural Resources',
    tagline: 'Permits, local content, environmental duties, and land access.',
  },
  {
    slug: 'trade-commerce',
    name: 'Trade & Commerce',
    tagline: 'Customs, channel contracts, VAT exposure, and consumer rules.',
  },
  {
    slug: 'ngos-public-sector',
    name: 'NGOs & Public Sector',
    tagline: 'Funding controls, donor restrictions, procurement, and reporting.',
  },
  {
    slug: 'smes',
    name: 'SMEs',
    tagline: 'Practical legal operations for growing businesses with lean teams.',
  },
] as const;

export const industries = [
  {
    key: 'Agriculture',
    slug: 'agriculture',
    stat: 'Export and land-use controls',
    document: 'Export Produce Supply Agreement',
    challenges: [
      'Produce export permits and phytosanitary obligations',
      'Warehouse receipt and commodity financing controls',
      'Seasonal labor, safety, and transport compliance',
      'Cross-border distribution and customs exposure',
    ],
  },
  {
    key: 'Financial Services',
    slug: 'financial-services',
    stat: 'AML, KYC, and central bank oversight',
    document: 'Agency Banking Agreement',
    challenges: [
      'AML and KYC workflow governance',
      'Central bank outsourcing and incident reporting rules',
      'Digital lending disclosures and collections controls',
      'Cybersecurity and audit expectations',
    ],
  },
  {
    key: 'Technology & ICT',
    slug: 'technology',
    stat: 'Data, IP, and service continuity risk',
    document: 'SaaS Master Service Agreement',
    challenges: [
      'Cross-border transfer terms and processor controls',
      'Source code escrow, IP ownership, and licensing issues',
      'Cyber incident reporting and uptime exposure',
      'Vendor SLAs and subcontractor governance',
    ],
  },
  {
    key: 'Healthcare',
    slug: 'healthcare',
    stat: 'Patient safety and licensing obligations',
    document: 'Clinical Services Agreement',
    challenges: [
      'Patient data confidentiality and consent controls',
      'Medical product licensing and supplier duties',
      'Facility accreditation and professional practice renewals',
      'Recall response and pharmacovigilance obligations',
    ],
  },
  {
    key: 'Energy & Natural Resources',
    slug: 'energy',
    stat: 'Permits, land, and environmental controls',
    document: 'Power Purchase Agreement',
    challenges: [
      'Environmental permits and community obligations',
      'Grid connection performance and outage penalties',
      'Land access, compensation, and local content duties',
      'Fuel import, storage, and tax treatment risk',
    ],
  },
  {
    key: 'Trade & Commerce',
    slug: 'trade-commerce',
    stat: 'Customs and multi-market sales compliance',
    document: 'Cross-Border Distribution Contract',
    challenges: [
      'Import and export paperwork, tariffs, and customs value',
      'Reseller controls, rebates, and channel conflict',
      'Consumer protection disclosure obligations',
      'VAT and withholding tax exposure across markets',
    ],
  },
  {
    key: 'NGOs & Public Sector',
    slug: 'ngos-public-sector',
    stat: 'Grant, procurement, and reporting governance',
    document: 'Donor Funding Agreement',
    challenges: [
      'Donor restrictions and grant reporting covenants',
      'Registration renewals and regulator filings',
      'Safeguarding, procurement, and employment controls',
      'Cross-border funding approvals and anti-bribery terms',
    ],
  },
  {
    key: 'SMEs',
    slug: 'smes',
    stat: 'Practical legal infrastructure for growth',
    document: 'SME Services Agreement',
    challenges: [
      'Business licensing and annual return filings',
      'VAT, payroll, and record retention deadlines',
      'Simple contract governance and renewal tracking',
      'Access to jurisdiction-ready templates without large legal overhead',
    ],
  },
] as const;

export const industryDetails: Record<
  IndustrySlug,
  {
    name: string;
    tagline: string;
    landscape: string[];
    howItHelps: Array<{ title: string; description: string }>;
    regulations: Array<{ name: string; jurisdiction: string; description: string }>;
    templates: string[];
  }
> = {
  agriculture: {
    name: 'Agriculture',
    tagline: 'Legal operations for growers, exporters, processors, and agri-finance operators.',
    landscape: [
      'East African agricultural businesses navigate a dense combination of land use regulation, crop-specific licensing, export controls, agrochemical rules, and cross-border phytosanitary requirements. Contracting is rarely simple because commercial performance depends on weather exposure, transport reliability, seasonal labor, and warehouse finance arrangements.',
      'A business shipping produce from Kenya into regional markets may need to manage produce standards, customs declarations, transport liabilities, and downstream distributor obligations at the same time. When the supply chain crosses multiple jurisdictions, missing compliance controls quickly become commercial risk.',
      'Agricultural operations also face documentation pressure around sourcing, quality control, storage, and payment mechanics. These businesses need legal tools that connect trade documentation, land-related obligations, supplier terms, and compliance calendars rather than handling each piece in isolation.',
    ],
    howItHelps: [
      { title: 'Export contract review', description: 'Analyze produce supply, logistics, and distributor contracts for pricing, force majeure, quality, and dispute risk.' },
      { title: 'Permit and deadline tracking', description: 'Monitor licensing, inspection, and filing obligations tied to export, storage, and agro-input operations.' },
      { title: 'Template-driven procurement', description: 'Generate grower agreements, warehouse terms, NDAs, service contracts, and cross-border trade paper faster.' },
    ],
    regulations: [
      { name: 'Kenya Crops Act', jurisdiction: 'Kenya', description: 'Framework for crop regulation, licensing, and sector oversight.' },
      { name: 'Kenya Plant Protection Act', jurisdiction: 'Kenya', description: 'Controls plant health, pest prevention, and phytosanitary compliance.' },
      { name: 'Uganda National Agricultural Advisory Services framework', jurisdiction: 'Uganda', description: 'Relevant guidance for agricultural service delivery and operations.' },
      { name: 'Uganda National Environment Act', jurisdiction: 'Uganda', description: 'Environmental compliance obligations affecting agricultural processing and land use.' },
      { name: 'Tanzania Plant Health Act', jurisdiction: 'Tanzania', description: 'Supports phytosanitary controls and export compliance.' },
      { name: 'Rwanda Agriculture and Animal Resources regulations', jurisdiction: 'Rwanda', description: 'Operational rules affecting sector licensing and controls.' },
      { name: 'EAC Sanitary and Phytosanitary Protocols', jurisdiction: 'EAC', description: 'Regional framework for cross-border agricultural safety and inspection standards.' },
    ],
    templates: ['Produce Supply Agreement', 'Warehouse Storage Terms', 'Agro-Input Distribution Contract', 'Cross-Border Logistics Agreement', 'Seasonal Labor Engagement Letter'],
  },
  'financial-services': {
    name: 'Financial Services',
    tagline: 'Legal infrastructure for banks, fintechs, insurers, SACCOs, and payment operators.',
    landscape: [
      'Financial institutions in East Africa operate under continuous regulatory attention. AML, KYC, outsourcing approvals, cyber obligations, dispute management, product disclosures, and central bank reporting must all stay synchronized as operations expand across borders.',
      'Commercial contracts in finance also carry distinct sensitivity. Vendor outsourcing terms, cloud contracts, payment processor agreements, and digital lending documentation all require stronger audit, data, incident response, and regulator-facing controls than a generic commercial template would provide.',
      'When legal and compliance teams cannot see obligations centrally, issues surface late: weak vendor clauses, overdue filings, unresolved audit actions, and inconsistent customer-facing disclosures. A financial services workflow needs high visibility and disciplined documentation across jurisdictions.',
    ],
    howItHelps: [
      { title: 'AML and KYC governance', description: 'Track obligations, refresh cycles, and evidence requirements across regulated onboarding workflows.' },
      { title: 'Regulatory signal monitoring', description: 'Watch central bank and payments policy changes that affect outsourcing, capital, conduct, and digital products.' },
      { title: 'Vendor contract controls', description: 'Review cloud, outsourcing, processing, and service agreements for audit rights, data residency, and liability issues.' },
    ],
    regulations: [
      { name: 'Kenya Banking Act', jurisdiction: 'Kenya', description: 'Core law governing banking operations and prudential supervision.' },
      { name: 'Central Bank of Kenya Prudential Guidelines', jurisdiction: 'Kenya', description: 'Detailed operational standards for licensed institutions.' },
      { name: 'Kenya Proceeds of Crime and Anti-Money Laundering Act', jurisdiction: 'Kenya', description: 'Foundational AML framework.' },
      { name: 'Uganda Anti-Money Laundering Act', jurisdiction: 'Uganda', description: 'AML obligations for financial and reporting entities.' },
      { name: 'Bank of Uganda Financial Consumer Protection Guidelines', jurisdiction: 'Uganda', description: 'Rules affecting customer disclosures and treatment.' },
      { name: 'Tanzania Banking and Financial Institutions Act', jurisdiction: 'Tanzania', description: 'Framework for regulated banking and financial activity.' },
      { name: 'National Bank of Rwanda regulations on outsourcing and ICT risk', jurisdiction: 'Rwanda', description: 'Controls for outsourcing and technology governance.' },
    ],
    templates: ['Agency Banking Agreement', 'Payment Processing Addendum', 'Cloud Outsourcing Agreement', 'AML Policy', 'Customer Disclosure Notice'],
  },
  technology: {
    name: 'Technology & ICT',
    tagline: 'Commercial and compliance infrastructure for SaaS, telecom, software, and digital services.',
    landscape: [
      'Technology businesses in East Africa carry a distinctive mix of contract and regulatory complexity. Data protection, cross-border transfer controls, uptime commitments, cybersecurity standards, IP ownership, and reseller relationships all shape commercial risk.',
      'Fast-growing software and telecom businesses often sign agreements at pace, but the legal debt accumulates quietly: missing processor clauses, uncapped credits, weak subcontractor controls, unstructured security obligations, or unclear ownership of custom work product.',
      'The operating challenge is not just drafting. Legal teams need visibility into where customer data moves, what regulatory obligations apply by country, and which supplier contracts could become critical exposure during an incident or renewal cycle.',
    ],
    howItHelps: [
      { title: 'SaaS and telecom contract review', description: 'Score liability, data, uptime, termination, and IP exposure across core commercial agreements.' },
      { title: 'Data protection readiness', description: 'Track processor obligations, cross-border transfers, breach notice requirements, and privacy documentation.' },
      { title: 'Faster drafting for product teams', description: 'Generate NDAs, MSAs, data processing addenda, API terms, and support schedules with legal guardrails built in.' },
    ],
    regulations: [
      { name: 'Kenya Data Protection Act', jurisdiction: 'Kenya', description: 'Primary data privacy framework for processing and transfers.' },
      { name: 'Kenya Computer Misuse and Cybercrimes Act', jurisdiction: 'Kenya', description: 'Cyber-related offences and response obligations.' },
      { name: 'Uganda Data Protection and Privacy Act', jurisdiction: 'Uganda', description: 'Data handling obligations for controllers and processors.' },
      { name: 'Tanzania Personal Data Protection Act', jurisdiction: 'Tanzania', description: 'Rules for personal data processing and related controls.' },
      { name: 'Rwanda Law on Protection of Personal Data and Privacy', jurisdiction: 'Rwanda', description: 'National privacy framework affecting digital operators.' },
      { name: 'Ethiopian Communications Service Proclamation', jurisdiction: 'Ethiopia', description: 'Relevant telecom and communications controls.' },
      { name: 'EAC e-Commerce and digital market initiatives', jurisdiction: 'EAC', description: 'Regional policy direction affecting digital business operations.' },
    ],
    templates: ['SaaS Master Service Agreement', 'Data Processing Addendum', 'Mutual NDA', 'API Terms of Use', 'Cyber Incident Response Annex'],
  },
  healthcare: {
    name: 'Healthcare',
    tagline: 'Legal control for clinics, distributors, labs, healthtech, and care networks.',
    landscape: [
      'Healthcare organizations manage highly sensitive obligations around patient information, licensing, medical procurement, facility approvals, and professional standards. Even when business models are innovative, the legal baseline remains tightly regulated.',
      'Procurement and service contracts in healthcare need stronger drafting discipline because poor quality controls, delayed reporting, or weak liability allocation can spill quickly into patient safety, regulator exposure, and reputational damage.',
      'Healthcare legal teams also operate across a varied ecosystem of clinicians, labs, distributors, pharmaceutical suppliers, insurers, and public agencies. That makes a structured operating system especially valuable: every contract and compliance workflow needs to be visible, searchable, and tied to deadlines.',
    ],
    howItHelps: [
      { title: 'Licensing and facility readiness', description: 'Track key operating approvals, renewal windows, and evidence collection across facilities and service lines.' },
      { title: 'Patient data and vendor risk', description: 'Review confidentiality, security, and processing terms for systems handling sensitive patient information.' },
      { title: 'Clinical and supply contracts', description: 'Generate and review healthcare-specific agreements with stronger quality, recall, and indemnity language.' },
    ],
    regulations: [
      { name: 'Kenya Pharmacy and Poisons Act', jurisdiction: 'Kenya', description: 'Core framework for pharmaceutical practice and control.' },
      { name: 'Kenya Health Act', jurisdiction: 'Kenya', description: 'Broad framework for healthcare service regulation.' },
      { name: 'Uganda National Drug Policy and Authority Act', jurisdiction: 'Uganda', description: 'Medicines and related authority oversight.' },
      { name: 'Tanzania Medicines and Medical Devices Act', jurisdiction: 'Tanzania', description: 'Regulates medicines, medical devices, and related operations.' },
      { name: 'Rwanda Food and Drugs Authority requirements', jurisdiction: 'Rwanda', description: 'Relevant sector licensing and product controls.' },
      { name: 'Kenya Data Protection Act', jurisdiction: 'Kenya', description: 'Critical for patient information and digital health processing.' },
    ],
    templates: ['Clinical Services Agreement', 'Medical Device Distribution Agreement', 'Patient Data Processing Addendum', 'Lab Services Contract', 'Consultant Clinician Agreement'],
  },
  energy: {
    name: 'Energy & Natural Resources',
    tagline: 'Legal operations for power, extractives, infrastructure, and utility projects.',
    landscape: [
      'Energy and natural resources businesses work through long-tail obligations: permits, land access, environmental approvals, local content commitments, tariff provisions, community engagement, and government counterpart risk. These are rarely contained inside one contract.',
      'Major agreements such as PPAs, EPC contracts, O&M deals, and fuel supply arrangements usually run alongside regulator-facing obligations and detailed project documentation. Legal teams must manage performance, approvals, and evidence over extended periods.',
      'Because projects often cross borders or include public-interest exposure, the cost of weak tracking is high. Missing an approval deadline, insurance requirement, or environmental condition can quickly delay revenue or expose the business to enforcement.',
    ],
    howItHelps: [
      { title: 'Project contract intelligence', description: 'Review PPAs, EPCs, fuel supply, and land access documents for liability, change control, and obligations.' },
      { title: 'Permit and environmental tracking', description: 'Maintain visibility over approvals, filings, and operational commitments that sit outside the contract itself.' },
      { title: 'Stakeholder-ready reporting', description: 'Export concise legal and compliance summaries for lenders, boards, sponsors, and public counterparts.' },
    ],
    regulations: [
      { name: 'Kenya Energy Act', jurisdiction: 'Kenya', description: 'Primary law for energy sector regulation and licensing.' },
      { name: 'Kenya Environmental Management and Coordination Act', jurisdiction: 'Kenya', description: 'Environmental framework relevant to project approvals.' },
      { name: 'Uganda Electricity Act', jurisdiction: 'Uganda', description: 'Sector law governing electricity operations and oversight.' },
      { name: 'Tanzania Electricity Act', jurisdiction: 'Tanzania', description: 'Framework for generation, supply, and related controls.' },
      { name: 'Rwanda Energy Law and RURA directives', jurisdiction: 'Rwanda', description: 'Regulatory foundations for energy operators in Rwanda.' },
      { name: 'Mining and local content frameworks', jurisdiction: 'Regional', description: 'Relevant obligations for natural resource and infrastructure projects.' },
    ],
    templates: ['Power Purchase Agreement', 'Engineering Services Agreement', 'Fuel Supply Contract', 'Community Access Memorandum', 'Land Access Agreement'],
  },
  'trade-commerce': {
    name: 'Trade & Commerce',
    tagline: 'Commercial contracting and cross-border controls for trading businesses and distributors.',
    landscape: [
      'Trading businesses and regional commerce operators move through customs, channel relationships, pricing approvals, VAT complexity, and product compliance all at once. Legal issues emerge at the edges of commercial growth: distributor disputes, import documentation gaps, weak inventory controls, and tax-sensitive pricing terms.',
      'Where operations span multiple East African markets, the documentation burden multiplies. The same product may need different labeling, different customer disclosures, and different tax treatment depending on where it is imported, sold, or serviced.',
      'A robust legal operating system helps these businesses keep their contracts, customs-facing obligations, and renewal calendars in one place so legal is not always reacting after sales has already moved.',
    ],
    howItHelps: [
      { title: 'Distribution contract control', description: 'Review exclusivity, rebate, territory, pricing, and termination issues in reseller and channel agreements.' },
      { title: 'Cross-border trade visibility', description: 'Track customs, VAT, and operational filing obligations that sit around distribution and import activity.' },
      { title: 'Faster legal paperwork', description: 'Generate trade-ready terms, logistics contracts, supply agreements, and customer-facing documents.' },
    ],
    regulations: [
      { name: 'East African Community Customs Management Act', jurisdiction: 'EAC', description: 'Core regional customs framework.' },
      { name: 'Kenya Consumer Protection Act', jurisdiction: 'Kenya', description: 'Key customer-facing obligations for commerce businesses.' },
      { name: 'Uganda Value Added Tax Act', jurisdiction: 'Uganda', description: 'Important for transaction structuring and filing obligations.' },
      { name: 'Tanzania Customs and Excise frameworks', jurisdiction: 'Tanzania', description: 'Relevant import and customs compliance rules.' },
      { name: 'Rwanda competition and trade regulations', jurisdiction: 'Rwanda', description: 'Operational obligations affecting distribution and commerce models.' },
      { name: 'Regional rules of origin frameworks', jurisdiction: 'EAC', description: 'Critical for tariff treatment and cross-border trade planning.' },
    ],
    templates: ['Distribution Agreement', 'Cross-Border Supply Agreement', 'Logistics Services Contract', 'Reseller Terms', 'Product Return Policy'],
  },
  'ngos-public-sector': {
    name: 'NGOs & Public Sector',
    tagline: 'Legal structure for donor-funded programs, public delivery, and mission-driven operations.',
    landscape: [
      'NGOs and public-interest operators often carry more governance burden than a commercial business of the same size. Grant restrictions, donor reporting, registration renewals, safeguarding requirements, procurement controls, anti-bribery obligations, and employment standards all need to be monitored together.',
      'These organizations also work through layered counterparties: donors, implementing partners, consultants, vendors, and public bodies. Contracts need clear accountability, reporting obligations, and change control so operational teams can deliver programs without drifting outside grant conditions.',
      'Because funding and regulatory expectations differ by jurisdiction, the legal team needs a system that can preserve consistency across multiple countries while still adapting documents and checklists locally.',
    ],
    howItHelps: [
      { title: 'Grant and donor control', description: 'Review funding agreements, reporting covenants, and expenditure restrictions with structured obligation tracking.' },
      { title: 'Registration and governance readiness', description: 'Monitor renewal and reporting calendars across countries and organization entities.' },
      { title: 'Procurement and partner paper', description: 'Generate MoUs, consultancy contracts, service agreements, and partner terms with clearer legal discipline.' },
    ],
    regulations: [
      { name: 'Kenya Public Benefit Organizations Act framework', jurisdiction: 'Kenya', description: 'Key governance framework affecting NGOs.' },
      { name: 'Uganda NGO Act', jurisdiction: 'Uganda', description: 'Registration and operational oversight for NGOs.' },
      { name: 'Tanzania Non-Governmental Organizations Act', jurisdiction: 'Tanzania', description: 'Rules for registration and ongoing oversight.' },
      { name: 'Rwanda governance requirements for non-profit entities', jurisdiction: 'Rwanda', description: 'Relevant registration and operational controls.' },
      { name: 'Public procurement requirements by jurisdiction', jurisdiction: 'Regional', description: 'Important where programs touch public sector procurement.' },
      { name: 'Anti-money laundering and anti-bribery requirements', jurisdiction: 'Regional', description: 'Cross-cutting controls for funding and partnerships.' },
    ],
    templates: ['Donor Funding Agreement', 'Program Partnership MoU', 'Consultancy Agreement', 'Procurement Terms', 'Safeguarding Compliance Statement'],
  },
  smes: {
    name: 'SMEs',
    tagline: 'Serious legal infrastructure for growing businesses without large in-house teams.',
    landscape: [
      'Small and medium-sized businesses in East Africa often know legal risk is growing but lack a structured way to manage it. Contracts sit in email threads, renewals are tracked manually, compliance deadlines live in personal reminders, and drafting happens under time pressure.',
      'That gap matters because growth itself increases legal complexity. Hiring across borders, signing new vendors, expanding into another market, or taking on funding can quickly introduce obligations that are easy to miss and expensive to fix later.',
      'SMEs do not need bloated enterprise software. They need a clear operating system that gives founders, finance leads, and legal advisors one disciplined place to manage contracts, documents, and key compliance duties.',
    ],
    howItHelps: [
      { title: 'Simple contract control', description: 'Upload customer, vendor, and employment agreements to spot risk and track renewals early.' },
      { title: 'Practical compliance checklists', description: 'Stay on top of recurring business filings, tax-related deadlines, and operating obligations.' },
      { title: 'Fast drafting for growth', description: 'Generate the everyday legal documents needed for hiring, sales, partnerships, and procurement.' },
    ],
    regulations: [
      { name: 'Companies Acts across operating jurisdictions', jurisdiction: 'Regional', description: 'Core corporate governance and filing obligations.' },
      { name: 'VAT and tax filing frameworks', jurisdiction: 'Regional', description: 'Recurring obligations affecting fast-growing businesses.' },
      { name: 'Employment and labor requirements', jurisdiction: 'Regional', description: 'Key hiring, payroll, and workplace compliance controls.' },
      { name: 'Kenya Data Protection Act', jurisdiction: 'Kenya', description: 'Important for SMEs handling customer and employee data.' },
      { name: 'Uganda and Tanzania business licensing frameworks', jurisdiction: 'Uganda / Tanzania', description: 'Practical operating permits and renewal obligations.' },
      { name: 'Consumer protection and competition rules', jurisdiction: 'Regional', description: 'Relevant when SMEs begin scaling customer-facing operations.' },
    ],
    templates: ['SME Services Agreement', 'Offer Letter', 'Mutual NDA', 'Vendor Agreement', 'Founder Advisory Agreement'],
  },
};

export const regulatorySignals = [
  {
    id: 'ke-dpa-amendment',
    jurisdiction: 'Kenya',
    title: 'Kenya data transfer amendment package',
    probability: 78,
    impact: 'High',
    dateRange: 'Q3 2026',
    obligations: ['Breach notices', 'Cross-border transfers', 'Processor audits'],
    recommendedAction: 'Review vendor DPAs, refresh incident response timelines, and update cross-border transfer registers.',
    summary: 'Likely to tighten processor accountability and expand obligations for fintechs and SaaS providers operating in Kenya.',
  },
  {
    id: 'ug-tax-tribunal',
    jurisdiction: 'Uganda',
    title: 'Uganda tax appeals tribunal reform',
    probability: 65,
    impact: 'Medium',
    dateRange: 'H2 2026',
    obligations: ['Tax dispute handling', 'Appeal records', 'External counsel strategy'],
    recommendedAction: 'Prepare a dispute escalation playbook and confirm document retention for all open URA matters.',
    summary: 'Expected process reforms may shorten appeal windows and change filing requirements.',
  },
  {
    id: 'eac-data-directive',
    jurisdiction: 'EAC',
    title: 'EAC cross-border data transfer directive',
    probability: 90,
    impact: 'Critical',
    dateRange: '2026',
    obligations: ['Transfer assessments', 'Regional hosting', 'Vendor approvals'],
    recommendedAction: 'Map all regional data flows, classify processors, and prepare fallback regional hosting options.',
    summary: 'A high-confidence directive that will affect regional SaaS, fintech, telecom, and NGO operations.',
  },
  {
    id: 'rw-cyber',
    jurisdiction: 'Rwanda',
    title: 'Rwanda digital trust and cybersecurity bill',
    probability: 82,
    impact: 'High',
    dateRange: 'Q4 2026',
    obligations: ['Cyber controls', 'Critical incident reporting', 'Third-party assurance'],
    recommendedAction: 'Run a cyber controls gap assessment and update vendor due diligence questionnaires.',
    summary: 'Would introduce stricter reporting thresholds for digital service providers and managed vendors.',
  },
] as const;

export const documentTemplates = [
  ['Kenya NDA Template', 'Contracts'],
  ['Uganda Employment Contract', 'Employment'],
  ['Tanzania Service Agreement', 'Contracts'],
  ['EAC Cross-Border Trade Agreement', 'Trade'],
  ['Kenya Shareholders Agreement', 'Corporate'],
  ['Rwanda Data Processing Agreement', 'Data Protection'],
  ['Uganda Consultancy Agreement', 'Contracts'],
  ['Tanzania Vendor Agreement', 'Contracts'],
  ['Kenya Privacy Policy', 'Data Protection'],
  ['Kenya AML Policy', 'Compliance'],
  ['Uganda KYC Policy', 'Compliance'],
  ['Rwanda Board Resolution', 'Corporate'],
  ['Tanzania Software License', 'Tech'],
  ['Kenya Offer Letter', 'Employment'],
  ['Uganda Independent Contractor Agreement', 'Employment'],
  ['Rwanda Lease Agreement', 'Real Estate'],
  ['Kenya API Terms', 'Tech'],
  ['Tanzania Loan Agreement', 'Finance'],
  ['Uganda Procurement Contract', 'Finance'],
  ['Kenya Non-Solicitation Agreement', 'Employment'],
  ['Rwanda Distribution Agreement', 'Trade'],
  ['Tanzania Cookie Policy', 'Data Protection'],
  ['Kenya Data Breach Response Plan', 'Compliance'],
  ['Uganda Service Level Agreement', 'Tech'],
  ['Rwanda Joint Venture Agreement', 'Corporate'],
  ['Kenya Supplier Code of Conduct', 'Compliance'],
  ['Tanzania Property Management Agreement', 'Real Estate'],
  ['Uganda Grant Funding Agreement', 'NGOs'],
  ['Kenya Power Purchase Agreement', 'Energy'],
  ['Rwanda Clinical Services Agreement', 'Healthcare'],
  ['Ethiopia SaaS Agreement', 'Tech'],
  ['EAC Donor Reporting Pack', 'NGOs'],
].map(([name, category], index) => ({
  id: `template-${index + 1}`,
  name,
  category,
  jurisdictions:
    category === 'NGOs'
      ? ['Kenya', 'Uganda', 'Rwanda', 'East African Community']
      : category === 'Energy'
        ? ['Kenya', 'Tanzania', 'Rwanda']
        : ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
  aiPowered: true,
}));

export const contracts = [
  {
    id: 'safaricom-distribution',
    name: 'Safaricom Distribution Agreement',
    counterparty: 'Safaricom PLC',
    jurisdiction: 'Kenya',
    contractType: 'Distribution Agreement',
    riskScore: 67,
    status: 'Active',
    expiryDate: '2026-06-30',
    effectiveDate: '2024-01-15',
    governingLaw: 'Kenyan law',
    summary: 'Exclusive last-mile device distribution agreement with missing service credit caps and broad indemnity exposure.',
  },
  {
    id: 'equity-bank-sla',
    name: 'Equity Bank Service Level Agreement',
    counterparty: 'Equity Bank Kenya Limited',
    jurisdiction: 'Kenya',
    contractType: 'Service Level Agreement',
    riskScore: 34,
    status: 'Compliant',
    expiryDate: '2027-01-15',
    effectiveDate: '2025-01-16',
    governingLaw: 'Kenyan law',
    summary: 'Core banking support services agreement with balanced indemnities, clear uptime remedies, and annual review obligations.',
  },
  {
    id: 'mtn-uganda-supply',
    name: 'MTN Uganda Supply Agreement',
    counterparty: 'MTN Uganda Limited',
    jurisdiction: 'Uganda',
    contractType: 'Supply Agreement',
    riskScore: 82,
    status: 'Critical',
    expiryDate: '2026-11-30',
    effectiveDate: '2024-12-01',
    governingLaw: 'Ugandan law',
    summary: 'Procurement agreement with uncapped liability, weak data processing language, and overdue renewal action.',
  },
  {
    id: 'crdb-license',
    name: 'CRDB Bank Software License',
    counterparty: 'CRDB Bank Plc',
    jurisdiction: 'Tanzania',
    contractType: 'Software License',
    riskScore: 28,
    status: 'Compliant',
    expiryDate: '2027-04-01',
    effectiveDate: '2025-04-01',
    governingLaw: 'Tanzanian law',
    summary: 'Internal banking software license with strong IP ownership language and clear incident notification terms.',
  },
] as const;

export const contractDetailMap: Record<
  string,
  {
    plainEnglishSummary: string[];
    clauses: Array<{ category: string; title: string; excerpt: string; interpretation: string; missing?: boolean }>;
    risks: Array<{ severity: RiskSeverity; clauseReference: string; description: string; action: string }>;
    redlines: Array<{ original: string; replacement: string; rationale: string }>;
    obligations: Array<{ label: string; dueDate: string; owner: string; status: 'Open' | 'In Progress' | 'Done' }>;
    pages: string[];
  }
> = {
  'safaricom-distribution': {
    plainEnglishSummary: [
      'The agreement appoints the supplier as a regional distribution partner for Safaricom enterprise device bundles in Kenya.',
      'Commercial terms are favorable on volume rebates, but the contract exposes the distributor to broad indemnity obligations without a mirrored service failure cap.',
      'Operationally, the agreement needs stronger notice, data handling, and service credit language before renewal.',
    ],
    clauses: [
      {
        category: 'Core',
        title: 'Appointment and Territory',
        excerpt: 'Distributor is appointed as a non-transferable distributor for enterprise mobility devices within approved county territories.',
        interpretation: 'The appointment is limited to specific territories, which reduces channel conflict but restricts expansion without written approval.',
      },
      {
        category: 'Financial',
        title: 'Rebate Schedule',
        excerpt: 'Quarterly rebates apply once net activations exceed 12,000 qualifying units, subject to reconciliation within 15 business days.',
        interpretation: 'The commercial model is workable, but there is no dispute window for reconciliation, so rebate disagreements could linger.',
      },
      {
        category: 'Liability',
        title: 'Indemnity',
        excerpt: 'Distributor shall indemnify Safaricom against third-party claims arising from reseller conduct, marketing materials, or unauthorized commitments.',
        interpretation: 'This indemnity is too broad and should be narrowed to breaches caused by the distributor.',
      },
      {
        category: 'Compliance',
        title: 'Data Processing',
        excerpt: 'Parties shall process customer information in accordance with applicable laws and internal information security standards.',
        interpretation: 'This is too generic for Kenya data protection compliance and should reference specific security, retention, and incident notice obligations.',
      },
      {
        category: 'Audit',
        title: 'Audit Rights',
        excerpt: '',
        interpretation: 'The agreement is missing a clear audit and inspection clause for inventory records and reseller onboarding controls.',
        missing: true,
      },
    ],
    risks: [
      {
        severity: 'high',
        clauseReference: 'Clause 14.2',
        description: 'Indemnity is one-sided and not capped against indirect reseller conduct.',
        action: 'Cap indemnity at fees paid in the trailing 12 months and limit it to proven distributor breach.',
      },
      {
        severity: 'medium',
        clauseReference: 'Clause 9.4',
        description: 'No service credit schedule if inventory feeds are delayed or inaccurate.',
        action: 'Add reconciliation cure periods and credits for delayed feed delivery.',
      },
      {
        severity: 'medium',
        clauseReference: 'Clause 17',
        description: 'Data processing obligations are generic for Kenya data protection controls.',
        action: 'Insert annex covering breach notice, processor controls, and approved transfer conditions.',
      },
    ],
    redlines: [
      {
        original: 'Distributor shall indemnify and hold harmless Safaricom from and against any and all claims connected to reseller conduct.',
        replacement: 'Distributor shall indemnify Safaricom only for third-party claims directly arising from Distributor breach of this Agreement, capped at fees paid in the preceding twelve months.',
        rationale: 'Narrows exposure to direct breach and adds a commercial cap tied to contract value.',
      },
    ],
    obligations: [
      { label: 'Quarterly rebate reconciliation', dueDate: '2026-05-15', owner: 'Commercial Ops', status: 'In Progress' },
      { label: 'Reseller onboarding review', dueDate: '2026-05-28', owner: 'Legal', status: 'Open' },
      { label: 'Data processing annex execution', dueDate: '2026-06-04', owner: 'Privacy Lead', status: 'Open' },
      { label: 'Renewal negotiation pack', dueDate: '2026-06-12', owner: 'General Counsel', status: 'Open' },
    ],
    pages: ['Page 1: Parties and appointment', 'Page 4: Commercial schedule', 'Page 7: Liability and indemnity', 'Page 11: Data handling'],
  },
  default: {
    plainEnglishSummary: [
      'This agreement has been indexed into the Counselify workspace with structured clause tags and obligation extraction.',
      'The commercial and compliance terms are materially usable, but the legal team should confirm risk tolerances before renewal.',
      'Counselify recommends reviewing liability, data handling, and notice mechanics first.',
    ],
    clauses: [
      {
        category: 'Core',
        title: 'Scope of Services',
        excerpt: 'The supplier will provide the listed services in accordance with agreed milestones and operating standards.',
        interpretation: 'This is the commercial engine of the contract and should map cleanly to service levels and acceptance tests.',
      },
    ],
    risks: [
      {
        severity: 'medium',
        clauseReference: 'General',
        description: 'Notice and change-control language should be tightened before renewal.',
        action: 'Add clear notice addresses, response times, and approval thresholds.',
      },
    ],
    redlines: [
      {
        original: 'Party may vary scope by written notice.',
        replacement: 'Party may vary scope only through a signed change request agreed by both parties.',
        rationale: 'Prevents unilateral commercial drift.',
      },
    ],
    obligations: [{ label: 'Renewal review', dueDate: '2026-06-30', owner: 'Legal Ops', status: 'Open' }],
    pages: ['Page 1: Parties', 'Page 5: Commercial terms', 'Page 8: Risk and compliance'],
  },
};

export const dashboardMetrics = {
  complianceScore: { value: 84, trend: '+3 this week' },
  activeContracts: { value: 47, subtitle: '6 expiring soon' },
  openRiskFlags: { value: 12, subtitle: '3 critical' },
  deadlinesThisMonth: { value: 8, subtitle: 'Next: Nov 15' },
};

export const complianceTrend = [
  { month: 'Nov', score: 71 },
  { month: 'Dec', score: 74 },
  { month: 'Jan', score: 76 },
  { month: 'Feb', score: 79 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 84 },
];

export const riskDistribution = [
  { name: 'Low', value: 22, color: '#16A34A' },
  { name: 'Medium', value: 14, color: '#CA8A04' },
  { name: 'High', value: 8, color: '#D97706' },
  { name: 'Critical', value: 3, color: '#DC2626' },
];

export const complianceItems = [
  {
    id: 'vat-ke',
    category: 'Tax Compliance',
    title: 'VAT filing - Kenya',
    jurisdiction: 'Kenya',
    assignee: 'Finance Controller',
    dueDate: '2026-11-15',
    status: 'In Progress',
  },
  {
    id: 'annual-ke',
    category: 'Corporate Governance',
    title: 'Annual returns filing - Kenya',
    jurisdiction: 'Kenya',
    assignee: 'Company Secretary',
    dueDate: '2026-12-31',
    status: 'Todo',
  },
  {
    id: 'dpia-ug',
    category: 'Data Protection',
    title: 'Data Protection Impact Assessment',
    jurisdiction: 'Uganda',
    assignee: 'Privacy Lead',
    dueDate: '2026-10-01',
    status: 'Todo',
  },
  {
    id: 'license-tz',
    category: 'Licensing',
    title: 'Business license renewal - Tanzania',
    jurisdiction: 'Tanzania',
    assignee: 'Country Lead',
    dueDate: '2026-08-15',
    status: 'Todo',
  },
  {
    id: 'ngo-report',
    category: 'NGO Reporting',
    title: 'Quarterly donor utilization report',
    jurisdiction: 'EAC',
    assignee: 'Programs Director',
    dueDate: '2026-10-12',
    status: 'In Progress',
  },
] as const;

export const savedDocuments = [
  { id: 'doc-1', name: 'NDA - LakeHub Analytics', type: 'Kenya NDA Template', created: '2026-04-11', status: 'Ready for review' },
  { id: 'doc-2', name: 'Employment Contract - Kampala Ops Lead', type: 'Uganda Employment Contract', created: '2026-04-09', status: 'Awaiting signature' },
  { id: 'doc-3', name: 'Service Agreement - Arusha Distribution', type: 'Tanzania Service Agreement', created: '2026-04-05', status: 'Saved to library' },
];

export const assistantStarters = [
  'Explain the force majeure clause in my Safaricom contract',
  'What are the processor obligations under Kenya data protection law?',
  'Draft an NDA for a tech partnership in Uganda',
  'What is the penalty risk for late VAT filing in Tanzania?',
];

export const assistantHistory = {
  Today: [
    { id: 'chat-1', title: 'Safaricom force majeure analysis', time: '09:42' },
    { id: 'chat-2', title: 'Kenya processor obligations summary', time: '08:11' },
  ],
  'This Week': [
    { id: 'chat-3', title: 'Uganda NDA drafting session', time: 'Tue' },
    { id: 'chat-4', title: 'Tanzania VAT penalty briefing', time: 'Mon' },
  ],
  Earlier: [{ id: 'chat-5', title: 'Regional data transfer checklist', time: 'Apr 02' }],
};

export const notifications = {
  riskAlerts: [
    { id: 'n1', title: 'Critical vendor liability flag', detail: 'MTN Uganda Supply Agreement exceeds approved liability cap.', time: '6m ago' },
    { id: 'n2', title: 'Renewal risk approaching', detail: 'Safaricom Distribution Agreement expires in 73 days.', time: '38m ago' },
  ],
  deadlineReminders: [
    { id: 'n3', title: 'VAT filing due soon', detail: 'Kenya VAT filing is due on November 15.', time: '1h ago' },
    { id: 'n4', title: 'Annual returns pack incomplete', detail: 'Company secretary checklist is missing board approval minutes.', time: '3h ago' },
  ],
  systemUpdates: [{ id: 'n5', title: 'Counselify knowledge pack updated', detail: 'Rwanda digital trust content pack synced for April 2026.', time: 'Yesterday' }],
};

export const reportRiskTrend = [
  { month: 'Nov', low: 18, medium: 10, high: 5, critical: 2 },
  { month: 'Dec', low: 19, medium: 11, high: 5, critical: 2 },
  { month: 'Jan', low: 20, medium: 12, high: 6, critical: 2 },
  { month: 'Feb', low: 21, medium: 12, high: 6, critical: 3 },
  { month: 'Mar', low: 21, medium: 13, high: 7, critical: 3 },
  { month: 'Apr', low: 22, medium: 14, high: 8, critical: 3 },
];

export const reportCompliance = [
  { month: 'May', score: 68 },
  { month: 'Jun', score: 69 },
  { month: 'Jul', score: 71 },
  { month: 'Aug', score: 74 },
  { month: 'Sep', score: 80 },
  { month: 'Oct', score: 84 },
  { month: 'Nov', score: 86 },
  { month: 'Dec', score: 85 },
  { month: 'Jan', score: 83 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 83 },
  { month: 'Apr', score: 84 },
];

export const reportDeadlines = [
  { month: 'Nov', hit: 11, missed: 1 },
  { month: 'Dec', hit: 10, missed: 2 },
  { month: 'Jan', hit: 12, missed: 1 },
  { month: 'Feb', hit: 13, missed: 1 },
  { month: 'Mar', hit: 14, missed: 2 },
  { month: 'Apr', hit: 16, missed: 1 },
];

export const reportJurisdictions = [
  { jurisdiction: 'Kenya', risk: 61 },
  { jurisdiction: 'Uganda', risk: 54 },
  { jurisdiction: 'Tanzania', risk: 46 },
  { jurisdiction: 'Rwanda', risk: 37 },
  { jurisdiction: 'EAC', risk: 29 },
];

export const reportActivity = [
  { label: 'NDAs', value: [8, 10, 9, 12, 15, 13] },
  { label: 'Employment', value: [4, 5, 6, 7, 5, 8] },
  { label: 'Vendor', value: [3, 4, 4, 5, 7, 6] },
];

export const topRiskCategories = [
  { name: 'Liability allocation', value: 82 },
  { name: 'Data protection', value: 74 },
  { name: 'Termination rights', value: 68 },
  { name: 'Tax gross-up clauses', value: 61 },
  { name: 'Audit rights', value: 56 },
];

export const resources = [
  {
    href: '/features',
    title: 'Product overview',
    description: 'See how contract analysis, compliance, forecasting, drafting, and analytics work together.',
  },
  {
    href: '/industries',
    title: 'Industry coverage',
    description: 'Explore how Counselify serves agriculture, finance, healthcare, technology, NGOs, and more.',
  },
  {
    href: '/pricing',
    title: 'Pricing and plans',
    description: 'Compare the freemium, professional, and enterprise operating models.',
  },
];

export const docsSections = [
  {
    title: 'Getting started',
    points: ['Create your workspace', 'Confirm industry and jurisdiction', 'Invite your legal and finance leads'],
  },
  {
    title: 'Uploading contracts',
    points: ['Upload PDF or DOCX files', 'Map counterparty and contract type', 'Launch analysis to extract clauses and obligations'],
  },
  {
    title: 'Running compliance',
    points: ['Generate checklist packs by country and sector', 'Assign owners and due dates', 'Export evidence packs for audits and board reporting'],
  },
  {
    title: 'Using the assistant',
    points: ['Ask jurisdiction-aware questions', 'Reference existing contracts by name', 'Request drafting, explanations, and action-ready summaries'],
  },
];

export const organizationMembers = [
  { id: 'm1', name: 'User A', email: 'usera@counselify.africa', role: 'General Counsel', joined: '2025-10-12' },
  { id: 'm2', name: 'Peter Mugisha', email: 'peter@counselify.africa', role: 'Compliance Lead', joined: '2025-11-02' },
  { id: 'm3', name: 'Neema Kaijage', email: 'neema@counselify.africa', role: 'Finance Controller', joined: '2026-01-08' },
];

export const appSearchIndex = [
  ...contracts.map((contract) => ({
    type: 'Contract',
    title: contract.name,
    subtitle: `${contract.jurisdiction} • ${contract.contractType}`,
    href: `/app/contracts/${contract.id}`,
  })),
  ...savedDocuments.map((document) => ({
    type: 'Document',
    title: document.name,
    subtitle: document.type,
    href: '/app/documents',
  })),
  ...complianceItems.map((item) => ({
    type: 'Compliance',
    title: item.title,
    subtitle: `${item.jurisdiction} • ${item.status}`,
    href: '/app/compliance',
  })),
  ...assistantHistory.Today.map((item) => ({
    type: 'Assistant',
    title: item.title,
    subtitle: `Conversation • ${item.time}`,
    href: '/app/assistant',
  })),
];

export const getContractById = (id: string) => contracts.find((contract) => contract.id === id);
export const getContractDetail = (id: string) => contractDetailMap[id] ?? contractDetailMap.default;
export const getIndustryBySlug = (slug: string) => industryDetails[slug as IndustrySlug];
