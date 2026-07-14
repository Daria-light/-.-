import React from 'react'
import styles from './PdfPage.module.css'
import AppSelect from '../../shared/ui/AppSelect/AppSelect'
import { useState, useEffect } from 'react'
import {
   objectsAPI,
   filesAPI,
   hardWorksAPI,
   regularWorksAPI,
   contractsAPI,
   legalEntitiesAPI,
   districtsAPI,
} from '../../shared/api'

function PdfPage() {
   const [loading, setLoading] = useState(true)
   const [allData, setAllData] = useState([])
   const [filteredData, setFilteredData] = useState([])

   // Состояния для фильтров
   const [searchTerm, setSearchTerm] = useState('')
   const [geometryFilter, setGeometryFilter] = useState('')
   const [actFilter, setActFilter] = useState('')
   const [uploadFilter, setUploadFilter] = useState('')
   const [aisUpdateFilter, setAisUpdateFilter] = useState('')
   const [cardFilter, setCardFilter] = useState('')
   const [programFilter, setProgramFilter] = useState('')
   const [executorFilter, setExecutorFilter] = useState('')
   const [contractorFilter, setContractorFilter] = useState('')
   const [districtFilter, setDistrictFilter] = useState('')

   // Варианты для фильтров
   const [geometryOptions, setGeometryOptions] = useState([
      { value: '', label: 'Статус геометрии: все' },
   ])
   const [actOptions, setActOptions] = useState([
      { value: '', label: 'Статус акта: все' },
   ])
   const [uploadOptions, setUploadOptions] = useState([
      { value: '', label: 'Статус загрузки: все' },
      { value: 'loaded', label: 'Загружено' },
      { value: 'not_loaded', label: 'Не загружено' },
   ])
   const [aisUpdateOptions, setAisUpdateOptions] = useState([
      { value: '', label: 'Обновление АИС: все' },
      { value: 'updated', label: 'Данные обновлены' },
      { value: 'required', label: 'Требуется обновление' },
   ])
   const [cardOptions, setCardOptions] = useState([
      { value: '', label: 'Статус карточки: все' },
      { value: 'actual', label: 'Актуальна' },
      { value: 'needs_update', label: 'Требуется обновление' },
   ])
   const [programOptions, setProgramOptions] = useState([
      { value: '', label: 'Программа: все' },
   ])
   const [executorOptions, setExecutorOptions] = useState([
      { value: '', label: 'Исполнитель: все' },
   ])
   const [contractorOptions, setContractorOptions] = useState([
      { value: '', label: 'Подрядчик: все' },
   ])
   const [districtOptions, setDistrictOptions] = useState([
      { value: '', label: 'Округ: все' },
   ])

   // Загрузка данных
   const loadData = async () => {
      setLoading(true)
      try {
         // Загружаем все необходимые данные параллельно
         const [
            objectsRes,
            hardWorksRes,
            regularWorksRes,
            filesRes,
            contractsRes,
            legalEntitiesRes,
            districtsRes,
            lastRepairRes,
         ] = await Promise.all([
            objectsAPI.find(
               {},
               [
                  'id',
                  'name',
                  'id_odx',
                  'total_area',
                  'street_id',
                  'district_id',
               ],
               1000,
            ),
            hardWorksAPI.find(
               {},
               [
                  'id',
                  'object_id',
                  'status',
                  'working_area',
                  'working_cost',
                  'type',
                  'start_date',
                  'deadline_date',
               ],
               1000,
            ),
            regularWorksAPI.find(
               {},
               [
                  'id',
                  'object_id',
                  'status',
                  'working_area',
                  'working_cost',
                  'type',
                  'start',
                  'deadline',
                  'program',
               ],
               1000,
            ),
            filesAPI.find(
               {},
               ['id', 'file_name', 'type', 'load_date', 'mime', 'url'],
               1000,
            ),
            contractsAPI.find(
               {},
               [
                  'id',
                  'contract_num',
                  'contractor_id',
                  'employer_id',
                  'subject_matter',
               ],
               1000,
            ),
            legalEntitiesAPI.find({}, ['id', 'name', 'tax_code'], 1000),
            districtsAPI.find({}, ['id', 'name'], 1000),
            objectsAPI.findLastRepair({}, ['id', 'last_repair_year'], 1000), // 👈 ИСПРАВЛЕНО
         ])

         // Создаем справочники для быстрого поиска
         const legalMap = {}
         legalEntitiesRes.data.items?.forEach((item) => {
            legalMap[item.id] = item.name
         })

         const contractMap = {}
         contractsRes.data.items?.forEach((item) => {
            contractMap[item.id] = {
               ...item,
               contractor_name: legalMap[item.contractor_id] || 'Неизвестно',
            }
         })

         const districtsMap = {}
         districtsRes.data.items?.forEach((item) => {
            districtsMap[item.id] = item.name
         })

         const lastRepairMap = {}
         lastRepairRes.data.items?.forEach((item) => {
            lastRepairMap[item.id] = item.last_repair_year
         })

         // Собираем все объекты с их данными
         const objectsData = objectsRes.data.items || []
         const hardWorks = hardWorksRes.data.items || []
         const regularWorks = regularWorksRes.data.items || []
         const allFiles = filesRes.data.items || []

         // Группируем работы по объектам
         const worksMap = {}
         hardWorks.forEach((w) => {
            const key = w.object_id
            if (!worksMap[key]) worksMap[key] = []
            worksMap[key].push({ ...w, type: 'КБУ' })
         })
         regularWorks.forEach((w) => {
            const key = w.object_id
            if (!worksMap[key]) worksMap[key] = []
            worksMap[key].push({ ...w, type: 'ТекРем' })
         })

         // Группируем файлы по объектам
         const filesMap = {}
         allFiles.forEach((f) => {
            objectsData.forEach((obj) => {
               if (
                  f.file_name?.includes(obj.name) ||
                  obj.name?.includes(f.file_name)
               ) {
                  const key = obj.id
                  if (!filesMap[key]) filesMap[key] = []
                  filesMap[key].push(f)
               }
            })
         })

         // Собираем итоговые данные
         const mergedData = objectsData.map((obj) => {
            const works = worksMap[obj.id] || []
            const files = filesMap[obj.id] || []
            const lastRepair = lastRepairMap[obj.id]

            // Определяем статусы
            const hasAct = files.some((f) => f.type === 'act')
            const hasUpload = files.length > 0

            // Определяем программу (берем из первой работы)
            const program = works.length > 0 ? works[0].type : 'Нет данных'

            // Определяем статус карточки
            let cardStatus = 'Нет данных'
            if (lastRepair) {
               const currentYear = new Date().getFullYear()
               cardStatus =
                  currentYear - lastRepair <= 1
                     ? 'Актуальна'
                     : 'Требуется обновление'
            }

            // Определяем статус акта
            const actStatus = hasAct ? 'Загружен' : 'Не загружен'

            // Статус геометрии (заглушка - в реальности будет из БД)
            const geometryStatus = 'Проверена'

            // Обновление АИС
            const aisUpdate = hasUpload
               ? 'Данные обновлены'
               : 'Требуется обновление'

            return {
               id: obj.id,
               name: obj.name || 'Без названия',
               id_odx: obj.id_odx || '—',
               district: districtsMap[obj.district_id] || 'Не указан',
               district_id: obj.district_id,
               total_area: obj.total_area || 0,
               geometryStatus,
               actStatus,
               hasUpload,
               uploadStatus: hasUpload ? 'Загружено' : 'Не загружено',
               cardStatus,
               program,
               works,
               files,
               lastRepair,
               contractor:
                  works.length > 0
                     ? legalMap[works[0]?.contract_id]
                     : 'Нет подрядчика',
               executor:
                  works.length > 0
                     ? works[0]?.executor || 'Не указан'
                     : 'Не указан',
               aisUpdate,
               contract_id: works.length > 0 ? works[0]?.contract_id : null,
            }
         })

         setAllData(mergedData)
         setFilteredData(mergedData)

         // Заполняем варианты для фильтров
         const geometryValues = [
            ...new Set(mergedData.map((d) => d.geometryStatus)),
         ].filter(Boolean)
         const actValues = [
            ...new Set(mergedData.map((d) => d.actStatus)),
         ].filter(Boolean)
         const programValues = [
            ...new Set(mergedData.map((d) => d.program)),
         ].filter(Boolean)
         const executorValues = [
            ...new Set(mergedData.map((d) => d.executor)),
         ].filter(Boolean)
         const contractorValues = [
            ...new Set(mergedData.map((d) => d.contractor)),
         ].filter(Boolean)
         const districtValues = [
            ...new Set(mergedData.map((d) => d.district)),
         ].filter(Boolean)

         setGeometryOptions([
            { value: '', label: 'Статус геометрии: все' },
            ...geometryValues.map((v) => ({ value: v, label: v })),
         ])
         setActOptions([
            { value: '', label: 'Статус акта: все' },
            ...actValues.map((v) => ({ value: v, label: v })),
         ])
         setProgramOptions([
            { value: '', label: 'Программа: все' },
            ...programValues.map((v) => ({ value: v, label: v })),
         ])
         setExecutorOptions([
            { value: '', label: 'Исполнитель: все' },
            ...executorValues.map((v) => ({ value: v, label: v })),
         ])
         setContractorOptions([
            { value: '', label: 'Подрядчик: все' },
            ...contractorValues.map((v) => ({ value: v, label: v })),
         ])
         setDistrictOptions([
            { value: '', label: 'Округ: все' },
            ...districtValues.map((v) => ({ value: v, label: v })),
         ])
      } catch (error) {
         console.error('❌ Ошибка загрузки мониторинга:', error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      loadData()
   }, [])

   // Применение фильтров
   useEffect(() => {
      let filtered = allData

      // Поиск
      if (searchTerm.trim()) {
         filtered = filtered.filter(
            (item) =>
               item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.id_odx.toLowerCase().includes(searchTerm.toLowerCase()),
         )
      }

      // Фильтры
      if (geometryFilter) {
         filtered = filtered.filter(
            (item) => item.geometryStatus === geometryFilter,
         )
      }
      if (actFilter) {
         filtered = filtered.filter((item) => item.actStatus === actFilter)
      }
      if (uploadFilter === 'loaded') {
         filtered = filtered.filter((item) => item.hasUpload)
      } else if (uploadFilter === 'not_loaded') {
         filtered = filtered.filter((item) => !item.hasUpload)
      }
      if (aisUpdateFilter === 'updated') {
         filtered = filtered.filter(
            (item) => item.aisUpdate === 'Данные обновлены',
         )
      } else if (aisUpdateFilter === 'required') {
         filtered = filtered.filter(
            (item) => item.aisUpdate === 'Требуется обновление',
         )
      }
      if (cardFilter === 'actual') {
         filtered = filtered.filter((item) => item.cardStatus === 'Актуальна')
      } else if (cardFilter === 'needs_update') {
         filtered = filtered.filter(
            (item) => item.cardStatus === 'Требуется обновление',
         )
      }
      if (programFilter) {
         filtered = filtered.filter((item) => item.program === programFilter)
      }
      if (executorFilter) {
         filtered = filtered.filter((item) => item.executor === executorFilter)
      }
      if (contractorFilter) {
         filtered = filtered.filter(
            (item) => item.contractor === contractorFilter,
         )
      }
      if (districtFilter) {
         filtered = filtered.filter((item) => item.district === districtFilter)
      }

      setFilteredData(filtered)
   }, [
      searchTerm,
      geometryFilter,
      actFilter,
      uploadFilter,
      aisUpdateFilter,
      cardFilter,
      programFilter,
      executorFilter,
      contractorFilter,
      districtFilter,
      allData,
   ])

   // Сброс фильтров
   const resetFilters = () => {
      setSearchTerm('')
      setGeometryFilter('')
      setActFilter('')
      setUploadFilter('')
      setAisUpdateFilter('')
      setCardFilter('')
      setProgramFilter('')
      setExecutorFilter('')
      setContractorFilter('')
      setDistrictFilter('')
   }

   return (
      <>
         <section id="monitoringTab" className="panel">
            <div className={styles['filters']}>
               <AppSelect
                  options={geometryOptions}
                  value={geometryOptions.find(
                     (o) => o.value === geometryFilter,
                  )}
                  onChange={(option) => setGeometryFilter(option?.value || '')}
                  placeholder="Статус геометрии"
               />
               <AppSelect
                  options={actOptions}
                  value={actOptions.find((o) => o.value === actFilter)}
                  onChange={(option) => setActFilter(option?.value || '')}
                  placeholder="Статус акта"
               />
               <AppSelect
                  options={uploadOptions}
                  value={uploadOptions.find((o) => o.value === uploadFilter)}
                  onChange={(option) => setUploadFilter(option?.value || '')}
                  placeholder="Статус загрузки"
               />
               <AppSelect
                  options={aisUpdateOptions}
                  value={aisUpdateOptions.find(
                     (o) => o.value === aisUpdateFilter,
                  )}
                  onChange={(option) => setAisUpdateFilter(option?.value || '')}
                  placeholder="Обновление АИС"
               />
               <AppSelect
                  options={cardOptions}
                  value={cardOptions.find((o) => o.value === cardFilter)}
                  onChange={(option) => setCardFilter(option?.value || '')}
                  placeholder="Статус карточки"
               />
               <AppSelect
                  options={programOptions}
                  value={programOptions.find((o) => o.value === programFilter)}
                  onChange={(option) => setProgramFilter(option?.value || '')}
                  placeholder="Программа"
               />
               <AppSelect
                  options={executorOptions}
                  value={executorOptions.find(
                     (o) => o.value === executorFilter,
                  )}
                  onChange={(option) => setExecutorFilter(option?.value || '')}
                  placeholder="Исполнитель"
               />
               <AppSelect
                  options={contractorOptions}
                  value={contractorOptions.find(
                     (o) => o.value === contractorFilter,
                  )}
                  onChange={(option) =>
                     setContractorFilter(option?.value || '')
                  }
                  placeholder="Подрядчик"
               />
            </div>
            <div className={styles['search-row']}>
               <input
                  id="objectSearch"
                  placeholder="Поиск объекта по наименованию"
                  className={styles['search-input']}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <AppSelect
                  options={districtOptions}
                  value={districtOptions.find(
                     (o) => o.value === districtFilter,
                  )}
                  onChange={(option) => setDistrictFilter(option?.value || '')}
                  placeholder="Округ"
               />
               <button className="main-btn" onClick={resetFilters}>
                  ⎚ Сбросить фильтры
               </button>
            </div>
            <div className={styles['charts']}>
               <div className={styles['chart-card']}>
                  <div className={styles['chart-placeholder']}>
                     <strong>{filteredData.length}</strong>
                     <span>Объектов</span>
                  </div>
               </div>
               <div className={styles['chart-card']}>
                  <div className={styles['chart-placeholder']}>
                     <strong>
                        {
                           filteredData.filter(
                              (d) => d.actStatus === 'Загружен',
                           ).length
                        }
                     </strong>
                     <span>С актами</span>
                  </div>
               </div>
               <div className={styles['chart-card']}>
                  <div className={styles['chart-placeholder']}>
                     <strong>
                        {filteredData.filter((d) => d.hasUpload).length}
                     </strong>
                     <span>Загружено</span>
                  </div>
               </div>
               <div className={styles['chart-card']}>
                  <div className={styles['chart-placeholder']}>
                     <strong>
                        {
                           filteredData.filter(
                              (d) => d.cardStatus === 'Актуальна',
                           ).length
                        }
                     </strong>
                     <span>Карточек актуально</span>
                  </div>
               </div>
               <div className={styles['chart-card']}>
                  <div className={styles['chart-placeholder']}>
                     <strong>
                        {new Set(filteredData.map((d) => d.executor)).size}
                     </strong>
                     <span>Исполнителей</span>
                  </div>
               </div>
            </div>
            <div id="cards" className={styles['cards']}>
               {loading ? (
                  <div className={styles['cards-placeholder']}>
                     Загрузка данных...
                  </div>
               ) : filteredData.length === 0 ? (
                  <div className={styles['cards-placeholder']}>
                     Нет данных для отображения
                  </div>
               ) : (
                  <div className={styles['cards-grid']}>
                     {filteredData.slice(0, 20).map((item) => (
                        <div key={item.id} className={styles['card-item']}>
                           <h4>{item.name}</h4>
                           <div className={styles['card-meta']}>
                              <span className={styles['card-odx']}>
                                 ODX: {item.id_odx}
                              </span>
                              <span className={styles['card-district']}>
                                 {item.district}
                              </span>
                           </div>
                           <div className={styles['card-statuses']}>
                              <span
                                 className={`${styles['status-badge']} ${
                                    item.geometryStatus === 'Проверена'
                                       ? styles['status-good']
                                       : styles['status-warn']
                                 }`}
                              >
                                 Геометрия: {item.geometryStatus}
                              </span>
                              <span
                                 className={`${styles['status-badge']} ${
                                    item.actStatus === 'Загружен'
                                       ? styles['status-good']
                                       : styles['status-warn']
                                 }`}
                              >
                                 Акт: {item.actStatus}
                              </span>
                              <span
                                 className={`${styles['status-badge']} ${
                                    item.hasUpload
                                       ? styles['status-good']
                                       : styles['status-warn']
                                 }`}
                              >
                                 Загрузка: {item.uploadStatus}
                              </span>
                              <span
                                 className={`${styles['status-badge']} ${
                                    item.cardStatus === 'Актуальна'
                                       ? styles['status-good']
                                       : styles['status-warn']
                                 }`}
                              >
                                 Карточка: {item.cardStatus}
                              </span>
                           </div>
                           <div className={styles['card-details']}>
                              <span>Программа: {item.program}</span>
                              <span>Подрядчик: {item.contractor}</span>
                              <span>Исполнитель: {item.executor}</span>
                              <span
                                 className={
                                    item.aisUpdate === 'Данные обновлены'
                                       ? styles['text-good']
                                       : styles['text-warn']
                                 }
                              >
                                 АИС: {item.aisUpdate}
                              </span>
                           </div>
                           {item.total_area > 0 && (
                              <div className={styles['card-area']}>
                                 Площадь: {item.total_area} м²
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <div id="pager" className={styles['pager']}>
               {filteredData.length > 20 && (
                  <div className={styles['pager-info']}>
                     Показано 20 из {filteredData.length}
                  </div>
               )}
            </div>
         </section>
      </>
   )
}

export default PdfPage
