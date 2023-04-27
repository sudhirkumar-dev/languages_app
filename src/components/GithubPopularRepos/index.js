import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiUrl = 'https://apis.ccbp.in/popular-repos?languages='

class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    repositoriesData: [],
    selectedLanguageFilter: '',
  }

  componentDidMount() {
    this.getRepositories(languageFiltersData[0].id)
  }

  setRepositories = (fetchedData, loadingStatus) => {
    this.setState({
      repositoriesData: fetchedData,
      isLoading: loadingStatus,
    })
  }

  setIsLoading = loadingStatus => {
    this.setState({
      isLoading: loadingStatus,
    })
  }

  getRepositories = async selectedLanguageFilter => {
    this.setIsLoading(true)
    const response = await fetch(`${apiUrl}${selectedLanguageFilter}`)
    const fetchedData = await response.json()
    const updatedData = fetchedData.popular_repos.map(eachRepo => ({
      id: eachRepo.id,
      imageUrl: eachRepo.avatar_url,
      name: eachRepo.name,
      starsCount: eachRepo.stars_count,
      forksCount: eachRepo.forks_count,
      issuesCount: eachRepo.issues_count,
    }))
    this.setRepositories(updatedData, false)
  }

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-cards-list-container">
        {repositoriesData.map(repoData => (
          <RepositoryItem key={repoData.id} repositoryData={repoData} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  setSelectedLanguageFilterAndGetRepositories = newFilterId => {
    this.setState({selectedLanguageFilter: newFilterId})
    this.getRepositories(newFilterId)
  }

  renderLanguagesFilterList = () => {
    const {selectedLanguageFilter} = this.state

    return (
      <ul className="filters-list-container">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            isSelected={eachLanguageFilter.id === selectedLanguageFilter}
            key={eachLanguageFilter.id}
            languageFilter={eachLanguageFilter}
            setSelectedLanguageFilterAndGetRepositories={
              this.setSelectedLanguageFilterAndGetRepositories
            }
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="github-popular-repositories-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguagesFilterList()}
          {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
