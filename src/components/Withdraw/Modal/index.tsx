import { CloseSquare, TickSquare } from 'iconsax-react'
import styles from './index.module.css'

interface IProps {
  setShowModal: (value: boolean) => void
  mobile: string
}

const SendLinkModal = ({ setShowModal, mobile }: IProps) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => setShowModal(false)}>
          <CloseSquare size='36' color='#2f27ce' />
        </button>
        <div className={styles.successContainer}>
          <span className={styles.successIcon}>
            <TickSquare size='40' color='#fff' />
          </span>
          <p className={styles.successMessage}>
            ارسال لینک با موفقیت به شماره
            {` ${mobile} `}
            انجام شد
          </p>
        </div>
      </div>
    </div>
  )
}

export default SendLinkModal
