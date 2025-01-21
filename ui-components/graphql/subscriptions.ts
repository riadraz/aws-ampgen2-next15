/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBankAccount = /* GraphQL */ `
  subscription OnCreateBankAccount(
    $filter: ModelSubscriptionBankAccountFilterInput
  ) {
    onCreateBankAccount(filter: $filter) {
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
export const onDeleteBankAccount = /* GraphQL */ `
  subscription OnDeleteBankAccount(
    $filter: ModelSubscriptionBankAccountFilterInput
  ) {
    onDeleteBankAccount(filter: $filter) {
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
export const onUpdateBankAccount = /* GraphQL */ `
  subscription OnUpdateBankAccount(
    $filter: ModelSubscriptionBankAccountFilterInput
  ) {
    onUpdateBankAccount(filter: $filter) {
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
