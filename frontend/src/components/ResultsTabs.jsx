import { useState } from 'react'
import {
  LayoutDashboard,
  Fingerprint,
  Bug,
  Search,
  Bot,
  Shield,
  FileCheck,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp,
  Activity,
  Globe,
  Clock,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Server,
  Layers,
  ArrowRight
} from 'lucide-react'
import Nivel1Results from './Nivel1Results'
import Nivel2Results from './Nivel2Results'
import Nivel3Results from './Nivel3Results'
import ScoreGauge, { SeverityBar } from './ScoreGauge'
import ExportButtons from './ExportButtons'
import CrawlerResults from './CrawlerResults'
import OwaspDashboard from './OwaspDashboard'
import ComplianceReport from './ComplianceReport'

function computeVulnStats(vulnerabilities) {
  if (!vulnerabilities?.length) return { total: 0, critical: 0, high: 0, medium: 0, low: 0 }
  return {
    total: vulnerabilities.length,
    critical: vulnerabilities.filter(v => v.severity === 'CRITICAL').length,
    high: vulnerabilities.filter(v => v.severity === 'HIGH').length,
    medium: vulnerabilities.filter(v => v.severity === 'MEDIUM').length,
    low: vulnerabilities.filter(v => v.severity === 'LOW').length,
  }
}

function getStatusBadge(score) {
  if (score >= 80) {
    return {
      label: 'Secure Posture',
      badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow-sm shadow-emerald-950/50',
      icon: ShieldCheck,
      color: '#10b981',
    }
  }
  if (score >= 60) {
    return {
      label: 'Moderate Risk',
      badgeClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 shadow-sm shadow-cyan-950/50',
      icon: Shield,
      color: '#06b6d4',
    }
  }
  if (score >= 40) {
    return {
      label: 'High Risk',
      badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-800/80 shadow-sm shadow-amber-950/50',
      icon: AlertTriangle,
      color: '#f59e0b',
    }
  }
  return {
    label: 'Critical Risk',
    badgeClass: 'bg-red-950/80 text-red-300 border border-red-800/80 shadow-sm shadow-red-950/50',
    icon: ShieldAlert,
    color: '#ef4444',
  }
}

function ResultsTabs({ results, crawlerData, owaspData, complianceData, darkMode }) {
  const [activeTab, setActiveTab] = useState('overview')

  const resumen = results.resumen_general || {}
  const nivel1 = results.nivel1 || {}
  const nivel2 = results.nivel2 || {}
  const nivel3 = results.nivel3 || {}
  const vulnStats = computeVulnStats(nivel2.vulnerabilities)

  const totalScore = Math.round(resumen.total_score || 0)
  const l1Score = Math.round(nivel1.security_score || 0)
  const l2Score = Math.round(nivel2.vulnerability_score || 0)
  const l3Score = Math.round(nivel3.parameter_score || 0)

  const status = getStatusBadge(totalScore)
  const StatusIcon = status.icon

  const baseTabs = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'level1', label: 'Level 1: Recon & Headers', icon: Fingerprint, count: nivel1.headers?.missing_critical?.length ? `${nivel1.headers.missing_critical.length} missing` : null },
    { id: 'level2', label: 'Level 2: Vulnerabilities', icon: Bug, count: vulnStats.total > 0 ? `${vulnStats.total}` : null },
    { id: 'level3', label: 'Level 3: Attack Surface', icon: Search, count: nivel3.xss_vectors?.length ? `${nivel3.xss_vectors.length} risks` : null },
  ]

  const extraTabs = []
  if (crawlerData) extraTabs.push({ id: 'crawler', label: 'Endpoints', icon: Bot, count: crawlerData.urls_crawled?.length })
  if (owaspData) extraTabs.push({ id: 'owasp', label: 'OWASP Top 10', icon: Shield })
  if (complianceData) extraTabs.push({ id: 'compliance', label: 'Compliance', icon: FileCheck })

  const tabs = [...baseTabs, ...extraTabs]

  // Weighted score contributions
  const l1Contrib = (l1Score * 0.3).toFixed(1)
  const l2Contrib = (l2Score * 0.4).toFixed(1)
  const l3Contrib = (l3Score * 0.3).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Executive Report Header Card */}
      <div className={`${darkMode ? 'card' : 'card-light'} overflow-hidden relative`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Score Ring */}
            <div className={`p-2 rounded-2xl border shadow-xl flex-shrink-0 ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <ScoreGauge score={totalScore} size={84} darkMode={darkMode} />
            </div>

            {/* Target & Summary Metadata */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold tracking-tight text-white">Security Assessment Report</h2>
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold font-mono ${status.badgeClass}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {status.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <a
                  href={results.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 hover:underline transition-colors truncate max-w-sm sm:max-w-md"
                >
                  {results.url}
                </a>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {results.timestamp ? new Date(results.timestamp).toLocaleTimeString() : 'Just now'}
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-1 font-mono text-red-400">
                  <Bug className="w-3.5 h-3.5" />
                  {vulnStats.total} {vulnStats.total === 1 ? 'vulnerability' : 'vulnerabilities'} detected
                </span>
                {vulnStats.critical > 0 && (
                  <>
                    <span className="text-slate-700">•</span>
                    <span className="font-mono text-red-400 font-semibold">
                      {vulnStats.critical} Critical
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex-shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
            <ExportButtons results={results} darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className={`border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} pb-1`}>
        <nav className="flex gap-2 overflow-x-auto py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : `${darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? 'bg-cyan-400/20 text-cyan-200'
                        : `${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'}`
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab 1: Executive Overview Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Row 1: 4 Security Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Score */}
            <div className={`${darkMode ? 'card' : 'card-light'} flex flex-col items-center text-center justify-between`}>
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Score</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60">
                  Weight 100%
                </span>
              </div>
              <div className="py-2">
                <ScoreGauge score={totalScore} size={90} darkMode={darkMode} />
              </div>
              <div className="w-full pt-3 mt-1 border-t border-slate-800/80">
                <h4 className="text-sm font-semibold text-white">Overall Posture</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Composite weighted assessment</p>
              </div>
            </div>

            {/* Card 2: Level 1 Recon */}
            <div className={`${darkMode ? 'card' : 'card-light'} flex flex-col items-center text-center justify-between`}>
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Level 1</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700/60">
                  Weight 30%
                </span>
              </div>
              <div className="py-2">
                <ScoreGauge score={l1Score} size={90} darkMode={darkMode} />
              </div>
              <div className="w-full pt-3 mt-1 border-t border-slate-800/80">
                <h4 className="text-sm font-semibold text-white">Recon & Headers</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {nivel1.headers?.missing_critical?.length || 0} missing critical headers
                </p>
              </div>
            </div>

            {/* Card 3: Level 2 Vulnerabilities */}
            <div className={`${darkMode ? 'card' : 'card-light'} flex flex-col items-center text-center justify-between`}>
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Level 2</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 border border-slate-700/60">
                  Weight 40%
                </span>
              </div>
              <div className="py-2">
                <ScoreGauge score={l2Score} size={90} darkMode={darkMode} />
              </div>
              <div className="w-full pt-3 mt-1 border-t border-slate-800/80">
                <h4 className="text-sm font-semibold text-white">Vulnerabilities</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {vulnStats.total} CVEs & pattern matches
                </p>
              </div>
            </div>

            {/* Card 4: Level 3 Parameters */}
            <div className={`${darkMode ? 'card' : 'card-light'} flex flex-col items-center text-center justify-between`}>
              <div className="w-full flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Level 3</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700/60">
                  Weight 30%
                </span>
              </div>
              <div className="py-2">
                <ScoreGauge score={l3Score} size={90} darkMode={darkMode} />
              </div>
              <div className="w-full pt-3 mt-1 border-t border-slate-800/80">
                <h4 className="text-sm font-semibold text-white">Attack Surface</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {nivel3.parameters?.length || 0} params, {nivel3.xss_vectors?.length || 0} XSS risks
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Score Formula & Severity Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Score Breakdown (Weighted Formula) */}
            <div className={`${darkMode ? 'card' : 'card-light'} space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Score Formula & Weighting
                </h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Total: {totalScore} / 100
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Level 1 Item */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">Level 1: Recon & Fingerprinting</span>
                    <span className="font-mono text-slate-400">
                      Score: <strong className="text-white">{l1Score}</strong>/100 × 30% = <span className="text-cyan-400 font-semibold">{l1Contrib} pts</span>
                    </span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-700"
                      style={{ width: `${l1Score}%` }}
                    />
                  </div>
                </div>

                {/* Level 2 Item */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">Level 2: Vulnerability Analysis</span>
                    <span className="font-mono text-slate-400">
                      Score: <strong className="text-white">{l2Score}</strong>/100 × 40% = <span className="text-amber-400 font-semibold">{l2Contrib} pts</span>
                    </span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700"
                      style={{ width: `${l2Score}%` }}
                    />
                  </div>
                </div>

                {/* Level 3 Item */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">Level 3: Attack Vector & Parameters</span>
                    <span className="font-mono text-slate-400">
                      Score: <strong className="text-white">{l3Score}</strong>/100 × 30% = <span className="text-emerald-400 font-semibold">{l3Contrib} pts</span>
                    </span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700"
                      style={{ width: `${l3Score}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-xl border font-mono text-[11px] ${darkMode ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <code>Total Score = ({l1Score} × 0.3) + ({l2Score} × 0.4) + ({l3Score} × 0.3) = <strong>{totalScore}</strong></code>
              </div>
            </div>

            {/* Vulnerability Severity Matrix */}
            <div className={`${darkMode ? 'card' : 'card-light'} space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  Vulnerability Distribution
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {vulnStats.total} findings
                </span>
              </div>

              {vulnStats.total === 0 ? (
                <div className="py-8 text-center">
                  <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-semibold text-white">No Known Vulnerabilities Found</p>
                  <p className="text-xs text-slate-400 mt-1">Zero CVE or signature matches detected on target.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <SeverityBar label="Critical" count={vulnStats.critical} total={vulnStats.total} color="#ef4444" darkMode={darkMode} />
                  <SeverityBar label="High" count={vulnStats.high} total={vulnStats.total} color="#f97316" darkMode={darkMode} />
                  <SeverityBar label="Medium" count={vulnStats.medium} total={vulnStats.total} color="#eab308" darkMode={darkMode} />
                  <SeverityBar label="Low" count={vulnStats.low} total={vulnStats.total} color="#10b981" darkMode={darkMode} />
                </div>
              )}

              {/* Quick action helper */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('level2')}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors border border-slate-700/60"
                >
                  <span>Inspect All Level 2 Findings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Priority Remediation Recommendations */}
          {resumen.priority_recommendations?.length > 0 && (
            <div className={`${darkMode ? 'card' : 'card-light'} space-y-4`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Priority Remediation Plan
                </h3>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {resumen.priority_recommendations.length} action items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resumen.priority_recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      darkMode ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Row 4: External Resources & Docs */}
          {resumen.resources?.length > 0 && (
            <div className={`${darkMode ? 'card' : 'card-light'} space-y-3`}>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Security Standards & Documentation
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumen.resources.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/70 hover:bg-slate-800 rounded-xl text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors border border-slate-700/60"
                  >
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                    <span>{url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Level 1 Recon & Headers */}
      {activeTab === 'level1' && <Nivel1Results data={nivel1} darkMode={darkMode} />}

      {/* Tab 3: Level 2 Vulnerabilities */}
      {activeTab === 'level2' && <Nivel2Results data={nivel2} darkMode={darkMode} />}

      {/* Tab 4: Level 3 Attack Surface */}
      {activeTab === 'level3' && <Nivel3Results data={nivel3} darkMode={darkMode} />}

      {/* Extended Module Tabs */}
      {activeTab === 'crawler' && <CrawlerResults data={crawlerData} darkMode={darkMode} />}
      {activeTab === 'owasp' && <OwaspDashboard data={owaspData} darkMode={darkMode} />}
      {activeTab === 'compliance' && <ComplianceReport data={complianceData} darkMode={darkMode} />}
    </div>
  )
}

export default ResultsTabs
