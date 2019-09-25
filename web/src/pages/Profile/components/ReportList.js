import React, { Component } from 'react';

import { ReactComponent as TechnicIcon } from '../../../static/images/technics.svg';
import ActivityNull from './ActivityNull';
import ReportItem from './ReportItem';

class ReportList extends Component {
  render() {
    const { report, content } = this.props;
    return (
      <div>
        {
          report === null &&
          <ActivityNull Icon={TechnicIcon} content={content} />
        }
        {
          report !== null &&
          report.map(item => {
            return (
              <ReportItem report={item} />
            )
          })
        }
      </div>
    );
  }
}

export default ReportList;
