import { TickCircle, Trash } from 'iconsax-react'
import { validateFile, uploadFile } from '../lib/utils'

interface FileUploaderProps {
  visitorTel: string
  fileId: string
  disable: boolean
  uploadStatus: {
    status: 'idle' | 'uploading' | 'success' | 'error'
    progress: number
  }
  onUploadStart: (visitorTel: string) => void
  onUploadProgress: (visitorTel: string, progress: number) => void
  onUploadSuccess: (visitorTel: string, fileId: string) => void
  onUploadError: (visitorTel: string, error: string) => void
  onDelete: (visitorTel: string) => void
}

const FileUploader = ({
  visitorTel,
  fileId,
  disable,
  uploadStatus,
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError,
  onDelete,
}: FileUploaderProps) => {
  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const validation = validateFile(file)

    if (!validation.isValid && validation.error) {
      onUploadError(visitorTel, validation.error)
      return
    }

    onUploadStart(visitorTel)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      onUploadProgress(visitorTel, Math.min(progress, 100))
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 300)

    try {
      const result = await uploadFile(file)
      if (result && result.status !== '-1' && result.rec_id_file) {
        onUploadSuccess(visitorTel, result.rec_id_file)
        clearInterval(interval)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.log(error)
      clearInterval(interval)
      onUploadError(visitorTel, 'خطا در بارگذاری فایل')
    }
  }

  if (fileId.length < 1) {
    return (
      <label
        className={`${
          !disable && 'opacity-30 cursor-pointer'
        } flex flex-col items-center gap-2 cursor-pointer w-full`}
        htmlFor={`fileUploader-${visitorTel}`}>
        <input
          id={`fileUploader-${visitorTel}`}
          disabled={!disable}
          type='file'
          onChange={handleUploadFile}
          className='hidden'
          accept='image/*'
        />
        <div className='w-full flex items-center justify-center border border-[#7747C0] text-[#7747C0] rounded-md px-4 py-2 text-sm hover:bg-[#7747C0] hover:text-white'>
          {uploadStatus?.status === 'uploading'
            ? 'در حال بارگذاری...'
            : 'بارگذاری فایل'}
        </div>
        {uploadStatus?.status === 'uploading' && (
          <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
            <div
              className='bg-[#7747C0] h-2 rounded-full transition-all duration-500'
              style={{
                width: `${uploadStatus?.progress}%`,
              }}></div>
          </div>
        )}
      </label>
    )
  }

  return (
    <div className='flex items-center gap-2 '>
      <TickCircle size={24} color='#0F973D' />
      بارگذاری انجام شد
      <Trash
        size={24}
        onClick={() => onDelete(visitorTel)}
        color='#B2BBC7'
        className='cursor-pointer'
      />
    </div>
  )
}

export default FileUploader
