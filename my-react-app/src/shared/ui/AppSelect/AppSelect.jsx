import Select from 'react-select'

const customStyles = {
  control: (base, state) => ({
    ...base,

    minHeight: 46,
    borderRadius: 14,
    borderColor: state.isFocused ? 'var(--violet)' : 'var(--line)',

    boxShadow: state.isFocused ? '0 0 0 4px rgba(103,82,245,.12)' : 'none',

    transition: '.18s',

    '&:hover': {
      borderColor: '#c8c1ff',
    },
  }),

  menu: (base) => ({
    ...base,

    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 14px 30px rgba(22,11,79,.12)',
  }),

  option: (base, state) => ({
    ...base,

    padding: '12px 14px',

    background: state.isSelected
      ? 'var(--violet)'
      : state.isFocused
        ? '#f4f2ff'
        : '#fff',

    color: state.isSelected ? '#fff' : 'var(--text)',

    cursor: 'pointer',
  }),
}
export default function AppSelect(props) {
  return (
    <Select
      {...props}
      styles={customStyles}
      classNamePrefix="app-select"
      menuPortalTarget={document.body}
      menuPosition="fixed"
    />
  )
}
