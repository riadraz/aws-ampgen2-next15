/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBankAccount = /* GraphQL */ `
  mutation CreateBankAccount(
    $condition: ModelBankAccountConditionInput
    $input: CreateBankAccountInput!
  ) {
    createBankAccount(condition: $condition, input: $input) {
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
export const deleteBankAccount = /* GraphQL */ `
  mutation DeleteBankAccount(
    $condition: ModelBankAccountConditionInput
    $input: DeleteBankAccountInput!
  ) {
    deleteBankAccount(condition: $condition, input: $input) {
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
export const updateBankAccount = /* GraphQL */ `
  mutation UpdateBankAccount(
    $condition: ModelBankAccountConditionInput
    $input: UpdateBankAccountInput!
  ) {
    updateBankAccount(condition: $condition, input: $input) {
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
