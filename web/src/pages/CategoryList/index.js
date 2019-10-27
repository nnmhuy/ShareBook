import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../components/LayoutWrapper';
import Loading from '../../components/Loading';
import { bindActionCreators } from 'redux';
import { getCategoryList } from '../../redux/actions/bookAction';
import CategoryItem from '../../components/CategoryItem'

const styles = theme => ({
  container: {
    width: '100%',
    minWidth: 350,
    margin: 'auto',
    padding: '0 15px',
    boxSizing: 'border-box'
  },
  flexContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  }
})

const CategoryList = props => {
  const { classes, account, categoryIsLoading, categoryList } = props;
  const isLoading = categoryIsLoading;
  let currentCategoryList = []
  if (!categoryIsLoading && categoryList)
    currentCategoryList = categoryList
  useEffect(() => {
    const {getCategoryListHandler} = props
    getCategoryListHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <LayoutWrapper account={account} title='Danh mục'>
      <Loading isLoading={isLoading}/>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
        {
          currentCategoryList.map(category => {
            return (
              <CategoryItem
                {...category}
                key={category.url}
                autoWidth={true} />
            )
          })
          }
        </div>
      </div>
    </LayoutWrapper>
  );
}


const mapStateToProps = ({ state, account, book }) => {
  return {
    account: {
      isAuth: account.isAuth,
      userId: account.userId,
      username: account.username,
      name: account.name,
      avatar: account.avatar,
      coin: account.coin,
    },
    categoryIsLoading: book.categoryIsLoading,
    categoryList: book.categoryList,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCategoryListHandler: getCategoryList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryList));