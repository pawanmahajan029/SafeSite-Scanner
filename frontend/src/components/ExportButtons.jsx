import { Download, FileJson, FileText, Table } from 'lucide-react'

function ExportButtons({ results, darkMode }) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scan-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportCSV = () => {
    const rows = [['Category', 'Finding', 'Severity', 'Description']]
    const nivel1 = results.nivel1
    if (nivel1) {
      nivel1.headers?.missing_critical?.forEach(h => rows.push(['Missing Header', h.name, h.risk, h.description]))
      nivel1.headers?.problematic?.forEach(h => rows.push(['Problematic Header', h.name, 'MEDIUM', h.risk]))
    }
    const nivel2 = results.nivel2
    if (nivel2) {
      nivel2.vulnerabilities?.forEach(v => rows.push(['Vulnerability', v.id, v.severity, v.description]))
    }
    const nivel3 = results.nivel3
    if (nivel3) {
      nivel3.xss_vectors?.forEach(v => rows.push(['XSS Vector', v.parameter, v.risk, v.description]))
      nivel3.other_risks?.forEach(r => rows.push(['Other Risk', r.type, r.risk, r.description]))
    }
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scan-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportReport = () => {
    const resumen = results.resumen_general
    let report = `Raven Security Scan Report\n${'='.repeat(40)}\n\n`
    report += `URL: ${results.url}\n`
    report += `Date: ${new Date(results.timestamp).toLocaleString()}\n`
    report += `Overall Score: ${resumen?.total_score || 'N/A'}/100\n\n`
    if (resumen?.priority_recommendations) {
      report += `Priority Recommendations:\n${'-'.repeat(30)}\n`
      resumen.priority_recommendations.forEach((r, i) => report += `${i + 1}. ${r}\n`)
    }
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const btnStyle = darkMode
    ? 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/70 hover:border-slate-600'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 hover:border-slate-300'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-[11px] font-mono uppercase tracking-wider mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Export:
      </span>
      <button
        onClick={exportJSON}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shadow-sm ${btnStyle}`}
        title="Export full scan data as JSON"
      >
        <FileJson className="w-3.5 h-3.5 text-cyan-400" />
        <span>JSON</span>
      </button>
      <button
        onClick={exportCSV}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shadow-sm ${btnStyle}`}
        title="Export findings as CSV spreadsheet"
      >
        <Table className="w-3.5 h-3.5 text-emerald-400" />
        <span>CSV</span>
      </button>
      <button
        onClick={exportReport}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shadow-sm ${btnStyle}`}
        title="Download text summary report"
      >
        <FileText className="w-3.5 h-3.5 text-amber-400" />
        <span>Report</span>
      </button>
    </div>
  )
}

export default ExportButtons
