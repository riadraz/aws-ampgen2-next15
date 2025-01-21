"use client"
import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BankAccountCreateFormInputValues = {
    PK?: string;
    SK?: string;
    accountHolderName?: string;
    accountType?: string;
    balance?: number;
    transactionAmount?: number;
    transactionDate?: string;
    transactionType?: string;
    customerID?: string;
    metadata?: string;
    content?: string;
    isDone?: boolean;
};
export declare type BankAccountCreateFormValidationValues = {
    PK?: ValidationFunction<string>;
    SK?: ValidationFunction<string>;
    accountHolderName?: ValidationFunction<string>;
    accountType?: ValidationFunction<string>;
    balance?: ValidationFunction<number>;
    transactionAmount?: ValidationFunction<number>;
    transactionDate?: ValidationFunction<string>;
    transactionType?: ValidationFunction<string>;
    customerID?: ValidationFunction<string>;
    metadata?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    isDone?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BankAccountCreateFormOverridesProps = {
    BankAccountCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    PK?: PrimitiveOverrideProps<TextFieldProps>;
    SK?: PrimitiveOverrideProps<TextFieldProps>;
    accountHolderName?: PrimitiveOverrideProps<TextFieldProps>;
    accountType?: PrimitiveOverrideProps<TextFieldProps>;
    balance?: PrimitiveOverrideProps<TextFieldProps>;
    transactionAmount?: PrimitiveOverrideProps<TextFieldProps>;
    transactionDate?: PrimitiveOverrideProps<TextFieldProps>;
    transactionType?: PrimitiveOverrideProps<TextFieldProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    metadata?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    isDone?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type BankAccountCreateFormProps = React.PropsWithChildren<{
    overrides?: BankAccountCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BankAccountCreateFormInputValues) => BankAccountCreateFormInputValues;
    onSuccess?: (fields: BankAccountCreateFormInputValues) => void;
    onError?: (fields: BankAccountCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BankAccountCreateFormInputValues) => BankAccountCreateFormInputValues;
    onValidate?: BankAccountCreateFormValidationValues;
} & React.CSSProperties>;
export default function BankAccountCreateForm(props: BankAccountCreateFormProps): React.ReactElement;
