"use client"

import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

export function LoadingOverlay({ isVisible, message = "계산 중..." }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 min-w-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-gray-700">{message}</p>
        <div className="text-xs text-gray-500 text-center">
          <p>신뢰성 예측 계산을 수행 중입니다.</p>
          <p>잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
  )
}