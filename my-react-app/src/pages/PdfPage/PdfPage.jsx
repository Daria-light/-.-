import React from 'react'
import styles from './PdfPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'

function PdfPage() {
  return (
    <>
      <section id="monitoringTab" className={['panel']}>
        <div className={styles['filters']}>
          <AppSelect placeholder="Выбрать..." id="geometryFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="actFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="uploadFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="aisUpdateFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="cardFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="programFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="executorFilter"></AppSelect>
          <AppSelect placeholder="Выбрать..." id="contractorFilter"></AppSelect>
        </div>
        <div className={styles['search-row']}>
          <input
            id="objectSearch"
            placeholder="Поиск объекта по наименованию"
            className={styles['search-input']}
          />
          <AppSelect placeholder="Выбрать..." id="districtFilter"></AppSelect>

          <button
            className={['main-btn']}
            onClick={() => window.resetFilters && window.resetFilters()}
          >
            ⎚ Сбросить фильтры
          </button>
        </div>
        <div className={styles['charts']}>
          <div className={styles['chart-card']} id="chartGeometry"></div>
          <div className={styles['chart-card']} id="chartAct"></div>
          <div className={styles['chart-card']} id="chartUpload"></div>
          <div className={styles['chart-card']} id="chartCard"></div>
          <div className={styles['chart-card']} id="chartExecutor"></div>
        </div>
        <div id="cards" className={styles['cards']}></div>
        <div id="pager" className={styles['pager']}></div>
      </section>
    </>
  )
}

export default PdfPage
