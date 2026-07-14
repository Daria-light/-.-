import styles from './ProgressCard.module.css'

function ProgressCard({ title, value, subtitle }) {
  const radius = 55
  const circumference = 2 * Math.PI * radius

  const offset = circumference - (value / 100) * circumference

  let color = '#ef4444'

  if (value >= 80) color = '#22c55e'
  else if (value >= 40) color = '#f59e0b'

  return (
    <div className={styles.card}>
      <h3>{title}</h3>

      <div className={styles.circleWrapper}>
        <svg width="140" height="140">
          <circle className={styles.background} cx="70" cy="70" r={radius} />

          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke={color}
            className={styles.progress}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className={styles.value}>{value}%</div>
      </div>

      <p>{subtitle}</p>
    </div>
  )
}

export default ProgressCard
