import ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.publish)
    .map(() => ACTIONS.createOrUpdate({ publish: true }))
/*
    .switchMap(({ payload: isPublished }) => {
      const state = store.getState()
      const accountId = currentAccountIdSelector(state)
      const storyId = storySelector(state).id

      return graphql(QUERIES.storyPublish, {
        accountId,
        storyId,
        isPublished,
      })
    })
    .mergeMap(
      data =>
        data.story.isPublished
          ? [
              ACTIONS.publish.success(data),
              replaceLocation(createRouteUrl(ROUTES.manage.stories.root)),
            ]
          : [ACTIONS.publish.success(data)]
    )
*/
