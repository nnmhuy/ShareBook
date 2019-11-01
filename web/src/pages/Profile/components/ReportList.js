import React, { Component } from 'react';

import { ReactComponent as TechnicIcon } from '../../../static/images/technics.svg';
import ActivityNull from '../../../components/ActivityNull';
import ReportItem from './ReportItem';

class ReportList extends Component {
  render() {
    const { report, textNull } = this.props;
    return (
      <div>
        {
          report.length === 0 ?
            <ActivityNull Icon={TechnicIcon} content={textNull} isReport={true}/>
            :
            report.map(item => {
              return (
                <>
                  <ReportItem report={item} />
                  <br />
                </>
              )
            })
        }
      </div>
    );
  }
}

export default ReportList;
