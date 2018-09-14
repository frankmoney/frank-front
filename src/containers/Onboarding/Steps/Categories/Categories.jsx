import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button } from '@frankmoney/components'
import cx from 'classnames'
import EditCategoryDialog from 'components/EditCategoryDialog'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import { categoriesSelector } from '../../selectors'
import CategoriesList from './CategoriesList'

const styles = {
  root: {},
  addCategoryButton: {
    width: 360,
  },
  list: {
    marginTop: 50,
  },
}

const Categories = ({ className, classes, categories }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerButton={
      <Button className={classes.addCategoryButton} label="Add new category" />
    }
  >
    <StepTitle>List your categories</StepTitle>
    <StepDescription>
      To visualise your spending we require every payment to be categorized.
      <br />Please list all categories of your spending. You can edit it later
      <br />in the account settings.
    </StepDescription>
    {categories &&
      categories.length && (
        <CategoriesList className={classes.list} categories={categories} />
      )}
    <EditCategoryDialog open />
  </StepLayout>
)

const mapStateToProps = createStructuredSelector({
  categories: categoriesSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(Categories)
