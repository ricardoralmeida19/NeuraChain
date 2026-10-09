// All page copy lives here so it can be edited without touching layout code.

export const CONTACT = {
  email: "ricardo.almeida@neurachainsolutions.com",
  phone: "(341) 341-9451",
  phoneHref: "tel:+13413419451",
  addressLines: ["ArtHaus Works", "2744 East 11th Street", "Oakland, CA 94601"],
};

export const ROUTING = [
  {
    op: "10",
    name: "Free assessment",
    detail:
      "We walk your floor, look at your spend and supplier data, and give you a ranked list of where the money is.",
  },
  {
    op: "20",
    name: "Sourcing and supply chain",
    detail:
      "Re-source and renegotiate the biggest categories first, so the savings fund what comes next.",
  },
  {
    op: "30",
    name: "LEAN and value engineering",
    detail: "Map the value stream, take out waste, rework layouts and routings.",
  },
  {
    op: "40",
    name: "Smart factory",
    detail: "Connect machines and put real throughput and downtime numbers on screen.",
  },
  {
    op: "50",
    name: "NeuraChain platform",
    detail: "Our own software, built from what we learn on your floor. In development.",
  },
];

export const CREDENTIALS = [
  {
    key: "Tesla, 2020–2025",
    text: "Global Supply Manager, then Supply Chain Manager (CAPEX), buying equipment and building supply for factories across the Gigafactory network.",
  },
  {
    key: "Rio 2016 Olympics",
    text: "Led procurement for the Organizing Committee, a portfolio of about $1.5 billion.",
  },
  {
    key: "15+ years in sourcing",
    text: "Enel Green Power, Restaurant Brands International, and Webb Supply Chain Consulting (now Nimbi).",
  },
  {
    key: "USC and UC Berkeley",
    text: "M.S. in Global Supply Chain Management (USC) and a Professional Diploma from UC Berkeley.",
  },
];

export type Service = {
  id: string;
  tab: string;
  title: string;
  summary: string;
  work: string[];
  startsWith: string;
};

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    tab: "Sourcing and supply chain",
    title: "Buy each part from the right supplier, at the right price",
    summary:
      "Most small manufacturers have never had a dedicated commodity manager. We look at who you buy from, why, and what you pay, then fix the gaps.",
    work: [
      "Commodity strategy and supplier segmentation",
      "Supplier search and scorecards for capability, capacity, quality, price and reliability",
      "Negotiation for raw material, machined parts, assemblies and capital equipment",
      "Contracts with delivery KPIs, plus kanban or consignment for long-lead parts",
      "Second sources for the parts that can stop your line",
      "A working sales and operations planning (S&OP) rhythm",
    ],
    startsWith: "Your purchase history and top 20 parts by spend.",
  },
  {
    id: "lean",
    tab: "LEAN",
    title: "Less waiting, less inventory, fewer surprises on the floor",
    summary:
      "We map how work actually moves through your shop, then run kaizen events with your people to remove the steps that don't add value.",
    work: [
      "Value stream mapping of your main product families",
      "Kaizen events run with your operators and leads",
      "Pull systems, on a board or digital",
      "Training in 5 Whys, Pareto, fishbone and gemba walks",
    ],
    startsWith: "One product family and two days on your floor.",
  },
  {
    id: "engineering",
    tab: "Value engineering",
    title: "Lower cost per part without lowering the spec",
    summary:
      "Our engineers review routings, layouts and part designs to find cost that can come out without touching quality or function.",
    work: [
      "Design for manufacturing reviews with your design engineers",
      "Cell layouts where one operator can run two machines",
      "Updated routings and work instructions",
      "Preventive maintenance schedules based on your downtime data",
    ],
    startsWith: "Your highest-volume parts and their current routings.",
  },
  {
    id: "smart-factory",
    tab: "Smart factory",
    title: "Know what every machine is doing, without walking the floor",
    summary:
      "We connect the machines you already own, set up the numbers that matter, and train your team to act on them.",
    work: [
      "Machine connectivity and sensors (IoT)",
      "Live dashboards for OEE, downtime and throughput",
      "Evaluation of where automation or robotics pays back",
      "KPIs and a review routine your supervisors will keep up",
    ],
    startsWith: "A pilot cell of three to five machines.",
  },
];

export const INDUSTRIES = [
  { name: "Automotive", note: "Tier 2 and 3 suppliers, EV and battery components" },
  { name: "Aviation and aerospace", note: "Precision parts and subcontract machining" },
  { name: "Medical devices", note: "Contract manufacturers working to tight quality systems" },
  { name: "Industrial machinery", note: "Job shops, fabricators and equipment builders" },
];

export const SHOP_TYPES = [
  "Machine shops",
  "Forging operations",
  "Fabricated metal",
  "Assembly plants",
];

export const PRINCIPLES = [
  {
    title: "No software purchase to start",
    text: "The first savings come from sourcing and process work. You don't buy a system to find out whether we're useful.",
  },
  {
    title: "Works with the ERP you have",
    text: "Spreadsheets, an old MRP, NetSuite or SAP. We start from your data as it is.",
  },
  {
    title: "Your team makes the calls",
    text: "We recommend; your people approve. Nothing gets ordered, changed or sent without a person signing off.",
  },
  {
    title: "Your data stays yours",
    text: "We use your data to do your work. We don't share it with your suppliers or other clients.",
  },
];
