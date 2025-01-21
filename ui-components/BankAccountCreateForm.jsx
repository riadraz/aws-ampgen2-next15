/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createBankAccount } from "./graphql/mutations";
const client = generateClient();
export default function BankAccountCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    PK: "",
    SK: "",
    accountHolderName: "",
    accountType: "",
    balance: "",
    transactionAmount: "",
    transactionDate: "",
    transactionType: "",
    customerID: "",
    metadata: "",
    content: "",
    isDone: false,
  };
  const [PK, setPK] = React.useState(initialValues.PK);
  const [SK, setSK] = React.useState(initialValues.SK);
  const [accountHolderName, setAccountHolderName] = React.useState(
    initialValues.accountHolderName
  );
  const [accountType, setAccountType] = React.useState(
    initialValues.accountType
  );
  const [balance, setBalance] = React.useState(initialValues.balance);
  const [transactionAmount, setTransactionAmount] = React.useState(
    initialValues.transactionAmount
  );
  const [transactionDate, setTransactionDate] = React.useState(
    initialValues.transactionDate
  );
  const [transactionType, setTransactionType] = React.useState(
    initialValues.transactionType
  );
  const [customerID, setCustomerID] = React.useState(initialValues.customerID);
  const [metadata, setMetadata] = React.useState(initialValues.metadata);
  const [content, setContent] = React.useState(initialValues.content);
  const [isDone, setIsDone] = React.useState(initialValues.isDone);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPK(initialValues.PK);
    setSK(initialValues.SK);
    setAccountHolderName(initialValues.accountHolderName);
    setAccountType(initialValues.accountType);
    setBalance(initialValues.balance);
    setTransactionAmount(initialValues.transactionAmount);
    setTransactionDate(initialValues.transactionDate);
    setTransactionType(initialValues.transactionType);
    setCustomerID(initialValues.customerID);
    setMetadata(initialValues.metadata);
    setContent(initialValues.content);
    setIsDone(initialValues.isDone);
    setErrors({});
  };
  const validations = {
    PK: [],
    SK: [],
    accountHolderName: [],
    accountType: [],
    balance: [],
    transactionAmount: [],
    transactionDate: [],
    transactionType: [],
    customerID: [],
    metadata: [],
    content: [],
    isDone: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          PK,
          SK,
          accountHolderName,
          accountType,
          balance,
          transactionAmount,
          transactionDate,
          transactionType,
          customerID,
          metadata,
          content,
          isDone,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createBankAccount.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BankAccountCreateForm")}
      {...rest}
    >
      <TextField
        label="Pk"
        isRequired={false}
        isReadOnly={false}
        value={PK}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK: value,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.PK ?? value;
          }
          if (errors.PK?.hasError) {
            runValidationTasks("PK", value);
          }
          setPK(value);
        }}
        onBlur={() => runValidationTasks("PK", PK)}
        errorMessage={errors.PK?.errorMessage}
        hasError={errors.PK?.hasError}
        {...getOverrideProps(overrides, "PK")}
      ></TextField>
      <TextField
        label="Sk"
        isRequired={false}
        isReadOnly={false}
        value={SK}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK: value,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.SK ?? value;
          }
          if (errors.SK?.hasError) {
            runValidationTasks("SK", value);
          }
          setSK(value);
        }}
        onBlur={() => runValidationTasks("SK", SK)}
        errorMessage={errors.SK?.errorMessage}
        hasError={errors.SK?.hasError}
        {...getOverrideProps(overrides, "SK")}
      ></TextField>
      <TextField
        label="Account holder name"
        isRequired={false}
        isReadOnly={false}
        value={accountHolderName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName: value,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.accountHolderName ?? value;
          }
          if (errors.accountHolderName?.hasError) {
            runValidationTasks("accountHolderName", value);
          }
          setAccountHolderName(value);
        }}
        onBlur={() =>
          runValidationTasks("accountHolderName", accountHolderName)
        }
        errorMessage={errors.accountHolderName?.errorMessage}
        hasError={errors.accountHolderName?.hasError}
        {...getOverrideProps(overrides, "accountHolderName")}
      ></TextField>
      <TextField
        label="Account type"
        isRequired={false}
        isReadOnly={false}
        value={accountType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType: value,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.accountType ?? value;
          }
          if (errors.accountType?.hasError) {
            runValidationTasks("accountType", value);
          }
          setAccountType(value);
        }}
        onBlur={() => runValidationTasks("accountType", accountType)}
        errorMessage={errors.accountType?.errorMessage}
        hasError={errors.accountType?.hasError}
        {...getOverrideProps(overrides, "accountType")}
      ></TextField>
      <TextField
        label="Balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={balance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance: value,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.balance ?? value;
          }
          if (errors.balance?.hasError) {
            runValidationTasks("balance", value);
          }
          setBalance(value);
        }}
        onBlur={() => runValidationTasks("balance", balance)}
        errorMessage={errors.balance?.errorMessage}
        hasError={errors.balance?.hasError}
        {...getOverrideProps(overrides, "balance")}
      ></TextField>
      <TextField
        label="Transaction amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={transactionAmount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount: value,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.transactionAmount ?? value;
          }
          if (errors.transactionAmount?.hasError) {
            runValidationTasks("transactionAmount", value);
          }
          setTransactionAmount(value);
        }}
        onBlur={() =>
          runValidationTasks("transactionAmount", transactionAmount)
        }
        errorMessage={errors.transactionAmount?.errorMessage}
        hasError={errors.transactionAmount?.hasError}
        {...getOverrideProps(overrides, "transactionAmount")}
      ></TextField>
      <TextField
        label="Transaction date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={transactionDate && convertToLocal(new Date(transactionDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate: value,
              transactionType,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.transactionDate ?? value;
          }
          if (errors.transactionDate?.hasError) {
            runValidationTasks("transactionDate", value);
          }
          setTransactionDate(value);
        }}
        onBlur={() => runValidationTasks("transactionDate", transactionDate)}
        errorMessage={errors.transactionDate?.errorMessage}
        hasError={errors.transactionDate?.hasError}
        {...getOverrideProps(overrides, "transactionDate")}
      ></TextField>
      <TextField
        label="Transaction type"
        isRequired={false}
        isReadOnly={false}
        value={transactionType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType: value,
              customerID,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.transactionType ?? value;
          }
          if (errors.transactionType?.hasError) {
            runValidationTasks("transactionType", value);
          }
          setTransactionType(value);
        }}
        onBlur={() => runValidationTasks("transactionType", transactionType)}
        errorMessage={errors.transactionType?.errorMessage}
        hasError={errors.transactionType?.hasError}
        {...getOverrideProps(overrides, "transactionType")}
      ></TextField>
      <TextField
        label="Customer id"
        isRequired={false}
        isReadOnly={false}
        value={customerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID: value,
              metadata,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.customerID ?? value;
          }
          if (errors.customerID?.hasError) {
            runValidationTasks("customerID", value);
          }
          setCustomerID(value);
        }}
        onBlur={() => runValidationTasks("customerID", customerID)}
        errorMessage={errors.customerID?.errorMessage}
        hasError={errors.customerID?.hasError}
        {...getOverrideProps(overrides, "customerID")}
      ></TextField>
      <TextField
        label="Metadata"
        isRequired={false}
        isReadOnly={false}
        value={metadata}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata: value,
              content,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.metadata ?? value;
          }
          if (errors.metadata?.hasError) {
            runValidationTasks("metadata", value);
          }
          setMetadata(value);
        }}
        onBlur={() => runValidationTasks("metadata", metadata)}
        errorMessage={errors.metadata?.errorMessage}
        hasError={errors.metadata?.hasError}
        {...getOverrideProps(overrides, "metadata")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content: value,
              isDone,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <SwitchField
        label="Is done"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isDone}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              PK,
              SK,
              accountHolderName,
              accountType,
              balance,
              transactionAmount,
              transactionDate,
              transactionType,
              customerID,
              metadata,
              content,
              isDone: value,
            };
            const result = onChange(modelFields);
            value = result?.isDone ?? value;
          }
          if (errors.isDone?.hasError) {
            runValidationTasks("isDone", value);
          }
          setIsDone(value);
        }}
        onBlur={() => runValidationTasks("isDone", isDone)}
        errorMessage={errors.isDone?.errorMessage}
        hasError={errors.isDone?.hasError}
        {...getOverrideProps(overrides, "isDone")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
