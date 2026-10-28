import { useState } from 'react'
import { Server, Code, Shield, ShieldAlert, ShieldCheck, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronRight, Globe, Info } from 'lucide-react'
import ScoreGauge from './ScoreGauge'

function Nivel1Results({ data, darkMode }) {
  const [showAllHeaders, setShowAllHeaders] = useState(false)

  if (!data) return null

  const headers = data.headers || {}
  const technologies = data.technologies || []
  const server = data.server || {}
  const cors = headers.cors || {}
  const cacheHeaders = headers.cache_headers || {}
  const allHeaders = headers.all_headers || []

  return (
    <div className="space-y-6">
      <div className={`flex flex-col lg:flex-row gap-6`}>
        <div className={`${darkMode ? 'card' : 'card-light'} flex-shrink-0`}>
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            <ScoreGauge score={data.security_score || 0} size={160} darkMode={darkMode} />
          </div>
        </div>

        <div className={`${darkMode ? 'card' : 'card-light'} flex-1`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Server className="w-5 h-5 text-cyan-400" />
            Server Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`rounded-xl p-4 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Server Type</p>
              <p className={`text-lg font-semibold mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{server.type || 'Unknown'}</p>
            </div>
            <div className={`rounded-xl p-4 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Version</p>
              <p className={`text-lg font-semibold mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{server.version || 'N/A'}</p>
            </div>
            <div className={`rounded-xl p-4 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Technologies Found</p>
              <p className={`text-lg font-semibold mt-1 text-cyan-400 font-mono`}>{technologies.length}</p>
            </div>
          </div>
        </div>
      </div>

      {technologies.length > 0 && (
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Code className="w-5 h-5 text-cyan-400" />
            Detected Technologies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {technologies.map((tech, idx) => (
              <div key={idx} className={`rounded-xl p-4 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{tech.name}</span>
                  <span className="badge badge-safe">{tech.type}</span>
                </div>
                {tech.version && (
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>v{tech.version}</p>
                )}
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Found in: {tech.found_in}</p>
                {tech.confidence && (
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Confidence: {tech.confidence}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <ShieldCheck className="w-5 h-5 text-green-400" />
            Security Headers Configured
          </h3>
          {headers.configured_correctly?.length > 0 ? (
            <div className="space-y-2">
              {headers.configured_correctly.map((h, idx) => (
                <div key={idx} className={`flex items-start gap-2 p-2 rounded-lg ${darkMode ? 'bg-green-950/30' : 'bg-green-50'}`}>
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>{h.name}</p>
                      {h.value_evaluation && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          h.value_evaluation.status === 'good' ? (darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700')
                          : h.value_evaluation.status === 'warning' ? (darkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700')
                          : (darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
                        }`}>
                          {h.value_evaluation.message}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No security headers configured</p>
          )}
        </div>

        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Missing Security Headers
          </h3>
          {headers.missing_critical?.length > 0 ? (
            <div className="space-y-2">
              {headers.missing_critical.map((h, idx) => (
                <div key={idx} className={`flex items-start gap-2 p-2 rounded-lg ${darkMode ? 'bg-red-950/30' : 'bg-red-50'}`}>
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>{h.name}</p>
                      <span className={`badge badge-${h.risk.toLowerCase()}`}>{h.risk}</span>
                    </div>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>All critical headers present</p>
          )}
        </div>
      </div>

      {headers.problematic?.length > 0 && (
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Problematic Headers
          </h3>
          <div className="space-y-2">
            {headers.problematic.map((h, idx) => (
              <div key={idx} className={`flex items-start gap-2 p-3 rounded-lg border ${darkMode ? 'bg-yellow-950/30 border-yellow-800/30' : 'bg-yellow-50 border-yellow-200'}`}>
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>{h.name}: <code className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>{h.value}</code></p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {headers.cookie_issues?.length > 0 && (
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Shield className="w-5 h-5 text-amber-400" />
            Cookie Security Issues
          </h3>
          <div className="space-y-2">
            {headers.cookie_issues.map((cookie, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${darkMode ? 'bg-amber-950/20 border-amber-800/40' : 'bg-amber-50/60 border-amber-200'}`}>
                <p className={`text-xs font-mono truncate ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{cookie.cookie}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cookie.issues.map((issue, i) => (
                    <span key={i} className="badge badge-high">{issue}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {cors.enabled && (
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Globe className="w-5 h-5 text-cyan-400" />
            CORS Configuration
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cors.allow_origin && (
              <div className={`rounded-xl p-3 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Allow-Origin</p>
                <p className={`text-sm font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cors.allow_origin}</p>
              </div>
            )}
            {cors.allow_methods && (
              <div className={`rounded-xl p-3 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Allow-Methods</p>
                <p className={`text-sm font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cors.allow_methods}</p>
              </div>
            )}
            {cors.allow_credentials && (
              <div className={`rounded-xl p-3 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Allow-Credentials</p>
                <p className={`text-sm font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cors.allow_credentials}</p>
              </div>
            )}
            {cors.allow_headers && (
              <div className={`rounded-xl p-3 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Allow-Headers</p>
                <p className={`text-sm font-mono mt-1 truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cors.allow_headers}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {cacheHeaders.headers && Object.keys(cacheHeaders.headers).length > 0 && (
        <div className={`${darkMode ? 'card' : 'card-light'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Info className="w-5 h-5 text-indigo-400" />
            Cache Headers
          </h3>
          <div className="space-y-2">
            {Object.entries(cacheHeaders.headers).map(([name, value]) => (
              <div key={name} className={`rounded-xl p-3 border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs font-mono ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}><span className="text-cyan-400 font-semibold">{name}</span>: {value}</p>
              </div>
            ))}
            {cacheHeaders.issues?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cacheHeaders.issues.map((issue, i) => (
                  <span key={i} className="badge badge-medium">{issue}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`${darkMode ? 'card' : 'card-light'}`}>
        <button
          onClick={() => setShowAllHeaders(!showAllHeaders)}
          className={`flex items-center gap-2 text-sm font-semibold transition-colors ${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
        >
          {showAllHeaders ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-cyan-400" />}
          All Observed HTTP Headers ({allHeaders.length})
        </button>
        {showAllHeaders && (
          <div className="space-y-1.5 max-h-72 overflow-y-auto mt-3 pt-3 border-t border-slate-800/80">
            {allHeaders.map((h, idx) => (
              <div key={idx} className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                <span className="font-semibold text-cyan-400">{h.name}</span>: {h.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Nivel1Results
