import React, { Component } from 'react'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.renderPageCount = this.renderPageCount.bind(this)
  }
  renderPageCount() {
    const { count } = this.props
    let perPage = 0
    let pageElements = [] 
    if((count % 10) == 0) {
      perPage = parseInt(count/10)
    } else {
      perPage = parseInt((count/10) + 1)
    }
    for(let i = 0; i < perPage; i++) {
      pageElements.push(<li key={i}>
                          <a style={{cursor: 'pointer'}}
                             onClick={(e) => {
                              this.props.getData(i+1)
                             }}>{i+1}</a>
                        </li>)
    }
    return pageElements
  }
  render() {
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {this.renderPageCount()}
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination