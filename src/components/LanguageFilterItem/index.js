import './index.css'

const LanguageFilterItem = props => {
  const {
    isSelected,
    languageFilter,
    setSelectedLanguageFilterAndGetRepositories,
  } = props
  const btnClassName = isSelected
    ? 'language-btn selected-language-btn'
    : 'language-btn'
  const onClickBtn = () => {
    setSelectedLanguageFilterAndGetRepositories(languageFilter.id)
  }

  return (
    <li>
      <button className={btnClassName} onClick={onClickBtn} type="button">
        {languageFilter.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
