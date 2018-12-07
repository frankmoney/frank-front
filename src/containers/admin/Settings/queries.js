export default {
  getAccountInfo: [
    `
    query(
      $accountId: ID!
    ) {
      account(pid: $accountId) {
        name
        incomeCategories: categories(type: revenue) {
          id: pid
          name
          color
        }
        spendingCategories: categories(type: spending) {
          id: pid
          name
          color
        }
      }
    }
    `,
    ({ account: { name, incomeCategories, spendingCategories } }) => ({
      name,
      incomeCategories,
      spendingCategories,
    }),
  ],
}
