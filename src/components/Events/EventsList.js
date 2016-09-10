import React from 'react'
import ReactPaginate from 'react-paginate'

import EventListItem from './EventListItem'

export class EventsList extends React.Component {
  constructor(props) {
    super(props)
    this.renderEventListItems = this.renderEventListItems.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }
  renderEventListItems() {
    let eventsList = []
    const sortFunction = function(a,b) {
      if(Date.parse(a.date) < Date.parse(b.date))
        return -1
      if(Date.parse(a.date) > Date.parse(b.date))
        return 1
      return 0
    }

    this.props.events.sort(sortFunction).map((event) => {
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