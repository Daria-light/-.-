import React from 'react'
import styles from './WorkStatusPage.module.css'

function WorkStatusPage() {
  return (
    <div className={styles['work-status-panel']}>
      <div className={styles['work-hero']}>
        <h2>Статусы работ</h2>

        <p>
          Карточки объектов по листам «Статусы_КБУ» и «Статусы_ТекРем» с
          отображением сроков СМР, исполнителей, ресурсов и контрактной
          информации.
        </p>

        <div className={styles['work-plan-row']}>
          <div className={styles['work-plan-card']}>
            <span>Начало работ</span>
            <b>01.04.2026</b>
          </div>

          <div className={styles['work-plan-card']}>
            <span>Окончание работ</span>
            <b>30.10.2026</b>
          </div>

          <div className={styles['work-plan-card']}>
            <span>Всего объектов</span>
            <b>327</b>
          </div>

          <div className={styles['work-plan-card']}>
            <span>После фильтрации</span>
            <b>102</b>
          </div>

          <div
            className={`${styles['work-plan-card']} ${styles['counter-warn']}`}
          >
            <span>Требуют актуализации</span>
            <b>18</b>
          </div>

          <div className={`${styles['work-plan-card']} ${styles['danger']}`}>
            <span>В работе / Завершен</span>
            <b>7</b>
          </div>
        </div>
      </div>

      <div className={`${['card']} ${styles['work-filter-panel']}`}>
        <div className={styles['work-filters']}>
          <input placeholder="Поиск..." />

          <select>
            <option>Исполнитель</option>
          </select>

          <select>
            <option>Статус</option>
          </select>

          <label className={styles['work-update-filter']}>
            <input type="checkbox" />
            <span>Требуют актуализации</span>
          </label>

          <label className={styles['work-update-filter']}>
            <input type="checkbox" />
            <span>В работе / Завершен</span>
          </label>

          <button className={['main-btn']}>Сбросить</button>
        </div>
      </div>

      <div className={styles['work-cards']}>
        {[1, 2, 3, 4].map((item) => (
          <div className={styles['work-card']} key={item}>
            <h3>Объект №{item}</h3>
            <p>ул. Примерная</p>

            <div className={styles['work-card-status']}>В работе</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkStatusPage
