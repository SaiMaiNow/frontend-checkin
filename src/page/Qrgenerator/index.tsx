import React, { useState } from 'react'
import { Shield, QrCode, Clock, UserX, Square, Settings, Calendar, Trash2, Eye, CheckCircle, XCircle, Plus, Maximize2 } from 'lucide-react'
import { LoadingSpinner, LoadingOverlay } from '../../components'

const Qrgenerator = () => {
  // State management - Replace with your actual logic
  const [expirationTime, setExpirationTime] = useState('60') // minutes
  const [ignoredAccounts, setIgnoredAccounts] = useState<string[]>([])
  const [newAccount, setNewAccount] = useState('')
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [activeQRCodes, setActiveQRCodes] = useState([
    { id: 1, createdAt: '09/01/2026 22:30', expiresAt: '09/01/2026 23:30', status: 'active' },
    { id: 2, createdAt: '09/01/2026 21:00', expiresAt: '09/01/2026 22:00', status: 'expired' },
  ])

  // Saved presets - Replace with actual data from your API
  const [savedPresets, setSavedPresets] = useState([
    {
      id: 1,
      name: 'ตั้งค่ามาตรฐาน',
      expirationTime: '60',
      ignoredAccounts: ['admin@example.com'],
      createdAt: '08/01/2026 10:00'
    },
    {
      id: 2,
      name: 'QR ระยะสั้น',
      expirationTime: '30',
      ignoredAccounts: ['test@example.com', 'demo@example.com'],
      createdAt: '07/01/2026 15:30'
    },
    {
      id: 3,
      name: 'QR ระยะยาว',
      expirationTime: '1440',
      ignoredAccounts: [],
      createdAt: '06/01/2026 09:00'
    },
  ])
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [presetName, setPresetName] = useState('')
  const [showSavePreset, setShowSavePreset] = useState(false)

  // Loading states
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoadingPreset, setIsLoadingPreset] = useState(false)
  const [isSavingPreset, setIsSavingPreset] = useState(false)

  const handleAddAccount = () => {
    if (newAccount.trim() && !ignoredAccounts.includes(newAccount.trim())) {
      setIgnoredAccounts([...ignoredAccounts, newAccount.trim()])
      setNewAccount('')
    }
  }

  const handleRemoveAccount = (account: string) => {
    setIgnoredAccounts(ignoredAccounts.filter(acc => acc !== account))
  }

  const handleLoadPreset = async (presetId: number) => {
    setIsLoadingPreset(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

      const preset = savedPresets.find(p => p.id === presetId)
      if (preset) {
        setExpirationTime(preset.expirationTime)
        setIgnoredAccounts(preset.ignoredAccounts)
        setSelectedPreset(presetId)
      }
    } finally {
      setIsLoadingPreset(false)
    }
  }

  const handleSavePreset = async () => {
    if (presetName.trim()) {
      setIsSavingPreset(true)
      try {
        const newPreset = {
          id: savedPresets.length + 1,
          name: presetName,
          expirationTime,
          ignoredAccounts: [...ignoredAccounts],
          createdAt: new Date().toLocaleString('th-TH')
        }

        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay

        setSavedPresets([...savedPresets, newPreset])
        setPresetName('')
        setShowSavePreset(false)
        console.log('Saving preset:', newPreset)
      } finally {
        setIsSavingPreset(false)
      }
    }
  }

  const handleGenerateQR = async () => {
    setIsGenerating(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay

      const mockQRData = `QR_CODE_${Date.now()}_EXP_${expirationTime}_IGNORE_${ignoredAccounts.join(',')}`
      setQrCodeData(mockQRData)
      console.log('Generating QR with:', { expirationTime, ignoredAccounts })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <QrCode className="w-8 h-8" />
            QR Code Generator
          </h1>
          <p className="text-gray-600">สร้าง QR Code สำหรับการเช็คอิน</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - QR Generator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* QR Code Display */}
            <LoadingOverlay isLoading={isGenerating} text="กำลังสร้าง QR Code...">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">QR Code</h2>
                <div className="flex flex-col items-center justify-center">
                  {qrCodeData ? (
                    <div className="space-y-4 w-full">
                      {/* Placeholder for actual QR Code - Replace with QR library */}
                      <div className="w-full max-w-sm mx-auto aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border-4 border-purple-300">
                        <div className="text-center p-8">
                          <QrCode className="w-24 h-24 mx-auto mb-4 text-purple-500" />
                          <p className="text-sm text-gray-600 font-mono break-all">{qrCodeData}</p>
                          <p className="text-xs text-gray-500 mt-2">ใช้ QR library เช่น qrcode.react แทนที่ส่วนนี้</p>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                          <Maximize2 className="w-4 h-4" />
                          แสดงแบบเต็มจอ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-sm mx-auto aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <p className="text-gray-500">QR Code จะแสดงที่นี่</p>
                        <p className="text-sm text-gray-400 mt-2">กรุณากรอกข้อมูลและกดสร้าง QR Code</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </LoadingOverlay>

            {/* Settings Form */}
            <LoadingOverlay isLoading={isLoadingPreset} text="กำลังโหลดการตั้งค่า...">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  ตั้งค่า QR Code
                </h2>

                {/* Saved Presets Section */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      โหลดการตั้งค่าที่บันทึกไว้
                    </label>
                    <button
                      onClick={() => setShowSavePreset(!showSavePreset)}
                      className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      สร้างใหม่
                    </button>
                  </div>

                  {/* Save Preset Modal */}
                  {showSavePreset && (
                    <div className="mb-3 p-3 bg-white rounded-lg border border-blue-300">
                      <label className="text-xs font-semibold text-gray-700 mb-2 block">
                        ชื่อการตั้งค่า
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={presetName}
                          onChange={(e) => setPresetName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="เช่น: ตั้งค่าสำหรับพนักงาน"
                        />
                        <button
                          onClick={handleSavePreset}
                          disabled={isSavingPreset}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSavingPreset ? 'กำลังบันทึก...' : 'บันทึก'}
                        </button>
                        <button
                          onClick={() => setShowSavePreset(false)}
                          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-lg transition-colors"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Preset Selector */}
                  <select
                    value={selectedPreset || ''}
                    onChange={(e) => handleLoadPreset(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">-- เลือกการตั้งค่าที่บันทึกไว้ --</option>
                    {savedPresets.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name} (เวลา: {preset.expirationTime} นาที, Ignore: {preset.ignoredAccounts.length} บัญชี)
                      </option>
                    ))}
                  </select>

                  {/* Preset Details */}
                  {selectedPreset && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        <span className="font-semibold">การตั้งค่าที่เลือก:</span>{' '}
                        {savedPresets.find(p => p.id === selectedPreset)?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">สร้างเมื่อ:</span>{' '}
                        {savedPresets.find(p => p.id === selectedPreset)?.createdAt}
                      </p>
                    </div>
                  )}
                </div>

                {/* Expiration Time */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    เวลาหมดอายุ (นาที)
                  </label>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <input
                      type="number"
                      value={expirationTime}
                      onChange={(e) => setExpirationTime(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="60"
                      min="1"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpirationTime('30')}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                      >
                        30 นาที
                      </button>
                      <button
                        onClick={() => setExpirationTime('60')}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                      >
                        1 ชม.
                      </button>
                      <button
                        onClick={() => setExpirationTime('1440')}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                      >
                        1 วัน
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ignored Accounts */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <UserX className="w-4 h-4" />
                    บัญชีที่ต้องการ Ignore
                  </label>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={newAccount}
                      onChange={(e) => setNewAccount(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddAccount()}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="ใส่ชื่อบัญชีหรืออีเมล"
                    />
                    <button
                      onClick={handleAddAccount}
                      className="px-4 md:px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden md:inline">เพิ่ม</span>
                    </button>
                  </div>

                  {/* Ignored Accounts List */}
                  {ignoredAccounts.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {ignoredAccounts.map((account, index) => (
                          <div
                            key={index}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          >
                            <span>{account}</span>
                            <button
                              onClick={() => handleRemoveAccount(account)}
                              className="hover:bg-red-200 rounded-full w-5 h-5 flex items-center justify-center"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 text-sm">
                      ยังไม่มีบัญชีที่ถูก Ignore
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateQR}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg transition-all transform shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <QrCode className="w-6 h-6" />
                  {isGenerating ? 'กำลังสร้าง QR Code...' : 'สร้าง QR Code'}
                </button>
              </div>
            </LoadingOverlay>
          </div>

          {/* Right Panel - Active QR Codes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                QR Code ที่ใช้งานอยู่
              </h2>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {activeQRCodes.map((qr) => (
                  <div
                    key={qr.id}
                    className={`p-4 rounded-lg border-2 ${qr.status === 'active'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700">QR #{qr.id}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${qr.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-400 text-white'
                          }`}
                      >
                        {qr.status === 'active' ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Expired
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        สร้าง: {qr.createdAt}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        หมดอายุ: {qr.expiresAt}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 rounded transition-colors flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3" />
                        ดู
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-2 rounded transition-colors flex items-center justify-center gap-1">
                        <Trash2 className="w-3 h-3" />
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {activeQRCodes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">📭</div>
                  <p className="text-sm">ยังไม่มี QR Code ที่ใช้งานอยู่</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qrgenerator