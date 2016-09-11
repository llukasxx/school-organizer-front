import React from 'react'
import ReactPaginate from 'react-paginate'

import EventListItem from './EventListItem'

export class EventsList extends React.Component {
  constructor(props) {
    super(props)
    this.renderEventListItems = this.renderEventListItems.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.renderPagination = this.renderPagination.bind(this)
  }
  renderEventListItems() {
    const { events } = this.props
    let eventsList = []
    const sortFunction = function(a,b) {
      if(Date.parse(a.date) < Date.parse(b.date))
        return -1
      if(Date.parse(a.date) > Date.parse(b.date))
        return 1
      return 0
    }
    events.sort(sortFunction).map((event) => {
      eventsList.push(<EventListItem 
                        event={event}
                        key={event.id}/>)
    })
    return eventsList
  }
  handlePageClick(data) {
    this.props.getEvents(data.selected + 1)
  }
  renderPagination() {
    return (
        <li className="list-group-item">
          <ReactPaginate previousLabel={"<"}
                         pageNum={this.props.count/5}
                         nextLabel={">"}
                         breakLabel={<a>...</a>}
                         breakClassName={"break-me"}
                         clickCallback={this.handlePageClick}
                         marginPagesDisplayed={1}
                         pageRangeDisplayed={2}
                         containerClassName={"pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        </li>
      )
  }
  render () {
    return (
      <ul className="list-group">
        {this.renderEventListItems()}
        {this.renderPagination()}
      </ul>
    )
  }
}

export default EventsList