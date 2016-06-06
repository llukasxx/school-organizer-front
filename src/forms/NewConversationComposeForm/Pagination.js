import React, { Component } from 'react'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.renderPageCount = this.renderPageCount.bind(this)
    this.calcPagesCount = this.calcPagesCount.bind(this)
  }
  renderPageCount() {
    let perPage = this.calcPagesCount()
    let pageElements = [] 
    for(let i = 0; i < perPage; i++) {
      pageElements.push(<li 
                          key={i}
                          className={this.props.currentPage == i+1 ? "active" : ""}>
                          <a style={{cursor: 'pointer'}}
                             onClick={(e) => {
                              this.props.getData(i+1)
                             }}>{i+1}</a>
                        </li>)
    }
    return pageElements
  }
  calcPagesCount() {
    const { count } = this.props
    let perPage = 1
    if((count % 10) == 0) {
      perPage = parseInt(count/10)
    } else {
      perPage = parseInt((count/10) + 1)
    }
    return perPage
  }
  render() {
    const { currentPage, getData } = this.props
    let pageCount = this.calcPagesCount()
    return (
      <nav>
        <ul className="pagination">
          <li className={currentPage == 1 ? "disabled" : ""}>
            <a aria-label="Previous" 
               onClick={(e) => {
                if(currentPage != 1) {
                  getData(this.props.currentPage - 1)
                } else {
                  return false
                }
               }}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {this.renderPageCount()}
          <li className={this.props.currentPage == pageCount ? "disabled" : ""}>
            <a aria-label="Next" 
               onClick={(e) => {
                if(currentPage != pageCount) {
                  getData(this.props.currentPage + 1)
                } else {
                  return false
                }
               }}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination