import React from 'react'
import styles from './WorkStatusPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect } from 'react'
import { hardWorksAPI, regularWorksAPI } from '../../shared/api'

const makerOptions = [{ value: '', label: 'Исполнитель' }]

const statusOptions = [{ value: '', label: 'Статус' }]

function WorkStatusPage() {
   const [works, setWorks] = useState([])
   const [loading, setLoading] = useState(false)
   const [stats, setStats] = useState({
      total: 0,
      filtered: 0,
      needActualization: 0,
      inProgress: 0,
   })

   const loadWorks = async () => {
      setLoading(true)
      try {
         const [hardRes, regularRes] = await Promise.all([
            hardWorksAPI.find({}, [
               'id',
               'object_id',
               'status',
               'working_area',
            ]),
            regularWorksAPI.find({}, [
               'id',
               'object_id',
               'status',
               'working_area',
            ]),
         ])

         const hardItems = (hardRes.data.items || []).map((w) => ({
            ...w,
            type: 'КБУ',
         }))
         const regularItems = (regularRes.data.items || []).map((w) => ({
            ...w,
            type: 'ТекРем',
         }))

         const allWorks = [...hardItems, ...regularItems]
         setWorks(allWorks)

         const total = allWorks.length
         const needActualization = allWorks.filter(
            (w) => w.status === 'В работе' || w.status === 'Завершен',
         ).length
         const inProgress = allWorks.filter(
            (w) => w.status === 'В работе',
         ).length
         setStats({ total, filtered: total, needActualization, inProgress })
      } catch (error) {
         console.error('Failed to load works:', error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadWorks()
   }, [])

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
                  <b>{stats.total}</b>
               </div>

               <div className={styles['work-plan-card']}>
                  <span>После фильтрации</span>
                  <b>{stats.filtered}</b>
               </div>

               <div
                  className={`${styles['work-plan-card']} ${styles['counter-warn']}`}
               >
                  <span>Требуют актуализации</span>
                  <b>{stats.needActualization}</b>
               </div>

               <div
                  className={`${styles['work-plan-card']} ${styles['danger']}`}
               >
                  <span>В работе / Завершен</span>
                  <b>{stats.needActualization}</b>
               </div>
            </div>
         </div>

         <div className={`${['card']} ${styles['work-filter-panel']}`}>
            <div className={styles['work-filters']}>
               <input placeholder="Поиск..." />

               <AppSelect
                  placeholder="Исполнитель"
                  options={makerOptions}
               ></AppSelect>

               <AppSelect
                  placeholder="Статус"
                  options={statusOptions}
               ></AppSelect>

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
            {loading ? (
               <div className={styles['work-card']}>Загрузка...</div>
            ) : works.length === 0 ? (
               <div className={styles['work-card']}>Нет данных</div>
            ) : (
               works.map((item) => (
                  <div className={styles['work-card']} key={item.id}>
                     <h3>Объект №{item.object_id}</h3>
                     <p>Тип: {item.type}</p>
                     <p>Площадь: {item.working_area || 0} м²</p>
                     <div className={styles['work-card-status']}>
                        {item.status || 'Не указан'}
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   )
}

export default WorkStatusPage
