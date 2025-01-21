
import Image from "next/image";
//import { generateClient } from "aws-amplify/api";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource'; // Path to your backend resource definition

import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
//import { BankAccountCreateForm } from '../../ui-components';
import { BankAccountCreateForm } from '../../ui-components';

Amplify.configure(outputs);
const client = generateClient<Schema>();
const fetchBankAccount = async () => {
  const { data: bankaccount, errors } = await client.models.BankAccount.list();
}
export default function Home() {
  return (
    
    <BankAccountCreateForm/>    
  );
}
