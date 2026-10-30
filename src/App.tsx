
import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  Cpu,
  Database,
  FileSearch,
  Globe,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// @ts-ignore CSS side-effect imports may not have declarations in this project.
import "./App.css";
import LoginPage from "./LoginPage";


const trafficData = [
  { time: "00:00", benign: 180, threats: 18 },
  { time: "04:00", benign: 230, threats: 28 },
  { time: "08:00", benign: 310, threats: 42 },
  { time: "12:00", benign: 260, threats: 30 },
  { time: "16:00", benign: 390, threats: 65 },
  { time: "20:00", benign: 340, threats: 48 },
  { time: "24:00", benign: 420, threats: 72 },
];

const initialAlerts = [
  { id: "FF-2041", type: "Port Scan", source: "192.168.1.24", severity: "High", time: "2 min ago" },
  { id: "FF-2040", type: "UDP Flood", source: "10.0.0.18", severity: "Critical", time: "8 min ago" },
  { id: "FF-2039", type: "ARP Spoofing", source: "192.168.1.67", severity: "Medium", time: "14 min ago" },
  { id: "FF-2038", type: "Port Scan", source: "172.16.0.12", severity: "High", time: "21 min ago" },
];

const navGroups = [
  {
    title: "WORKSPACE",
    items: [
      { name: "Overview", icon: LayoutDashboard },
      { name: "Federated Network", icon: Network },
      { name: "Threat Investigation", icon: ShieldAlert },
      { name: "AI Lab", icon: Cpu },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Forensic Reports", icon: FileSearch },
      { name: "Data Sources", icon: Database },
      { name: "Settings", icon: Settings },
    ],
  },
];

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);
  const [timeRange, setTimeRange] = useState("24 hours");

  const filteredAlerts = initialAlerts.filter((alert) =>
    `${alert.id} ${alert.type} ${alert.source} ${alert.severity}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  if (!isAuthenticated) {
  return (
    <LoginPage
      onLogin={() => setIsAuthenticated(true)}
    />
  );
}

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={25} /></div>
          <div className="brand-copy">
            <span className="brand-name">Forensic<span>Fed</span></span>
            <span className="brand-caption">CYBER DEFENSE PLATFORM</span>
          </div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={19} />
          </button>
        </div>

        <div className="workspace-switch">
          <div className="workspace-icon"><LockKeyhole size={17} /></div>
          <div className="workspace-copy">
            <strong>Security Workspace</strong>
            <span>Research environment</span>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <nav className="side-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <div className="nav-heading">{group.title}</div>
              {group.items.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={`nav-item ${activePage === name ? "nav-active" : ""}`}
                  onClick={() => {
                    setActivePage(name);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{name}</span>
                  {name === "Threat Investigation" && <span className="nav-count">4</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-card">
            <div className="privacy-icon"><LockKeyhole size={17} /></div>
            <strong>Privacy-first learning</strong>
            <p>Federated intelligence without centralizing raw client data.</p>
            <div className="privacy-status"><span /> Privacy principle</div>
          </div>
          <button className="profile-button">
            <div className="avatar">FF</div>
            <div className="profile-copy">
              <strong>ForensicFed Admin</strong>
              <span>Project workspace</span>
            </div>
            <Settings size={17} className="muted-icon" />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu size={21} />
            </button>
            <div className="breadcrumb">
              <span>ForensicFed</span><span className="crumb-separator">/</span><strong>{activePage}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search alerts..." />
              <kbd>⌘ K</kbd>
            </label>
            <div className="system-pill"><span /> Demo mode</div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowAlerts(!showAlerts)}>
              <Bell size={19} />
              <i />
            </button>
            {showAlerts && (
              <div className="notification-popover">
                <strong>Notifications</strong>
                <p>Demo mode is active.</p>
                <p>4 sample threat events are available for review.</p>
                <button onClick={() => { setActivePage("Threat Investigation"); setShowAlerts(false); }}>Review events →</button>
              </div>
            )}
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> SECURITY OPERATIONS CENTER</div>
              <h1>{activePage === "Overview" ? "Command Center" : activePage}</h1>
              <p className="page-subtitle">
                {activePage === "Overview"
                  ? "Monitor your threat landscape and federated intelligence at a glance."
                  : `Explore ${activePage.toLowerCase()} in your ForensicFed research environment.`}
              </p>
            </div>
            <div className="heading-actions">
              <span className="demo-label"><Sparkles size={14} /> Sample data</span>
              <button className="button-secondary" onClick={() => { setSearch(""); setTimeRange("24 hours"); }}>
                <SlidersHorizontal size={16} /> Reset view
              </button>
            </div>
          </div>
        
        { activePage === "AI Lab" ? (
  <AILabPage />
)
        
        :activePage === "Forensic Reports" ? (
  <ForensicReportsPage />
)
 
        :activePage === "Threat Investigation" ? (
  <ThreatInvestigationPage />
)
        
        : activePage === "Federated Network" ? (
           <FederatedNetworkPage />
            ) : (
             <>
          {activePage !== "Overview" && (
            <div className="section-notice">
              <CircleHelp size={19} />
              <div>
                <strong>{activePage} workspace</strong>
                <p>This is the initial dashboard shell. Detailed tools for this section can be added next.</p>
              </div>
            </div>
          )}

          <div className="metrics-grid">
            <MetricCard title="Traffic Analyzed" value="214,114" change="Dataset baseline" positive icon={<Activity size={19} />} color="teal" footer="Records in current reference run" />
            <MetricCard title="Threat Events" value="18,164" change="PortScan class" icon={<ShieldAlert size={19} />} color="red" footer="Reference dataset · not live" />
            <MetricCard title="Client Nodes" value="03" change="Planned clients" icon={<Network size={19} />} color="blue" footer="Federated topology design" />
            <MetricCard title="Model Accuracy" value="99.99%" change="Baseline result" icon={<ShieldCheck size={19} />} color="purple" footer="Prior test split · verify before reporting" />
          </div>

          <div className="content-grid">
            <section className="panel traffic-panel">
              <div className="panel-header">
                <div>
                  <h2>Network Traffic Overview</h2>
                  <p>Illustrative benign traffic and threat activity</p>
                </div>
                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="select-control" aria-label="Chart time range">
                  <option>24 hours</option>
                  <option>7 days</option>
                  <option>30 days</option>
                </select>
              </div>
              <div className="chart-legend">
                <span><i className="legend-dot benign-dot" /> Benign traffic</span>
                <span><i className="legend-dot threat-dot" /> Threat activity</span>
              </div>
              <div className="traffic-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="benignFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#37d6c0" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#37d6c0" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="threatFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#243341" strokeDasharray="3 5" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: "#8192a4", fontSize: 11 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: "#8192a4", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#111d29", border: "1px solid #2b3b4a", borderRadius: 10, color: "#e8f0f7" }} />
                    <Area type="monotone" dataKey="benign" name="Benign traffic" stroke="#37d6c0" strokeWidth={2.5} fill="url(#benignFill)" />
                    <Area type="monotone" dataKey="threats" name="Threat activity" stroke="#fb7185" strokeWidth={2} fill="url(#threatFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footnote"><span className="footnote-dot" /> Demonstration visualization · not a live telemetry feed</div>
            </section>

            <section className="panel federation-panel">
              <div className="panel-header">
                <div>
                  <h2>Federated Network</h2>
                  <p>Distributed learning architecture</p>
                </div>
                <span className="tiny-tag">DESIGN VIEW</span>
              </div>
              <div className="federation-visual">
                <div className="server-node">
                  <div className="server-icon"><Shield size={23} /></div>
                  <div><strong>Global Coordinator</strong><span>Central aggregation</span></div>
                </div>
                <div className="connector-lines"><span /><span /><span /></div>
                <div className="client-nodes">
                  {["Client 01", "Client 02", "Client 03"].map((client) => (
                    <div className="client-node" key={client}>
                      <div className="client-icon"><Cpu size={18} /></div>
                      <strong>{client}</strong>
                      <span>Planned node</span>
                      <div className="client-indicator"><i /> Not connected</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="federation-footer">
                <div><span className="footer-symbol"><Users size={16} /></span><span>Client updates<strong>Not yet connected</strong></span></div>
                <div><span className="footer-symbol"><Globe size={16} /></span><span>Aggregation<strong>Pending integration</strong></span></div>
              </div>
            </section>
          </div>

          <section className="panel alerts-panel">
            <div className="panel-header alerts-heading">
              <div>
                <h2><span className="alert-title-icon"><AlertTriangle size={18} /></span> Recent Threat Events</h2>
                <p>Example detection records for interface development</p>
              </div>
              <button className="text-button" onClick={() => setActivePage("Threat Investigation")}>Open investigation <ArrowUpRight size={15} /></button>
            </div>
            <div className="table-scroll">
              <table className="alerts-table">
                <thead><tr><th>EVENT ID</th><th>THREAT CLASS</th><th>SOURCE ADDRESS</th><th>SEVERITY</th><th>TIME</th><th>DETAIL</th></tr></thead>
                <tbody>
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="event-id">{alert.id}</td>
                      <td><span className="threat-type"><span />{alert.type}</span></td>
                      <td className="source-address">{alert.source}</td>
                      <td><span className={`severity severity-${alert.severity.toLowerCase()}`}>{alert.severity}</span></td>
                      <td className="time-cell"><Clock3 size={13} /> {alert.time}</td>
                      <td><button className="row-action" aria-label={`View ${alert.id}`} onClick={() => setActivePage("Threat Investigation")}><ArrowUpRight size={16} /></button></td>
                    </tr>
                  ))}
                  {filteredAlerts.length === 0 && <tr><td colSpan={6} className="empty-state">No sample events match “{search}”. Try another search.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing {filteredAlerts.length} of {initialAlerts.length} sample events</span><span><i className="sample-indicator" /> Mock records · no live alerts</span></div>
          </section>
   </>
)}
          <footer className="app-footer">
            <span>FORENSICFED <span className="footer-separator">/</span> FEDERATED THREAT INTELLIGENCE</span>
            <span><LockKeyhole size={13} /> Privacy-first architecture <span className="footer-separator">·</span> Frontend preview</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: string;
  footer: string;
};



const demoClients = [
  {
    id: "Client 01",
    organization: "Organization Alpha",
    samples: "57,097",
    loss: "0.0062",
    norm: "1.34",
    connection: "Connected",
    training: "Idle",
    updateStatus: "Waiting",
  },
  {
    id: "Client 02",
    organization: "Organization Beta",
    samples: "48,620",
    loss: "0.0184",
    norm: "1.12",
    connection: "Connected",
    training: "Idle",
    updateStatus: "Waiting",
  },
  {
    id: "Client 03",
    organization: "Organization Gamma",
    samples: "62,415",
    loss: "0.0116",
    norm: "0.96",
    connection: "Offline",
    training: "Idle",
    updateStatus: "Waiting",
  },
];


function FederatedNetworkPage() {
  const [selectedClient, setSelectedClient] = useState(0);
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState<
  { round: number; client: string; norm: string; status: string }[]
>([]);

  
const [clientStatuses, setClientStatuses] = useState(
  demoClients.map((item) => ({
    training: item.training,
    updateStatus: item.updateStatus,
  }))
);

const client = {
  ...demoClients[selectedClient],
  ...clientStatuses[selectedClient],
};


  
function simulateRound() {
  const nextRound = round + 1;
  setRound(nextRound);

  // Simulate training and updates for connected clients
  setClientStatuses(
    demoClients.map((item) =>
      item.connection === "Connected"
        ? {
            training: "Completed",
            updateStatus: "Sent to coordinator",
          }
        : {
            training: "Idle",
            updateStatus: "Waiting",
          }
    )
  );

  // Record updates from connected clients only
  const newRecords = demoClients
    .filter((item) => item.connection === "Connected")
    .map((item) => ({
      round: nextRound,
      client: item.id,
      norm: (
        Number(item.norm) + nextRound * 0.013
      ).toFixed(3),
      status: "Simulated update sent",
    }));

  setHistory((previous) =>
    [...newRecords, ...previous].slice(0, 12)
  );
}


  function resetDemo() {
    setRound(0);
    setSelectedClient(0);
    setHistory([
      { round: 0, client: "Client 01", norm: "1.34", status: "Demo record" },
      { round: 0, client: "Client 02", norm: "1.12", status: "Demo record" },
      { round: 0, client: "Client 03", norm: "0.96", status: "Demo record" },
    ]);
  }

  return (
    <div style={{ display: "grid", gap: 20, color: "#e6edf5" }}>
      <div style={{ padding: 20, background: "#14232f", border: "1px solid #2c474b", borderRadius: 12 }}>
        <h2 style={{ margin: 0 }}>Federated Network</h2>
        <p style={{ color: "#a0b1c0" }}>
          Interactive federated-learning architecture · Frontend mock data only
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        {[
          ["Client nodes", "03"],
          ["Demo round", String(round).padStart(2, "0")],
          ["Update records", String(history.length)],
          ["Coordinator", "UI READY"],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: 18, background: "#101a26", border: "1px solid #293b4a", borderRadius: 10 }}>
            <p style={{ color: "#91a5b6", fontSize: 12 }}>{label}</p>
            <h2 style={{ margin: 0 }}>{value}</h2>
          </div>
        ))}
      </div>

      <section style={{ padding: 20, background: "#101a26", border: "1px solid #293b4a", borderRadius: 12 }}>
        <h3><Network size={18} style={{ verticalAlign: "middle" }} /> Network topology</h3>

        <div style={{ padding: 16, textAlign: "center", background: "#183735", border: "1px solid #347069", borderRadius: 10 }}>
          <Server size={24} />
          <h3>Central Coordinator</h3>
          <p>Coordinates federated rounds · Demo only</p>
        </div>

        <div style={{ textAlign: "center", padding: 14, color: "#65d8c7" }}>↓ Model update paths (illustrative) ↓</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {demoClients.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedClient(index)}
              style={{
                padding: 18,
                borderRadius: 10,
                border: selectedClient === index ? "1px solid #56d8c5" : "1px solid #293b4a",
                background: selectedClient === index ? "#193632" : "#14212d",
                color: "#e6edf5",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Cpu size={22} />
              <h3>{item.id}</h3>
              <p>{item.organization}</p>
              <small>Demo client · Click to inspect</small>
            </button>
          ))}
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
        <section style={{ padding: 20, background: "#101a26", border: "1px solid #293b4a", borderRadius: 12 }}>
          <h3>Client inspection</h3>
          <p style={{ color: "#65d8c7" }}>{client.organization}</p>
          <p>Client: {client.id}</p>
          <p>Training samples: {client.samples}</p>
          <p>Example local loss: {client.loss}</p>
          <p>Example update norm: {client.norm}</p>
          
<p>
  Connection:{" "}
  <span style={{ color: client.connection === "Connected" ? "#65d8c7" : "#ff8585" }}>
    {client.connection}
  </span>
</p>

<p>Training: {client.training}</p>

<p>Update status: {client.updateStatus}</p>

          <p style={{ color: "#91a5b6", fontSize: 12 }}>
            All values are illustrative. No live client is connected.
          </p>
        </section>

        <section style={{ padding: 20, background: "#101a26", border: "1px solid #293b4a", borderRadius: 12 }}>
          <h3>Round controller · R{round}</h3>
          <p>Generate a new set of mock client update records.</p>
          <button onClick={simulateRound} style={{ padding: "10px 14px", marginRight: 8, borderRadius: 7, border: 0, background: "#1a6559", color: "white", cursor: "pointer" }}>
            <Play size={14} style={{ verticalAlign: "middle" }} /> Simulate next round
          </button>
          <button onClick={resetDemo} style={{ padding: "10px 14px", borderRadius: 7, border: "1px solid #405364", background: "#172431", color: "white", cursor: "pointer" }}>
            Reset demo
          </button>
          <p style={{ color: "#c7b6f3", fontSize: 12, marginTop: 16 }}>
            Simulation only: no model training, aggregation, or network communication occurs.
          </p>
        </section>
      </div>

      <section style={{ padding: 20, background: "#101a26", border: "1px solid #293b4a", borderRadius: 12, overflowX: "auto" }}>
        <h3><Activity size={18} style={{ verticalAlign: "middle" }} /> Model update history</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr>
              {["Round", "Client", "Update norm", "Status"].map((heading) => (
                <th key={heading} style={{ padding: 12, color: "#91a5b6", borderBottom: "1px solid #293b4a" }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={`${item.round}-${item.client}-${index}`}>
                <td style={{ padding: 12, borderBottom: "1px solid #22303d" }}>R{item.round}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #22303d" }}>{item.client}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #22303d" }}>{item.norm}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #22303d" }}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}


const demoThreats = [
  {
    id: "TH-001",
    attack: "Port Scan",
    sourceIp: "192.0.2.15",
    destinationIp: "198.51.100.10",
    severity: "High",
    timestamp: "2026-10-29 14:32:18",
    status: "Investigating",
    protocol: "TCP",
    description:
      "Repeated connection attempts across multiple destination ports.",
    evidence:
      "High number of connection attempts within a short time window.",
    recommendation:
      "Review connection logs and check whether the source is authorized.",
  },
  {
    id: "TH-002",
    attack: "UDP Flood",
    sourceIp: "192.0.2.24",
    destinationIp: "198.51.100.20",
    severity: "Critical",
    timestamp: "2026-10-29 14:28:42",
    status: "Open",
    protocol: "UDP",
    description:
      "A simulated burst of UDP packets targeting a destination host.",
    evidence:
      "Unusually high UDP packet rate in the sample traffic.",
    recommendation:
      "Review traffic volume and investigate the affected host.",
  },
  {
    id: "TH-003",
    attack: "ARP Spoofing",
    sourceIp: "192.0.2.37",
    destinationIp: "198.51.100.30",
    severity: "High",
    timestamp: "2026-10-29 14:19:05",
    status: "Investigating",
    protocol: "ARP",
    description:
      "Simulated suspicious ARP activity that may indicate address impersonation.",
    evidence:
      "Unexpected address-to-MAC mapping changes in the example event.",
    recommendation:
      "Inspect ARP tables and verify the affected devices.",
  },
  {
    id: "TH-004",
    attack: "ICMP Flood",
    sourceIp: "192.0.2.48",
    destinationIp: "198.51.100.40",
    severity: "Medium",
    timestamp: "2026-10-29 14:10:31",
    status: "Open",
    protocol: "ICMP",
    description:
      "A simulated increase in ICMP echo requests directed at a host.",
    evidence:
      "ICMP request frequency exceeds the illustrative baseline.",
    recommendation:
      "Check packet rates and review the target host's availability.",
  },
  {
    id: "TH-005",
    attack: "Benign Traffic",
    sourceIp: "192.0.2.61",
    destinationIp: "198.51.100.50",
    severity: "Low",
    timestamp: "2026-10-29 14:02:11",
    status: "Resolved",
    protocol: "TCP",
    description:
      "An example of normal network traffic retained for comparison.",
    evidence:
      "No suspicious pattern identified in this mock record.",
    recommendation:
      "No action required unless new evidence appears.",
  },
];


function ThreatInvestigationPage() {
  const [selectedId, setSelectedId] = useState("TH-002");

  const selectedThreat =
    demoThreats.find((threat) => threat.id === selectedId) ??
    demoThreats[0];

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h1>Threat Investigation</h1>
        <p style={{ color: "#91a5b6" }}>
          Review suspicious network events and investigate their details.
        </p>
        <p style={{ color: "#65d8c7", fontSize: 12 }}>
          DEMO MODE — MOCK DATA ONLY
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {demoThreats.map((threat) => (
          <button
            key={threat.id}
            onClick={() => setSelectedId(threat.id)}
            style={{
              textAlign: "left",
              padding: 16,
              background:
                selectedId === threat.id ? "#1a3040" : "#101a26",
              color: "#e5edf5",
              border: "1px solid #293b4a",
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            <strong>{threat.attack}</strong>
            <p style={{ color: "#91a5b6" }}>{threat.id}</p>
            <p>
              Severity:{" "}
              <span
                style={{
                  color:
                    threat.severity === "Critical"
                      ? "#fb7185"
                      : threat.severity === "High"
                      ? "#fb923c"
                      : threat.severity === "Medium"
                      ? "#facc15"
                      : "#65d8c7",
                }}
              >
                {threat.severity}
              </span>
            </p>
            <p>Source IP: {threat.sourceIp}</p>
          </button>
        ))}
      </div>

      <section
        style={{
          padding: 20,
          background: "#101a26",
          border: "1px solid #293b4a",
          borderRadius: 12,
        }}
      >
        <h2>Investigation Details</h2>
        <p>Event ID: {selectedThreat.id}</p>
        <p>Attack type: {selectedThreat.attack}</p>
        <p>Severity: {selectedThreat.severity}</p>
        <p>Source IP: {selectedThreat.sourceIp}</p>
        <p>Destination IP: {selectedThreat.destinationIp}</p>
        <p>Timestamp: {selectedThreat.timestamp}</p>
        <p>Protocol: {selectedThreat.protocol}</p>
        <p>Status: {selectedThreat.status}</p>
        <p>{selectedThreat.description}</p>
        <p>
          <strong>Evidence:</strong> {selectedThreat.evidence}
        </p>
        <p>
          <strong>Recommended action:</strong>{" "}
          {selectedThreat.recommendation}
        </p>
      </section>
    </div>
  );
}


const demoReports = [
  {
    id: "FR-001",
    title: "Port Scan Investigation",
    date: "2026-10-29",
    status: "Completed",
    severity: "High",
    attackType: "Port Scan",
    summary:
      "A simulated investigation of repeated connection attempts across multiple network ports.",
    findings: [
      "Repeated connection attempts were observed in the example dataset.",
      "Several destination ports were targeted within a short interval.",
      "The event was classified as a potential reconnaissance activity.",
    ],
    recommendation:
      "Review network logs, verify whether the source is authorized, and monitor repeated connection attempts.",
  },
  {
    id: "FR-002",
    title: "UDP Flood Analysis",
    date: "2026-10-28",
    status: "Under Review",
    severity: "Critical",
    attackType: "UDP Flood",
    summary:
      "A mock analysis of unusually high UDP traffic directed at a destination host.",
    findings: [
      "The example event contains an elevated UDP packet rate.",
      "The traffic pattern requires further investigation.",
      "No live network evidence is included in this report.",
    ],
    recommendation:
      "Review traffic volume, inspect the target host, and evaluate appropriate rate-limiting measures.",
  },
  {
    id: "FR-003",
    title: "ARP Spoofing Review",
    date: "2026-10-27",
    status: "Completed",
    severity: "High",
    attackType: "ARP Spoofing",
    summary:
      "A simulated review of suspicious address-to-MAC mapping changes.",
    findings: [
      "Unexpected ARP mapping changes appear in the example scenario.",
      "Address impersonation is one possible explanation.",
      "The mock record does not confirm a real attack.",
    ],
    recommendation:
      "Inspect ARP tables, verify device identities, and review local network logs.",
  },
];


function ForensicReportsPage() {
  const [selectedId, setSelectedId] = useState("FR-001");

  const report = demoReports.find((item) => item.id === selectedId)
    ?? demoReports[0];

  function downloadReport() {
    const content = [
      "FORENSICFED - DEMO FORENSIC REPORT",
      "===================================",
      "",
      `Report ID: ${report.id}`,
      `Title: ${report.title}`,
      `Date: ${report.date}`,
      `Status: ${report.status}`,
      `Severity: ${report.severity}`,
      `Attack Type: ${report.attackType}`,
      "",
      "SUMMARY",
      report.summary,
      "",
      "FINDINGS",
      ...report.findings.map((finding, index) => `${index + 1}. ${finding}`),
      "",
      "RECOMMENDATION",
      report.recommendation,
      "",
      "NOTICE: This is mock demonstration data, not a real forensic finding.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}-demo-report.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h1>Forensic Reports</h1>
        <p style={{ color: "#91a5b6" }}>
          Review investigation summaries and export demonstration reports.
        </p>
        <p style={{ color: "#65d8c7", fontSize: 12 }}>
          DEMO MODE — MOCK DATA ONLY
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          alignItems: "start",
        }}
      >
        <section
          style={{
            background: "#101a26",
            border: "1px solid #293b4a",
            borderRadius: 12,
            padding: 18,
          }}
        >
          <h2>Report List</h2>
          <p style={{ color: "#91a5b6", fontSize: 13 }}>
            Select a report to view its details.
          </p>

          {demoReports.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: 14,
                marginBottom: 10,
                background: selectedId === item.id ? "#1a3040" : "#0b1420",
                color: "#e5edf5",
                border: "1px solid #293b4a",
                borderRadius: 9,
                cursor: "pointer",
              }}
            >
              <strong>{item.title}</strong>
              <p style={{ color: "#91a5b6", margin: "8px 0" }}>
                {item.id} · {item.date}
              </p>
              <span
                style={{
                  color: item.severity === "Critical" ? "#fb7185" : "#fb923c",
                  fontSize: 13,
                }}
              >
                {item.severity} severity
              </span>
              <p style={{ marginBottom: 0 }}>Status: {item.status}</p>
            </button>
          ))}
        </section>

        <section
          style={{
            background: "#101a26",
            border: "1px solid #293b4a",
            borderRadius: 12,
            padding: 20,
            minWidth: 0,
          }}
        >
          <h2>Report Details</h2>
          <h3>{report.title}</h3>

          <p style={{ color: "#91a5b6" }}>Report ID</p>
          <p>{report.id}</p>

          <p style={{ color: "#91a5b6" }}>Date</p>
          <p>{report.date}</p>

          <p style={{ color: "#91a5b6" }}>Attack type</p>
          <p>{report.attackType}</p>

          <p style={{ color: "#91a5b6" }}>Severity</p>
          <p
            style={{
              color: report.severity === "Critical" ? "#fb7185" : "#fb923c",
            }}
          >
            {report.severity}
          </p>

          <p style={{ color: "#91a5b6" }}>Status</p>
          <p>{report.status}</p>

          <hr style={{ borderColor: "#293b4a", margin: "18px 0" }} />

          <h3>Summary</h3>
          <p>{report.summary}</p>

          <h3>Findings</h3>
          <ul>
            {report.findings.map((finding, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                {finding}
              </li>
            ))}
          </ul>

          <h3>Recommendation</h3>
          <p>{report.recommendation}</p>

          <button
            onClick={downloadReport}
            style={{
              padding: "12px 18px",
              background: "#65d8c7",
              color: "#0b1420",
              fontWeight: 700,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              marginTop: 12,
            }}
          >
            Download Demo Report (.txt)
          </button>

          <p style={{ color: "#91a5b6", fontSize: 12 }}>
            Exported reports contain mock demonstration data.
          </p>
        </section>
      </div>
    </div>
  );
}
 

const demoModelMetrics = {
  modelName: "ForensicFed Global Model",
  version: "Demo v1.0",
  accuracy: 99.53,
  precision: 99.45,
  recall: 99.56,
  f1Score: 99.50,
  totalSamples: 1900,
  confusionMatrix: {
    trueNegative: 985,
    falsePositive: 5,
    falseNegative: 4,
    truePositive: 906,
  },
};

const demoTrainingRounds = [
  {
    round: 1,
    clients: 2,
    loss: 0.082,
    accuracy: 94.20,
    status: "Completed",
  },
  {
    round: 2,
    clients: 2,
    loss: 0.051,
    accuracy: 96.10,
    status: "Completed",
  },
  {
    round: 3,
    clients: 3,
    loss: 0.029,
    accuracy: 97.85,
    status: "Completed",
  },
  {
    round: 4,
    clients: 2,
    loss: 0.016,
    accuracy: 98.70,
    status: "Completed",
  },
  {
    round: 5,
    clients: 2,
    loss: 0.009,
    accuracy: 99.53,
    status: "Demo",
  },
];


function AILabPage() {
  const [selectedRound, setSelectedRound] = useState(5);

  const selectedData = demoTrainingRounds.find(
    (item) => item.round === selectedRound
  );

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1>AI Lab</h1>
          <p>
            Evaluate the global model and review federated training progress.
          </p>
        </div>
        <span className="status-badge">DEMO MODE · MOCK DATA</span>
      </div>

      <div className="metrics-grid">
  <MetricCard
    title="Accuracy"
    value={`${demoModelMetrics.accuracy}%`}
    change="Demo metric"
    positive={true}
    icon={<Activity/>}
    color="#14b8a6"
    footer="Correct predictions"
  />

  <MetricCard
    title="Precision"
    value={`${demoModelMetrics.precision}%`}
    change="Demo metric"
    positive={true}
    icon={<Target/>}
    color="#60a5fa"
    footer="Predicted threats that are threats"
  />

  <MetricCard
    title="Recall"
    value={`${demoModelMetrics.recall}%`}
    change="Demo metric"
    positive={true}
    icon={<ShieldCheck/>}
    color="#a78bfa"
    footer="Threats correctly detected"
  />

  <MetricCard
    title="F1 Score"
    value={`${demoModelMetrics.f1Score}%`}
    change="Demo metric"
    positive={true}
    icon={<Brain/>}
    color="#f59e0b"
    footer="Precision and recall balance"
  />
</div>

      <div className="ai-lab-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Confusion Matrix</h2>
              <p>Illustrative test-set predictions</p>
            </div>
          </div>

          <div className="matrix-wrap">
            <table className="data-table confusion-matrix">
              <thead>
                <tr>
                  <th>Actual / Predicted</th>
                  <th>Benign</th>
                  <th>Threat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Benign</th>
                  <td className="matrix-correct">
                    <strong>
                      {demoModelMetrics.confusionMatrix.trueNegative}
                    </strong>
                    <small>True Negative</small>
                  </td>
                  <td className="matrix-error">
                    <strong>
                      {demoModelMetrics.confusionMatrix.falsePositive}
                    </strong>
                    <small>False Positive</small>
                  </td>
                </tr>
                <tr>
                  <th>Threat</th>
                  <td className="matrix-error">
                    <strong>
                      {demoModelMetrics.confusionMatrix.falseNegative}
                    </strong>
                    <small>False Negative</small>
                  </td>
                  <td className="matrix-correct">
                    <strong>
                      {demoModelMetrics.confusionMatrix.truePositive}
                    </strong>
                    <small>True Positive</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="panel-note">
            False negatives are especially important: they represent threats
            the model failed to detect.
          </p>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Model Evaluation</h2>
              <p>{demoModelMetrics.modelName}</p>
            </div>
            <span className="status-badge">
              {demoModelMetrics.version}
            </span>
          </div>

          <div className="evaluation-list">
            <div>
              <span>Evaluation samples</span>
              <strong>
                {demoModelMetrics.totalSamples.toLocaleString()}
              </strong>
            </div>
            <div>
              <span>True predictions</span>
              <strong>
                {(
                  demoModelMetrics.confusionMatrix.trueNegative +
                  demoModelMetrics.confusionMatrix.truePositive
                ).toLocaleString()}
              </strong>
            </div>
            <div>
              <span>Incorrect predictions</span>
              <strong>
                {(
                  demoModelMetrics.confusionMatrix.falsePositive +
                  demoModelMetrics.confusionMatrix.falseNegative
                ).toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="evaluation-message">
            <h3>Evaluation note</h3>
            <p>
              These illustrative metrics show how performance will be
              displayed. Actual evaluation must use representative,
              held-out network traffic and checks for data leakage.
            </p>
          </div>
        </section>
      </div>

      <section className="panel training-panel">
        <div className="panel-heading">
          <div>
            <h2>Federated Training Rounds</h2>
            <p>Illustrative model progress across training rounds</p>
          </div>
          <span className="status-badge">
            {demoTrainingRounds.length} demo rounds
          </span>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Participating Clients</th>
                <th>Training Loss</th>
                <th>Demo Accuracy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {demoTrainingRounds.map((item) => (
                <tr
                  key={item.round}
                  className={
                    selectedRound === item.round ? "selected-row" : ""
                  }
                  onClick={() => setSelectedRound(item.round)}
                  style={{ cursor: "pointer" }}
                >
                  <td>Round {item.round}</td>
                  <td>{item.clients}</td>
                  <td>{item.loss.toFixed(3)}</td>
                  <td>{item.accuracy.toFixed(2)}%</td>
                  <td>
                    <span className="status-badge">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedData && (
          <div className="round-detail">
            <strong>Selected: Round {selectedData.round}</strong>
            <span>
              {selectedData.clients} participating clients · Loss:{" "}
              {selectedData.loss.toFixed(3)} · Demo accuracy:{" "}
              {selectedData.accuracy.toFixed(2)}%
            </span>
          </div>
        )}
      </section>
    </div>
  );
}


function MetricCard({ title, value, change, positive, icon, color, footer }: MetricCardProps) {
  return (
    <section className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon metric-${color}`}>{icon}</span>
        <span className="metric-context">{change}</span>
      </div>
      <div className="metric-label">{title}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-footer">
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{footer}</span>
      </div>
    </section>
  );
}

export default App;
