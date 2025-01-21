/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBankAccount = /* GraphQL */ `
  query GetBankAccount($id: ID!) {
    getBankAccount(id: $id) {
      PK
      SK
      accountHolderName
      accountType
      balance
      content
      createdAt
      customerID
      id
      isDone
      metadata
      transactionAmount
      transactionDate
      transactionType
      updatedAt
      __typename
    }
  }
`;
export const listBankAccounts = /* GraphQL */ `
  query ListBankAccounts(
    $filter: ModelBankAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBankAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        PK
        SK
        accountHolderName
        accountType
        balance
        content
        createdAt
        customerID
        id
        isDone
        metadata
        transactionAmount
        transactionDate
        transactionType
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
